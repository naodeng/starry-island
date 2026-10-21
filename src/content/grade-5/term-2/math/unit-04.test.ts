import { describe, expect, it } from 'vitest';
import { curriculum } from '../../../curriculum';

describe('grade 5 term 2 math unit 4 equivalent-fraction scope', () => {
  const activity = curriculum.units['grade-5/term-2/math/unit-04']
    ?.difficultyTracks.high.tasks[0]?.sessions[0]?.activities[0];

  it('tests equivalent fractions without requiring fraction addition', () => {
    expect(activity).toMatchObject({
      kind: 'arithmetic',
      prompt: expect.stringContaining('改写成分母为24的等值分数'),
      expression: '3 × 3',
      correctAnswer: 9,
      explanation: expect.stringContaining('3/8=9/24'),
    });
  });
});
