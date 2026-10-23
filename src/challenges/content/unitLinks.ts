const PILOT_UNIT_GROUPS: Readonly<Record<string, string>> = {
  'grade-1/term-1/math/unit-01': 'grade-1-term-1-math-unit-01',
  'grade-1/term-1/math/unit-02': 'grade-1-term-1-math-unit-02',
  'grade-1/term-1/math/unit-03': 'grade-1-term-1-math-unit-03',
  'grade-1/term-1/math/unit-04': 'grade-1-term-1-math-unit-04',
  'grade-2/term-1/math/unit-02': 'grade-2-term-1-math-unit-02',
  'grade-3/term-1/english/unit-01': 'grade-3-term-1-english-unit-01',
  'grade-5/term-1/chinese/unit-01': 'grade-5-term-1-chinese-unit-01',
};

export function getPilotUnitChallengeGroupId(unitKey: string): string | undefined {
  return PILOT_UNIT_GROUPS[unitKey];
}
