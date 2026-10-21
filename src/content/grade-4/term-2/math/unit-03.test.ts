import { describe, expect, it } from 'vitest';
import { curriculum } from '../../../curriculum';

describe('grade 4 term 2 math unit 3 distributive-law review', () => {
  const unit = curriculum.units['grade-4/term-2/math/unit-03'];
  const highTask = unit?.difficultyTracks.high.tasks[0]?.sessions[0]?.activities;

  it('explains the shared-factor transformation in grade-appropriate language', () => {
    expect(highTask?.[5]).toMatchObject({
      kind: 'categorize',
      prompt: '判断等式是否正确运用了乘法分配律。',
      explanation: expect.stringContaining('把相同的因数25提到括号外'),
    });
    expect(highTask?.[5]?.explanation).not.toContain('公因数');
  });
});
