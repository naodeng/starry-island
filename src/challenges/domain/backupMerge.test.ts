import { describe, expect, it } from 'vitest';
import type { ActivityDefinition } from '../../content/types';
import type { ChallengeBackupData } from './backup';
import { filterRetiredGrade2Term1MathData, mergeChallengeBackupData } from './backupMerge';
import type { ChallengeAttempt, ChallengeQuestionSnapshot, TaskProgress, WrongQuestionRecord } from './types';

function question(questionId: string, explanation = '解题说明'): ChallengeQuestionSnapshot {
  const activity: ActivityDefinition = {
    id: `activity-${questionId}`,
    kind: 'arithmetic',
    prompt: '2 + 3',
    hint: '数一数',
    explanation,
    expression: '2 + 3',
    correctAnswer: 5,
  };
  return {
    questionId,
    activityId: activity.id,
    difficulty: 'basic',
    knowledgePointIds: ['addition'],
    lifecycle: 'active',
    approved: true,
    answerLeakageReviewed: true,
    approvedContentFingerprint: 'approved',
    contentFingerprint: 'current',
    activity,
  };
}

function attempt(taskId: string, attemptId: string): ChallengeAttempt {
  return {
    attemptId,
    taskId,
    difficulty: 'basic',
    status: 'in-progress',
    questions: [question(`question-${attemptId}`)],
    assemblySeed: 'seed',
    contentManifestVersion: 'v1',
    snapshotSchemaVersion: 1,
    answers: {},
    currentIndex: 0,
    startedAt: '2026-01-01T00:00:00.000Z',
    elapsedMs: 0,
    revision: 0,
  };
}

function progress(overrides: Partial<TaskProgress> = {}): TaskProgress {
  return {
    taskId: 'task-1',
    bestCorrect: 6,
    bestTotal: 10,
    latestCorrect: 4,
    latestTotal: 10,
    completedCount: 3,
    everPassed: false,
    updatedAt: '2026-01-01T00:00:00.000Z',
    revision: 3,
    ...overrides,
  };
}

function wrongQuestion(overrides: Partial<WrongQuestionRecord> = {}): WrongQuestionRecord {
  const snapshot = question('question-wrong');
  return {
    questionId: snapshot.questionId,
    question: snapshot,
    wrongCount: 2,
    lastWrongAt: '2026-01-01T00:00:00.000Z',
    correctAttemptStreak: 0,
    ...overrides,
  };
}

const emptyData: ChallengeBackupData = {
  attempts: [],
  taskProgress: [],
  recentQuestionAttempts: [],
  wrongQuestions: [],
};

