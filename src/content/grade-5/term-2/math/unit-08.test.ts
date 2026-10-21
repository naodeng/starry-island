import { describe, expect, it } from 'vitest';
import { curriculum } from '../../../curriculum';

describe('grade 5 term 2 math unit 8 self-contained balance conditions', () => {
  const unit = curriculum.units['grade-5/term-2/math/unit-08'];

  it('states equal group sizes and known counterfeit weight before using tilt to locate it', () => {
    const basic = unit?.difficultyTracks.basic.tasks;
    const high = unit?.difficultyTracks.high.tasks;
    const leftCandidate = high?.[0]?.sessions[0]?.activities[4];
    expect(basic?.[0]?.sessions[0]?.activities[2]?.prompt).toContain('数量相同');
    expect(basic?.[0]?.sessions[0]?.activities[3]?.prompt).toContain('数量相同');
    expect(basic?.[0]?.sessions[0]?.activities[6]?.prompt).toContain('相同数量');
    expect(basic?.[1]?.sessions[0]?.activities[3]?.prompt).toContain('每组3件');
    expect(high?.[0]?.sessions[0]?.activities[1]?.prompt).toContain('各3件');
    expect(high?.[0]?.sessions[0]?.activities[3]?.prompt).toContain('左右盘每次放相同数量');
    expect(leftCandidate?.kind).toBe('categorize');
    if (leftCandidate?.kind === 'categorize') {
      expect(leftCandidate.items[3]?.label).toContain('却保留左盘候选');
    }
    expect(high?.[0]?.sessions[0]?.activities[6]?.prompt).toContain('平均分成三组');
    expect(high?.[1]?.sessions[0]?.activities[3]?.prompt).toContain('左右盘每次放相同数量');
  });
});
