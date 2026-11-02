import { describe, expect, it } from 'vitest';
import type { ActivityDefinition } from '../../content/types';
import type { ChallengeBackupData } from './backup';
import { prepareQuarantinedRecordForRestore, serializeQuarantineComparableValue } from './quarantineRecovery';
import type { QuarantinedRecordCandidate } from './quarantineRecovery';
import type { ChallengeAttempt, ChallengeQuestionSnapshot, TaskProgress, WrongQuestionRecord } from './types';

const NOW = '2026-10-22T12:00:00.000Z';
const EMPTY_DATA: ChallengeBackupData = {
  attempts: [],
  taskProgress: [],
  recentQuestionAttempts: [],
  wrongQuestions: [],
};

function makeQuestion(questionId = 'question-1'): ChallengeQuestionSnapshot {
  const activity: ActivityDefinition = {
    id: `activity-${questionId}`,
    kind: 'arithmetic',
    prompt: '1 + 1',
    hint: '数一数',
    explanation: '等于 2。',
    expression: '1 + 1',
    correctAnswer: 2,
  };
  return {
    questionId,
    activityId: activity.id,
    difficulty: 'basic',
    knowledgePointIds: ['addition'],
    lifecycle: 'active',
    approved: true,
    answerLeakageReviewed: true,
    approvedContentFingerprint: 'fingerprint',
    contentFingerprint: 'fingerprint',
    activity,
  };
}

function makeAttempt(): ChallengeAttempt {
  return {
    attemptId: 'attempt-1',
    taskId: 'task-1',
    difficulty: 'basic',
    status: 'in-progress',
    snapshotSchemaVersion: 1,
    questions: [makeQuestion()],
    assemblySeed: 'seed-1',
    contentManifestVersion: 'manifest-v1',
    answers: {},
    currentIndex: 0,
    startedAt: '2026-10-22T11:00:00.000Z',
    elapsedMs: 1000,
    revision: 0,
  };
}

function makeLegacyAttempt() {
  const { snapshotSchemaVersion: _version, ...attempt } = makeAttempt();
  return attempt;
}

function makeProgress(): TaskProgress {
  return {
    taskId: 'task-1',
    bestCorrect: 1,
    bestTotal: 1,
    latestCorrect: 1,
    latestTotal: 1,
    completedCount: 1,
    everPassed: true,
    updatedAt: '2026-10-22T11:00:00.000Z',
    revision: 1,
  };
}

function makeWrongQuestion(): WrongQuestionRecord {
  return {
    questionId: 'question-1',
    question: makeQuestion(),
    wrongCount: 1,
    lastWrongAt: '2026-10-22T11:00:00.000Z',
    correctAttemptStreak: 0,
  };
}

function makeRecoveryPoint(data: ChallengeBackupData = EMPTY_DATA, createdAt = '2026-10-22T00:00:00.000Z') {
  return {
    key: 'recovery-point',
    format: 'starry-island-challenge-recovery',
    version: 1,
    createdAt,
    expiresAt: new Date(Date.parse(createdAt) + 24 * 60 * 60 * 1000).toISOString(),
    data,
  };
}

function candidate(sourceStore: string, sourceKey: IDBValidKey, reasonCode: string, record: unknown): QuarantinedRecordCandidate {
  return { sourceStore, sourceKey, reasonCode, record };
}

