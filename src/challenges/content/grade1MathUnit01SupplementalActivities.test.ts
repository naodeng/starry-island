import { describe, expect, it } from 'vitest';
import { grade1MathUnit01SupplementalActivities } from './grade1MathUnit01SupplementalActivities';

const difficulties = ['basic', 'advanced', 'high'] as const;
const coreKnowledgePointIds = [
  'counting-one-to-one',
  'number-sequence',
  'quantity-comparison',
  'zero-as-none',
];

describe('一年级上册数学第一单元闯关补充题', () => {
  it('每档提供足够且唯一、可由现有闯关控件评分的候选题', () => {
    expect(grade1MathUnit01SupplementalActivities).toHaveLength(44);
    expect(new Set(grade1MathUnit01SupplementalActivities.map(({ activity }) => activity.id)).size).toBe(44);
    expect(Object.fromEntries(difficulties.map((difficulty) => [
      difficulty,
      grade1MathUnit01SupplementalActivities.filter((item) => item.difficulty === difficulty).length,
    ]))).toEqual({ basic: 14, advanced: 14, high: 16 });

    for (const { activity } of grade1MathUnit01SupplementalActivities) {
      expect(activity.kind).toBe('choice');
      expect(activity.options).toHaveLength(3);
      expect(new Set(activity.options.map(({ label }) => label)).size).toBe(3);
      expect(activity.options.some(({ id }) => id === activity.correctOptionId)).toBe(true);
    }
  });

  it('逐档覆盖数数、数序、数量比较和 0 的初步认识', () => {
    for (const difficulty of difficulties) {
      const covered = new Set(grade1MathUnit01SupplementalActivities
        .filter((item) => item.difficulty === difficulty)
        .flatMap(({ knowledgePointIds }) => knowledgePointIds));
      expect(coreKnowledgePointIds.filter((id) => covered.has(id))).toEqual(coreKnowledgePointIds);
    }
  });

  it('不在题干或提示中泄露正确选项，并保证高阶题可联合覆盖多个知识点', () => {
    for (const { activity, knowledgePointIds } of grade1MathUnit01SupplementalActivities) {
      const correctLabel = activity.options.find(({ id }) => id === activity.correctOptionId)!.label;
      const escapedLabel = correctLabel.replace(/[.*+?^${}()|[\]\\]/gu, '\\$&');
      const directAnswerDisclosure = new RegExp(`(?:答案(?:是|为)|正确答案|应选|应该选择)\\s*${escapedLabel}`, 'u');
      expect(activity.prompt).not.toMatch(directAnswerDisclosure);
      expect(activity.hint).not.toMatch(directAnswerDisclosure);
      expect(knowledgePointIds.length).toBeGreaterThan(0);
    }

    expect(grade1MathUnit01SupplementalActivities
      .filter(({ difficulty }) => difficulty === 'high')
      .some(({ knowledgePointIds }) => knowledgePointIds.length > 1)).toBe(true);
  });
});
