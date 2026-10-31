import { describe, expect, it } from 'vitest';
import { fingerprintActivity } from './fingerprint';
import { grade1Term2MathUnit06SupplementalActivities } from './grade1Term2MathUnit06SupplementalActivities';

const expectedCorrectLabels = [
  '46 + 3', '63 本', '53', '73 支', '45 + 4', '70', '50 个', '76', '个位仍是 2，结果是 52', '77',
  '36 个贴纸又得到 5 个', '50', '57', '64 个', '40 厘米', '47 个', '55', '62 - 1', '8 个十', '55',
  '61 张', '4 个十', '30', '77', '45 + 3 = 48；70 - 20 = 50',
  '47 + 20 = 67', '46 个', '35 有 3 个十和 5 个一，再加 4 个一', '52', '87 - 5 = 82',
  '42 + 30 更大，因为它多加了 3 个十', '68', '3 个十，也就是 30', '个位 3 加 4 是 7，结果应为 67',
  '46 + 30 = 76', '5 颗', '34 + 50', '6 个十加 3 个十，合成 9 个十', '前者个位增加 3，后者个位不变',
  '先给十位增加 3 个十，得到 91', '3 张', '44 人',
  '加 1 个一会改变个位，加 1 个十会改变十位', '十位少 5 个十，个位仍是 3',
  '86 有 8 个十和 6 个一，去掉 4 个一还剩 82', '40 + 30 = 70，再加 2 得 72',
  '计算后比较 59 和 77', '70', '90 个', '添 4 个：36 + 4；拿走 20 个：36 - 20',
  '最多 2 个一', '应计算 63 - 4 = 59 人',
  '把 20 看成 2 个十，给 72 增加 2 个十，得 92', '38',
  '增加 30 的结果更大，分别是 49 和 76', '52 - 5 = 47',
  '结果对，但理由不对；应加 3 个十，也就是 30',
  '完整，十位 8 个十不变，个位剩 1',
  '54 + 3 和 77 - 20', '50 + 30 = 80', '第二盒多，因为添了 5 个十而不是 5 个一',
  '76', '90', '前者增加 3 个一，后者增加 2 个十', '53 + 6 = 59',
  '不是；70 + 20 = 90，90 - 20 = 70',
  '先算 58 - 8 = 50，再算 50 + 20 = 70，小雨正确', '29', '61 人',
  '42 + 6 = 48，之后 48 - 20 = 28', '先算 38 + 2 = 40，再算 40 + 40 = 80',
  '90 张', '先增加 3 个一，再拿走 2 个十', '5 个', '56',
];

describe('Grade 1 Term 2 Math Unit 6 supplemental challenge activities', () => {
  it('keeps the independently checked answer keys', () => {
    const actualCorrectLabels = grade1Term2MathUnit06SupplementalActivities.map(({ activity }) =>
      activity.options.find(({ id }) => id === activity.correctOptionId)?.label);

    expect(actualCorrectLabels).toEqual(expectedCorrectLabels);
  });

  it('uses unique complete activities and covers each unit knowledge point at every tier', async () => {
    expect(grade1Term2MathUnit06SupplementalActivities).toHaveLength(75);
    expect(new Set(grade1Term2MathUnit06SupplementalActivities.map(({ activity }) => activity.id)).size).toBe(75);
    expect(new Set(await Promise.all(grade1Term2MathUnit06SupplementalActivities.map(({ activity }) => fingerprintActivity(activity))))
      .size).toBe(75);

    const expectedKnowledgePoints = new Set([
      'two-digit-add-subtract-one',
      'tens-add-subtract',
      'two-digit-add-subtract-tens',
    ]);
    for (const difficulty of ['basic', 'advanced', 'high'] as const) {
      const items = grade1Term2MathUnit06SupplementalActivities.filter((item) => item.difficulty === difficulty);
      expect(items).toHaveLength(25);
      expect(new Set(items.flatMap(({ knowledgePointIds }) => knowledgePointIds))).toEqual(expectedKnowledgePoints);

      const normalizedPrompts = items.map(({ activity }) => activity.prompt.replace(/[^\p{L}\p{N}]/gu, ''));
      expect(new Set(normalizedPrompts).size).toBe(items.length);
      for (const { activity, sourceUnitId, knowledgePointIds } of items) {
        expect(sourceUnitId).toBe('grade-1/term-2/math/unit-06');
        expect(activity.options).toHaveLength(3);
        expect(new Set(activity.options.map(({ label }) => label)).size).toBe(3);
        expect(activity.options.some(({ id }) => id === activity.correctOptionId)).toBe(true);
        expect(activity.prompt).not.toBe('');
        expect(activity.hint).not.toBe('');
        expect(activity.explanation).not.toBe('');
        expect(knowledgePointIds.length).toBeGreaterThan(0);
      }
    }
  });
});
