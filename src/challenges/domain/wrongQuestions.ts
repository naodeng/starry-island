import { submitAnswer } from '../../learning/answers';
import type { ChallengeAnswer, ChallengeQuestionSnapshot, WrongQuestionRecord } from './types';

export function transitionWrongQuestion(
  previous: WrongQuestionRecord | undefined,
  question: ChallengeQuestionSnapshot,
  answer: ChallengeAnswer,
  completedAt: string,
): WrongQuestionRecord | null {
  if (!submitAnswer(question.activity, answer)) {
    return {
      questionId: question.questionId,
      question,
      wrongCount: (previous?.wrongCount ?? 0) + 1,
      lastWrongAt: completedAt,
      correctAttemptStreak: 0,
    };
  }

  if (!previous || previous.correctAttemptStreak >= 2) return previous ?? null;
  const correctAttemptStreak = (previous.correctAttemptStreak + 1) as 1 | 2;
  return {
    ...previous,
    correctAttemptStreak,
    ...(correctAttemptStreak === 2 ? { masteredAt: completedAt } : {}),
  };
}
