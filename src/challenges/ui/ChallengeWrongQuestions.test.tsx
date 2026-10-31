import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import type { ActivityDefinition } from '../../content/types';
import type { WrongQuestionRecord } from '../domain/types';
import ChallengeWrongQuestions from './ChallengeWrongQuestions';

function record(questionId: string, correctAttemptStreak: 0 | 1 | 2): WrongQuestionRecord {
  const activity: ActivityDefinition = {
    id: `activity-${questionId}`,
    kind: 'arithmetic',
    prompt: `${questionId}: 2 + 3`,
    hint: '数一数',
    explanation: '2 加 3 等于 5。',
    expression: '2 + 3',
    correctAnswer: 5,
  };
  const question = {
    questionId,
    activityId: activity.id,
    difficulty: 'basic' as const,
    knowledgePointIds: ['addition'],
    lifecycle: 'active' as const,
    approved: true,
    answerLeakageReviewed: true,
    approvedContentFingerprint: 'approved',
    contentFingerprint: 'current',
    activity,
  };
  return {
    questionId,
    question,
    wrongCount: 1,
    lastWrongAt: '2026-01-01T00:00:00.000Z',
    correctAttemptStreak,
    ...(correctAttemptStreak === 2 ? { masteredAt: '2026-01-03T00:00:00.000Z' } : {}),
  };
}

describe('ChallengeWrongQuestions', () => {
  it('shows saved question guidance and can filter mastered questions', () => {
    const onNavigate = vi.fn();
    render(<ChallengeWrongQuestions records={[record('learning-question', 1), record('mastered-question', 2)]} onNavigate={onNavigate} />);

    expect(screen.getByRole('heading', { name: 'learning-question: 2 + 3' })).toBeInTheDocument();
    const learningQuestion = screen.getByRole('heading', { name: 'learning-question: 2 + 3' }).closest('li');
    expect(learningQuestion).toHaveTextContent('参考答案：5');
    expect(learningQuestion).toHaveTextContent('解题说明：2 加 3 等于 5。');
    expect(screen.getByText('连续答对 1/2 次')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: '已掌握' }));
    expect(screen.getByRole('heading', { name: 'mastered-question: 2 + 3' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'learning-question: 2 + 3' })).not.toBeInTheDocument();
  });

  it('shows an empty state and returns to the challenge center', () => {
    const onNavigate = vi.fn();
    render(<ChallengeWrongQuestions records={[]} onNavigate={onNavigate} />);

    expect(screen.getByRole('status')).toHaveTextContent('错题本还是空的');
    expect(screen.getByRole('status')).toHaveTextContent('完成挑战后，答错的题会出现在这里；答对两次后会标记为已掌握。');
    fireEvent.click(screen.getByRole('button', { name: '返回闯关中心' }));
    expect(onNavigate).toHaveBeenCalledWith('/challenges');
  });

  it('explainsWhenTheSelectedWrongQuestionCategoryHasNoRecords', () => {
    render(<ChallengeWrongQuestions records={[record('mastered-question', 2)]} onNavigate={vi.fn()} />);

    fireEvent.click(screen.getByRole('button', { name: '待掌握' }));

    expect(screen.getByRole('status')).toHaveTextContent('这个分类暂时没有题目');
    expect(screen.getByRole('status')).toHaveTextContent('试试切换到“全部”或其他分类。');
  });
});
