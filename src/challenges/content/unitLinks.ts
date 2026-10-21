const PILOT_UNIT_GROUPS: Readonly<Record<string, string>> = {
  'grade-2/term-1/math/unit-02': 'grade-2-term-1-math-unit-02',
};

export function getPilotUnitChallengeGroupId(unitKey: string): string | undefined {
  return PILOT_UNIT_GROUPS[unitKey];
}
