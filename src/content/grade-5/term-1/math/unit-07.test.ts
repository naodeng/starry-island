import { describe, expect, it } from 'vitest';
import { curriculum } from '../../../curriculum';

describe('grade 5 term 1 math unit 7 planting-order reasoning', () => {
  const activity = curriculum.units['grade-5/term-1/math/unit-07']
    ?.difficultyTracks.advanced.tasks[1]?.sessions[0]?.activities[7];

  it('confirms equal interval counts before comparing endpoint rules', () => {
    expect(activity).toMatchObject({ kind: 'order' });
    if (activity?.kind === 'order') {
      const items = activity.items;
      expect(activity.correctOrder).toEqual([
        items[1]?.id,
        items[0]?.id,
        items[2]?.id,
        items[3]?.id,
      ]);
    }
  });
});
