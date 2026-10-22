import { describe, expect, it } from 'vitest';
import type { ActivityDefinition } from '../../content/types';
import type { ChallengeQuestionSnapshot, WrongQuestionRecord } from './types';
import { transitionWrongQuestion } from './wrongQuestions';

function question(questionId = 'question-1'): ChallengeQuestionSnapshot {
  const activity: ActivityDefinition = {
    id: `activity-${questionId}`,
    kind: 'arithmetic',
    prompt: '2 + 3',
    hint: '数一数',
    explanation: '2 加 3 等于 5。',
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

describe('wrong question transitions', () => {
  it('records a first wrong answer with a frozen question snapshot', () => {
    const snapshot = question();

    expect(transitionWrongQuestion(undefined, snapshot, 4, '2026-01-01T00:00:00.000Z')).toEqual({
      questionId: snapshot.questionId,
      question: snapshot,
      wrongCount: 1,
      lastWrongAt: '2026-01-01T00:00:00.000Z',
      correctAttemptStreak: 0,
    });
  });

  it('requires two separate correct completions and resets mastery after a later wrong answer', () => {
    const original = question();
    const firstWrong = transitionWrongQuestion(undefined, original, 4, '2026-01-01T00:00:00.000Z')!;

    const firstCorrect = transitionWrongQuestion(firstWrong, original, 5, '2026-01-02T00:00:00.000Z')!;
    expect(firstCorrect.correctAttemptStreak).toBe(1);
    expect(firstCorrect.lastCorrectAt).toBe('2026-01-02T00:00:00.000Z');
    expect(firstCorrect.masteredAt).toBeUndefined();

    const secondCorrect = transitionWrongQuestion(firstCorrect, original, 5, '2026-01-03T00:00:00.000Z')!;
    expect(secondCorrect.correctAttemptStreak).toBe(2);
    expect(secondCorrect.masteredAt).toBe('2026-01-03T00:00:00.000Z');

    const revisedQuestion = question();
    revisedQuestion.activity = { ...revisedQuestion.activity, explanation: '新的讲解。' };
    const wrongAgain = transitionWrongQuestion(secondCorrect, revisedQuestion, 0, '2026-01-04T00:00:00.000Z')!;
    expect(wrongAgain).toMatchObject({
      question: revisedQuestion,
      wrongCount: 2,
      lastWrongAt: '2026-01-04T00:00:00.000Z',
      correctAttemptStreak: 0,
    });
    expect(wrongAgain).not.toHaveProperty('lastCorrectAt');
    expect(wrongAgain.masteredAt).toBeUndefined();
  });

  it('does not create a notebook entry for a correct answer never previously missed', () => {
    expect(transitionWrongQuestion(undefined, question(), 5, '2026-01-01T00:00:00.000Z')).toBeNull();
  });

  it('does not count additional correct completions beyond mastery', () => {
    const firstWrong = transitionWrongQuestion(undefined, question(), 4, '2026-01-01T00:00:00.000Z');
    const afterFirstCorrect = transitionWrongQuestion(firstWrong ?? undefined, question(), 5, '2026-01-02T00:00:00.000Z');
    const mastered: WrongQuestionRecord = {
      ...afterFirstCorrect!,
      correctAttemptStreak: 2,
      masteredAt: '2026-01-03T00:00:00.000Z',
    };

    expect(transitionWrongQuestion(mastered, question(), 5, '2026-01-04T00:00:00.000Z')).toEqual(mastered);
  });
});
