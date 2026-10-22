import type { ActivityDefinition, CurriculumUnit } from '../../content/types';
import { loadUnit } from '../../content/unitLoader';
import type { ChallengeManifest, ChallengeQualityInputs } from '../domain/types';
import { parseChallengeManifest } from './manifestSchema';
import rawManifest from './pilot-manifest.json';
import { pilotSupplementalActivities } from './pilotSupplementalActivities';

function registerActivity(
  activity: ActivityDefinition,
  sourceUnitId: string,
  activitiesById: Map<string, ActivityDefinition>,
  sourceUnitByActivityId: Map<string, string>,
) {
  const existingSourceUnitId = sourceUnitByActivityId.get(activity.id);
  if (existingSourceUnitId) {
    throw new Error(`Activity ID ${activity.id} is defined more than once (${existingSourceUnitId}, ${sourceUnitId}).`);
  }
  activitiesById.set(activity.id, activity);
  sourceUnitByActivityId.set(activity.id, sourceUnitId);
}

export async function loadChallengeQualityInputs(): Promise<ChallengeQualityInputs> {
  const manifest: ChallengeManifest = parseChallengeManifest(rawManifest);
  const activitiesById = new Map<string, ActivityDefinition>();
  const sourceUnitByActivityId = new Map<string, string>();
  const unitsById = new Map<string, CurriculumUnit>();
  const sourceUnitIds = [...new Set(manifest.groups.flatMap(({ definition }) => definition.sourceUnitIds))];

  await Promise.all(sourceUnitIds.map(async (sourceUnitId) => {
    const unit = await loadUnit(sourceUnitId);
    if (!unit) throw new Error(`Could not load challenge source unit ${sourceUnitId}.`);
    unitsById.set(sourceUnitId, unit);
    for (const track of Object.values(unit.difficultyTracks)) {
      for (const task of track.tasks) {
        for (const session of task.sessions) {
          for (const activity of session.activities) {
            registerActivity(activity, sourceUnitId, activitiesById, sourceUnitByActivityId);
          }
        }
      }
    }
  }));

  const unitChallengeGroup = manifest.groups.find(({ definition }) => definition.kind === 'unit');
  const supplementalUnitId = unitChallengeGroup?.definition.sourceUnitIds[0];
  const referencedSupplementalIds = new Set(pilotSupplementalActivities
    .filter(({ activity }) => manifest.questions.some((question) => question.activityId === activity.id))
    .map(({ activity }) => activity.id));
  if (referencedSupplementalIds.size > 0 && !supplementalUnitId) {
    throw new Error('Supplemental challenge activities need a declared unit group to establish their curriculum source.');
  }
  if (supplementalUnitId) {
    for (const supplemental of pilotSupplementalActivities) {
      if (!referencedSupplementalIds.has(supplemental.activity.id)) continue;
      registerActivity(supplemental.activity, supplementalUnitId, activitiesById, sourceUnitByActivityId);
    }
  }

  return { manifest, activitiesById, sourceUnitByActivityId, unitsById };
}
