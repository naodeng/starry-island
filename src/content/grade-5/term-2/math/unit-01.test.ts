import { describe, expect, it } from 'vitest';
import { curriculum } from '../../../curriculum';

describe('grade 5 term 2 math unit 1 consistent view constraints', () => {
  const activity = curriculum.units['grade-5/term-2/math/unit-01']
    ?.difficultyTracks.advanced.tasks[0]?.sessions[0]?.activities[3];

  it('uses compatible maximum heights across the front and left views', () => {
    expect(activity).toMatchObject({ kind: 'match' });
    if (activity?.kind === 'match') {
      expect(activity.pairs).toEqual(expect.arrayContaining([
        expect.objectContaining({ left: '正面最高3层' }),
        expect.objectContaining({ left: '左面最高3层' }),
      ]));
    }
  });
});
