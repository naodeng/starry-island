import { describe, expect, it } from 'vitest';
import { curriculum } from '../../../curriculum';

describe('grade 5 term 1 math unit 4 self-contained trial evidence', () => {
  const activities = curriculum.units['grade-5/term-1/math/unit-04']
    ?.difficultyTracks.advanced.tasks[0]?.sessions[0]?.activities;

  it('states the bag contents before asking about the next draw', () => {
    expect(activities?.[2]).toMatchObject({
      kind: 'choice',
      prompt: expect.stringContaining('袋中有红球和黄球'),
      explanation: expect.stringContaining('两种颜色仍在袋中'),
      correctOptionId: expect.any(String),
    });
  });

  it('provides the group counts used by the supported-record category', () => {
    const activity = activities?.[5];
    expect(activity).toMatchObject({ kind: 'categorize' });
    if (activity?.kind === 'categorize') {
      expect(activity.items).toEqual(expect.arrayContaining([
        expect.objectContaining({ label: '甲组摸20次、乙组摸16次，两组的试验次数不同' }),
      ]));
      expect(activity.explanation).toContain('甲、乙两组试验次数不同');
    }
  });
});
