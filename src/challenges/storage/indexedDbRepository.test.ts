import { afterEach, describe, expect, it } from 'vitest';
import { IDBFactory } from 'fake-indexeddb';
import type { ActivityDefinition } from '../../content/types';
import { finalizeAttempt, submitFirstAnswer } from '../domain/attempt';
import type { ChallengeAttempt, ChallengeQuestionSnapshot, TaskProgress } from '../domain/types';
import { ActiveAttemptExistsError, InvalidAttemptTransitionError, RevisionConflictError } from './repository';
import { CHALLENGE_DATABASE_VERSION, createChallengeRepository } from './indexedDbRepository';

const repositories: ReturnType<typeof createChallengeRepository>[] = [];

function createRepository() {
  const repository = createChallengeRepository({
    factory: new IDBFactory(),
    databaseName: `challenge-test-${crypto.randomUUID()}`,
  });
  repositories.push(repository);
  return repository;
}

function question(questionId: string, answer = 1): ChallengeQuestionSnapshot {
  const activity: ActivityDefinition = {
    id: `activity-${questionId}`,
    kind: 'arithmetic',
    prompt: '1 + 0',
    hint: 'hint',
    explanation: 'explanation',
    expression: '1 + 0',
    correctAnswer: answer,
  };
  return {
    questionId,
    activityId: activity.id,
    difficulty: 'basic',
    knowledgePointIds: ['numbers'],
    lifecycle: 'active',
    approved: true,
    answerLeakageReviewed: true,
    approvedContentFingerprint: 'fingerprint',
    contentFingerprint: 'fingerprint',
    activity,
  };
}

function makeAttempt(
  taskId = 'task-1',
  attemptId = `attempt-${crypto.randomUUID()}`,
  questionIds = ['question-a', 'question-b'],
): ChallengeAttempt {
  return {
    attemptId,
    taskId,
    difficulty: 'basic',
    status: 'in-progress',
    questions: questionIds.map((id) => question(id)),
    assemblySeed: 'seed',
    contentManifestVersion: 'v1',
    snapshotSchemaVersion: 1,
    answers: {},
    currentIndex: 0,
    startedAt: '2026-01-01T00:00:00.000Z',
    elapsedMs: 1000,
    revision: 0,
  };
}

function answerAll(current: ChallengeAttempt): ChallengeAttempt {
  let attempt = current;
  for (const item of current.questions) {
    const answer = (item.activity as Extract<ActivityDefinition, { kind: 'arithmetic' }>).correctAnswer;
    attempt = submitFirstAnswer(attempt, item.questionId, answer).attempt;
  }
  return attempt;
}

async function complete(repository: ReturnType<typeof createChallengeRepository>, current: ChallengeAttempt) {
  let completed = current;
  for (const item of current.questions) {
    const answer = (item.activity as Extract<ActivityDefinition, { kind: 'arithmetic' }>).correctAnswer;
    const next = submitFirstAnswer(completed, item.questionId, answer).attempt;
    completed = await repository.saveAnswer(current.taskId, completed.revision, next);
  }
  const progress = await repository.getTaskProgress(current.taskId);
  const update = finalizeAttempt(completed, progress, '2026-01-01T00:02:00.000Z');
  await repository.completeAttempt(current.taskId, completed.revision, update.completedAttempt, update.progress);
  return update.progress;
}

async function completeWithWrongAnswer(repository: ReturnType<typeof createChallengeRepository>, current: ChallengeAttempt) {
  let completed = current;
  const wrongQuestionId = current.questions[0].questionId;
  for (const item of current.questions) {
    const correctAnswer = (item.activity as Extract<ActivityDefinition, { kind: 'arithmetic' }>).correctAnswer;
    const answer = item.questionId === wrongQuestionId ? 0 : correctAnswer;
    const next = submitFirstAnswer(completed, item.questionId, answer).attempt;
    completed = await repository.saveAnswer(current.taskId, completed.revision, next);
  }
  const progress = await repository.getTaskProgress(current.taskId);
  const update = finalizeAttempt(completed, progress, '2026-01-01T00:02:00.000Z');
  await repository.completeAttempt(current.taskId, completed.revision, update.completedAttempt, update.progress);
  return update.progress;
}

afterEach(() => {
  for (const repository of repositories.splice(0)) repository.close();
});

