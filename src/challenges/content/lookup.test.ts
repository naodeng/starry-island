import { describe, expect, it } from 'vitest';
import type { ChallengeGroupManifest, ChallengeManifest } from '../domain/types';
import { getUnitChallengeGroup } from './lookup';

const unitKey = 'grade-2/term-1/math/unit-01';

function group(id: string, kind: 'unit' | 'semester', sourceUnitIds: string[]): ChallengeGroupManifest {
  return {
    definition: {
      id,
      kind,
      grade: 2,
      semester: 1,
      subject: 'math',
      sourceUnitIds,
      ...(kind === 'semester' ? { stage: 'first-half' as const } : {}),
      coreKnowledgePointIds: ['length-units'],
      mappingEvidence: { source: 'test source', checkedAt: '2026-10-21', notes: 'test mapping' },
      tasks: [
        { id: `${id}/basic-01`, difficulty: 'basic', targetCount: 15, requiredKnowledgePointIds: ['length-units'] },
        { id: `${id}/basic-02`, difficulty: 'basic', targetCount: 15, requiredKnowledgePointIds: ['length-units'] },
        { id: `${id}/advanced-01`, difficulty: 'advanced', targetCount: 15, requiredKnowledgePointIds: ['length-units'] },
        { id: `${id}/advanced-02`, difficulty: 'advanced', targetCount: 15, requiredKnowledgePointIds: ['length-units'] },
        { id: `${id}/high-01`, difficulty: 'high', targetCount: 15, requiredKnowledgePointIds: ['length-units'] },
      ],
    },
    questionIds: [],
    releaseIntent: 'planned',
  };
}

describe('getUnitChallengeGroup', () => {
  it('returns only an exact unit group and ignores semester groups that include the unit', () => {
    const unitGroup = group('grade-2-term-1-math-unit-01', 'unit', [unitKey]);
    const semesterGroup = group('grade-2-term-1-math-first-half', 'semester', [unitKey, 'grade-2/term-1/math/unit-02']);
    const manifest = { version: 'test', questions: [], groups: [semesterGroup, unitGroup] } satisfies ChallengeManifest;

    expect(getUnitChallengeGroup(unitKey, manifest)).toBe(unitGroup);
  });

  it('does not return a group when the unit has no exact registered unit mapping', () => {
    const manifest = {
      version: 'test',
      questions: [],
      groups: [group('other-unit', 'unit', ['grade-2/term-1/math/unit-02'])],
    } satisfies ChallengeManifest;

    expect(getUnitChallengeGroup(unitKey, manifest)).toBeUndefined();
  });
});
