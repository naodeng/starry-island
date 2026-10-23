import { describe, expect, it } from 'vitest';
import type { ActivityDefinition } from '../../content/types';
import type { ChallengeAttempt, ChallengeQuestionSnapshot, TaskProgress } from './types';
import { finalizeAttempt, submitFirstAnswer, AttemptStateError } from './attempt';

function question(index: number, correctAnswer = index): ChallengeQuestionSnapshot {
  const activity: ActivityDefinition = {
    id: `activity-${index}`,
    kind: 'arithmetic',
    prompt: `${index} + 0`,
    hint: 'Use a number line.',
    explanation: `${index} plus zero is ${index}.`,
    expression: `${index} + 0`,
    correctAnswer,
  };
  return {
    questionId: `question-${index}`,
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

function attempt(): ChallengeAttempt {
  return {
    attemptId: 'attempt-1',
    taskId: 'task-1',
    difficulty: 'basic',
    status: 'in-progress',
    questions: [question(1), question(2), question(3)],
    assemblySeed: 'seed',
    contentManifestVersion: 'v1',
    snapshotSchemaVersion: 1,
    answers: {},
    currentIndex: 0,
    startedAt: '2026-01-01T00:00:00.000Z',
    elapsedMs: 10000,
    revision: 0,
  };
}

function savedProgress(overrides: Partial<TaskProgress> = {}): TaskProgress {
  return {
    taskId: 'task-1',
    bestCorrect: 3,
    bestTotal: 3,
    latestCorrect: 2,
    latestTotal: 3,
    completedCount: 2,
    everPassed: true,
    updatedAt: '2026-01-01T00:00:00.000Z',
    revision: 4,
    ...overrides,
  };
}

describe('challenge attempt state machine', () => {
  it('locks a first answer, advances the cursor and revision, and does not mutate input', () => {
    const original = attempt();
    const submitted = submitFirstAnswer(original, 'question-1', 1);

    expect(submitted.correct).toBe(true);
    expect(submitted.attempt).toMatchObject({ currentIndex: 1, revision: 1, answers: { 'question-1': 1 } });
    expect(original).toMatchObject({ currentIndex: 0, revision: 0, answers: {} });
  });

  it('saves wrong first answers and marks them incorrect without exposing hints', () => {
    const submitted = submitFirstAnswer(attempt(), 'question-1', 99);
    expect(submitted).toMatchObject({ correct: false, attempt: { answers: { 'question-1': 99 } } });
  });

  it('accepts only the current question and rejects a second answer to the same question', () => {
    expect(() => submitFirstAnswer(attempt(), 'question-2', 2)).toThrow(AttemptStateError);
    const first = submitFirstAnswer(attempt(), 'question-1', 1).attempt;
    expect(() => submitFirstAnswer(first, 'question-1', 1)).toThrow(AttemptStateError);
    expect(() => submitFirstAnswer(first, 'question-3', 3)).toThrow(AttemptStateError);
  });

  it('rejects submitting against a completed attempt', () => {
    expect(() => submitFirstAnswer({ ...attempt(), status: 'completed' }, 'question-1', 1))
      .toThrow(AttemptStateError);
  });

  it('cannot finalize until every question has one answer', () => {
    expect(() => finalizeAttempt(attempt(), null, '2026-01-01T00:01:00.000Z')).toThrow(AttemptStateError);
  });

  it('finalizes with the last saved revision and produces progress for a first completion', () => {
    let current = attempt();
    current = submitFirstAnswer(current, 'question-1', 1).attempt;
    current = submitFirstAnswer(current, 'question-2', -1).attempt;
    current = submitFirstAnswer(current, 'question-3', 3).attempt;
    const update = finalizeAttempt(current, null, '2026-01-01T00:01:00.000Z');

    expect(update.completedAttempt).toMatchObject({ status: 'completed', revision: 3 });
    expect(update.result).toMatchObject({ correctCount: 2, totalCount: 3, passed: false, elapsedMs: 10000 });
    expect(update.progress).toEqual({
      taskId: 'task-1',
      bestCorrect: 2,
      bestTotal: 3,
      latestCorrect: 2,
      latestTotal: 3,
      completedCount: 1,
      everPassed: false,
      updatedAt: '2026-01-01T00:01:00.000Z',
      revision: 1,
    });
    expect(current.status).toBe('in-progress');
  });

  it('keeps the best ratio and ever-passed flag after a weaker completion', () => {
    let current = attempt();
    current = submitFirstAnswer(current, 'question-1', -1).attempt;
    current = submitFirstAnswer(current, 'question-2', -1).attempt;
    current = submitFirstAnswer(current, 'question-3', -1).attempt;
    const update = finalizeAttempt(current, savedProgress(), '2026-01-02T00:00:00.000Z');

    expect(update.progress).toMatchObject({
      bestCorrect: 3,
      bestTotal: 3,
      latestCorrect: 0,
      latestTotal: 3,
      completedCount: 3,
      everPassed: true,
      revision: 5,
    });
  });

  it('uses the same answers module as learning to grade choice activity submissions', () => {
    const activity: ActivityDefinition = {
      id: 'choice-1',
      kind: 'choice',
      prompt: 'Choose one',
      hint: 'hint',
      explanation: 'explanation',
      options: [{ id: 'a', label: 'A' }, { id: 'b', label: 'B' }],
      correctOptionId: 'b',
    };
    const choiceAttempt = { ...attempt(), questions: [{ ...question(1), activity }] };
    expect(submitFirstAnswer(choiceAttempt, 'question-1', 'b').correct).toBe(true);
    expect(submitFirstAnswer(choiceAttempt, 'question-1', 'a').correct).toBe(false);
  });
});
