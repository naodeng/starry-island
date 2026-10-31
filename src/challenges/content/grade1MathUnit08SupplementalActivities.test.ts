import { describe, expect, it } from 'vitest';
import { submitAnswer } from '../../learning/answers';
import { loadUnit } from '../../content/unitLoader';
import { grade1MathUnit08SupplementalActivities } from './grade1MathUnit08SupplementalActivities';

const difficulties = ['basic', 'advanced', 'high'] as const;
const knowledgePointIds = [
  'make-ten-strategy',
  'carry-addition-within-twenty',
  'addition-situation-modeling',
  'addition-checking',
];

describe('一年级上册数学第八单元闯关补充题', () => {
  it('按各档去重后的有效课程题补足到 30 道，且答案通过生产评分器', () => {
    expect(grade1MathUnit08SupplementalActivities).toHaveLength(47);
    expect(new Set(grade1MathUnit08SupplementalActivities.map(({ activity }) => activity.id)).size).toBe(47);
    expect(Object.fromEntries(difficulties.map((difficulty) => [
      difficulty,
      grade1MathUnit08SupplementalActivities.filter((item) => item.difficulty === difficulty).length,
    ]))).toEqual({ basic: 14, advanced: 16, high: 17 });

    for (const { activity, sourceUnitId } of grade1MathUnit08SupplementalActivities) {
      expect(sourceUnitId).toBe('grade-1/term-1/math/unit-08');
      expect(activity.kind).toBe('choice');
      expect(activity.options).toHaveLength(3);
      expect(new Set(activity.options.map(({ label }) => label)).size).toBe(3);
      expect(activity.options.some(({ id }) => id === activity.correctOptionId)).toBe(true);
      expect(submitAnswer(activity, activity.correctOptionId)).toBe(true);
    }
  });

  it('每档覆盖凑十、进位计算、情境列式和计算检查', () => {
    for (const difficulty of difficulties) {
      const covered = new Set(grade1MathUnit08SupplementalActivities
        .filter((item) => item.difficulty === difficulty)
        .flatMap(({ knowledgePointIds: ids }) => ids));
      expect(knowledgePointIds.filter((id) => covered.has(id))).toEqual(knowledgePointIds);
      expect(grade1MathUnit08SupplementalActivities.filter((item) => item.difficulty === difficulty
        && item.knowledgePointIds.includes('carry-addition-within-twenty')).length).toBeGreaterThanOrEqual(10);
    }
  });

  it('明确区分方框里的加数和凑成 10 后剩下的部分', () => {
    const activity = grade1MathUnit08SupplementalActivities.find(({ activity: item }) => item.id.endsWith('-high-05'))!.activity;
    const correctOption = activity.options.find(({ id }) => id === activity.correctOptionId)!;

    expect(activity.prompt).toContain('方框里的数应拆成哪两部分？');
    expect(correctOption.label).toBe('1 和 5');
    expect(activity.explanation).toContain('方框里的 6 拆成 1 和 5');
  });

  it('同一进位算式不重复考查相同的填空句式', () => {
    const normalizePrompt = (prompt: string) => prompt.normalize('NFKC').replace(/[\s\p{P}\p{S}\d]/gu, '');
    const firstStrategyPrompt = grade1MathUnit08SupplementalActivities.find(({ activity: item }) => item.id.endsWith('-advanced-02'))!.activity.prompt;
    const secondStrategyPrompt = grade1MathUnit08SupplementalActivities.find(({ activity: item }) => item.id.endsWith('-advanced-15'))!.activity.prompt;

    expect(normalizePrompt(firstStrategyPrompt)).not.toBe(normalizePrompt(secondStrategyPrompt));
  });

  it('题目不超出 20 以内进位加法范围，提示不直接泄露答案', () => {
    for (const { activity } of grade1MathUnit08SupplementalActivities) {
      const content = [activity.prompt, activity.hint, activity.explanation, ...activity.options.map(({ label }) => label)].join(' ');
      const numerals = content.match(/\d+/gu) ?? [];
      expect(numerals.every((numeral) => Number(numeral) <= 20), activity.id).toBe(true);

      const correctLabel = activity.options.find(({ id }) => id === activity.correctOptionId)!.label;
      const escapedLabel = correctLabel.replace(/[.*+?^${}()|[\]\\]/gu, '\\$&');
      const directAnswerDisclosure = new RegExp(`(?:答案(?:是|为)|正确答案|应选|应该选择)\\s*${escapedLabel}`, 'u');
      expect(activity.prompt).not.toMatch(directAnswerDisclosure);
      expect(activity.hint).not.toMatch(directAnswerDisclosure);
    }
  });

  it('补充题题干唯一且不照搬本单元课程题干', async () => {
    const unit = await loadUnit('grade-1/term-1/math/unit-08');
    expect(unit).toBeDefined();
    const courseActivities = Object.values(unit!.difficultyTracks).flatMap((track) => track.tasks
      .flatMap((task) => task.sessions.flatMap((session) => session.activities)));
    const normalizePrompt = (prompt: string) => prompt.normalize('NFKC').replace(/[\s\p{P}\p{S}]/gu, '');
    const supplementalPrompts = grade1MathUnit08SupplementalActivities.map(({ activity }) => normalizePrompt(activity.prompt));
    const coursePrompts = new Set(courseActivities.map(({ prompt }) => normalizePrompt(prompt)));

    expect(new Set(supplementalPrompts).size).toBe(supplementalPrompts.length);
    expect(supplementalPrompts.every((prompt) => !coursePrompts.has(prompt))).toBe(true);
  });
});
