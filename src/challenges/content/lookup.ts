import type { ChallengeGroupManifest, ChallengeManifest } from '../domain/types';

export function getUnitChallengeGroup(unitKey: string, manifest: ChallengeManifest): ChallengeGroupManifest | undefined {
  return manifest.groups.find((group) =>
    group.definition.kind === 'unit'
    && group.definition.sourceUnitIds.length === 1
    && group.definition.sourceUnitIds[0] === unitKey,
  );
}
