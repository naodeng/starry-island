import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import type { ActivityDefinition } from '../../content/types';
import type { ChallengeAttempt, ChallengeQuestionSnapshot } from '../domain/types';
import type { LearningTaskReference } from '../domain/studyRecommendations';
import ChallengeResult from './ChallengeResult';

function missedQuestion(): ChallengeQuestionSnapshot {
  const activity: ActivityDefinition = {
    id: 'grade-2/term-1/math/unit-02/basic/task-01/session-01/question-01',
    kind: 'arithmetic',
    prompt: '计算 38 + 27。',
    hint: '个位相加满十要进位。',
    explanation: '个位 8 加 7 得 15，向十位进 1。',
    expression: '38 + 27',
    correctAnswer: 65,
  };
  return {
    questionId: 'challenge-question-1',
    activityId: activity.id,
    difficulty: 'basic',
    knowledgePointIds: ['two-digit-addition'],
    lifecycle: 'active',
    approved: true,
    answerLeakageReviewed: true,
    approvedContentFingerprint: 'approved',
    contentFingerprint: 'current',
    activity,
  };
}

function attempt(): ChallengeAttempt {
  const question = missedQuestion();
  return {
    attemptId: 'attempt-1',
    taskId: 'grade-2-term-1-math-unit-02/basic-01',
    difficulty: 'basic',
    status: 'completed',
    questions: [question],
    assemblySeed: 'seed',
    contentManifestVersion: 'v1',
    answers: { [question.questionId]: 37 },
    currentIndex: 1,
    startedAt: '2026-10-21T00:00:00.000Z',
    elapsedMs: 30000,
    revision: 1,
  };
}

describe('ChallengeResult', () => {
  it('shows weak knowledge points and opens the associated existing learning task', () => {
    const onNavigate = vi.fn();
    const learningTask: LearningTaskReference = {
      unitKey: 'grade-2/term-1/math/unit-02',
      difficulty: 'basic',
      taskId: 'grade-2/term-1/math/unit-02/basic/task-01',
      title: '进位加法能量站',
      activityIds: [missedQuestion().activityId],
      knowledgePointIds: ['two-digit-addition'],
    };

    render(
      <ChallengeResult
        attempt={attempt()}
        result={{ correctCount: 0, totalCount: 1, scorePercent: 0, passed: false, stars: 0, elapsedMs: 30000 }}
        progress={{ taskId: 'task-1', bestCorrect: 0, bestTotal: 1, latestCorrect: 0, latestTotal: 1, completedCount: 1, everPassed: false, updatedAt: '2026-10-21T00:00:30.000Z', revision: 1 }}
        taskTitle="基础闯关"
        learningTasks={[learningTask]}
        onNavigate={onNavigate}
        onBack={vi.fn()}
      />,
    );

    expect(screen.getByRole('heading', { name: '可以再练一练' })).toBeInTheDocument();
    expect(screen.getByText('两位数加法')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: '复习：进位加法能量站' }));
    expect(onNavigate).toHaveBeenCalledWith('/grade-2/term-1/math/unit-02/basic/task-01');
  });
});
