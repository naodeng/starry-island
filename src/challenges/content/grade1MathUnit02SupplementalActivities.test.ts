import { describe, expect, it } from 'vitest';
import { submitAnswer } from '../../learning/answers';
import { grade1MathUnit02SupplementalActivities } from './grade1MathUnit02SupplementalActivities';

const difficulties = ['basic', 'advanced', 'high'] as const;
const coreKnowledgePointIds = ['relative-position', 'reference-point', 'route-sequence'];

describe('一年级上册数学第二单元闯关补充题', () => {
  it('每档提供十四道唯一且可评分的题目', () => {
    expect(grade1MathUnit02SupplementalActivities).toHaveLength(42);
    expect(new Set(grade1MathUnit02SupplementalActivities.map(({ activity }) => activity.id)).size).toBe(42);
    expect(Object.fromEntries(difficulties.map((difficulty) => [
      difficulty,
      grade1MathUnit02SupplementalActivities.filter((item) => item.difficulty === difficulty).length,
    ]))).toEqual({ basic: 14, advanced: 14, high: 14 });

    for (const { activity } of grade1MathUnit02SupplementalActivities) {
      expect(activity.kind).toBe('choice');
      expect(activity.options).toHaveLength(3);
      expect(new Set(activity.options.map(({ label }) => label)).size).toBe(3);
      expect(activity.options.some(({ id }) => id === activity.correctOptionId)).toBe(true);
      expect(submitAnswer(activity, activity.correctOptionId)).toBe(true);
    }
  });

  it('每个难度都覆盖位置关系、参照物和路线顺序', () => {
    for (const difficulty of difficulties) {
      const covered = new Set(grade1MathUnit02SupplementalActivities
        .filter((item) => item.difficulty === difficulty)
        .flatMap(({ knowledgePointIds }) => knowledgePointIds));
      expect(coreKnowledgePointIds.filter((id) => covered.has(id))).toEqual(coreKnowledgePointIds);
    }
  });

  it('消除里外改写歧义和跨难度重复，并让高阶题要求比较或安排多步信息', () => {
    const bySuffix = (suffix: string) => grade1MathUnit02SupplementalActivities.find(({ activity }) => activity.id.endsWith(`-${suffix}`))!;
    const correctLabel = (suffix: string) => {
      const { activity } = bySuffix(suffix);
      return activity.options.find(({ id }) => id === activity.correctOptionId)!.label;
    };
    const advancedInsideOutside = bySuffix('advanced-07').activity;
    const highRouteComparison = bySuffix('high-09').activity;

    expect(advancedInsideOutside.prompt).toContain('交换“球”和“盒子”');
    expect(advancedInsideOutside.prompt).toContain('表示同一个位置事实');
    expect(correctLabel('advanced-07')).toBe('盒子在球外面');
    expect(highRouteComparison.prompt).toContain('路线卡甲');
    expect(highRouteComparison.prompt).toContain('路线卡乙');
    expect(correctLabel('high-09')).toBe('甲，因为第一步是向前到书架。');

    expect(correctLabel('high-05')).toBe('先把第一步改为向前，再把第二步改为向右；小屋是终点');
    expect(correctLabel('high-06')).toBe('先向左到椅子，再向前到书架');
    expect(correctLabel('high-07')).toBe('桌子在左边，书柜在后面');
    expect(correctLabel('high-08')).toBe('甲：门口 → 向左到窗户 → 转回面向教室里面再向前到书架 → 向后回到门口');
    expect(correctLabel('high-13')).toBe('两句话不能同时正确；面对面时，同一张桌子应在一人左边、另一人右边');
  });

  it('基础题不复述题干答案，进阶题需要组合位置关系', () => {
    const bySuffix = (suffix: string) => grade1MathUnit02SupplementalActivities.find(({ activity }) => activity.id.endsWith(`-${suffix}`))!.activity;
    const correctLabel = (suffix: string) => {
      const activity = bySuffix(suffix);
      return activity.options.find(({ id }) => id === activity.correctOptionId)!.label;
    };

    expect(bySuffix('basic-13').prompt).not.toContain(correctLabel('basic-13'));
    expect(bySuffix('advanced-01').prompt).toContain('笔袋在书包里面');
    expect(correctLabel('advanced-01')).toBe('书包里面');
    expect(bySuffix('advanced-02').prompt).toContain('小猫在小兔后面');
    expect(correctLabel('advanced-02')).toBe('小熊排在最前面');
    expect(bySuffix('advanced-11').prompt).toContain('笔袋放在桌子下面');
    expect(correctLabel('advanced-11')).toBe('桌子下面');
  });

  it('高阶题提供足够条件，并要求组合方向、步骤或多条位置关系', () => {
    const bySuffix = (suffix: string) => grade1MathUnit02SupplementalActivities.find(({ activity }) => activity.id.endsWith(`-${suffix}`))!.activity;
    const correctLabel = (suffix: string) => {
      const activity = bySuffix(suffix);
      return activity.options.find(({ id }) => id === activity.correctOptionId)!.label;
    };

    expect(bySuffix('high-01').prompt).toContain('到储物柜后原地向左转');
    expect(correctLabel('high-01')).toBe('门口 → 向右到储物柜 → 左转后向前到窗边');
    expect(bySuffix('high-02').prompt).toContain('每到一站');
    expect(correctLabel('high-02')).toBe('门口 → 向前到书架 → 向左到窗户 → 向右到桌子');
    expect(bySuffix('high-03').prompt).toContain('先到窗户，再到书架');
    expect(bySuffix('high-03').prompt).toContain('门口在她身后');
    expect(correctLabel('high-03')).toBe('先向左到窗户，再向右到书架');
    expect(bySuffix('high-04').prompt).toContain('按这两个关系排出位置顺序');
    expect(correctLabel('high-04')).toBe('从上到下：桌子、椅子、小球；小球在桌子下面');
    expect(bySuffix('high-05').prompt).toContain('同时纠正两步方向');
    expect(correctLabel('high-05')).toContain('第一步改为向前，再把第二步改为向右');
    expect(bySuffix('high-08').prompt).toContain('比较三张路线卡');
    expect(bySuffix('high-08').prompt).toContain('每到一站后都先转回面向教室里面的方向');
    expect(correctLabel('high-08')).toBe('甲：门口 → 向左到窗户 → 转回面向教室里面再向前到书架 → 向后回到门口');
    expect(bySuffix('high-10').prompt).toContain('先转身面向门口，再向右转');
    expect(correctLabel('high-10')).toBe('不对：桌子在右边，书柜在正前方。');
    expect(bySuffix('high-11').prompt).toContain('路线计划是“从门口出发，先向左到书架，再向前到桌子”');
    expect(correctLabel('high-11')).toBe('到书架的第一步方向、到桌子的第二步方向都和计划不一致');
    expect(bySuffix('high-12').prompt).toContain('只知道这些话还不够');
    expect(bySuffix('high-12').prompt).toContain('左右位置不一样');
    expect(correctLabel('high-12')).toBe('需要知道花盆在小猫的左边还是右边');
    expect(bySuffix('high-14').prompt).toContain('最后回到门口');
    expect(correctLabel('high-14')).toBe('门口 → 椅子 → 书架 → 门口');
  });

  it('题干和提示不直接泄露答案', () => {
    for (const { activity } of grade1MathUnit02SupplementalActivities) {
      const correctLabel = activity.options.find(({ id }) => id === activity.correctOptionId)!.label;
      const escapedLabel = correctLabel.replace(/[.*+?^${}()|[\]\\]/gu, '\\$&');
      const directAnswerDisclosure = new RegExp(`(?:答案(?:是|为)|正确答案|应选|应该选择)\\s*${escapedLabel}`, 'u');
      expect(activity.prompt).not.toMatch(directAnswerDisclosure);
      expect(activity.hint).not.toMatch(directAnswerDisclosure);
    }
  });
});
