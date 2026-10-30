import { describe, expect, it } from 'vitest';
import pilotManifest from './pilotManifest';
import { growthGroups } from './growthGroups';

describe('challenge growth group index', () => {
  it('matchesChallengeGrowthFieldsInOfficialGroupsWithoutQuestionMetadata', () => {
    const expected = pilotManifest.groups.map(({ definition }) => ({
      id: definition.id,
      kind: definition.kind,
      grade: definition.grade,
      semester: definition.semester,
      subject: definition.subject,
      sourceUnitIds: definition.sourceUnitIds,
      ...(definition.stage ? { stage: definition.stage } : {}),
      tasks: definition.tasks.map(({ id }) => ({ id })),
    }));

    expect([...growthGroups].sort((left, right) => left.id.localeCompare(right.id)))
      .toEqual([...expected].sort((left, right) => left.id.localeCompare(right.id)));
    expect(JSON.stringify(growthGroups)).not.toMatch(/questionIds|questionId|prompt|answer/i);
  });
});
