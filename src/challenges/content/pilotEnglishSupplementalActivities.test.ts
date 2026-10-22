import { describe, expect, it } from 'vitest';
import { derivePilotQuestionKnowledgePointIds } from './pilotQuestionKnowledgePoints';
import { pilotEnglishSupplementalActivities } from './pilotEnglishSupplementalActivities';

describe('Grade 3 English supplemental challenge activities', () => {
  it('provides fourteen unique candidates for every difficulty', () => {
    expect(pilotEnglishSupplementalActivities).toHaveLength(42);
    expect(new Set(pilotEnglishSupplementalActivities.map(({ activity }) => activity.id)).size).toBe(42);
    expect(Object.fromEntries(['basic', 'advanced', 'high'].map((difficulty) => [
      difficulty,
      pilotEnglishSupplementalActivities.filter((item) => item.difficulty === difficulty).length,
    ]))).toEqual({ basic: 14, advanced: 14, high: 14 });
  });

  it('keeps each declared knowledge point aligned with the visible learning target', () => {
    for (const item of pilotEnglishSupplementalActivities) {
      expect(derivePilotQuestionKnowledgePointIds(item.sourceUnitId, item.activity)).toEqual(item.knowledgePointIds);
    }
  });

  it('avoids repeating normalized prompt templates across the supplemental pool', () => {
    const normalizedPrompts = pilotEnglishSupplementalActivities.map(({ activity }) => activity.prompt
      .normalize('NFKC')
      .replace(/\s*\d+(?:\.\d+)?\s*/gu, '#')
      .replace(/\p{P}/gu, '')
      .replace(/\s+/gu, ' ')
      .trim());

    expect(new Set(normalizedPrompts).size).toBe(normalizedPrompts.length);
  });

  it('uses unique choices and does not place the keyed answer in the prompt or hint', () => {
    for (const { activity } of pilotEnglishSupplementalActivities) {
      expect(new Set(activity.options.map(({ id }) => id)).size).toBe(activity.options.length);
      expect(new Set(activity.options.map(({ label }) => label)).size).toBe(activity.options.length);
      const correct = activity.options.find(({ id }) => id === activity.correctOptionId);
      expect(correct).toBeDefined();
      expect(activity.prompt).not.toContain(correct?.label);
      expect(activity.hint).not.toContain(correct?.label);
    }
  });
});
