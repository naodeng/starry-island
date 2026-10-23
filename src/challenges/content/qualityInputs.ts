import type { ActivityDefinition, CurriculumUnit } from '../../content/types';
import { loadUnit } from '../../content/unitLoader';
import type { ChallengeManifest, ChallengeQualityInputs } from '../domain/types';
import { parseChallengeManifest } from './manifestSchema';
import rawManifest from './pilot-manifest.json';
import { pilotSupplementalActivities } from './pilotSupplementalActivities';
import { pilotEnglishSupplementalActivities } from './pilotEnglishSupplementalActivities';
import { pilotChineseSupplementalActivities } from './pilotChineseSupplementalActivities';
import { grade1MathUnit01SupplementalActivities } from './grade1MathUnit01SupplementalActivities';
import { grade1MathUnit02SupplementalActivities } from './grade1MathUnit02SupplementalActivities';

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

export async function loadChallengeQualityInputs(manifestValue: unknown = rawManifest): Promise<ChallengeQualityInputs> {
  const manifest: ChallengeManifest = parseChallengeManifest(manifestValue);
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

  const supplementalActivities = [...pilotSupplementalActivities, ...pilotEnglishSupplementalActivities, ...pilotChineseSupplementalActivities, ...grade1MathUnit01SupplementalActivities, ...grade1MathUnit02SupplementalActivities];
  const referencedSupplementalIds = new Set(supplementalActivities
    .filter(({ activity }) => manifest.questions.some((question) => question.activityId === activity.id))
    .map(({ activity }) => activity.id));
  for (const supplemental of supplementalActivities) {
    if (!referencedSupplementalIds.has(supplemental.activity.id)) continue;
    if (!sourceUnitIds.includes(supplemental.sourceUnitId)) {
      throw new Error(`Supplemental challenge activity ${supplemental.activity.id} references undeclared source unit ${supplemental.sourceUnitId}.`);
    }
    registerActivity(supplemental.activity, supplemental.sourceUnitId, activitiesById, sourceUnitByActivityId);
  }

  return { manifest, activitiesById, sourceUnitByActivityId, unitsById };
}
