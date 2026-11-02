import { describe, expect, it } from 'vitest';
import type { ActivityDefinition } from '../../content/types';
import type { ChallengeQuestionSnapshot } from './types';
import { getStudyRecommendations } from './studyRecommendations';
import type { LearningTaskReference } from './studyRecommendations';

function wrongQuestion(questionId: string, activityId: string, knowledgePointIds: string[]): ChallengeQuestionSnapshot {
  const activity: ActivityDefinition = {
    id: activityId,
    kind: 'arithmetic',
    prompt: `${questionId} 计算题`,
    hint: '按数位计算。',
    explanation: '按数位计算并检查结果。',
    expression: '23 + 14',
    correctAnswer: 37,
  };
  return {
    questionId,
    activityId,
    difficulty: 'basic',
    knowledgePointIds,
    lifecycle: 'active',
    approved: true,
    answerLeakageReviewed: true,
    approvedContentFingerprint: 'fingerprint',
    contentFingerprint: 'fingerprint',
    activity,
  };
}

function learningTask(overrides: Partial<LearningTaskReference> = {}): LearningTaskReference {
  return {
    unitKey: 'grade-2/term-1/math/unit-02',
    difficulty: 'basic',
    taskId: 'grade-2/term-1/math/unit-02/basic/task-01',
    title: '进位加法能量站',
    activityIds: [],
    knowledgePointIds: ['two-digit-addition'],
    ...overrides,
  };
}

describe('challenge study recommendations', () => {
  it('summarizes incorrect answers by Chinese knowledge point and sorts by frequency', () => {
    const recommendations = getStudyRecommendations([
      wrongQuestion('q1', 'supplement-1', ['two-digit-addition']),
      wrongQuestion('q2', 'supplement-2', ['two-digit-addition', 'two-digit-subtraction']),
      wrongQuestion('q3', 'supplement-3', ['two-digit-subtraction']),
    ], []);

    expect(recommendations).toEqual([
      expect.objectContaining({ knowledgePointId: 'two-digit-addition', title: '两位数加法', incorrectCount: 2 }),
      expect.objectContaining({ knowledgePointId: 'two-digit-subtraction', title: '两位数减法', incorrectCount: 2 }),
    ]);
  });

  it('links a missed source activity to its exact existing learning task', () => {
    const exactTask = learningTask({
      taskId: 'grade-2/term-1/math/unit-02/advanced/task-02',
      title: '加减混合与数量关系',
      activityIds: ['source-activity'],
      knowledgePointIds: ['two-digit-addition', 'two-digit-subtraction'],
    });
    const recommendations = getStudyRecommendations(
      [wrongQuestion('q1', 'source-activity', ['two-digit-addition'])],
      [learningTask(), exactTask],
    );

    expect(recommendations[0]?.learningTask).toEqual(exactTask);
  });

  it('uses Chinese labels for Grade 3 English knowledge points', () => {
    const recommendations = getStudyRecommendations([
      wrongQuestion('q1', 'english-name', ['name-and-self-introduction']),
      wrongQuestion('q2', 'english-age', ['age-and-class']),
    ], []);

    expect(recommendations.map(({ title }) => title)).toEqual(['姓名与自我介绍', '年龄与班级']);
  });

  it('uses the most focused existing task for challenge-only questions', () => {
    const focusedTask = learningTask();
    const mixedTask = learningTask({
      difficulty: 'advanced',
      taskId: 'grade-2/term-1/math/unit-02/advanced/task-01',
      title: '加减混合与数量关系',
      knowledgePointIds: ['two-digit-addition', 'two-digit-subtraction'],
    });

    const recommendations = getStudyRecommendations(
      [wrongQuestion('q1', 'challenge-only-activity', ['two-digit-addition'])],
      [mixedTask, focusedTask],
    );

    expect(recommendations[0]?.learningTask).toEqual(focusedTask);
  });
});
