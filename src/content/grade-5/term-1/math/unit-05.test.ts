import { describe, expect, it } from 'vitest';
import { curriculum } from '../../../curriculum';

describe('grade 5 term 1 math unit 5 equation operations', () => {
  const activities = curriculum.units['grade-5/term-1/math/unit-05']
    ?.difficultyTracks.advanced.tasks[0]?.sessions[0]?.activities;

  it('describes solving with the same operation on both sides', () => {
    const activity = activities?.[6];
    expect(activity).toMatchObject({ kind: 'categorize' });
    if (activity?.kind === 'categorize') {
      expect(activity.items).toEqual(expect.arrayContaining([
        expect.objectContaining({ label: '等式两边同时除以未知数的系数' }),
      ]));
      expect(activity.explanation).toContain('同时运算');
    }
  });
});
