import { describe, expect, it } from 'vitest';
import type { ChallengeManifest } from '../domain/types';
import { loadChallengeQualityInputs } from './qualityInputs';
import rawManifest from './pilot-manifest.json';
import { pilotSupplementalActivities } from './pilotSupplementalActivities';

function clonePilotManifest(): ChallengeManifest {
  return structuredClone(rawManifest) as unknown as ChallengeManifest;
}

describe('loadChallengeQualityInputs', () => {
  it('keeps supplemental question sources correct when another unit group is listed first', async () => {
    const manifest = clonePilotManifest();
    const currentUnitGroup = manifest.groups.find(({ definition }) => definition.kind === 'unit')!;
    const plannedUnitGroup = structuredClone(currentUnitGroup);
    plannedUnitGroup.definition.id = 'grade-2-term-1-math-unit-01-planned';
    plannedUnitGroup.definition.sourceUnitIds = ['grade-2/term-1/math/unit-01'];
    plannedUnitGroup.questionIds = [];
    plannedUnitGroup.releaseIntent = 'planned';
    plannedUnitGroup.definition.tasks = plannedUnitGroup.definition.tasks.map((task, index) => ({
      ...task,
      id: `${plannedUnitGroup.definition.id}/task-${index + 1}`,
    })) as ChallengeManifest['groups'][number]['definition']['tasks'];
    manifest.groups.unshift(plannedUnitGroup);

    const input = await loadChallengeQualityInputs(manifest);
    const supplemental = pilotSupplementalActivities[0];

    expect(input.manifest.groups[0].definition.id).toBe(plannedUnitGroup.definition.id);
    expect(input.sourceUnitByActivityId.get(supplemental.activity.id)).toBe('grade-2/term-1/math/unit-02');
  });

  it('loads supplemental question sources for a semester-only manifest', async () => {
    const manifest = clonePilotManifest();
    manifest.groups = manifest.groups.filter(({ definition }) => definition.kind === 'semester');

    const input = await loadChallengeQualityInputs(manifest);

    expect(input.manifest.groups).toHaveLength(1);
    expect(input.manifest.groups[0].definition.kind).toBe('semester');
    expect(input.sourceUnitByActivityId.get(pilotSupplementalActivities[0].activity.id)).toBe('grade-2/term-1/math/unit-02');
  });
});
