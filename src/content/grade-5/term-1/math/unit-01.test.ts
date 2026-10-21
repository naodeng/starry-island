import { describe, expect, it } from 'vitest';
import { curriculum } from '../../../curriculum';

describe('grade 5 term 1 math unit 1 stepped-fee explanations', () => {
  const activities = curriculum.units['grade-5/term-1/math/unit-01']
    ?.difficultyTracks.high.tasks[1]?.sessions[0]?.activities;

  it('uses the excess amounts stated in each fee question', () => {
    expect(activities?.[5]).toMatchObject({
      kind: 'match',
      explanation: expect.stringContaining('出租车超出2.2 km按3 km计费'),
    });
    expect(activities?.[6]?.explanation).toContain('出租车超出5.1 km按6 km计费');
    expect(activities?.[5]?.explanation).not.toContain('4.4 km');
    expect(activities?.[6]?.explanation).not.toContain('4.4 km');
  });
});
