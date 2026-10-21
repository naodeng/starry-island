import { describe, expect, it } from 'vitest';
import { curriculum } from '../../../curriculum';

describe('grade 6 term 2 math unit 4 proportion scope', () => {
  const unit = curriculum.units['grade-6/term-2/math/unit-04'];

  it('keeps the scale-model question on corresponding lengths rather than area scaling', () => {
    const question = unit?.difficultyTracks.high.tasks[0].sessions[0].activities[2];
    expect(question?.prompt).toContain('模型的长度与原物长度比为3:1');
    expect(question?.prompt).toContain('对应的边长');
    expect(question?.kind).toBe('choice');
    if (question?.kind === 'choice') {
      expect(question.correctOptionId).toContain('/option-01');
      expect(question.options[0]?.label).toBe('12厘米');
    }
    expect(question?.explanation).toBe('4×3=12厘米。');
  });
});
