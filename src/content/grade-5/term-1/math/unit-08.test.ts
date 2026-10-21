import { describe, expect, it } from 'vitest';
import { curriculum } from '../../../curriculum';

describe('grade 5 term 1 math unit 8 decimal multiplication comparison', () => {
  const activity = curriculum.units['grade-5/term-1/math/unit-08']
    ?.difficultyTracks.basic.tasks[0]?.sessions[0]?.activities[5];

  it('states that the number is positive before comparing the product', () => {
    expect(activity).toMatchObject({
      kind: 'choice',
      prompt: expect.stringContaining('正数'),
      explanation: expect.stringContaining('正数乘小于1的数'),
    });
  });
});
