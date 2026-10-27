import { describe, expect, it } from 'vitest';
import { fingerprintActivity } from './fingerprint';
import { grade1Term2MathUnit07SupplementalActivities } from './grade1Term2MathUnit07SupplementalActivities';

const expectedCorrectLabels = {
  basic: [
    '18', '红色', '14', '○', '12', '圆形', '9、8、7', '白色', '3', '8、9、10',
    '星星', '14', '6 比 4 多 2，8 比 6 多 2', '三角形', '16', '每组先黄，再连续两个绿',
    '13', '正方形', '15', '20 个', '月亮', '2、4、7', '10',
    '看每个正方形后面是不是圆形，每个圆形后面是不是正方形', '绿色',
  ],
  advanced: [
    '18', '红圆', '分别算 11−7、15−11、19−15，结果都是 4', '10', '红、蓝', '20', '三角形',
    '20；每次增加 4', '2、5、8、11', '白色', '不对；相邻两项每次增加 4', '14',
    '圆形', '4、9、14、19', '绿星', '24、20', '连续三次相邻两项的差都是 4', '蓝色',
    '24', '最后一步增加了 5，19 应改为 18', '圆形', '23',
    '四个数之间的每一对相邻差都等于 4', '圆形', '15',
  ],
  high: [
    '第四项改成 18，因为 9、12、15、18', '6', '第八项应是正方形，不应是圆形',
    '多了 1；下一项应为 28', '10', '把 20 改成 19', '黄色',
    '逐对比较已写出的相邻项，并按每次加 4 检查应有项', '三角形', '32',
    '不符合增加 4；相邻数每次减少 4', '蓝色', '23 是错项，应改为 22', '18、12',
    '星形', '38', '17−11=6，23−17=6，29−23=6', '红色', '把 24 改成 23',
    '三角形', '末项应是 28；29 比应有的数多 1', '31', '第七项改成三角形', '29', '18',
  ],
} as const;

describe('Grade 1 Term 2 Math Unit 7 supplemental challenge activities', () => {
  it('keeps the independently checked answer keys for all three tiers', () => {
    for (const difficulty of ['basic', 'advanced', 'high'] as const) {
      const actual = grade1Term2MathUnit07SupplementalActivities
        .filter((item) => item.difficulty === difficulty)
        .map(({ activity }) => activity.options.find(({ id }) => id === activity.correctOptionId)?.label);
      expect(actual).toEqual(expectedCorrectLabels[difficulty]);
    }
  });

  it('has 25 complete, distinct candidates per tier and covers every knowledge point', async () => {
    expect(grade1Term2MathUnit07SupplementalActivities).toHaveLength(75);
    expect(new Set(grade1Term2MathUnit07SupplementalActivities.map(({ activity }) => activity.id)).size).toBe(75);
    expect(new Set(await Promise.all(grade1Term2MathUnit07SupplementalActivities.map(({ activity }) => fingerprintActivity(activity)))).size).toBe(75);

    const expectedKnowledgePoints = new Set(['repeating-shape-patterns', 'number-patterns', 'pattern-rule-validation']);
    for (const difficulty of ['basic', 'advanced', 'high'] as const) {
      const items = grade1Term2MathUnit07SupplementalActivities.filter((item) => item.difficulty === difficulty);
      expect(items).toHaveLength(25);
      expect(new Set(items.flatMap(({ knowledgePointIds }) => knowledgePointIds))).toEqual(expectedKnowledgePoints);

      const normalizedPrompts = items.map(({ activity }) => activity.prompt
        .normalize('NFKC').replace(/\s*\d+(?:\.\d+)?\s*/gu, '#').replace(/\p{P}/gu, '').replace(/\s+/gu, ' ').trim());
      expect(new Set(normalizedPrompts).size).toBe(items.length);
      for (const { activity, sourceUnitId, knowledgePointIds } of items) {
        expect(sourceUnitId).toBe('grade-1/term-2/math/unit-07');
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
