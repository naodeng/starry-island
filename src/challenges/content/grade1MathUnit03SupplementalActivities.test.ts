import { describe, expect, it } from 'vitest';
import { submitAnswer } from '../../learning/answers';
import { grade1MathUnit03SupplementalActivities } from './grade1MathUnit03SupplementalActivities';

const difficulties = ['basic', 'advanced', 'high'] as const;
const coreKnowledgePointIds = [
  'number-composition-within-five',
  'addition-within-five',
  'subtraction-within-five',
  'comparison-within-five',
  'checking-within-five',
];

describe('一年级上册数学第三单元闯关补充题', () => {
  it('排除原课程跨档重复题后补足每档候选池，并确保补充题唯一且可评分', () => {
    expect(grade1MathUnit03SupplementalActivities).toHaveLength(45);
    expect(new Set(grade1MathUnit03SupplementalActivities.map(({ activity }) => activity.id)).size).toBe(45);
    expect(Object.fromEntries(difficulties.map((difficulty) => [
      difficulty,
      grade1MathUnit03SupplementalActivities.filter((item) => item.difficulty === difficulty).length,
    ]))).toEqual({ basic: 14, advanced: 15, high: 16 });

    for (const { activity, sourceUnitId } of grade1MathUnit03SupplementalActivities) {
      expect(sourceUnitId).toBe('grade-1/term-1/math/unit-03');
      expect(activity.kind).toBe('choice');
      expect(activity.options).toHaveLength(3);
      expect(new Set(activity.options.map(({ label }) => label)).size).toBe(3);
      expect(activity.options.some(({ id }) => id === activity.correctOptionId)).toBe(true);
      expect(submitAnswer(activity, activity.correctOptionId)).toBe(true);
    }
  });

  it('每档都覆盖组成、加减、比较和验算目标', () => {
    for (const difficulty of difficulties) {
      const covered = new Set(grade1MathUnit03SupplementalActivities
        .filter((item) => item.difficulty === difficulty)
        .flatMap(({ knowledgePointIds }) => knowledgePointIds));
      expect(coreKnowledgePointIds.filter((id) => covered.has(id))).toEqual(coreKnowledgePointIds);
    }
  });

  it('关键算式、情境和推理题答案符合 5 以内范围', () => {
    const byId = (id: string) => grade1MathUnit03SupplementalActivities.find(({ activity }) => activity.id.endsWith(id))!.activity;
    const correctLabel = (id: string) => {
      const activity = byId(id);
      return activity.options.find(({ id: optionId }) => optionId === activity.correctOptionId)!.label;
    };

    expect(correctLabel('basic-03')).toBe('1 + 2');
    expect(byId('basic-03').prompt).toContain('哪道算式的得数是 3');
    expect(correctLabel('basic-09')).toBe('2 和 3');
    expect(correctLabel('advanced-04')).toBe('1 + 3 和 2 + 2');
    expect(correctLabel('advanced-06')).toBe('3');
    expect(byId('advanced-06').prompt).toContain('池塘边');
    expect(byId('advanced-10').prompt).toContain('平均分成两组');
    expect(correctLabel('advanced-13')).toBe('3 + 1 和 5 − 1');
    expect(byId('advanced-13').options.map(({ label }) => label)).toEqual([
      '4 − 1 和 1 + 1',
      '3 + 1 和 5 − 1',
      '2 + 1 和 5 − 3',
    ]);
    expect(correctLabel('high-04')).toBe('4');
    expect(byId('high-04').prompt).toContain('□ − 1 = 2 + 1');
    expect(byId('high-05').prompt).toContain('先放进 1 块，再拿出 2 块');
    expect(correctLabel('high-11')).toBe('3，因为 3 + 2 = 5');
    expect(byId('high-11').prompt).toContain('5 − 2 = 4');
    expect(byId('high-12').prompt).toContain('小红原来有 3 朵花');
  });

  it('题干和提示不直接泄露选择答案', () => {
    for (const { activity } of grade1MathUnit03SupplementalActivities) {
      const correctLabel = activity.options.find(({ id }) => id === activity.correctOptionId)!.label;
      const escapedLabel = correctLabel.replace(/[.*+?^${}()|[\]\\]/gu, '\\$&');
      const directAnswerDisclosure = new RegExp(`(?:答案(?:是|为)|正确答案|应选|应该选择)\\s*${escapedLabel}`, 'u');
      expect(activity.prompt).not.toMatch(directAnswerDisclosure);
      expect(activity.hint).not.toMatch(directAnswerDisclosure);
    }
  });
});
