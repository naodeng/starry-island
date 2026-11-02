import { describe, expect, it } from 'vitest';
import type { ActivityDefinition } from '../../content/types';
import type { ChallengeQuestionRecord } from '../domain/types';
import { analyzeQuestionUniqueness } from './questionUniqueness';

const UNIT_ID = 'grade-2/term-1/math/unit-01';

function makeQuestion(questionId: string, activityId: string): ChallengeQuestionRecord {
  return {
    questionId,
    activityId,
    difficulty: 'basic',
    knowledgePointIds: ['length-units'],
    lifecycle: 'active',
    approved: true,
    answerLeakageReviewed: true,
    approvedContentFingerprint: 'approval-fingerprint',
    approvedBy: 'fixture-author',
    approvedAt: '2026-10-21T00:00:00.000Z',
  };
}

function makeChoice(activityId: string, prompt: string): ActivityDefinition {
  return {
    id: activityId,
    kind: 'choice',
    prompt,
    hint: '想一想。',
    explanation: '根据条件计算。',
    options: [{ id: 'yes', label: '是' }, { id: 'no', label: '不是' }],
    correctOptionId: 'yes',
  };
}

describe('analyzeQuestionUniqueness', () => {
  it('selects the same canonical representative regardless of input order', async () => {
    const questions = [makeQuestion('z-question', 'activity-z'), makeQuestion('a-question', 'activity-a')];
    const activitiesById = new Map([
      ['activity-z', makeChoice('activity-z', '哪个单位适合测量铅笔？')],
      ['activity-a', makeChoice('activity-a', '哪个单位适合测量铅笔？')],
    ]);
    const sourceUnitByActivityId = new Map([['activity-z', UNIT_ID], ['activity-a', UNIT_ID]]);

    const first = await analyzeQuestionUniqueness(questions, activitiesById, sourceUnitByActivityId);
    const reversed = await analyzeQuestionUniqueness([...questions].reverse(), activitiesById, sourceUnitByActivityId);

    expect(first).toEqual(reversed);
    expect(first.exactDuplicateGroups).toHaveLength(1);
    expect(first.exactDuplicateGroups[0]).toEqual(expect.objectContaining({
      representativeQuestionId: 'a-question',
      questionIds: ['a-question', 'z-question'],
    }));
  });

  it('hints only for normalized numeric templates in the same unit and activity kind', async () => {
    const questions = [
      makeQuestion('question-a', 'activity-a'),
      makeQuestion('question-b', 'activity-b'),
      makeQuestion('question-other-unit', 'activity-other-unit'),
      makeQuestion('question-other-kind', 'activity-other-kind'),
    ];
    const activitiesById = new Map<string, ActivityDefinition>([
      ['activity-a', makeChoice('activity-a', '小明有12支铅笔，送给同学3支。')],
      ['activity-b', makeChoice('activity-b', '小明有 ３０ 支铅笔，送给同学 ５ 支！')],
      ['activity-other-unit', makeChoice('activity-other-unit', '小明有40支铅笔，送给同学6支。')],
      ['activity-other-kind', {
        id: 'activity-other-kind',
        kind: 'arithmetic',
        prompt: '小明有50支铅笔，送给同学7支。',
        hint: '想一想。',
        explanation: '根据条件计算。',
        expression: '50 - 7',
        correctAnswer: 43,
      }],
    ]);
    const sourceUnitByActivityId = new Map([
      ['activity-a', UNIT_ID],
      ['activity-b', UNIT_ID],
      ['activity-other-unit', 'grade-2/term-1/math/unit-02'],
      ['activity-other-kind', UNIT_ID],
    ]);

    const report = await analyzeQuestionUniqueness(questions, activitiesById, sourceUnitByActivityId);

    expect(report.similarQuestionPairs).toHaveLength(1);
    expect(report.similarQuestionPairs[0]).toEqual(expect.objectContaining({
      questionIds: ['question-a', 'question-b'],
      sourceUnitId: UNIT_ID,
      activityKind: 'choice',
    }));
    expect(JSON.stringify(report)).not.toContain('小明有');
  });

  it('detects duplicate categorize questions even when nested identifiers differ', async () => {
    const questions = [
      makeQuestion('question-a', 'activity-a'),
      makeQuestion('question-b', 'activity-b'),
    ];
    const activitiesById = new Map<string, ActivityDefinition>([
      ['activity-a', {
        id: 'activity-a',
        kind: 'categorize',
        prompt: '按水果分类，orange 应放在哪组？',
        hint: '先回忆词义。',
        explanation: 'orange 是橙子，属于其他水果。',
        categories: [{ id: 'a-fruit', label: '其他水果' }, { id: 'a-apple', label: '苹果' }],
        items: [{ id: 'a-item-orange', label: 'orange', categoryId: 'a-fruit' }],
      }],
      ['activity-b', {
        id: 'activity-b',
        kind: 'categorize',
        prompt: '按水果分类，orange 应放在哪组？',
        hint: '想一想水果词。',
        explanation: 'orange 表示橙子。',
        categories: [{ id: 'b-apple', label: '苹果' }, { id: 'b-fruit', label: '其他水果' }],
        items: [{ id: 'b-item-orange', label: 'orange', categoryId: 'b-fruit' }],
      }],
    ]);
    const sourceUnitByActivityId = new Map([['activity-a', UNIT_ID], ['activity-b', UNIT_ID]]);

    const report = await analyzeQuestionUniqueness(questions, activitiesById, sourceUnitByActivityId);

    expect(report.exactDuplicateGroups).toHaveLength(0);
    expect(report.similarQuestionPairs).toHaveLength(1);
    expect(report.similarQuestionPairs[0]).toEqual(expect.objectContaining({
      questionIds: ['question-a', 'question-b'],
      reason: '交互内容与答案结构相同，但嵌套标识不同；建议人工确认是否为重复题。',
    }));
  });
});
