import { afterEach, describe, expect, it } from 'vitest';
import { IDBFactory } from 'fake-indexeddb';
import type { ActivityDefinition } from '../../content/types';
import { finalizeAttempt, submitFirstAnswer } from '../domain/attempt';
import type { ChallengeAttempt, ChallengeQuestionSnapshot, TaskProgress } from '../domain/types';
import { ActiveAttemptExistsError, InvalidAttemptTransitionError, RevisionConflictError } from './repository';
import { createChallengeRepository } from './indexedDbRepository';

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
    const finished = await (async () => {
      let current = initial;
      for (const item of initial.questions) {
        const answer = (item.activity as Extract<ActivityDefinition, { kind: 'arithmetic' }>).correctAnswer;
        current = await repository.saveAnswer(current.taskId, current.revision, submitFirstAnswer(current, item.questionId, answer).attempt);
      }
      return current;
    })();
    const update = finalizeAttempt(finished, null, '2026-01-01T00:02:00.000Z');
    const invalidProgress = Object.assign({}, update.progress, { invalid: Symbol('not-cloneable') }) as TaskProgress;

    await expect(repository.completeAttempt('task-1', finished.revision, update.completedAttempt, invalidProgress))
      .rejects.toBeDefined();
    expect(await repository.getActiveAttempt('task-1')).toEqual(finished);
    expect(await repository.getTaskProgress('task-1')).toBeNull();
    expect(await repository.getRecentQuestionIds()).toEqual([]);
  });

  it('discards without changing completion progress', async () => {
    const repository = createRepository();
    const attempt = makeAttempt();
    await repository.beginAttempt(attempt);
    await repository.discardAttempt('task-1', 0);
    expect(await repository.getActiveAttempt('task-1')).toBeNull();
    expect(await repository.getTaskProgress('task-1')).toBeNull();
    expect(await repository.getRecentQuestionIds()).toEqual([]);
  });
});
