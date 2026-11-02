import { describe, expect, it } from 'vitest';
import { loadUnit } from '../../content/unitLoader';
import { submitAnswer } from '../../learning/answers';
import { grade1MathUnit09SupplementalActivities } from './grade1MathUnit09SupplementalActivities';

const difficulties = ['basic', 'advanced', 'high'] as const;
const coreKnowledgePointIds = [
  'addition-within-twenty',
  'number-sequence-eleven-to-twenty',
  'comparison-within-ten',
  'number-comparison-eleven-to-twenty',
  'subtraction-within-ten',
  'relative-position',
  'solid-shape-recognition',
  'solid-shape-features',
  'solid-shape-use',
  'clock-whole-hour-reading',
];

function normalizePrompt(prompt: string): string {
  return prompt.normalize('NFKC').replace(/[\s\p{P}\p{S}]/gu, '');
}

describe('一年级上册数学第九单元闯关补充题', () => {
  it('按难度补足有效题池到 30 道，且每题答案通过生产评分器', () => {
    expect(grade1MathUnit09SupplementalActivities).toHaveLength(50);
    expect(new Set(grade1MathUnit09SupplementalActivities.map(({ activity }) => activity.id)).size).toBe(50);
    expect(Object.fromEntries(difficulties.map((difficulty) => [
      difficulty,
      grade1MathUnit09SupplementalActivities.filter((item) => item.difficulty === difficulty).length,
    ]))).toEqual({ basic: 16, advanced: 17, high: 17 });

    for (const { activity, sourceUnitId, knowledgePointIds } of grade1MathUnit09SupplementalActivities) {
      expect(sourceUnitId).toBe('grade-1/term-1/math/unit-09');
      expect(activity.kind).toBe('choice');
      expect(activity.options).toHaveLength(3);
      expect(new Set(activity.options.map(({ label }) => label)).size).toBe(3);
      expect(activity.options.some(({ id }) => id === activity.correctOptionId)).toBe(true);
      expect(knowledgePointIds.length).toBeGreaterThan(0);
      expect(new Set(knowledgePointIds).size).toBe(knowledgePointIds.length);
      expect(submitAnswer(activity, activity.correctOptionId)).toBe(true);
    }
  });

  it('每档覆盖本册总复习的运算、数序、比较、位置、图形和钟表核心点', () => {
    for (const difficulty of difficulties) {
      const covered = new Set(grade1MathUnit09SupplementalActivities
        .filter((item) => item.difficulty === difficulty)
        .flatMap(({ knowledgePointIds }) => knowledgePointIds));
      expect(coreKnowledgePointIds.filter((id) => covered.has(id))).toEqual(coreKnowledgePointIds);
    }
  });

  it('不新增 20 以内退位减法或超出 20 的数量，并避免提示泄露答案', async () => {
    for (const { activity } of grade1MathUnit09SupplementalActivities) {
      const content = [activity.prompt, activity.hint, activity.explanation, ...activity.options.map(({ label }) => label)].join(' ');
      const numerals = content.match(/\d+/gu) ?? [];
      expect(numerals.every((numeral) => Number(numeral) <= 20), activity.id).toBe(true);
      expect(content).not.toMatch(/(?:1[1-9]|20)\s*[-−]\s*\d+/u);
      const correctLabel = activity.options.find(({ id }) => id === activity.correctOptionId)!.label;
      const escapedLabel = correctLabel.replace(/[.*+?^${}()|[\]\\]/gu, '\\$&');
      const directAnswerDisclosure = new RegExp(`(?:答案(?:是|为)|正确答案|应选|应该选择)\\s*${escapedLabel}`, 'u');
      expect(activity.prompt).not.toMatch(directAnswerDisclosure);
      expect(activity.hint).not.toMatch(directAnswerDisclosure);
    }
  });

  it('把叠放行为题改成条件明确的图形特征判断', () => {
    const activity = grade1MathUnit09SupplementalActivities
      .find(({ activity }) => activity.id.endsWith('-advanced-08'))!.activity;

    expect(activity.prompt).toContain('正方体、球体和圆柱体');
    expect(activity.prompt).toContain('弯曲表面');
    expect(activity.options.find(({ id }) => id === activity.correctOptionId)?.label).toBe('正方体');
  });

  it('高阶图形题比较三种立体图形的滚动表现，不重复基础题', () => {
    const basic = grade1MathUnit09SupplementalActivities
      .find(({ activity }) => activity.id.endsWith('-basic-08'))!.activity;
    const high = grade1MathUnit09SupplementalActivities
      .find(({ activity }) => activity.id.endsWith('-high-06'))!.activity;

    expect(high.prompt).toContain('观察记录');
    expect(high.prompt).toContain('正方体、球体和圆柱体');
    expect(normalizePrompt(high.prompt)).not.toBe(normalizePrompt(basic.prompt));
    expect(high.options.find(({ id }) => id === high.correctOptionId)?.label).toContain('球体');
    expect(high.options.find(({ id }) => id === high.correctOptionId)?.label).toContain('圆柱体');
    expect(high.options.find(({ id }) => id === high.correctOptionId)?.label).toContain('正方体');
  });

  it('总复习钟表题只覆盖固定教材已学的整时，并避免同难度直接重复', () => {
    const basicWholeHour = grade1MathUnit09SupplementalActivities
      .find(({ activity }) => activity.id.endsWith('-basic-09'))!.activity;
    const basicHourRule = grade1MathUnit09SupplementalActivities
      .find(({ activity }) => activity.id.endsWith('-basic-10'))!.activity;
    const advancedHourOrder = grade1MathUnit09SupplementalActivities
      .find(({ activity }) => activity.id.endsWith('-advanced-10'))!.activity;
    const highWholeHour = grade1MathUnit09SupplementalActivities
      .find(({ activity }) => activity.id.endsWith('-high-09'))!.activity;
    const highHourOrder = grade1MathUnit09SupplementalActivities
      .find(({ activity }) => activity.id.endsWith('-high-10'))!.activity;

    expect(highWholeHour.prompt).toContain('订正');
    expect(normalizePrompt(highWholeHour.prompt)).not.toBe(normalizePrompt(basicWholeHour.prompt));
    expect(basicHourRule.prompt).toContain('整时');
    expect(normalizePrompt(basicHourRule.prompt)).not.toBe(normalizePrompt(basicWholeHour.prompt));
    expect(advancedHourOrder.prompt).toContain('从小到大');
    expect(highHourOrder.prompt).toContain('三个钟面');
    expect(normalizePrompt(highHourOrder.prompt)).not.toBe(normalizePrompt(advancedHourOrder.prompt));

    for (const { activity } of grade1MathUnit09SupplementalActivities) {
      const content = [activity.prompt, activity.hint, activity.explanation, ...activity.options.map(({ label }) => label)].join(' ');
      expect(content, activity.id).not.toMatch(/半时|时半/u);
    }
  });

  it('高阶位置题不能在题干中直接给出正确选项', () => {
    const activity = grade1MathUnit09SupplementalActivities
      .find(({ activity }) => activity.id.endsWith('-high-08'))!.activity;
    expect(activity.prompt).not.toMatch(/小狗在门的外面/u);
    expect(activity.prompt).toContain('门的另一侧');
  });

  it('题干彼此唯一且不照搬本单元课程题干', async () => {
    const unit = await loadUnit('grade-1/term-1/math/unit-09');
    expect(unit).toBeDefined();
    const courseActivities = Object.values(unit!.difficultyTracks).flatMap((track) => track.tasks
      .flatMap((task) => task.sessions.flatMap((session) => session.activities)));
    const supplementalPrompts = grade1MathUnit09SupplementalActivities.map(({ activity }) => normalizePrompt(activity.prompt));
    const coursePrompts = new Set(courseActivities.map(({ prompt }) => normalizePrompt(prompt)));

    expect(new Set(supplementalPrompts).size).toBe(supplementalPrompts.length);
    expect(supplementalPrompts.every((prompt) => !coursePrompts.has(prompt))).toBe(true);
  });
});
