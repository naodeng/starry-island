import { describe, expect, it } from 'vitest';
import { fingerprintActivity } from './fingerprint';
import { grade1Term2MathUnit04SupplementalActivities } from './grade1Term2MathUnit04SupplementalActivities';

const expectedCorrectLabels = [
  '46', '72', '5个十和8个一', '60', '9个一', '83根', '29', '67',
  '39', '50', '69', '83', '24', '98', '57、58、59', '99',
  '63', '＜', '57', '小禾', '100', '8个十', '50', '100个一',
  '57', '74', '83', '3根', '59', '46', '6',
  '40', '3个数：68、69、70', '19', '85', '47', '93', '75',
  '84', '7', '科普书多18本', '56', '3', '78＞69', '45',
  '80', '60厘米', '10', '100', '60支', '80', '2个十',
  '两个数位写反了，正确数是53', '46', '63', '63', '改成84', '55', '不会，还是71',
  '50', '57', '73、74', '3个数', '48', '100', '63', '47', '65', '57', '60',
  '先比较十位，52有5个十，49有4个十，所以52更大', '4',
  '80', '9个十加1个十是10个十，也就是100', '60支',
  '一个十是10，80减10应是70', '10串', '100', '70厘米',
];

describe('Grade 1 Term 2 Math Unit 4 supplemental challenge activities', () => {
  it('preserves all independently checked answer keys', () => {
    const actualCorrectLabels = grade1Term2MathUnit04SupplementalActivities.map(({ activity }) =>
      activity.options.find(({ id }) => id === activity.correctOptionId)?.label);
    expect(actualCorrectLabels).toEqual(expectedCorrectLabels);
  });

  it('covers all three tiers with distinct, complete choice activities', async () => {
    expect(grade1Term2MathUnit04SupplementalActivities).toHaveLength(79);
    expect(new Set(grade1Term2MathUnit04SupplementalActivities.map(({ activity }) => activity.id)).size).toBe(79);
    expect(new Set(await Promise.all(grade1Term2MathUnit04SupplementalActivities.map(({ activity }) => fingerprintActivity(activity))))
      .size).toBe(79);

    for (const difficulty of ['basic', 'advanced', 'high'] as const) {
      const items = grade1Term2MathUnit04SupplementalActivities.filter((item) => item.difficulty === difficulty);
      const expectedCount = difficulty === 'basic' ? 24 : difficulty === 'advanced' ? 28 : 27;
      expect(items).toHaveLength(expectedCount);
      const answerPositions = [0, 0, 0];
      const normalizedPrompts = items.map(({ activity }) => activity.prompt.replace(/[^\p{L}\p{N}]/gu, ''));
      expect(new Set(normalizedPrompts).size).toBe(expectedCount);

      for (const { activity, sourceUnitId, knowledgePointIds } of items) {
        expect(sourceUnitId).toBe('grade-1/term-2/math/unit-04');
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

      const expectedPositions = difficulty === 'basic' ? [8, 8, 8] : difficulty === 'advanced' ? [10, 9, 9] : [9, 9, 9];
      expect([...answerPositions].sort()).toEqual(expectedPositions);
    }
  });

  it('covers each confirmed unit knowledge point in every tier', () => {
    const expectedKnowledgePoints = new Set([
      'two-digit-number-composition',
      'number-sequence-to-100',
      'number-comparison-to-100',
      'tens-and-hundreds',
    ]);

    for (const difficulty of ['basic', 'advanced', 'high'] as const) {
      const knowledgePointIds = new Set(grade1Term2MathUnit04SupplementalActivities
        .filter((item) => item.difficulty === difficulty)
        .flatMap(({ knowledgePointIds: ids }) => ids));
      expect(knowledgePointIds).toEqual(expectedKnowledgePoints);
    }
  });
});
