import { describe, expect, it } from 'vitest';
import { fingerprintActivity } from './fingerprint';
import { grade1Term2MathUnit08SupplementalActivities } from './grade1Term2MathUnit08SupplementalActivities';

const expectedKnowledgePoints = new Set([
  'plane-shape-recognition',
  'subtraction-within-20',
  'classification-standard',
  'number-sequence-to-100',
  'yuan-jiao-fen-conversion',
  'two-digit-add-subtract-one',
  'repeating-shape-patterns',
]);
const allReviewKnowledgePoints = new Set([
  ...expectedKnowledgePoints,
  'plane-shape-features', 'plane-shape-composition',
  'subtraction-strategy', 'inverse-operation-check',
  'classification-recording', 'classification-results', 'classification-checking',
  'two-digit-number-composition', 'number-comparison-to-100', 'tens-and-hundreds',
  'currency-denominations', 'money-composition-and-comparison', 'money-addition-and-change',
  'tens-add-subtract', 'two-digit-add-subtract-tens', 'number-patterns', 'pattern-rule-validation',
]);

describe('Grade 1 Term 2 Math Unit 8 supplemental challenge activities', () => {
  it('assigns relevant knowledge points to representative review questions', () => {
    const expectedKnowledgePointIds = new Map([
      ['basic-05', ['two-digit-number-composition']],
      ['basic-13', ['number-comparison-to-100']],
      ['basic-23', ['number-comparison-to-100']],
      ['advanced-04', ['two-digit-number-composition']],
      ['advanced-08', ['number-sequence-to-100', 'number-comparison-to-100']],
      ['advanced-17', ['number-comparison-to-100', 'tens-and-hundreds']],
      ['high-01', ['plane-shape-recognition', 'plane-shape-features']],
      ['high-04', ['two-digit-number-composition']],
      ['high-15', ['number-comparison-to-100']],
      ['high-21', ['yuan-jiao-fen-conversion', 'money-composition-and-comparison']],
    ]);

    for (const [activitySuffix, expectedIds] of expectedKnowledgePointIds) {
      const activity = grade1Term2MathUnit08SupplementalActivities.find(({ activity: candidate }) =>
        candidate.id.endsWith(`-${activitySuffix}`));
      expect(activity?.knowledgePointIds, activitySuffix).toEqual(expectedIds);
    }
  });

  it('keeps independently checked answer keys for all three tiers', () => {
    const expectedAnswers = {
      basic: [
        '三角形', '都有四条直边', '8', '分颜色记录，再核对两类数量', '4 个十和 6 个一',
        '30 角', '37 个', '圆形', '90', '20 角', '7 个', '2 个', '75', '55', '12',
        '圆形', '12', '5 元', '8 个', '94', '29−3=26', '黄、黄', '40', '7 个', '4 元',
      ],
      advanced: [
        '圆形', '5 个', '4 张', '3 个十和 8 个一', '46 角', '49 个', '25', '26、60、62', '9 个', '5 元',
        '81', '正方形', '三角形有 3 条直边，长方形有 4 条', '合计 7 个', '先减 5 得 10，再减 3 得 7',
        '两种金额一样多', '班级书架本数更多', '36', '15 不符合，应该是 14', '长方形', '35 角', '40',
        '个位不变，结果是 44', '黄色', '1 块',
      ],
      high: [
        '10 条', '还剩 9 个，因为 9+9=18', '逐类重新清点，因为两类记录合计 9 张', '74', '52 角',
        '51 个', '17 应改成 16', '46 改成 44', '9 个', '4 元 5 角', '三角形',
        '合计 10 个，红夹子更多', '4 条', '29+4=33，再用 33−4=29 核对', '86', '2 元 4 角',
        '7+9=16', '8', '62、52', '3', '23 角', '三角形和正方形有直边，圆形没有', '66 人',
        '31 出现 2 次，13 和 30 各出现 1 次', '圆形',
      ],
    } as const;

    for (const difficulty of ['basic', 'advanced', 'high'] as const) {
      const actual = grade1Term2MathUnit08SupplementalActivities
        .filter((item) => item.difficulty === difficulty)
        .map(({ activity }) => activity.options.find(({ id }) => id === activity.correctOptionId)?.label);
      expect(actual).toEqual(expectedAnswers[difficulty]);
    }
  });

  it('has 25 complete, distinct candidates per tier and covers every review target', async () => {
    expect(grade1Term2MathUnit08SupplementalActivities).toHaveLength(75);
    expect(new Set(grade1Term2MathUnit08SupplementalActivities.map(({ activity }) => activity.id)).size).toBe(75);
    expect(new Set(await Promise.all(grade1Term2MathUnit08SupplementalActivities.map(({ activity }) => fingerprintActivity(activity)))).size).toBe(75);

    for (const difficulty of ['basic', 'advanced', 'high'] as const) {
      const items = grade1Term2MathUnit08SupplementalActivities.filter((item) => item.difficulty === difficulty);
      expect(items).toHaveLength(25);
      const taggedKnowledgePoints = new Set(items.flatMap(({ knowledgePointIds }) => knowledgePointIds));
      expect([...expectedKnowledgePoints].every((id) => taggedKnowledgePoints.has(id))).toBe(true);
      expect([...taggedKnowledgePoints].every((id) => allReviewKnowledgePoints.has(id))).toBe(true);

      const normalizedPrompts = items.map(({ activity }) => activity.prompt
        .normalize('NFKC').replace(/\s*\d+(?:\.\d+)?\s*/gu, '#').replace(/\p{P}/gu, '').replace(/\s+/gu, ' ').trim());
      expect(new Set(normalizedPrompts).size).toBe(items.length);
      for (const { activity, sourceUnitId, knowledgePointIds } of items) {
        expect(sourceUnitId).toBe('grade-1/term-2/math/unit-08');
        expect(activity.options).toHaveLength(3);
        expect(new Set(activity.options.map(({ label }) => label)).size).toBe(3);
        expect(activity.options.some(({ id }) => id === activity.correctOptionId)).toBe(true);
        expect(activity.prompt).not.toBe('');
        expect(activity.hint).not.toBe('');
        expect(activity.explanation).not.toBe('');
        expect(knowledgePointIds.length).toBeGreaterThan(0);
        expect(new Set(knowledgePointIds).size).toBe(knowledgePointIds.length);
      }
    }
  });
});
