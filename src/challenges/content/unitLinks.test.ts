import { describe, expect, it } from 'vitest';
import { getPilotUnitChallengeGroupId } from './unitLinks';

describe('getPilotUnitChallengeGroupId', () => {
  it('returns the contextual challenge only for the registered pilot unit', () => {
    expect(getPilotUnitChallengeGroupId('grade-2/term-1/math/unit-02')).toBe('grade-2-term-1-math-unit-02');
    expect(getPilotUnitChallengeGroupId('grade-2/term-1/math/unit-01')).toBeUndefined();
    expect(getPilotUnitChallengeGroupId('grade-2/term-1/chinese/unit-02')).toBeUndefined();
  });
});
