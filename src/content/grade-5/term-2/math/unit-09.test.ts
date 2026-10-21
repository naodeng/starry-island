import { describe, expect, it } from 'vitest';
import { curriculum } from '../../../curriculum';

describe('grade 5 term 2 math unit 9 self-contained review evidence', () => {
  const unit = curriculum.units['grade-5/term-2/math/unit-09'];

  it('provides the data and equal-group conditions used by the answer keys', () => {
    expect(unit?.difficultyTracks.advanced.tasks[0]?.sessions[0]?.activities[5]?.prompt)
      .toContain('数据依次为8、11、20');
    expect(unit?.difficultyTracks.advanced.tasks[1]?.sessions[0]?.activities[1]?.prompt)
      .toContain('数量相同');
    expect(unit?.difficultyTracks.advanced.tasks[1]?.sessions[0]?.activities[4]?.prompt)
      .toContain('左右盘放入数量相同');
    expect(unit?.difficultyTracks.high.tasks[0]?.sessions[0]?.activities[3]?.prompt)
      .toContain('左右盘放相同数量');
    expect(unit?.difficultyTracks.high.tasks[1]?.sessions[0]?.activities[7]?.prompt)
      .toContain('相同数量');
  });
});