describe('prepare quarantined records for safe restoration', () => {
  it('accepts-current-attempt-without-normalization', () => {
    const attempt = makeAttempt();

    expect(prepareQuarantinedRecordForRestore(candidate('attempts', 'task-1', 'invalid-attempts', attempt), NOW)).toEqual({
      status: 'eligible', targetStore: 'attempts', targetKey: 'task-1', record: attempt, normalization: 'none',
    });
  });

  it('accepts-current-task-progress-without-normalization', () => {
    const progress = makeProgress();

    expect(prepareQuarantinedRecordForRestore(candidate('taskProgress', 'task-1', 'invalid-taskProgress', progress), NOW)).toEqual({
      status: 'eligible', targetStore: 'taskProgress', targetKey: 'task-1', record: progress, normalization: 'none',
    });
  });

  it('accepts-current-wrong-question-without-normalization', () => {
    const wrongQuestion = makeWrongQuestion();

    expect(prepareQuarantinedRecordForRestore(candidate('wrongQuestions', 'question-1', 'invalid-wrongQuestions', wrongQuestion), NOW)).toEqual({
      status: 'eligible', targetStore: 'wrongQuestions', targetKey: 'question-1', record: wrongQuestion, normalization: 'none',
    });
  });

  it('accepts-current-recent-question-meta-without-normalization', () => {
    const recentIds = { key: 'recent-question-ids', attemptQuestionIds: [['question-1', 'question-2']] };

    expect(prepareQuarantinedRecordForRestore(candidate('challengeMeta', 'recent-question-ids', 'invalid-recent-question-ids', recentIds), NOW)).toEqual({
      status: 'eligible', targetStore: 'challengeMeta', targetKey: 'recent-question-ids', record: recentIds, normalization: 'none',
    });
  });

  it('accepts-active-current-recovery-point-without-normalization', () => {
    const point = makeRecoveryPoint();

    expect(prepareQuarantinedRecordForRestore(candidate('challengeMeta', 'recovery-point', 'invalid-recovery-point', point), NOW)).toEqual({
      status: 'eligible', targetStore: 'challengeMeta', targetKey: 'recovery-point', record: point, normalization: 'none',
    });
  });

  it('normalizes-known-legacy-attempt-by-adding-only-version', () => {
    const legacy = makeLegacyAttempt();

    expect(prepareQuarantinedRecordForRestore(candidate('attempts', 'task-1', 'invalid-attempts', legacy), NOW)).toEqual({
      status: 'eligible',
      targetStore: 'attempts',
      targetKey: 'task-1',
      record: { ...legacy, snapshotSchemaVersion: 1 },
      normalization: 'attempt-snapshot-v1',
    });
  });

  it('normalizes-known-legacy-attempts-in-recovery-point', () => {
    const legacy = makeLegacyAttempt();
    const point = makeRecoveryPoint({ ...EMPTY_DATA, attempts: [legacy as ChallengeAttempt] });
    const expected = makeRecoveryPoint({ ...EMPTY_DATA, attempts: [{ ...legacy, snapshotSchemaVersion: 1 }] });

    expect(prepareQuarantinedRecordForRestore(candidate('challengeMeta', 'recovery-point', 'invalid-recovery-point', point), NOW)).toEqual({
      status: 'eligible',
      targetStore: 'challengeMeta',
      targetKey: 'recovery-point',
      record: expected,
      normalization: 'recovery-point-snapshot-v1',
    });
  });

  it('rejects-records-missing-required-fields', () => {
    const { revision: _revision, ...incomplete } = makeProgress();

    expect(prepareQuarantinedRecordForRestore(candidate('taskProgress', 'task-1', 'invalid-taskProgress', incomplete), NOW)).toEqual({
      status: 'blocked', reason: 'invalid-record',
    });
  });

  it('rejects-unknown-source-and-reason', () => {
    expect(prepareQuarantinedRecordForRestore(candidate('fixture', 'task-1', 'invalid-attempts', makeAttempt()), NOW)).toEqual({
      status: 'blocked', reason: 'unsupported-source',
    });
    expect(prepareQuarantinedRecordForRestore(candidate('attempts', 'task-1', 'unknown-reason', makeAttempt()), NOW)).toEqual({
      status: 'blocked', reason: 'unknown-reason',
    });
  });

  it('rejects-source-key-mismatch-and-unknown-snapshot-version', () => {
    expect(prepareQuarantinedRecordForRestore(candidate('attempts', 'different-task', 'invalid-attempts', makeAttempt()), NOW)).toEqual({
      status: 'blocked', reason: 'source-key-mismatch',
    });
    expect(prepareQuarantinedRecordForRestore(candidate('attempts', 'task-1', 'invalid-attempts', {
      ...makeAttempt(), snapshotSchemaVersion: 99,
    }), NOW)).toEqual({
      status: 'blocked', reason: 'unsupported-snapshot-version',
    });
  });

  it('rejects-unknown-snapshot-versions-inside-recovery-points', () => {
    const point = makeRecoveryPoint({
      ...EMPTY_DATA,
      attempts: [{ ...makeAttempt(), snapshotSchemaVersion: 99 }],
    });

    expect(prepareQuarantinedRecordForRestore(candidate('challengeMeta', 'recovery-point', 'invalid-recovery-point', point), NOW)).toEqual({
      status: 'blocked', reason: 'unsupported-snapshot-version',
    });
  });

  it('rejects-expired-or-future-recovery-points', () => {
    const expired = makeRecoveryPoint(EMPTY_DATA, '2026-10-20T00:00:00.000Z');
    const notYetActive = makeRecoveryPoint(EMPTY_DATA, '2026-10-23T00:00:00.000Z');

    expect(prepareQuarantinedRecordForRestore(candidate('challengeMeta', 'recovery-point', 'invalid-recovery-point', expired), NOW)).toEqual({
      status: 'blocked', reason: 'inactive-recovery-point',
    });
    expect(prepareQuarantinedRecordForRestore(candidate('challengeMeta', 'recovery-point', 'invalid-recovery-point', notYetActive), NOW)).toEqual({
      status: 'blocked', reason: 'inactive-recovery-point',
    });
  });

  it('rejects-cyclic-or-unsupported-structured-clone-values', () => {
    const cyclic = { ...makeProgress() } as TaskProgress & { self?: unknown };
    cyclic.self = cyclic;
    const withDate = { ...makeProgress(), importedAt: new Date('2026-10-22T00:00:00.000Z') };

    expect(prepareQuarantinedRecordForRestore(candidate('taskProgress', 'task-1', 'invalid-taskProgress', cyclic), NOW)).toEqual({
      status: 'blocked', reason: 'uncomparable-value',
    });
    expect(prepareQuarantinedRecordForRestore(candidate('taskProgress', 'task-1', 'invalid-taskProgress', withDate), NOW)).toEqual({
      status: 'blocked', reason: 'uncomparable-value',
    });
    expect(serializeQuarantineComparableValue({ optional: undefined, count: 1 })).not.toBeNull();
    expect(serializeQuarantineComparableValue([undefined])).toBeNull();
    expect(serializeQuarantineComparableValue(new Date('2026-10-22T00:00:00.000Z'))).toBeNull();
  });

  it('serializes plain data deterministically-independent-of-object-key-order', () => {
    const first = { z: 2, nested: { b: true, a: null } };
    const reordered = { nested: { a: null, b: true }, z: 2 };

    expect(serializeQuarantineComparableValue(first)).toBe(serializeQuarantineComparableValue(reordered));
  });

  it('rejects-array-properties-that-would-be-omitted-from-comparison', () => {
    const withExtraIndex = [1];
    Object.defineProperty(withExtraIndex, '4294967295', { value: 6, enumerable: true });

    expect(serializeQuarantineComparableValue(withExtraIndex)).toBeNull();
  });
});
