import type { ChallengeGrowthDefinition } from '../domain/growth';

function growthTasks(groupId: string) {
  return [
    { id: `${groupId}/basic-01` },
    { id: `${groupId}/basic-02` },
    { id: `${groupId}/advanced-01` },
    { id: `${groupId}/advanced-02` },
    { id: `${groupId}/high-01` },
  ] as const;
}

function unitGroup(id: string, grade: number, subject: 'chinese' | 'math' | 'english', unitNumber: number): ChallengeGrowthDefinition {
  const unitId = `grade-${grade}/term-1/${subject}/unit-${String(unitNumber).padStart(2, '0')}`;
  return {
    id,
    kind: 'unit',
    grade,
    semester: 1,
    subject,
    sourceUnitIds: [unitId],
    tasks: growthTasks(id),
  };
}

export const growthGroups: readonly ChallengeGrowthDefinition[] = [
  unitGroup('grade-2-term-1-math-unit-02', 2, 'math', 2),
  {
    id: 'grade-2-term-1-math-first-half',
    kind: 'semester',
    grade: 2,
    semester: 1,
    subject: 'math',
    sourceUnitIds: [
      'grade-2/term-1/math/unit-01',
      'grade-2/term-1/math/unit-02',
      'grade-2/term-1/math/unit-03',
      'grade-2/term-1/math/unit-04',
    ],
    stage: 'first-half',
    tasks: growthTasks('grade-2-term-1-math-first-half'),
  },
  unitGroup('grade-3-term-1-english-unit-01', 3, 'english', 1),
  unitGroup('grade-5-term-1-chinese-unit-01', 5, 'chinese', 1),
  unitGroup('grade-1-term-1-math-unit-01', 1, 'math', 1),
  unitGroup('grade-1-term-1-math-unit-02', 1, 'math', 2),
  unitGroup('grade-1-term-1-math-unit-03', 1, 'math', 3),
  unitGroup('grade-1-term-1-math-unit-04', 1, 'math', 4),
  unitGroup('grade-1-term-1-math-unit-05', 1, 'math', 5),
  unitGroup('grade-1-term-1-math-unit-06', 1, 'math', 6),
  unitGroup('grade-1-term-1-math-unit-07', 1, 'math', 7),
  unitGroup('grade-1-term-1-math-unit-08', 1, 'math', 8),
  unitGroup('grade-1-term-1-math-unit-09', 1, 'math', 9),
];
