import type { ActivityDefinition, CurriculumUnit } from '../../content/types';
import { loadUnit } from '../../content/unitLoader';
import type { ChallengeGroupManifest, ChallengeManifest, ChallengeManifestValidationReport, ChallengeQuestionSnapshot, ValidationIssue } from '../domain/types';
import type { LearningTaskReference } from '../domain/studyRecommendations';
import rawManifest from './pilot-manifest.json';
import { pilotSupplementalActivities } from './pilotSupplementalActivities';
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
  const sourceUnitIds = [...new Set(manifest.groups.flatMap(({ definition }) => definition.sourceUnitIds))];

  await Promise.all(sourceUnitIds.map(async (sourceUnitId) => {
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

  for (const supplemental of pilotSupplementalActivities) {
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
      learningTasks: group.definition.sourceUnitIds.flatMap((sourceUnitId) => learningTasksByUnitId.get(sourceUnitId) ?? []),
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
