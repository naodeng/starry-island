import { describe, expect, it } from 'vitest';
import { submitAnswer } from '../../learning/answers';
import { loadUnit } from '../../content/unitLoader';
import { grade1MathUnit06SupplementalActivities } from './grade1MathUnit06SupplementalActivities';

const difficulties = ['basic', 'advanced', 'high'] as const;
const knowledgePointIds = [
  'teen-number-composition',
  'number-sequence-eleven-to-twenty',
  'number-comparison-eleven-to-twenty',
];

describe('一年级上册数学第六单元闯关补充题', () => {
  it('按课程题审校后的缺口补足唯一候选题，且登记答案能通过生产评分器', () => {
    expect(grade1MathUnit06SupplementalActivities).toHaveLength(52);
    expect(new Set(grade1MathUnit06SupplementalActivities.map(({ activity }) => activity.id)).size).toBe(52);
    expect(Object.fromEntries(difficulties.map((difficulty) => [
      difficulty,
      grade1MathUnit06SupplementalActivities.filter((item) => item.difficulty === difficulty).length,
    ]))).toEqual({ basic: 18, advanced: 16, high: 18 });

    for (const { activity, sourceUnitId } of grade1MathUnit06SupplementalActivities) {
      expect(sourceUnitId).toBe('grade-1/term-1/math/unit-06');
      expect(activity.kind).toBe('choice');
      expect(activity.options).toHaveLength(3);
      expect(new Set(activity.options.map(({ label }) => label)).size).toBe(3);
      expect(activity.options.some(({ id }) => id === activity.correctOptionId)).toBe(true);
      expect(submitAnswer(activity, activity.correctOptionId)).toBe(true);
    }
  });

  it('每档均覆盖数的组成、11～20 数序和大小比较', () => {
    for (const difficulty of difficulties) {
      const covered = new Set(grade1MathUnit06SupplementalActivities
        .filter((item) => item.difficulty === difficulty)
        .flatMap(({ knowledgePointIds }) => knowledgePointIds));
      expect(knowledgePointIds.filter((id) => covered.has(id))).toEqual(knowledgePointIds);
    }
  });

  it('每题都有适龄提示和解释，且题干与提示不直接泄露答案', () => {
    for (const { activity } of grade1MathUnit06SupplementalActivities) {
      expect(activity.hint.trim().length).toBeGreaterThan(0);
      expect(activity.explanation.trim().length).toBeGreaterThan(0);
      const correctLabel = activity.options.find(({ id }) => id === activity.correctOptionId)!.label;
      const escapedLabel = correctLabel.replace(/[.*+?^${}()|[\]\\]/gu, '\\$&');
      const directAnswerDisclosure = new RegExp(`(?:答案(?:是|为)|正确答案|应选|应该选择)\\s*${escapedLabel}`, 'u');
      expect(activity.prompt).not.toMatch(directAnswerDisclosure);
      expect(activity.hint).not.toMatch(directAnswerDisclosure);
    }
  });

  it('只使用本单元的 11～20 数与数位知识，不引入奇偶或超出 20 的数', () => {
    for (const { activity } of grade1MathUnit06SupplementalActivities) {
      const content = [
        activity.prompt,
        activity.hint,
        activity.explanation,
        ...activity.options.map(({ label }) => label),
      ].join(' ');
      const numerals = content.match(/\d+/gu) ?? [];

      expect(content).not.toMatch(/偶数|奇数/u);
      expect(numerals.every((numeral) => Number(numeral) <= 20), `${activity.id}: ${numerals.join(', ')}`).toBe(true);
    }
  });

  it('补充题题干互不重复，也不照搬本单元原课程题干', async () => {
    const unit = await loadUnit('grade-1/term-1/math/unit-06');
    expect(unit).toBeDefined();
    const courseActivities = Object.values(unit!.difficultyTracks).flatMap((track) => track.tasks
      .flatMap((task) => task.sessions.flatMap((session) => session.activities)));
    const normalizePrompt = (prompt: string) => prompt.normalize('NFKC').replace(/[\s\p{P}\p{S}]/gu, '');
    const supplementalPrompts = grade1MathUnit06SupplementalActivities.map(({ activity }) => normalizePrompt(activity.prompt));
    const coursePrompts = new Set(courseActivities.map(({ prompt }) => normalizePrompt(prompt)));

    expect(new Set(supplementalPrompts).size).toBe(supplementalPrompts.length);
    expect(supplementalPrompts.every((prompt) => !coursePrompts.has(prompt))).toBe(true);
  });
});
