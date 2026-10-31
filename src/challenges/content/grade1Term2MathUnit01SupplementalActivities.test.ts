import { describe, expect, it } from 'vitest';
import { fingerprintActivity } from './fingerprint';
import { grade1Term2MathUnit01SupplementalActivities } from './grade1Term2MathUnit01SupplementalActivities';

describe('Grade 1 Term 2 Math Unit 1 supplemental challenge activities', () => {
  it('keeps the intended correct option when answer positions are rotated', () => {
    const correctLabelsById = new Map(grade1Term2MathUnit01SupplementalActivities.map(({ activity }) => [
      activity.id,
      activity.options.find(({ id }) => id === activity.correctOptionId)?.label,
    ]));

    expect(correctLabelsById.get('challenge-supplement-grade-1-term-2-math-unit-01-basic-04')).toBe('▭');
    expect(correctLabelsById.get('challenge-supplement-grade-1-term-2-math-unit-01-basic-07')).toBe('正方形');
    expect(correctLabelsById.get('challenge-supplement-grade-1-term-2-math-unit-01-basic-08')).toBe('长方形');
  });

  it('provides 44 unique, answer-keyed questions with balanced answer positions', async () => {
    expect(grade1Term2MathUnit01SupplementalActivities).toHaveLength(44);
    expect(new Set(grade1Term2MathUnit01SupplementalActivities.map(({ activity }) => activity.id)).size).toBe(44);
    expect(new Set(await Promise.all(grade1Term2MathUnit01SupplementalActivities.map(({ activity }) => fingerprintActivity(activity))))
      .size).toBe(44);

    for (const [difficulty, expectedCount] of [['basic', 15], ['advanced', 15], ['high', 14]] as const) {
      const items = grade1Term2MathUnit01SupplementalActivities.filter((item) => item.difficulty === difficulty);
      expect(items).toHaveLength(expectedCount);
      const answerPositions = [0, 0, 0];

      for (const { activity, sourceUnitId, knowledgePointIds } of items) {
        expect(sourceUnitId).toBe('grade-1/term-2/math/unit-01');
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

      expect([...answerPositions].sort()).toEqual(expectedCount === 15 ? [5, 5, 5] : [4, 5, 5]);
    }

    const replacementAnswers = new Map(grade1Term2MathUnit01SupplementalActivities.map(({ activity }) => [
      activity.id,
      activity.options.find(({ id }) => id === activity.correctOptionId)?.label,
    ]));
    expect(replacementAnswers.get('challenge-supplement-grade-1-term-2-math-unit-01-basic-15')).toBe('圆形图卡');
    expect(replacementAnswers.get('challenge-supplement-grade-1-term-2-math-unit-01-advanced-15')).toBe('正方形和圆形图卡');
  });
});
