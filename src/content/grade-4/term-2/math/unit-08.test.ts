import { describe, expect, it } from 'vitest';
import { curriculum } from '../../../curriculum';

describe('grade 4 term 2 math unit 8 averages and charts', () => {
  const activity = curriculum.units['grade-4/term-2/math/unit-08']
    ?.difficultyTracks.basic.tasks[0]?.sessions[0]?.activities[3];

  it('uses an exact average when no rounding precision is requested', () => {
    expect(activity).toMatchObject({
      kind: 'match',
      pairs: expect.arrayContaining([
        expect.objectContaining({ left: '10、10、16', right: '12' }),
      ]),
      explanation: expect.stringContaining('(10+10+16)÷3=12'),
    });
  });
});
