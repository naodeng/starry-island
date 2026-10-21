import { submitAnswer } from '../../learning/answers';
import type { ChallengeAnswer, ChallengeAttempt, ChallengeResult, CompletionUpdate, TaskProgress } from './types';
import { gradeAttempt } from './grading';

export class AttemptStateError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AttemptStateError';
  }
}

function cloneAnswer(answer: ChallengeAnswer): ChallengeAnswer {
  if (Array.isArray(answer)) return [...answer];
  if (typeof answer === 'object' && answer !== null) return { ...answer };
  return answer;
}

function requireInProgress(attempt: ChallengeAttempt): void {
  if (attempt.status !== 'in-progress') throw new AttemptStateError('Only an in-progress attempt accepts answers.');
  if (!Number.isInteger(attempt.currentIndex) || attempt.currentIndex < 0 || attempt.currentIndex >= attempt.questions.length) {
    throw new AttemptStateError('The attempt has no current unanswered question.');
  }
  if (new Set(attempt.questions.map(({ questionId }) => questionId)).size !== attempt.questions.length) {
    throw new AttemptStateError('Question IDs in the attempt must be unique.');
  }
}

export function submitFirstAnswer(
  attempt: ChallengeAttempt,
  questionId: string,
  answer: ChallengeAnswer,
): { attempt: ChallengeAttempt; correct: boolean } {
  requireInProgress(attempt);
  const currentQuestion = attempt.questions[attempt.currentIndex];
  if (!currentQuestion || currentQuestion.questionId !== questionId) {
    throw new AttemptStateError('Answers must be submitted for the current question.');
  }
  if (Object.prototype.hasOwnProperty.call(attempt.answers, questionId)) {
    throw new AttemptStateError('A first answer has already been recorded for this question.');
  }

  const nextAttempt: ChallengeAttempt = {
    ...attempt,
    answers: { ...attempt.answers, [questionId]: cloneAnswer(answer) },
    currentIndex: attempt.currentIndex + 1,
    revision: attempt.revision + 1,
  };
  return { attempt: nextAttempt, correct: submitAnswer(currentQuestion.activity, answer) };
}

function passedProgress(
  taskId: string,
  result: ChallengeResult,
  progress: TaskProgress | null,
  completedAt: string,
): TaskProgress {
  if (progress && progress.taskId !== taskId) throw new AttemptStateError('Progress belongs to a different task.');
  const hasPreviousBest = progress !== null && progress.bestTotal > 0;
  const improvesBest = !hasPreviousBest
    || result.correctCount * progress.bestTotal > progress.bestCorrect * result.totalCount;

  return {
    taskId,
    bestCorrect: improvesBest ? result.correctCount : progress.bestCorrect,
    bestTotal: improvesBest ? result.totalCount : progress.bestTotal,
    latestCorrect: result.correctCount,
    latestTotal: result.totalCount,
    completedCount: (progress?.completedCount ?? 0) + 1,
    everPassed: Boolean(progress?.everPassed || result.passed),
    updatedAt: completedAt,
    revision: (progress?.revision ?? 0) + 1,
  };
}

export function finalizeAttempt(
  attempt: ChallengeAttempt,
  progress: TaskProgress | null,
  completedAt: string,
): CompletionUpdate {
  if (attempt.status !== 'in-progress') throw new AttemptStateError('Only an in-progress attempt can be completed.');
  if (attempt.questions.length === 0 || attempt.currentIndex !== attempt.questions.length) {
    throw new AttemptStateError('Every question must have a saved first answer before completion.');
  }
  const questionIds = attempt.questions.map(({ questionId }) => questionId);
  if (new Set(questionIds).size !== questionIds.length
    || questionIds.some((questionId) => !Object.prototype.hasOwnProperty.call(attempt.answers, questionId))
    || Object.keys(attempt.answers).some((questionId) => !questionIds.includes(questionId))) {
    throw new AttemptStateError('The attempt must contain exactly one saved answer per question.');
  }
  if (!Number.isFinite(Date.parse(completedAt))) throw new RangeError('completedAt must be a valid date string.');

  const correctCount = attempt.questions.reduce((count, question) => (
    count + Number(submitAnswer(question.activity, attempt.answers[question.questionId]))
  ), 0);
  const result = gradeAttempt(attempt.difficulty, correctCount, attempt.questions.length, attempt.elapsedMs);
  const completedAttempt: ChallengeAttempt = { ...attempt, status: 'completed' };

  return {
    completedAttempt,
    result,
    progress: passedProgress(attempt.taskId, result, progress, completedAt),
  };
}
