import { describe, expect, it } from 'vitest';
import { fingerprintActivity } from './fingerprint';
import { grade1Term2MathUnit05SupplementalActivities } from './grade1Term2MathUnit05SupplementalActivities';

const expectedCorrectLabels = [
  '30 角', '60 分', '4 角', '10 个', '5 角', '1 元 2 角', '1 元', '8 角', '1 元、10 角和 100 分',
  '1 元', '8 角', '7 角', '1 元', '12 角', '10 角', '30 角', '10 分', '4 角', '1 元', '100 分',
  '1 元 4 角', '15 角', '7 角', '1 元比 9 角多 1 角', '14 角', '13 角', '1 元 6 角', '9 角',
  '1 元 5 角', '5 角', '1 角', '8 角', '18 角', '1 元', '10 分', '1 元 7 角', '4 角', '1 角',
  '13 角', '2 角', '1 角', '15 角', '15 角', '8 角 + 5 角 + 7 角 = 20 角',
  '1 元等于 100 分', '1 元 = 10 角 = 100 分', '1 元、5 角和 1 角', '两笔钱一样多', '找零应为 8 角',
  '正好够，一共 15 角', '1 元再加 5 角和 3 个 1 角', '20 角正好是 2 元',
  '3 件：1 张 1 元和 2 枚 1 角', '1 枚 5 角和 1 枚 1 角', '3 角', '不会，金额不变',
  '20 角应换成 200 分', '1 元、5 角和两个 1 角', '还差 1 角', '5 角',
  '5 角 + 5 角，或 10 个 1 角', '1 元 5 角', '5 角', '1 元 = 10 分', '1 元 3 角',
  '15 角', '两个人都对', '1 元是 100 分，5 角是 50 分，合起来 150 分', '3 角',
];

describe('Grade 1 Term 2 Math Unit 5 supplemental challenge activities', () => {
  it('preserves the independently checked answer keys', () => {
    const actualCorrectLabels = grade1Term2MathUnit05SupplementalActivities.map(({ activity }) =>
      activity.options.find(({ id }) => id === activity.correctOptionId)?.label);

    expect(actualCorrectLabels).toEqual(expectedCorrectLabels);
  });

  it('uses unique, complete activities and covers every unit knowledge point at each tier', async () => {
    expect(grade1Term2MathUnit05SupplementalActivities).toHaveLength(69);
    expect(new Set(grade1Term2MathUnit05SupplementalActivities.map(({ activity }) => activity.id)).size).toBe(69);
    expect(new Set(await Promise.all(grade1Term2MathUnit05SupplementalActivities.map(({ activity }) => fingerprintActivity(activity))))
      .size).toBe(69);

    const expectedCounts = { basic: 20, advanced: 24, high: 25 };
    const expectedKnowledgePoints = new Set([
      'currency-denominations',
      'yuan-jiao-fen-conversion',
      'money-composition-and-comparison',
      'money-addition-and-change',
    ]);
    for (const difficulty of ['basic', 'advanced', 'high'] as const) {
      const items = grade1Term2MathUnit05SupplementalActivities.filter((item) => item.difficulty === difficulty);
      expect(items).toHaveLength(expectedCounts[difficulty]);
      expect(new Set(items.flatMap(({ knowledgePointIds }) => knowledgePointIds))).toEqual(expectedKnowledgePoints);

      const normalizedPrompts = items.map(({ activity }) => activity.prompt.replace(/[^\p{L}\p{N}]/gu, ''));
      expect(new Set(normalizedPrompts).size).toBe(items.length);
      for (const { activity, sourceUnitId, knowledgePointIds } of items) {
        expect(sourceUnitId).toBe('grade-1/term-2/math/unit-05');
        expect(activity.options).toHaveLength(3);
        expect(new Set(activity.options.map(({ label }) => label))).toHaveLength(3);
        expect(activity.options.some(({ id }) => id === activity.correctOptionId)).toBe(true);
        expect(activity.prompt).not.toBe('');
        expect(activity.hint).not.toBe('');
        expect(activity.explanation).not.toBe('');
        expect(knowledgePointIds.length).toBeGreaterThan(0);
      }
    }
  });
});
