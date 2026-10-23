import { describe, expect, it } from 'vitest';
import { getPilotUnitChallengeGroupId } from './unitLinks';

describe('getPilotUnitChallengeGroupId', () => {
  it('returns the contextual challenge only for the registered pilot unit', () => {
    expect(getPilotUnitChallengeGroupId('grade-2/term-1/math/unit-02')).toBe('grade-2-term-1-math-unit-02');
    expect(getPilotUnitChallengeGroupId('grade-3/term-1/english/unit-01')).toBe('grade-3-term-1-english-unit-01');
    expect(getPilotUnitChallengeGroupId('grade-5/term-1/chinese/unit-01')).toBe('grade-5-term-1-chinese-unit-01');
    expect(getPilotUnitChallengeGroupId('grade-1/term-1/math/unit-01')).toBe('grade-1-term-1-math-unit-01');
    expect(getPilotUnitChallengeGroupId('grade-1/term-1/math/unit-02')).toBe('grade-1-term-1-math-unit-02');
    expect(getPilotUnitChallengeGroupId('grade-1/term-1/math/unit-03')).toBe('grade-1-term-1-math-unit-03');
    expect(getPilotUnitChallengeGroupId('grade-1/term-1/math/unit-04')).toBe('grade-1-term-1-math-unit-04');
    expect(getPilotUnitChallengeGroupId('grade-1/term-1/math/unit-05')).toBe('grade-1-term-1-math-unit-05');
    expect(getPilotUnitChallengeGroupId('grade-1/term-1/math/unit-06')).toBe('grade-1-term-1-math-unit-06');
    expect(getPilotUnitChallengeGroupId('grade-1/term-1/math/unit-07')).toBe('grade-1-term-1-math-unit-07');
    expect(getPilotUnitChallengeGroupId('grade-2/term-1/math/unit-01')).toBeUndefined();
    expect(getPilotUnitChallengeGroupId('grade-2/term-1/chinese/unit-02')).toBeUndefined();
  });
});
