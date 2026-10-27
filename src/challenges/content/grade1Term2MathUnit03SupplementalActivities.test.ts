import { describe, expect, it } from 'vitest';
import { fingerprintActivity } from './fingerprint';
import { grade1Term2MathUnit03SupplementalActivities } from './grade1Term2MathUnit03SupplementalActivities';

const expectedCorrectLabels = [
  '按物品的用途分成学习用品和玩具', '看物品的颜色', '按物品的用途分组',
  '给每张卡片做一个记号，数过的卡片放到一边', '红色3块，蓝色4块，共7块', '少了1块',
  '把每盒彩笔只数一次，再分别记录', '把苹果按大小分组', '4枚', '蓝色组多1块', '每件物品只放进一个组',
  '先按颜色分类，再分别数两组', '三角形2个，圆形3个，共5个', '少数了1本',
  '在每个组名旁分别记录数量', '小积木组',
  '按是否带轮子分类', '把每只动物只数一次，并记在对应的一组', '猫2只，狗3只，共5只',
  '蓝色书签多1枚', '把所有杯子按颜色分组后分别清点', '苹果4个，梨3个，共7个',
  '把每个图形只记录一次，再核对总数', '1个', '黄色4张，绿色5张，共9张', '玩具车组多2辆',
  '每个瓶子只能按一种饮料记录，不能重复算', '两组数量相加应等于全部积木数', '明确按颜色比较，再把卡片分组记录', '红色3辆，蓝色4辆，共7辆',
  '重新清点并补记漏掉的1支铅笔', '蓝色最少，有2颗', '按物品类别分成文具和书本，再分别计数',
  '按同一标准重新分组，再逐组清点并核对总数', '可能少数或漏记了1只',
  '红色3张、蓝色4张、黄色2张，共9张', '逐张核对颜色和所在组，再重新计数',
  '圆形和三角形', '蓝色图书少1本', '先确定分类标准，再逐件检查放置是否正确',
  '小猫3只、小狗2只，共5只；小猫多1只', '有1张卡片被重复记录', '两组数量相加是8，与总数相同',
  '蓝色比红色多1个', '每只小动物只能记录一次',
  '2个', '把所有物品按同一标准分组后，再分别计数', '总数应是7朵', '少记录了1块',
  '先检查是否有物品漏记或重复记录', '贴纸总数比记录多1张', '先找出分类标准，再逐项检查记录',
  '重新数每种颜色，并检查有没有漏放或重复', '分类数量之和应与物品总数一致',
  '记录比实际多1件', '还少记录1块', '逐件检查颜色和记录组别，总数相同也可能分错',
  '共9只，小猫比小狗多1只', '总数相同不能发现错分，要逐件检查',
  '红色比黄色多2件，蓝色和黄色共5件', '把红色组和其他组的数量分别记下来',
];

describe('Grade 1 Term 2 Math Unit 3 supplemental challenge activities', () => {
  it('preserves all independently checked answer keys', () => {
    const actualCorrectLabels = grade1Term2MathUnit03SupplementalActivities.map(({ activity }) =>
      activity.options.find(({ id }) => id === activity.correctOptionId)?.label);

    expect(actualCorrectLabels).toEqual(expectedCorrectLabels);
  });

  it('covers the three challenge tiers with distinct, complete choice activities', async () => {
    expect(grade1Term2MathUnit03SupplementalActivities).toHaveLength(61);
    expect(new Set(grade1Term2MathUnit03SupplementalActivities.map(({ activity }) => activity.id)).size).toBe(61);
    expect(new Set(await Promise.all(grade1Term2MathUnit03SupplementalActivities.map(({ activity }) => fingerprintActivity(activity))))
      .size).toBe(61);

    for (const difficulty of ['basic', 'advanced', 'high'] as const) {
      const items = grade1Term2MathUnit03SupplementalActivities.filter((item) => item.difficulty === difficulty);
      const expectedCount = difficulty === 'basic' ? 16 : difficulty === 'advanced' ? 22 : 23;
      expect(items).toHaveLength(expectedCount);
      const answerPositions = [0, 0, 0];
      const normalizedPrompts = items.map(({ activity }) => activity.prompt.replace(/[^\p{L}\p{N}]/gu, ''));
      expect(new Set(normalizedPrompts).size).toBe(expectedCount);

      for (const { activity, sourceUnitId, knowledgePointIds } of items) {
        expect(sourceUnitId).toBe('grade-1/term-2/math/unit-03');
        expect(activity.options).toHaveLength(3);
        expect(new Set(activity.options.map(({ label }) => label)).size).toBe(3);
        expect(activity.options.some(({ id }) => id === activity.correctOptionId)).toBe(true);
        expect(activity.prompt).not.toBe('');
        expect(activity.hint).not.toBe('');
        expect(activity.explanation).not.toBe('');
        expect(knowledgePointIds.length).toBeGreaterThan(0);
        const answerPosition = activity.options.findIndex(({ id }) => id === activity.correctOptionId);
        answerPositions[answerPosition] = (answerPositions[answerPosition] ?? 0) + 1;
      }

      expect([...answerPositions].sort()).toEqual(difficulty === 'basic' ? [5, 5, 6] : difficulty === 'advanced' ? [7, 7, 8] : [7, 8, 8]);
    }
  });

  it('keeps the agreed classification and recording concepts represented in each tier', () => {
    for (const difficulty of ['basic', 'advanced', 'high'] as const) {
      const knowledgePointIds = new Set(grade1Term2MathUnit03SupplementalActivities
        .filter((item) => item.difficulty === difficulty)
        .flatMap(({ knowledgePointIds: ids }) => ids));
      expect(knowledgePointIds).toEqual(new Set([
        'classification-standard',
        'classification-recording',
        'classification-results',
        'classification-checking',
      ]));
    }
  });
});
