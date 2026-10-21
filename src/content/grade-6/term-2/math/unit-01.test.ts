import { describe, expect, it } from 'vitest';
import { curriculum } from '../../../curriculum';

describe('grade 6 term 2 math unit 1 keeps signed-number work within the negative-numbers unit', () => {
  const unit = curriculum.units['grade-6/term-2/math/unit-01'];

  it('uses number-line direction and ordinary distance calculations instead of signed-number operations', () => {
    const advanced = unit?.difficultyTracks.advanced.tasks[0].sessions[0].activities;
    const high = unit?.difficultyTracks.high.tasks;
    const incomeOutflow = high?.[0].sessions[0].activities[2];
    const changeDirection = high?.[0].sessions[0].activities[3];
    const displacement = high?.[0].sessions[0].activities[6];
    const acrossZero = high?.[1].sessions[0].activities[6];

    expect(advanced?.[4]?.hint).toContain('数轴');
    expect(advanced?.[4]?.explanation).not.toContain('−3−4');
    expect(incomeOutflow?.prompt).toContain('净收入还是净支出');
    expect(incomeOutflow?.kind).toBe('choice');
    if (incomeOutflow?.kind === 'choice') expect(incomeOutflow.options[0]?.label).toBe('净支出');
    expect(changeDirection?.kind).toBe('match');
    if (changeDirection?.kind === 'match') {
      expect(changeDirection.pairs.map(({ right }) => right)).toEqual(['温度升高', '温度降低', '没有变化']);
    }
    expect(displacement?.prompt).toContain('相距多少米');
    expect(displacement?.kind).toBe('arithmetic');
    if (displacement?.kind === 'arithmetic') expect(displacement.correctAnswer).toBe(4);
    expect(acrossZero?.prompt).toContain('向下移动了多少米');
    expect(acrossZero?.kind).toBe('arithmetic');
    if (acrossZero?.kind === 'arithmetic') {
      expect(acrossZero.expression).toBe('6 + 2');
      expect(acrossZero.correctAnswer).toBe(8);
      expect(acrossZero.explanation).not.toContain('−2−6');
    }
  });
});