describe('IndexedDB challenge repository', () => {
  it('creates the schema and starts with no active attempt, progress, or recent IDs', async () => {
    const repository = createRepository();
    expect(await repository.getActiveAttempt('task-1')).toBeNull();
    expect(await repository.getTaskProgress('task-1')).toBeNull();
    expect(await repository.getGroupProgress(['task-1', 'task-2'])).toEqual([]);
    expect(await repository.getRecentQuestionIds()).toEqual([]);
    expect(await repository.getWrongQuestions()).toEqual([]);
  });

  it('lists all persisted task progress for a local growth summary', async () => {
    const repository = createRepository();
    const first = makeAttempt('task-a', 'attempt-a', ['question-a']);
    const second = makeAttempt('task-b', 'attempt-b', ['question-b']);
    await repository.beginAttempt(first);
    await complete(repository, first);
    await repository.beginAttempt(second);
    await complete(repository, second);

    expect(await repository.getAllTaskProgress()).toEqual([
      expect.objectContaining({ taskId: 'task-a', completedCount: 1, everPassed: true }),
      expect.objectContaining({ taskId: 'task-b', completedCount: 1, everPassed: true }),
    ]);
  });

  it('reads a consistent local backup snapshot without changing challenge data', async () => {
    const repository = createRepository();
    const finished = makeAttempt('task-finished', 'attempt-finished', ['question-right', 'question-wrong']);
    await repository.beginAttempt(finished);
    const first = submitFirstAnswer(finished, 'question-right', 1).attempt;
    const savedFirst = await repository.saveAnswer(finished.taskId, finished.revision, first);
    const second = submitFirstAnswer(savedFirst, 'question-wrong', 0).attempt;
    const savedSecond = await repository.saveAnswer(finished.taskId, savedFirst.revision, second);
    const update = finalizeAttempt(savedSecond, null, '2026-10-22T00:02:00.000Z');
    await repository.completeAttempt(finished.taskId, savedSecond.revision, update.completedAttempt, update.progress);

    const active = makeAttempt('task-active', 'attempt-active', ['question-active']);
    await repository.beginAttempt(active);
    const progressBefore = await repository.getAllTaskProgress();
    const wrongQuestionsBefore = await repository.getWrongQuestions();
    const snapshot = await repository.getBackupSnapshot();

    expect(snapshot).toEqual({
      attempts: [active],
      taskProgress: progressBefore,
      recentQuestionAttempts: [['question-right', 'question-wrong']],
      wrongQuestions: wrongQuestionsBefore,
    });
    expect(snapshot.taskProgress).toHaveLength(1);
    expect(snapshot.wrongQuestions).toMatchObject([{ questionId: 'question-wrong', wrongCount: 1 }]);
    expect(await repository.getActiveAttempt('task-active')).toEqual(active);
  });

  it('clears all challenge records behind a 24-hour recovery point and consumes it after one successful restore', async () => {
    const repository = createRepository();
    const active = makeAttempt('task-active', 'attempt-active', ['question-active']);
    const completed = makeAttempt('task-completed', 'attempt-completed', ['question-wrong', 'question-right']);
    await repository.beginAttempt(active);
    await repository.beginAttempt(completed);
    await completeWithWrongAnswer(repository, completed);
    const before = await repository.getBackupSnapshot();

    const clearResult = await repository.clearChallengeData('all', '2026-10-22T00:00:00.000Z');

    expect(clearResult).toMatchObject({
      counts: { attempts: 1, taskProgress: 1, recentQuestionAttempts: 1, wrongQuestions: 1 },
      recoveryPoint: { createdAt: '2026-10-22T00:00:00.000Z', expiresAt: '2026-10-23T00:00:00.000Z' },
    });
    expect(await repository.getBackupSnapshot()).toEqual({
      attempts: [], taskProgress: [], recentQuestionAttempts: [], wrongQuestions: [],
    });
    expect(await repository.getRecoveryPoint('2026-10-22T23:59:59.999Z')).toMatchObject({ data: before });

    const restored = await repository.restoreRecoveryPoint('2026-10-22T12:00:00.000Z');

    expect(restored?.summary).toMatchObject({ addedActiveAttempts: 1, addedProgressRecords: 1, addedWrongQuestions: 1 });
    expect(restored?.recoveryPointRetained).toBe(false);
    expect(await repository.getBackupSnapshot()).toEqual(before);
    expect(await repository.getRecoveryPoint('2026-10-22T12:00:00.000Z')).toBeNull();
    expect(await repository.restoreRecoveryPoint('2026-10-22T12:00:00.000Z')).toBeNull();
  });

  it('keeps unselected records when clearing only unfinished attempts', async () => {
    const repository = createRepository();
    const active = makeAttempt('task-active', 'attempt-active', ['question-active']);
    const completed = makeAttempt('task-completed', 'attempt-completed', ['question-wrong', 'question-right']);
    await repository.beginAttempt(active);
    await repository.beginAttempt(completed);
    await completeWithWrongAnswer(repository, completed);

    const result = await repository.clearChallengeData('in-progress', '2026-10-22T00:00:00.000Z');

    expect(result.counts).toEqual({ attempts: 1, taskProgress: 0, recentQuestionAttempts: 0, wrongQuestions: 0 });
    expect(await repository.getActiveAttempt('task-active')).toBeNull();
    expect(await repository.getTaskProgress('task-completed')).not.toBeNull();
    expect(await repository.getWrongQuestions()).toHaveLength(1);
    expect(await repository.getRecentQuestionIds()).toEqual(['question-wrong', 'question-right']);
  });

  it('keeps unfinished answers and scores when clearing only the wrong-question notebook', async () => {
    const repository = createRepository();
    const active = makeAttempt('task-active', 'attempt-active', ['question-active']);
    const completed = makeAttempt('task-completed', 'attempt-completed', ['question-wrong', 'question-right']);
    await repository.beginAttempt(active);
    await repository.beginAttempt(completed);
    await completeWithWrongAnswer(repository, completed);

    const result = await repository.clearChallengeData('wrong-questions', '2026-10-22T00:00:00.000Z');

    expect(result.counts).toEqual({ attempts: 0, taskProgress: 0, recentQuestionAttempts: 0, wrongQuestions: 1 });
    expect(await repository.getActiveAttempt('task-active')).toEqual(active);
    expect(await repository.getTaskProgress('task-completed')).not.toBeNull();
    expect(await repository.getWrongQuestions()).toEqual([]);
    expect(await repository.getRecentQuestionIds()).toEqual(['question-wrong', 'question-right']);
  });

  it('atomically replaces the previous recovery point with the state before the latest deletion', async () => {
    const repository = createRepository();
    const first = makeAttempt('task-first', 'attempt-first', ['question-first']);
    await repository.beginAttempt(first);
    await repository.clearChallengeData('all', '2026-10-22T00:00:00.000Z');

    const second = makeAttempt('task-second', 'attempt-second', ['question-second']);
    await repository.beginAttempt(second);
    await repository.clearChallengeData('all', '2026-10-22T12:00:00.000Z');

    const point = await repository.getRecoveryPoint('2026-10-22T12:01:00.000Z');
    expect(point).toMatchObject({
      createdAt: '2026-10-22T12:00:00.000Z',
      data: { attempts: [second] },
    });
    expect(point?.data.attempts).not.toContainEqual(first);
  });

  it('does not replace the previous recovery point when the selected tier has no data', async () => {
    const repository = createRepository();
    await repository.beginAttempt(makeAttempt('task-noop', 'attempt-noop', ['question-noop']));
    await repository.clearChallengeData('all', '2026-10-22T00:00:00.000Z');

    const noOp = await repository.clearChallengeData('all', '2026-10-22T12:00:00.000Z');

    expect(noOp).toEqual({
      counts: { attempts: 0, taskProgress: 0, recentQuestionAttempts: 0, wrongQuestions: 0 },
      recoveryPoint: null,
    });
    expect(await repository.getRecoveryPoint('2026-10-22T12:01:00.000Z')).toMatchObject({
      createdAt: '2026-10-22T00:00:00.000Z',
      data: { attempts: [{ taskId: 'task-noop' }] },
    });
  });

  it('retains the recovery point until scores deferred by a local active task can be restored', async () => {
    const repository = createRepository();
    const first = makeAttempt('task-shared', 'attempt-before-clear', ['question-before-clear']);
    await repository.beginAttempt(first);
    await complete(repository, first);
    await repository.clearChallengeData('all', '2026-10-22T00:00:00.000Z');

    const current = makeAttempt('task-shared', 'attempt-after-clear', ['question-after-clear']);
    await repository.beginAttempt(current);
    const partialRestore = await repository.restoreRecoveryPoint('2026-10-22T12:00:00.000Z');

    expect(partialRestore?.summary.preservedProgressForActiveTasks).toBe(1);
    expect(partialRestore?.recoveryPointRetained).toBe(true);
    expect(await repository.getTaskProgress('task-shared')).toBeNull();
    expect(await repository.getActiveAttempt('task-shared')).toEqual(current);
    expect(await repository.getRecoveryPoint('2026-10-22T12:00:00.000Z')).not.toBeNull();

    await complete(repository, current);
    const completedRestore = await repository.restoreRecoveryPoint('2026-10-22T13:00:00.000Z');

    expect(completedRestore?.recoveryPointRetained).toBe(false);
    expect(await repository.getTaskProgress('task-shared')).toMatchObject({ completedCount: 1, everPassed: true });
    expect(await repository.getRecoveryPoint('2026-10-22T13:00:00.000Z')).toBeNull();
  });

  it('does not restore an expired recovery point or clear the current local state', async () => {
    const repository = createRepository();
    const attempt = makeAttempt('task-expired', 'attempt-expired', ['question-expired']);
    await repository.beginAttempt(attempt);
    await repository.clearChallengeData('all', '2026-10-22T00:00:00.000Z');

    expect(await repository.restoreRecoveryPoint('2026-10-23T00:00:00.000Z')).toBeNull();
    expect(await repository.getBackupSnapshot()).toEqual({
      attempts: [], taskProgress: [], recentQuestionAttempts: [], wrongQuestions: [],
    });
    expect(await repository.getRecoveryPoint('2026-10-23T00:00:00.000Z')).toBeNull();
  });

  it('leaves all challenge data unchanged when recovery-point creation cannot be validated', async () => {
    const repository = createRepository();
    const attempt = makeAttempt('task-invalid-time', 'attempt-invalid-time', ['question-invalid-time']);
    await repository.beginAttempt(attempt);

    await expect(repository.clearChallengeData('all', 'not-a-date')).rejects.toThrow('恢复时间无效');
    expect(await repository.getBackupSnapshot()).toMatchObject({ attempts: [attempt] });
    expect(await repository.getRecoveryPoint()).toBeNull();
  });

  it('merges imported data in one transaction and preserves the local active attempt', async () => {
    const repository = createRepository();
    const completed = makeAttempt('task-finished', 'attempt-finished', ['question-finished']);
    await repository.beginAttempt(completed);
    await complete(repository, completed);
    const localActive = makeAttempt('task-active', 'attempt-local', ['question-local']);
    await repository.beginAttempt(localActive);
    const expectedLocal = await repository.getBackupSnapshot();
    const importedActive = makeAttempt('task-active', 'attempt-imported', ['question-imported']);
    const incomingProgress = {
      ...expectedLocal.taskProgress[0]!,
      bestCorrect: 1,
      bestTotal: 1,
      latestCorrect: 0,
      completedCount: 1,
      updatedAt: '2026-01-02T00:00:00.000Z',
    };

    const summary = await repository.mergeBackupData({
      attempts: [importedActive, makeAttempt('task-new', 'attempt-new', ['question-new'])],
      taskProgress: [incomingProgress],
      recentQuestionAttempts: [['question-imported']],
      wrongQuestions: [],
    }, expectedLocal);

    expect(summary).toEqual({
      addedActiveAttempts: 1,
      preservedLocalActiveAttempts: 1,
      preservedProgressForActiveTasks: 0,
      addedProgressRecords: 0,
      mergedProgressRecords: 1,
      addedWrongQuestions: 0,
      mergedWrongQuestions: 0,
    });
    const merged = await repository.getBackupSnapshot();
    expect(merged.attempts).toEqual(expect.arrayContaining([localActive, expect.objectContaining({ taskId: 'task-new' })]));
    expect(merged.attempts).not.toContainEqual(importedActive);
    expect(merged.taskProgress[0]).toMatchObject({ completedCount: 1, everPassed: true, bestCorrect: 1, latestCorrect: 0 });
  });

  it('rejects an import if local data changed after preview and leaves it untouched', async () => {
    const repository = createRepository();
    const expectedLocal = await repository.getBackupSnapshot();
    const localActive = makeAttempt('task-local', 'attempt-local', ['question-local']);
    await repository.beginAttempt(localActive);

    await expect(repository.mergeBackupData({
      attempts: [makeAttempt('task-imported', 'attempt-imported', ['question-imported'])],
      taskProgress: [],
      recentQuestionAttempts: [],
      wrongQuestions: [],
    }, expectedLocal)).rejects.toThrow(RevisionConflictError);

    const actual = await repository.getBackupSnapshot();
    expect(actual.attempts).toEqual([localActive]);
  });

  it('records wrong questions and requires two correct completed attempts to master them', async () => {
    const repository = createRepository();
    const questionIds = ['question-a'];
    const finishWith = async (answer: number, completedAt: string) => {
      const initial = makeAttempt('task-1', `attempt-${completedAt}`, questionIds);
      await repository.beginAttempt(initial);
      const submitted = submitFirstAnswer(initial, 'question-a', answer).attempt;
      const saved = await repository.saveAnswer(initial.taskId, initial.revision, submitted);
      const progress = await repository.getTaskProgress(initial.taskId);
      const update = finalizeAttempt(saved, progress, completedAt);
      await repository.completeAttempt(initial.taskId, saved.revision, update.completedAttempt, update.progress);
    };

    await finishWith(0, '2026-01-01T00:00:00.000Z');
    expect(await repository.getWrongQuestions()).toMatchObject([{
      questionId: 'question-a',
      wrongCount: 1,
      lastWrongAt: '2026-01-01T00:00:00.000Z',
      correctAttemptStreak: 0,
    }]);

    await finishWith(1, '2026-01-02T00:00:00.000Z');
    const afterFirstCorrect = await repository.getWrongQuestions();
    expect(afterFirstCorrect[0]?.correctAttemptStreak).toBe(1);
    expect(afterFirstCorrect[0]).not.toHaveProperty('masteredAt');

    await finishWith(1, '2026-01-03T00:00:00.000Z');
    expect(await repository.getWrongQuestions()).toMatchObject([{ correctAttemptStreak: 2, masteredAt: '2026-01-03T00:00:00.000Z' }]);

    await finishWith(0, '2026-01-04T00:00:00.000Z');
    expect(await repository.getWrongQuestions()).toMatchObject([{
      questionId: 'question-a',
      wrongCount: 2,
      lastWrongAt: '2026-01-04T00:00:00.000Z',
      correctAttemptStreak: 0,
    }]);
    expect(await repository.getWrongQuestions()).not.toHaveProperty('0.masteredAt');
  });

  it('upgrades a version 1 challenge database without losing its existing records', async () => {
    const factory = new IDBFactory();
    const databaseName = `challenge-upgrade-${crypto.randomUUID()}`;
    const legacy = await new Promise<IDBDatabase>((resolve, reject) => {
      const request = factory.open(databaseName, 1);
      request.onupgradeneeded = () => {
        request.result.createObjectStore('attempts', { keyPath: 'taskId' });
        request.result.createObjectStore('taskProgress', { keyPath: 'taskId' });
        request.result.createObjectStore('challengeMeta', { keyPath: 'key' });
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
    const { snapshotSchemaVersion: _snapshotSchemaVersion, ...legacyAttempt } = makeAttempt();
    const legacyProgress: TaskProgress = {
      taskId: 'task-old',
      bestCorrect: 2,
      bestTotal: 2,
      latestCorrect: 2,
      latestTotal: 2,
      completedCount: 2,
      everPassed: true,
      updatedAt: '2026-01-01T00:00:00.000Z',
      revision: 2,
    };
    await new Promise<void>((resolve, reject) => {
      const tx = legacy.transaction(['attempts', 'taskProgress', 'challengeMeta'], 'readwrite');
      tx.objectStore('attempts').put(legacyAttempt);
      tx.objectStore('taskProgress').put(legacyProgress);
      tx.objectStore('challengeMeta').put({ key: 'recent-question-ids', attemptQuestionIds: [['question-old']] });
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
    legacy.close();

    const repository = createChallengeRepository({ factory, databaseName });
    repositories.push(repository);
    expect(await repository.getActiveAttempt('task-1')).toEqual({ ...legacyAttempt, snapshotSchemaVersion: 1 });
    expect(await repository.getTaskProgress('task-old')).toEqual(legacyProgress);
    expect(await repository.getRecentQuestionIds()).toEqual(['question-old']);
    expect(await repository.getWrongQuestions()).toEqual([]);
    expect(await repository.getQuarantinedRecordCount()).toBe(0);
  });

  it('upgrades a version 2 challenge database while preserving its records', async () => {
    const factory = new IDBFactory();
    const databaseName = `challenge-upgrade-v2-${crypto.randomUUID()}`;
    const legacy = await new Promise<IDBDatabase>((resolve, reject) => {
      const request = factory.open(databaseName, 2);
      request.onupgradeneeded = () => {
        request.result.createObjectStore('attempts', { keyPath: 'taskId' });
        request.result.createObjectStore('taskProgress', { keyPath: 'taskId' });
        request.result.createObjectStore('challengeMeta', { keyPath: 'key' });
        request.result.createObjectStore('wrongQuestions', { keyPath: 'questionId' });
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
    const { snapshotSchemaVersion: _snapshotSchemaVersion, ...attempt } = makeAttempt('task-v2', 'attempt-v2', ['question-v2']);
    const progress: TaskProgress = {
      taskId: 'task-v2',
      bestCorrect: 1,
      bestTotal: 1,
      latestCorrect: 1,
      latestTotal: 1,
      completedCount: 1,
      everPassed: true,
      updatedAt: '2026-01-01T00:00:00.000Z',
      revision: 1,
    };
    await new Promise<void>((resolve, reject) => {
      const tx = legacy.transaction(['attempts', 'taskProgress', 'challengeMeta'], 'readwrite');
      tx.objectStore('attempts').put(attempt);
      tx.objectStore('taskProgress').put(progress);
      tx.objectStore('challengeMeta').put({ key: 'recent-question-ids', attemptQuestionIds: [['question-v2']] });
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
    legacy.close();

    const repository = createChallengeRepository({ factory, databaseName });
    repositories.push(repository);
    expect(await repository.getActiveAttempt('task-v2')).toEqual({ ...attempt, snapshotSchemaVersion: 1 });
    expect(await repository.getTaskProgress('task-v2')).toEqual(progress);
    expect(await repository.getRecentQuestionIds()).toEqual(['question-v2']);
    expect(await repository.getQuarantinedRecordCount()).toBe(0);
  });

  it('upgrades a version 3 challenge database without changing its active attempt', async () => {
    const factory = new IDBFactory();
    const databaseName = `challenge-upgrade-v3-${crypto.randomUUID()}`;
    const legacy = await new Promise<IDBDatabase>((resolve, reject) => {
      const request = factory.open(databaseName, 3);
      request.onupgradeneeded = () => {
        request.result.createObjectStore('attempts', { keyPath: 'taskId' });
        request.result.createObjectStore('taskProgress', { keyPath: 'taskId' });
        request.result.createObjectStore('challengeMeta', { keyPath: 'key' });
        request.result.createObjectStore('wrongQuestions', { keyPath: 'questionId' });
        request.result.createObjectStore('quarantinedRecords', { autoIncrement: true });
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
    const answered = submitFirstAnswer(makeAttempt('task-v3', 'attempt-v3', ['question-v3-a', 'question-v3-b']), 'question-v3-a', 1).attempt;
    const { snapshotSchemaVersion: _snapshotSchemaVersion, ...legacyAttempt } = answered;
    const recoveryCreatedAt = '2026-10-22T00:00:00.000Z';
    const legacyRecoveryPoint = {
      key: 'recovery-point',
      format: 'starry-island-challenge-recovery',
      version: 1,
      createdAt: recoveryCreatedAt,
      expiresAt: '2026-10-23T00:00:00.000Z',
      data: { attempts: [legacyAttempt], taskProgress: [], recentQuestionAttempts: [], wrongQuestions: [] },
    };
    const progress: TaskProgress = {
      taskId: 'task-v3',
      bestCorrect: 1,
      bestTotal: 1,
      latestCorrect: 1,
      latestTotal: 1,
      completedCount: 1,
      everPassed: true,
      updatedAt: '2026-01-01T00:00:00.000Z',
      revision: 1,
    };
    await new Promise<void>((resolve, reject) => {
      const tx = legacy.transaction(['attempts', 'taskProgress', 'challengeMeta', 'quarantinedRecords'], 'readwrite');
      tx.objectStore('attempts').put(legacyAttempt);
      tx.objectStore('taskProgress').put(progress);
      tx.objectStore('challengeMeta').put({ key: 'recent-question-ids', attemptQuestionIds: [['question-v3-a']] });
      tx.objectStore('challengeMeta').put(legacyRecoveryPoint);
      tx.objectStore('quarantinedRecords').put({ sourceStore: 'fixture', record: { retained: true } });
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
    legacy.close();

    const repository = createChallengeRepository({ factory, databaseName });
    repositories.push(repository);
    expect(CHALLENGE_DATABASE_VERSION).toBe(4);
    expect(await repository.getActiveAttempt('task-v3')).toEqual({ ...legacyAttempt, snapshotSchemaVersion: 1 });
    expect(await repository.getTaskProgress('task-v3')).toEqual(progress);
    expect(await repository.getRecentQuestionIds()).toEqual(['question-v3-a']);
    expect(await repository.getQuarantinedRecordCount()).toBe(1);
    expect(await repository.getRecoveryPoint('2026-10-22T12:00:00.000Z')).toEqual({
      ...legacyRecoveryPoint,
      data: { ...legacyRecoveryPoint.data, attempts: [{ ...legacyAttempt, snapshotSchemaVersion: 1 }] },
    });
  });

  it('isolates malformed records and keeps valid challenge records readable', async () => {
    const factory = new IDBFactory();
    const databaseName = `challenge-quarantine-${crypto.randomUUID()}`;
    const legacy = await new Promise<IDBDatabase>((resolve, reject) => {
      const request = factory.open(databaseName, 2);
      request.onupgradeneeded = () => {
        request.result.createObjectStore('attempts', { keyPath: 'taskId' });
        request.result.createObjectStore('taskProgress', { keyPath: 'taskId' });
        request.result.createObjectStore('challengeMeta', { keyPath: 'key' });
        request.result.createObjectStore('wrongQuestions', { keyPath: 'questionId' });
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
    const validAttempt = makeAttempt('task-valid', 'attempt-valid', ['question-valid']);
    const validProgress: TaskProgress = {
      taskId: 'task-valid',
      bestCorrect: 1,
      bestTotal: 1,
      latestCorrect: 1,
      latestTotal: 1,
      completedCount: 1,
      everPassed: true,
      updatedAt: '2026-01-01T00:00:00.000Z',
      revision: 1,
    };
    await new Promise<void>((resolve, reject) => {
      const tx = legacy.transaction(['attempts', 'taskProgress', 'challengeMeta', 'wrongQuestions'], 'readwrite');
      tx.objectStore('attempts').put(validAttempt);
      tx.objectStore('attempts').put({ taskId: 'task-broken', status: 'corrupt' });
      tx.objectStore('attempts').put({ ...validAttempt, taskId: 'task-future-schema', attemptId: 'attempt-future-schema', snapshotSchemaVersion: 99 });
      tx.objectStore('taskProgress').put(validProgress);
      tx.objectStore('taskProgress').put({ taskId: 'task-broken', bestCorrect: 'not-a-number' });
      tx.objectStore('wrongQuestions').put({ questionId: 'question-broken', wrongCount: -1 });
      tx.objectStore('challengeMeta').put({ key: 'recent-question-ids', attemptQuestionIds: 'corrupt' });
      tx.objectStore('challengeMeta').put({ key: 'recovery-point', version: 99, data: null });
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
    legacy.close();

    const repository = createChallengeRepository({ factory, databaseName });
    repositories.push(repository);
    expect(await repository.getActiveAttempt('task-valid')).toEqual(validAttempt);
    expect(await repository.getActiveAttempt('task-broken')).toBeNull();
    expect(await repository.getActiveAttempt('task-future-schema')).toBeNull();
    expect(await repository.getAllTaskProgress()).toEqual([validProgress]);
    expect(await repository.getWrongQuestions()).toEqual([]);
    expect(await repository.getRecentQuestionIds()).toEqual([]);
    expect(await repository.getQuarantinedRecordCount()).toBe(6);
    expect(await repository.getBackupSnapshot()).toEqual({
      attempts: [validAttempt],
      taskProgress: [validProgress],
      recentQuestionAttempts: [],
      wrongQuestions: [],
    });
    expect((await repository.getQuarantinedRecords()).map((record) => record.record)).toEqual(expect.arrayContaining([
      { taskId: 'task-broken', status: 'corrupt' },
      expect.objectContaining({ taskId: 'task-future-schema', snapshotSchemaVersion: 99 }),
      { taskId: 'task-broken', bestCorrect: 'not-a-number' },
      { questionId: 'question-broken', wrongCount: -1 },
      { key: 'recent-question-ids', attemptQuestionIds: 'corrupt' },
      { key: 'recovery-point', version: 99, data: null },
    ]));

    const database = await new Promise<IDBDatabase>((resolve, reject) => {
      const request = factory.open(databaseName);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
    expect(Array.from(database.objectStoreNames)).toContain('quarantinedRecords');
    const quarantined = await new Promise<unknown[]>((resolve, reject) => {
      const tx = database.transaction('quarantinedRecords', 'readonly');
      const request = tx.objectStore('quarantinedRecords').getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
    expect(quarantined).toHaveLength(6);
    expect(quarantined.map((record) => (record as { sourceStore: string }).sourceStore).sort()).toEqual([
      'attempts', 'attempts', 'challengeMeta', 'challengeMeta', 'taskProgress', 'wrongQuestions',
    ]);
    database.close();
  });

  it('allows one active snapshot per task and rejects a second begin', async () => {
    const repository = createRepository();
    const attempt = makeAttempt();
    await repository.beginAttempt(attempt);
    await expect(repository.beginAttempt(makeAttempt('task-1', 'attempt-second')))
      .rejects.toThrow(ActiveAttemptExistsError);
    expect(await repository.getActiveAttempt('task-1')).toEqual(attempt);
  });

  it('persists only the next first answer and rejects stale revisions', async () => {
    const repository = createRepository();
    const initial = makeAttempt();
    await repository.beginAttempt(initial);
    const first = submitFirstAnswer(initial, 'question-a', 1).attempt;
    expect(await repository.saveAnswer('task-1', 0, first)).toEqual(first);
    await expect(repository.saveAnswer('task-1', 0, first)).rejects.toThrow(RevisionConflictError);
    expect(await repository.getActiveAttempt('task-1')).toEqual(first);
  });

  it('allows only one competing tab to save an answer from the same revision', async () => {
    const factory = new IDBFactory();
    const databaseName = `challenge-shared-${crypto.randomUUID()}`;
    const firstRepository = createChallengeRepository({ factory, databaseName });
    const secondRepository = createChallengeRepository({ factory, databaseName });
    repositories.push(firstRepository, secondRepository);
    const initial = makeAttempt();
    await firstRepository.beginAttempt(initial);
    const [firstSnapshot, secondSnapshot] = await Promise.all([
      firstRepository.getActiveAttempt('task-1'),
      secondRepository.getActiveAttempt('task-1'),
    ]);
    expect(firstSnapshot).toEqual(initial);
    expect(secondSnapshot).toEqual(initial);
    const firstAnswer = submitFirstAnswer(firstSnapshot!, 'question-a', 1).attempt;
    const secondAnswer = submitFirstAnswer(secondSnapshot!, 'question-a', 0).attempt;

    const outcomes = await Promise.allSettled([
      firstRepository.saveAnswer('task-1', 0, firstAnswer),
      secondRepository.saveAnswer('task-1', 0, secondAnswer),
    ]);

    expect(outcomes.filter(({ status }) => status === 'fulfilled')).toHaveLength(1);
    const rejected = outcomes.find(({ status }) => status === 'rejected');
    expect(rejected).toMatchObject({ status: 'rejected', reason: expect.any(RevisionConflictError) });
    const persisted = await firstRepository.getActiveAttempt('task-1');
    expect([firstAnswer, secondAnswer]).toContainEqual(persisted);
  });

  it('allows elapsed time to increase with a saved answer but never decrease', async () => {
    const repository = createRepository();
    const initial = makeAttempt();
    await repository.beginAttempt(initial);
    const first = { ...submitFirstAnswer(initial, 'question-a', 1).attempt, elapsedMs: 2500 };
    await expect(repository.saveAnswer('task-1', 0, first)).resolves.toMatchObject({ elapsedMs: 2500 });

    const next = submitFirstAnswer(first, 'question-b', 1).attempt;
    await expect(repository.saveAnswer('task-1', 1, { ...next, elapsedMs: 2000 })).rejects.toThrow(InvalidAttemptTransitionError);
  });

  it('rejects a transition that adds more than the current answer', async () => {
    const repository = createRepository();
    const initial = makeAttempt();
    await repository.beginAttempt(initial);
    const invalid = {
      ...initial,
      answers: { 'question-a': 1, 'question-b': 1 },
      currentIndex: 2,
      revision: 1,
    };
    await expect(repository.saveAnswer('task-1', 0, invalid)).rejects.toThrow(InvalidAttemptTransitionError);
    expect(await repository.getActiveAttempt('task-1')).toEqual(initial);
  });

  it('rejects wrong completion status, revision, identity, and incomplete answers', async () => {
    const repository = createRepository();
    const initial = makeAttempt();
    await repository.beginAttempt(initial);
    const oneAnswer = submitFirstAnswer(initial, 'question-a', 1).attempt;
    const incomplete = { ...oneAnswer, status: 'completed' as const };
    await expect(repository.completeAttempt('task-1', 1, oneAnswer, {} as TaskProgress))
      .rejects.toThrow(InvalidAttemptTransitionError);
    await expect(repository.completeAttempt('task-1', 1, incomplete, {} as TaskProgress))
      .rejects.toThrow(InvalidAttemptTransitionError);

    const finished = answerAll(initial);
    const update = finalizeAttempt(finished, null, '2026-01-01T00:02:00.000Z');
    await expect(repository.completeAttempt('task-1', finished.revision, update.completedAttempt, update.progress))
      .rejects.toThrow(RevisionConflictError);
    await expect(repository.completeAttempt('another-task', finished.revision, update.completedAttempt, update.progress))
      .rejects.toThrow(InvalidAttemptTransitionError);
    expect(await repository.getActiveAttempt('task-1')).toEqual(initial);
  });

  it('atomically writes task progress, retains only recent question IDs, and deletes the completed snapshot', async () => {
    const repository = createRepository();
    for (let index = 0; index < 4; index += 1) {
      const attempt = makeAttempt('task-1', `attempt-${index}`, [`question-${index}-a`, `question-${index}-b`]);
      await repository.beginAttempt(attempt);
      await complete(repository, attempt);
    }

    expect(await repository.getActiveAttempt('task-1')).toBeNull();
    expect(await repository.getTaskProgress('task-1')).toMatchObject({ completedCount: 4, everPassed: true, revision: 4 });
    expect(await repository.getGroupProgress(['task-1', 'missing-task'])).toHaveLength(1);
    expect(await repository.getRecentQuestionIds()).toEqual([
      'question-3-a', 'question-3-b',
      'question-2-a', 'question-2-b',
      'question-1-a', 'question-1-b',
    ]);
  });

  it('keeps the active attempt and prior progress when a completion transaction fails', async () => {
    const repository = createRepository();
    const initial = makeAttempt();
    await repository.beginAttempt(initial);
    const firstAnswer = submitFirstAnswer(initial, 'question-a', 0).attempt;
    const savedFirst = await repository.saveAnswer(initial.taskId, initial.revision, firstAnswer);
    const secondAnswer = submitFirstAnswer(savedFirst, 'question-b', 1).attempt;
    const finished = await repository.saveAnswer(initial.taskId, savedFirst.revision, secondAnswer);
    const update = finalizeAttempt(finished, null, '2026-01-01T00:02:00.000Z');
    const invalidProgress = Object.assign({}, update.progress, { invalid: Symbol('not-cloneable') }) as TaskProgress;

    await expect(repository.completeAttempt('task-1', finished.revision, update.completedAttempt, invalidProgress))
      .rejects.toBeDefined();
    expect(await repository.getActiveAttempt('task-1')).toEqual(finished);
    expect(await repository.getTaskProgress('task-1')).toBeNull();
    expect(await repository.getRecentQuestionIds()).toEqual([]);
    expect(await repository.getWrongQuestions()).toEqual([]);
  });

  it('discards without changing completion progress', async () => {
    const repository = createRepository();
    const initial = makeAttempt();
    await repository.beginAttempt(initial);
    const wrongAnswer = submitFirstAnswer(initial, 'question-a', 0).attempt;
    await repository.saveAnswer(initial.taskId, initial.revision, wrongAnswer);
    await repository.discardAttempt('task-1', wrongAnswer.revision);
    expect(await repository.getActiveAttempt('task-1')).toBeNull();
    expect(await repository.getTaskProgress('task-1')).toBeNull();
    expect(await repository.getRecentQuestionIds()).toEqual([]);
    expect(await repository.getWrongQuestions()).toEqual([]);
  });
});