describe('safe challenge backup merge', () => {
  it('filters retired Grade 2 Term 1 Math records from a local recovery snapshot while retaining all other data', () => {
    const obsoleteQuestionId = 'challenge-question:grade-2/term-1/math/unit-02/basic/task-01/session-01/question-01';
    const retainedQuestionId = 'question-grade-2-term-2-math';
    const obsolete = question(obsoleteQuestionId);
    const retained = question(retainedQuestionId);
    const obsoleteAttempt = attempt('grade-2-term-1-math-unit-02/basic-01', 'old-math');
    const currentAttempt = attempt('grade-2-term-1-math-unit-02/basic-01-v2', 'new-math');
    const retainedAttempt = attempt('grade-2-term-2-math-unit-01-basic-01', 'term-2');
    const obsoleteProgress = progress({ taskId: obsoleteAttempt.taskId });
    const currentProgress = progress({ taskId: currentAttempt.taskId });
    const retainedProgress = progress({ taskId: retainedAttempt.taskId });
    const obsoleteWrong = wrongQuestion({ questionId: obsoleteQuestionId, question: obsolete });
    const retainedWrong = wrongQuestion({ questionId: retainedQuestionId, question: retained });

    const filtered = filterRetiredGrade2Term1MathData({
      attempts: [obsoleteAttempt, currentAttempt, retainedAttempt],
      taskProgress: [obsoleteProgress, currentProgress, retainedProgress],
      recentQuestionAttempts: [[obsoleteQuestionId], [obsoleteQuestionId, retainedQuestionId], [retainedQuestionId]],
      wrongQuestions: [obsoleteWrong, retainedWrong],
    });

    expect(filtered.data).toEqual({
      attempts: [currentAttempt, retainedAttempt],
      taskProgress: [currentProgress, retainedProgress],
      recentQuestionAttempts: [[retainedQuestionId], [retainedQuestionId]],
      wrongQuestions: [retainedWrong],
    });
    expect(filtered.excluded).toEqual({ attempts: 1, taskProgress: 1, recentQuestionIds: 2, wrongQuestions: 1 });
  });

  it('preserves local active attempts and merges task progress without adding duplicate counts', () => {
    const localActive = attempt('task-active', 'local-active');
    const incomingActive = attempt('task-active', 'backup-active');
    const incomingNewActive = attempt('task-new', 'backup-new');
    const localProgress = progress();
    const incomingProgress = progress({
      bestCorrect: 9,
      latestCorrect: 7,
      completedCount: 3,
      everPassed: true,
      updatedAt: '2026-01-02T00:00:00.000Z',
      revision: 5,
    });

    const merged = mergeChallengeBackupData(
      { ...emptyData, attempts: [localActive], taskProgress: [localProgress] },
      { ...emptyData, attempts: [incomingActive, incomingNewActive], taskProgress: [incomingProgress] },
    );

    expect(merged.data.attempts).toEqual([localActive, incomingNewActive]);
    expect(merged.data.taskProgress).toEqual([{
      taskId: 'task-1',
      bestCorrect: 9,
      bestTotal: 10,
      latestCorrect: 7,
      latestTotal: 10,
      completedCount: 3,
      everPassed: true,
      updatedAt: '2026-01-02T00:00:00.000Z',
      revision: 5,
    }]);
    expect(merged.summary).toMatchObject({
      addedActiveAttempts: 1,
      preservedLocalActiveAttempts: 1,
      preservedProgressForActiveTasks: 0,
      addedProgressRecords: 0,
      mergedProgressRecords: 1,
    });
  });

  it('keeps the newer latest result, better best ratio, higher count, and passed flag', () => {
    const local = progress({ bestCorrect: 7, bestTotal: 8, latestCorrect: 7, updatedAt: '2026-01-03T00:00:00.000Z' });
    const backup = progress({ bestCorrect: 8, bestTotal: 10, latestCorrect: 3, completedCount: 8, everPassed: true, updatedAt: '2026-01-02T00:00:00.000Z', revision: 6 });

    const merged = mergeChallengeBackupData(
      { ...emptyData, taskProgress: [local] },
      { ...emptyData, taskProgress: [backup] },
    );

    expect(merged.data.taskProgress[0]).toMatchObject({
      bestCorrect: 7,
      bestTotal: 8,
      latestCorrect: 7,
      latestTotal: 10,
      completedCount: 8,
      everPassed: true,
      updatedAt: '2026-01-03T00:00:00.000Z',
      revision: 6,
    });
  });

  it('does not change progress for a task that has a local in-progress answer', () => {
    const localActive = attempt('task-1', 'local-active');
    const localProgress = progress();
    const importedProgress = progress({ bestCorrect: 10, bestTotal: 10, completedCount: 12, updatedAt: '2026-02-01T00:00:00.000Z' });

    const merged = mergeChallengeBackupData(
      { ...emptyData, attempts: [localActive], taskProgress: [localProgress] },
      { ...emptyData, taskProgress: [importedProgress] },
    );

    expect(merged.data.taskProgress).toEqual([localProgress]);
    expect(merged.summary.preservedProgressForActiveTasks).toBe(1);
  });

  it('merges wrong-question counts without duplication and keeps the newest mastery state', () => {
    const local = wrongQuestion({ wrongCount: 4, lastWrongAt: '2026-01-04T00:00:00.000Z', correctAttemptStreak: 0 });
    const backup = wrongQuestion({
      wrongCount: 7,
      lastWrongAt: '2026-01-02T00:00:00.000Z',
      correctAttemptStreak: 2,
      masteredAt: '2026-01-03T00:00:00.000Z',
      question: question('question-wrong', '较旧的讲解'),
    });

    const merged = mergeChallengeBackupData(
      { ...emptyData, wrongQuestions: [local] },
      { ...emptyData, wrongQuestions: [backup] },
    );

    expect(merged.data.wrongQuestions[0]).toMatchObject({
      wrongCount: 7,
      lastWrongAt: '2026-01-04T00:00:00.000Z',
      correctAttemptStreak: 0,
      question: { activity: { explanation: '解题说明' } },
    });
    expect(merged.data.wrongQuestions[0]).not.toHaveProperty('masteredAt');
    expect(merged.summary).toMatchObject({ addedWrongQuestions: 0, mergedWrongQuestions: 1 });
  });

  it('uses local recent-question chronology first and stays idempotent on repeated import', () => {
    const local = { ...emptyData, recentQuestionAttempts: [['shared', 'local-old'], ['local-new']] };
    const backup = { ...emptyData, recentQuestionAttempts: [['backup-old'], ['shared', 'backup-new']] };

    const first = mergeChallengeBackupData(local, backup);
    const second = mergeChallengeBackupData(first.data, backup);

    expect(first.data.recentQuestionAttempts).toEqual([
      ['shared', 'backup-new'],
      ['shared', 'local-old'],
      ['local-new'],
    ]);
    expect(second.data).toEqual(first.data);
  });
});
