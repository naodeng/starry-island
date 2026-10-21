import { describe, expect, it } from 'vitest';
import { curriculum } from '../../../curriculum';

describe('grade 6 term 2 math unit 5 same-category guarantee', () => {
  const unit = curriculum.units['grade-6/term-2/math/unit-05'];

  it('does not claim eight objects guarantee three in one of four categories', () => {
    const question = unit?.difficultyTracks.basic.tasks[1].sessions[0].activities[6];
    expect(question?.prompt).toContain('有4种颜色、共8颗珠子');
    expect(question?.kind).toBe('choice');
    if (question?.kind === 'choice') {
      expect(question.options[0]?.label).toBe('不能，4种颜色各放2颗仍没有3颗同色');
      expect(question.correctOptionId).toContain('/option-01');
    }
    expect(question?.explanation).toContain('需要第9颗才能保证');
  });
});
