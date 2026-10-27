import type { ActivityDefinition, CurriculumUnit } from '../../content/types';
import { loadUnit } from '../../content/unitLoader';
import type { ChallengeGroupManifest, ChallengeManifest, ChallengeManifestValidationReport, ChallengeQuestionSnapshot, ValidationIssue } from '../domain/types';
import type { LearningTaskReference } from '../domain/studyRecommendations';
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
import { parseChallengeManifest } from './manifestSchema';
import { validateChallengeManifest } from './validateManifest';

const manifest: ChallengeManifest = parseChallengeManifest(rawManifest);

export interface LoadedPilotGroup {
  group: ChallengeGroupManifest;
  status: 'ready' | 'planned' | 'unavailable';
  candidates: ChallengeQuestionSnapshot[];
  disabledQuestionIds: string[];
  learningTasks: LearningTaskReference[];
  issues: ValidationIssue[];
}

export interface LoadedPilotContent {
  manifestVersion: string;
  groups: LoadedPilotGroup[];
  validation: ChallengeManifestValidationReport;
}

let cachedContent: Promise<LoadedPilotContent> | undefined;

async function buildPilotContent(): Promise<LoadedPilotContent> {
  const activitiesById = new Map<string, ActivityDefinition>();
  const sourceUnitByActivityId = new Map<string, string>();
  const unitsById = new Map<string, CurriculumUnit>();
  const learningTasksByUnitId = new Map<string, LearningTaskReference[]>();
  const knowledgePointIdsByActivityId = new Map<string, string[]>();
  for (const question of manifest.questions) {
    knowledgePointIdsByActivityId.set(question.activityId, question.knowledgePointIds);
  }
  const unitIdsToLoad = [...new Set(manifest.groups.flatMap(({ definition }) => [
    ...definition.sourceUnitIds,
    ...(definition.learningTaskUnitIds ?? []),
  ]))];

  await Promise.all(unitIdsToLoad.map(async (sourceUnitId) => {
    const unit = await loadUnit(sourceUnitId);
    if (!unit) throw new Error(`Could not load challenge source unit ${sourceUnitId}.`);
    unitsById.set(sourceUnitId, unit);
    const learningTasks = Object.values(unit.difficultyTracks).flatMap((track) => track.tasks.map((task): LearningTaskReference => {
      const activities = task.sessions.flatMap(({ activities: sessionActivities }) => sessionActivities);
      return {
        unitKey: sourceUnitId,
        difficulty: track.difficulty,
        taskId: task.id,
        title: task.title,
        activityIds: activities.map(({ id }) => id),
        knowledgePointIds: [...new Set(activities.flatMap(({ id }) => knowledgePointIdsByActivityId.get(id) ?? []))],
      };
    }));
    learningTasksByUnitId.set(sourceUnitId, learningTasks);
    for (const track of Object.values(unit.difficultyTracks)) {
      for (const task of track.tasks) {
        for (const session of task.sessions) {
          for (const activity of session.activities) {
            activitiesById.set(activity.id, activity);
            sourceUnitByActivityId.set(activity.id, sourceUnitId);
          }
        }
      }
    }
  }));

  for (const supplemental of [...pilotSupplementalActivities, ...pilotEnglishSupplementalActivities, ...pilotChineseSupplementalActivities, ...grade1MathUnit01SupplementalActivities, ...grade1MathUnit02SupplementalActivities, ...grade1MathUnit03SupplementalActivities, ...grade1MathUnit04SupplementalActivities, ...grade1MathUnit05SupplementalActivities, ...grade1MathUnit06SupplementalActivities, ...grade1MathUnit07SupplementalActivities, ...grade1MathUnit08SupplementalActivities, ...grade1MathUnit09SupplementalActivities, ...grade1Term1EnglishUnit01SupplementalActivities, ...grade1Term1EnglishUnit02SupplementalActivities, ...grade1Term1EnglishUnit03SupplementalActivities, ...grade1Term1EnglishUnit04SupplementalActivities, ...grade1Term1EnglishUnit05SupplementalActivities, ...grade1Term1EnglishUnit06SupplementalActivities, ...grade1Term2MathUnit01SupplementalActivities, ...grade1Term2MathUnit02SupplementalActivities, ...grade1Term2MathUnit03SupplementalActivities, ...grade1Term2MathUnit04SupplementalActivities, ...grade1Term2MathUnit05SupplementalActivities, ...grade1Term2MathUnit06SupplementalActivities, ...grade1Term2MathUnit07SupplementalActivities, ...grade1Term2MathUnit08SupplementalActivities, ...grade1Term2EnglishUnit01SupplementalActivities, ...grade1Term2EnglishUnit02SupplementalActivities, ...grade1Term2EnglishUnit03SupplementalActivities, ...grade1Term2EnglishUnit04SupplementalActivities, ...grade1Term2EnglishUnit05SupplementalActivities, ...grade1Term2EnglishUnit06SupplementalActivities, ...grade1Term2ChineseSemesterSupplementalActivities, ...grade2Term1ChineseUnit01SupplementalActivities, ...grade2Term1ChineseUnit02SupplementalActivities, ...grade2Term1ChineseUnit03SupplementalActivities, ...grade2Term1ChineseUnit04SupplementalActivities, ...grade2Term1ChineseUnit05SupplementalActivities, ...grade2Term1ChineseUnit06SupplementalActivities, ...grade2Term1ChineseUnit07SupplementalActivities, ...grade2Term1ChineseUnit08SupplementalActivities, ...grade2Term1MathUnit01SupplementalActivities, ...grade2Term1MathUnit03SupplementalActivities, ...grade2Term1MathUnit04SupplementalActivities, ...grade2Term1MathUnit05SupplementalActivities, ...grade2Term1MathUnit06SupplementalActivities, ...grade2Term1MathUnit07SupplementalActivities, ...grade2Term1MathUnit08SupplementalActivities, ...grade2Term1MathUnit09SupplementalActivities, ...grade2Term1EnglishUnit01SupplementalActivities, ...grade2Term1EnglishUnit02SupplementalActivities, ...grade2Term1EnglishUnit03SupplementalActivities, ...grade2Term1EnglishUnit04SupplementalActivities, ...grade2Term1EnglishUnit05SupplementalActivities]) {
    activitiesById.set(supplemental.activity.id, supplemental.activity);
    sourceUnitByActivityId.set(supplemental.activity.id, supplemental.sourceUnitId);
  }

  const validation = await validateChallengeManifest(manifest, activitiesById, sourceUnitByActivityId, unitsById);
  const questionById = new Map(manifest.questions.map((question) => [question.questionId, question]));
  const disabledQuestionIds = manifest.questions
    .filter(({ lifecycle }) => lifecycle === 'disabled')
    .map(({ questionId }) => questionId);
  const changedFingerprints = new Map(validation.contentChanges.map((change) => [change.questionId, change.currentContentFingerprint]));
  const groups = manifest.groups.map((group): LoadedPilotGroup => {
    const id = group.definition.id;
    const candidates: ChallengeQuestionSnapshot[] = [];
    for (const questionId of group.questionIds) {
      const question = questionById.get(questionId);
      const activity = question && activitiesById.get(question.activityId);
      if (!question || !activity) continue;
      candidates.push({
        ...question,
        activity,
        contentFingerprint: changedFingerprints.get(questionId) ?? question.approvedContentFingerprint,
      });
    }
    const status = validation.groupStatusById[id] ?? 'unavailable';
    const issues = [...validation.globalIssues, ...(validation.groupIssuesById[id] ?? [])];
    return {
      group,
      status,
      candidates: status === 'ready' ? candidates : [],
      disabledQuestionIds,
      learningTasks: (group.definition.learningTaskUnitIds ?? group.definition.sourceUnitIds)
        .flatMap((sourceUnitId) => learningTasksByUnitId.get(sourceUnitId) ?? []),
      issues,
    };
  });
  return { manifestVersion: manifest.version, groups, validation };
}

export function loadPilotChallengeContent(): Promise<LoadedPilotContent> {
  if (!cachedContent) {
    cachedContent = buildPilotContent().catch((error: unknown) => {
      cachedContent = undefined;
      throw error;
    });
  }
  return cachedContent;
}
