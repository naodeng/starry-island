import type { ActivityDefinition, CurriculumUnit } from '../../content/types';
import { loadUnit } from '../../content/unitLoader';
import type { ChallengeManifest, ChallengeQualityInputs } from '../domain/types';
import { parseChallengeManifest } from './manifestSchema';
import rawManifest from './pilotManifest';
import { pilotSupplementalActivities } from './pilotSupplementalActivities';
import { pilotEnglishSupplementalActivities } from './pilotEnglishSupplementalActivities';
import { pilotChineseSupplementalActivities } from './pilotChineseSupplementalActivities';
import { grade1MathUnit01SupplementalActivities } from './grade1MathUnit01SupplementalActivities';
import { grade1MathUnit02SupplementalActivities } from './grade1MathUnit02SupplementalActivities';
import { grade1MathUnit03SupplementalActivities } from './grade1MathUnit03SupplementalActivities';
import { grade1MathUnit04SupplementalActivities } from './grade1MathUnit04SupplementalActivities';
import { grade1MathUnit05SupplementalActivities } from './grade1MathUnit05SupplementalActivities';
import { grade1MathUnit06SupplementalActivities } from './grade1MathUnit06SupplementalActivities';
import { grade1MathUnit07SupplementalActivities } from './grade1MathUnit07SupplementalActivities';
import { grade1MathUnit08SupplementalActivities } from './grade1MathUnit08SupplementalActivities';
import { grade1MathUnit09SupplementalActivities } from './grade1MathUnit09SupplementalActivities';
import { grade1Term1EnglishUnit01SupplementalActivities } from './grade1Term1EnglishUnit01SupplementalActivities';
import { grade1Term1EnglishUnit02SupplementalActivities } from './grade1Term1EnglishUnit02SupplementalActivities';
import { grade1Term1EnglishUnit03SupplementalActivities } from './grade1Term1EnglishUnit03SupplementalActivities';
import { grade1Term1EnglishUnit04SupplementalActivities } from './grade1Term1EnglishUnit04SupplementalActivities';
import { grade1Term1EnglishUnit05SupplementalActivities } from './grade1Term1EnglishUnit05SupplementalActivities';
import { grade1Term1EnglishUnit06SupplementalActivities } from './grade1Term1EnglishUnit06SupplementalActivities';
import { grade1Term2MathUnit01SupplementalActivities } from './grade1Term2MathUnit01SupplementalActivities';
import { grade1Term2MathUnit02SupplementalActivities } from './grade1Term2MathUnit02SupplementalActivities';
import { grade1Term2MathUnit03SupplementalActivities } from './grade1Term2MathUnit03SupplementalActivities';
import { grade1Term2MathUnit04SupplementalActivities } from './grade1Term2MathUnit04SupplementalActivities';
import { grade1Term2MathUnit05SupplementalActivities } from './grade1Term2MathUnit05SupplementalActivities';
import { grade1Term2MathUnit06SupplementalActivities } from './grade1Term2MathUnit06SupplementalActivities';
import { grade1Term2MathUnit07SupplementalActivities } from './grade1Term2MathUnit07SupplementalActivities';
import { grade1Term2MathUnit08SupplementalActivities } from './grade1Term2MathUnit08SupplementalActivities';
import { grade1Term2EnglishUnit01SupplementalActivities } from './grade1Term2EnglishUnit01SupplementalActivities';
import { grade1Term2EnglishUnit02SupplementalActivities } from './grade1Term2EnglishUnit02SupplementalActivities';
import { grade1Term2EnglishUnit03SupplementalActivities } from './grade1Term2EnglishUnit03SupplementalActivities';
import { grade1Term2EnglishUnit04SupplementalActivities } from './grade1Term2EnglishUnit04SupplementalActivities';
import { grade1Term2EnglishUnit05SupplementalActivities } from './grade1Term2EnglishUnit05SupplementalActivities';
import { grade1Term2EnglishUnit06SupplementalActivities } from './grade1Term2EnglishUnit06SupplementalActivities';
import { grade1Term2ChineseSemesterSupplementalActivities } from './grade1Term2ChineseSemesterSupplementalActivities';
import { grade2Term1ChineseUnit01SupplementalActivities } from './grade2Term1ChineseUnit01SupplementalActivities';
import { grade2Term1ChineseUnit02SupplementalActivities } from './grade2Term1ChineseUnit02SupplementalActivities';
import { grade2Term1ChineseUnit03SupplementalActivities } from './grade2Term1ChineseUnit03SupplementalActivities';
import { grade2Term1ChineseUnit04SupplementalActivities } from './grade2Term1ChineseUnit04SupplementalActivities';
import { grade2Term1ChineseUnit05SupplementalActivities } from './grade2Term1ChineseUnit05SupplementalActivities';
import { grade2Term1ChineseUnit06SupplementalActivities } from './grade2Term1ChineseUnit06SupplementalActivities';
import { grade2Term1ChineseUnit07SupplementalActivities } from './grade2Term1ChineseUnit07SupplementalActivities';
import { grade2Term1ChineseUnit08SupplementalActivities } from './grade2Term1ChineseUnit08SupplementalActivities';
import { grade2Term2SupplementalActivities } from './grade2Term2SupplementalActivities';
import { grade2Term1MathUnit01SupplementalActivities } from './grade2Term1MathUnit01SupplementalActivities';
import { grade2Term1MathUnit03SupplementalActivities } from './grade2Term1MathUnit03SupplementalActivities';
import { grade2Term1MathUnit04SupplementalActivities } from './grade2Term1MathUnit04SupplementalActivities';
import { grade2Term1MathUnit05SupplementalActivities } from './grade2Term1MathUnit05SupplementalActivities';
import { grade2Term1MathUnit06SupplementalActivities } from './grade2Term1MathUnit06SupplementalActivities';
import { grade2Term1MathUnit07SupplementalActivities } from './grade2Term1MathUnit07SupplementalActivities';
import { grade2Term1MathUnit08SupplementalActivities } from './grade2Term1MathUnit08SupplementalActivities';
import { grade2Term1MathUnit09SupplementalActivities } from './grade2Term1MathUnit09SupplementalActivities';
import { grade2Term1EnglishUnit01SupplementalActivities } from './grade2Term1EnglishUnit01SupplementalActivities';
import { grade2Term1EnglishUnit02SupplementalActivities } from './grade2Term1EnglishUnit02SupplementalActivities';
import { grade2Term1EnglishUnit03SupplementalActivities } from './grade2Term1EnglishUnit03SupplementalActivities';
import { grade2Term1EnglishUnit04SupplementalActivities } from './grade2Term1EnglishUnit04SupplementalActivities';
import { grade2Term1EnglishUnit05SupplementalActivities } from './grade2Term1EnglishUnit05SupplementalActivities';
import { grade2Term1EnglishUnit06SupplementalActivities } from './grade2Term1EnglishUnit06SupplementalActivities';

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
  const unitIdsToLoad = [...new Set(manifest.groups.flatMap(({ definition }) => [
    ...definition.sourceUnitIds,
    ...(definition.learningTaskUnitIds ?? []),
  ]))];

  await Promise.all(unitIdsToLoad.map(async (sourceUnitId) => {
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

  const supplementalActivities = [...pilotSupplementalActivities, ...pilotEnglishSupplementalActivities, ...pilotChineseSupplementalActivities, ...grade1MathUnit01SupplementalActivities, ...grade1MathUnit02SupplementalActivities, ...grade1MathUnit03SupplementalActivities, ...grade1MathUnit04SupplementalActivities, ...grade1MathUnit05SupplementalActivities, ...grade1MathUnit06SupplementalActivities, ...grade1MathUnit07SupplementalActivities, ...grade1MathUnit08SupplementalActivities, ...grade1MathUnit09SupplementalActivities, ...grade1Term1EnglishUnit01SupplementalActivities, ...grade1Term1EnglishUnit02SupplementalActivities, ...grade1Term1EnglishUnit03SupplementalActivities, ...grade1Term1EnglishUnit04SupplementalActivities, ...grade1Term1EnglishUnit05SupplementalActivities, ...grade1Term1EnglishUnit06SupplementalActivities, ...grade1Term2MathUnit01SupplementalActivities, ...grade1Term2MathUnit02SupplementalActivities, ...grade1Term2MathUnit03SupplementalActivities, ...grade1Term2MathUnit04SupplementalActivities, ...grade1Term2MathUnit05SupplementalActivities, ...grade1Term2MathUnit06SupplementalActivities, ...grade1Term2MathUnit07SupplementalActivities, ...grade1Term2MathUnit08SupplementalActivities, ...grade1Term2EnglishUnit01SupplementalActivities, ...grade1Term2EnglishUnit02SupplementalActivities, ...grade1Term2EnglishUnit03SupplementalActivities, ...grade1Term2EnglishUnit04SupplementalActivities, ...grade1Term2EnglishUnit05SupplementalActivities, ...grade1Term2EnglishUnit06SupplementalActivities, ...grade1Term2ChineseSemesterSupplementalActivities, ...grade2Term1ChineseUnit01SupplementalActivities, ...grade2Term1ChineseUnit02SupplementalActivities, ...grade2Term1ChineseUnit03SupplementalActivities, ...grade2Term1ChineseUnit04SupplementalActivities, ...grade2Term1ChineseUnit05SupplementalActivities, ...grade2Term1ChineseUnit06SupplementalActivities, ...grade2Term1ChineseUnit07SupplementalActivities, ...grade2Term1ChineseUnit08SupplementalActivities, ...grade2Term2SupplementalActivities, ...grade2Term1MathUnit01SupplementalActivities, ...grade2Term1MathUnit03SupplementalActivities, ...grade2Term1MathUnit04SupplementalActivities, ...grade2Term1MathUnit05SupplementalActivities, ...grade2Term1MathUnit06SupplementalActivities, ...grade2Term1MathUnit07SupplementalActivities, ...grade2Term1MathUnit08SupplementalActivities, ...grade2Term1MathUnit09SupplementalActivities, ...grade2Term1EnglishUnit01SupplementalActivities, ...grade2Term1EnglishUnit02SupplementalActivities, ...grade2Term1EnglishUnit03SupplementalActivities, ...grade2Term1EnglishUnit04SupplementalActivities, ...grade2Term1EnglishUnit05SupplementalActivities, ...grade2Term1EnglishUnit06SupplementalActivities];
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
