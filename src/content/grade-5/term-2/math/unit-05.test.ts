import { describe, expect, it } from 'vitest';
import { curriculum } from '../../../curriculum';

describe('grade 5 term 2 math unit 5 rotation-angle scope', () => {
  const activities = curriculum.units['grade-5/term-2/math/unit-05']
    ?.difficultyTracks.advanced.tasks[1]?.sessions[0]?.activities;

  it('uses the taught 90, 180, and 270 degree turns', () => {
    expect(activities?.[5]).toMatchObject({
      kind: 'arithmetic',
      prompt: expect.stringContaining('180°、再转90°'),
      expression: '180 + 90',
      correctAnswer: 270,
    });
    expect(activities?.[6]).toMatchObject({
      kind: 'order',
      prompt: expect.stringContaining('90°和180°'),
    });
    expect(JSON.stringify(activities)).not.toMatch(/120°|450°/);
  });
});
