import type { ActivityDefinition, CurriculumUnit, Difficulty } from '../../content/types';
import { fingerprintActivity } from './fingerprint';
import type {
  ChallengeGroupManifest,
  ChallengeManifest,
  ChallengeQuestionRecord,
  ChallengeReleaseStatus,
  PilotManifestValidationReport,
  ValidationIssue,
} from '../domain/types';

const DIFFICULTIES: readonly Difficulty[] = ['basic', 'advanced', 'high'];
const SAFE_ACTIVITY_KINDS = new Set(['choice', 'match', 'order', 'categorize', 'arithmetic']);

function pathScope(unitId: string): { grade?: number; semester?: number; subject?: string } {
  const [gradeSegment, termSegment, subject] = unitId.split('/');
  const grade = /^grade-(\d+)$/.exec(gradeSegment ?? '');
  const semester = /^term-(\d+)$/.exec(termSegment ?? '');
  return {
    grade: grade ? Number(grade[1]) : undefined,
    semester: semester ? Number(semester[1]) : undefined,
    subject,
  };
}

function addIssue(
  errors: ValidationIssue[],
  code: string,
  path: string,
  message: string,
  groupId?: string,
) {
  errors.push({ code, path, message, ...(groupId ? { groupId } : {}) });
}

function compatibleGroupSource(
  group: ChallengeGroupManifest,
  unitId: string,
  unitsById: ReadonlyMap<string, CurriculumUnit>,
): boolean {
  const unit = unitsById.get(unitId);
  if (!unit) return false;
  const scope = pathScope(unitId);
  return scope.grade === group.definition.grade
    && scope.semester === group.definition.semester
    && scope.subject === group.definition.subject;
}

function questionIsEligible(question: ChallengeQuestionRecord, activity: ActivityDefinition | undefined): boolean {
  const hasApprovalRecord = Boolean(question.approvedBy?.trim()) && Number.isFinite(Date.parse(question.approvedAt ?? ''));
  return question.lifecycle === 'active'
    && question.approved
    && hasApprovalRecord
    && question.answerLeakageReviewed
    && activity !== undefined
    && SAFE_ACTIVITY_KINDS.has(activity.kind);
}

export async function validatePilotManifest(
  manifest: ChallengeManifest,
  activitiesById: ReadonlyMap<string, ActivityDefinition>,
  sourceUnitByActivityId: ReadonlyMap<string, string>,
  unitsById: ReadonlyMap<string, CurriculumUnit>,
  subtleCrypto: SubtleCrypto = globalThis.crypto.subtle,
): Promise<PilotManifestValidationReport> {
  const errors: ValidationIssue[] = [];
  const contentChanges: PilotManifestValidationReport['contentChanges'] = [];
  const globalIssues: ValidationIssue[] = [];
  const questionById = new Map<string, ChallengeQuestionRecord>();
  const questionCounts = new Map<string, number>();
  const activityCounts = new Map<string, number>();
  const fingerprintQuestions = new Map<string, string[]>();
  const currentFingerprints = new Map<string, string>();

  for (const [index, question] of manifest.questions.entries()) {
    const path = `questions[${index}]`;
    questionCounts.set(question.questionId, (questionCounts.get(question.questionId) ?? 0) + 1);
    activityCounts.set(question.activityId, (activityCounts.get(question.activityId) ?? 0) + 1);
    if (!questionById.has(question.questionId)) questionById.set(question.questionId, question);

    const activity = activitiesById.get(question.activityId);
    if (!activity) {
      addIssue(errors, 'missing-activity', `${path}.activityId`, `Activity ${question.activityId} was not found.`);
      continue;
    }
    if (activity.id !== question.activityId) {
      addIssue(errors, 'activity-id-mismatch', `${path}.activityId`, 'The registry key does not match ActivityDefinition.id.');
    }
    if (!sourceUnitByActivityId.has(question.activityId)) {
      addIssue(errors, 'missing-activity-source', `${path}.activityId`, 'The source unit for this activity is unknown.');
    }
    if (question.approved && (!question.approvedBy?.trim() || !Number.isFinite(Date.parse(question.approvedAt ?? '')))) {
      addIssue(errors, 'missing-approval-record', `${path}.approvedAt`, 'Approved questions need an author and valid approval date.');
    }

    const currentFingerprint = await fingerprintActivity(activity, subtleCrypto);
    currentFingerprints.set(question.questionId, currentFingerprint);
    const matchingQuestionIds = fingerprintQuestions.get(currentFingerprint) ?? [];
    matchingQuestionIds.push(question.questionId);
    fingerprintQuestions.set(currentFingerprint, matchingQuestionIds);
    if (currentFingerprint !== question.approvedContentFingerprint) {
      contentChanges.push({
        questionId: question.questionId,
        approvedContentFingerprint: question.approvedContentFingerprint,
        currentContentFingerprint: currentFingerprint,
      });
    }
  }

  for (const [questionId, count] of questionCounts) {
    if (count > 1) addIssue(errors, 'duplicate-question-id', 'questions', `Question ID ${questionId} is registered ${count} times.`);
  }
  for (const [activityId, count] of activityCounts) {
    if (count > 1) addIssue(errors, 'duplicate-activity-id', 'questions', `Activity ID ${activityId} is registered ${count} times.`);
  }
  for (const questionIds of fingerprintQuestions.values()) {
    if (questionIds.length > 1) {
      addIssue(errors, 'duplicate-content-fingerprint', 'questions', `Identical content is registered under ${questionIds.join(', ')}.`);
    }
  }

  const kinds = manifest.groups.map(({ definition }) => definition.kind);
  if (kinds.filter((kind) => kind === 'unit').length !== 1 || kinds.filter((kind) => kind === 'semester').length !== 1 || kinds.length !== 2) {
    const issue = { code: 'invalid-group-count', path: 'groups', message: 'Pilot manifest must contain exactly one unit group and one semester group.' };
    errors.push(issue);
    globalIssues.push(issue);
  }
  const groupIds = new Set<string>();
  for (const group of manifest.groups) {
    if (groupIds.has(group.definition.id)) {
      const issue = { code: 'duplicate-group-id', path: `groups.${group.definition.id}`, message: 'Group IDs must be unique.', groupId: group.definition.id };
      errors.push(issue);
    }
    groupIds.add(group.definition.id);
  }

  const groupErrors = new Map<string, ValidationIssue[]>();
  function groupIssue(group: ChallengeGroupManifest, code: string, path: string, message: string) {
    const issue = { code, path, message, groupId: group.definition.id };
    errors.push(issue);
    const issues = groupErrors.get(group.definition.id) ?? [];
    issues.push(issue);
    groupErrors.set(group.definition.id, issues);
  }

  for (const group of manifest.groups) {
    const { definition } = group;
    const groupId = definition.id;
    if (definition.kind === 'unit') {
      if (definition.sourceUnitIds.length !== 1) {
        groupIssue(group, 'invalid-unit-source', `groups.${groupId}.sourceUnitIds`, 'A unit challenge must reference exactly one formal unit.');
      }
    } else {
      const evidence = definition.mappingEvidence;
      if (!definition.stage || definition.sourceUnitIds.length === 0 || !evidence?.source?.trim() || !evidence?.notes?.trim() || !Number.isFinite(Date.parse(evidence?.checkedAt ?? ''))) {
        groupIssue(group, 'missing-stage-evidence', `groups.${groupId}.mappingEvidence`, 'A semester stage needs a stage, source units, and dated mapping evidence.');
      }
    }
    if (definition.coreKnowledgePointIds.length === 0 || new Set(definition.coreKnowledgePointIds).size !== definition.coreKnowledgePointIds.length) {
      groupIssue(group, 'invalid-core-knowledge-points', `groups.${groupId}.coreKnowledgePointIds`, 'Core knowledge point IDs must be non-empty and unique.');
    }
    for (const unitId of definition.sourceUnitIds) {
      const unit = unitsById.get(unitId);
      if (!compatibleGroupSource(group, unitId, unitsById)) {
        groupIssue(group, 'unknown-unit-source', `groups.${groupId}.sourceUnitIds`, `Unknown or mismatched source unit ${unitId}.`);
      } else if (definition.kind === 'unit' && (unit?.type !== 'unit' || unit.formalUnitNumber === null || !unit.achievementEligible)) {
        groupIssue(group, 'invalid-unit-source', `groups.${groupId}.sourceUnitIds`, `Source ${unitId} is not a formal numbered unit.`);
      }
    }

    const tasks = Array.isArray(definition.tasks) ? definition.tasks : [];
    const difficultyCounts = Object.fromEntries(DIFFICULTIES.map((difficulty) => [difficulty, tasks.filter((task) => task.difficulty === difficulty).length])) as Record<Difficulty, number>;
    if (tasks.length !== 5 || difficultyCounts.basic !== 2 || difficultyCounts.advanced !== 2 || difficultyCounts.high !== 1) {
      groupIssue(group, 'invalid-task-structure', `groups.${groupId}.tasks`, 'Each group needs two basic, two advanced, and one high task.');
    }
    const taskIds = new Set<string>();
    for (const task of tasks) {
      if (taskIds.has(task.id)) groupIssue(group, 'duplicate-task-id', `groups.${groupId}.tasks`, `Duplicate task ID ${task.id}.`);
      taskIds.add(task.id);
      const expectedTargetCount = definition.kind === 'unit' ? 15 : 25;
      if (task.targetCount !== expectedTargetCount) {
        groupIssue(group, 'invalid-target-count', `groups.${groupId}.tasks.${task.id}.targetCount`, `Expected ${expectedTargetCount} questions for this group kind.`);
      }
      if (task.requiredKnowledgePointIds.length === 0 || task.requiredKnowledgePointIds.some((id) => !definition.coreKnowledgePointIds.includes(id))) {
        groupIssue(group, 'invalid-task-knowledge-points', `groups.${groupId}.tasks.${task.id}.requiredKnowledgePointIds`, 'Task knowledge points must be a non-empty subset of group core knowledge points.');
      }
      if (task.difficulty === 'high' && new Set(task.requiredKnowledgePointIds).size < 2) {
        groupIssue(group, 'insufficient-high-task-integration', `groups.${groupId}.tasks.${task.id}.requiredKnowledgePointIds`, 'A high task must assemble questions that jointly cover at least two core knowledge points.');
      }
    }
    for (const difficulty of ['basic', 'advanced'] as const) {
      const paired = tasks.filter((task) => task.difficulty === difficulty);
      const pairCoverage = new Set(paired.flatMap((task) => task.requiredKnowledgePointIds));
      if (definition.coreKnowledgePointIds.some((id) => !pairCoverage.has(id))) {
        groupIssue(group, 'incomplete-tier-coverage', `groups.${groupId}.tasks`, `The ${difficulty} pair does not cover every core knowledge point.`);
      }
    }

    const groupQuestionIdSet = new Set<string>();
    const groupQuestions: ChallengeQuestionRecord[] = [];
    for (const questionId of group.questionIds) {
      if (groupQuestionIdSet.has(questionId)) {
        groupIssue(group, 'duplicate-group-question', `groups.${groupId}.questionIds`, `Question ${questionId} occurs more than once in this group.`);
      }
      groupQuestionIdSet.add(questionId);
      const question = questionById.get(questionId);
      if (!question) {
        groupIssue(group, 'missing-question', `groups.${groupId}.questionIds`, `Question ${questionId} is not registered.`);
        continue;
      }
      groupQuestions.push(question);
      const activity = activitiesById.get(question.activityId);
      if ((questionCounts.get(questionId) ?? 0) > 1) groupIssue(group, 'duplicate-question-id', `groups.${groupId}.questionIds`, `Question ${questionId} is not globally unique.`);
      if ((activityCounts.get(question.activityId) ?? 0) > 1) groupIssue(group, 'duplicate-activity-id', `groups.${groupId}.questionIds`, `Activity ${question.activityId} is registered more than once.`);
      if (!questionIsEligible(question, activity)) {
        const hasApprovalRecord = Boolean(question.approvedBy?.trim()) && Number.isFinite(Date.parse(question.approvedAt ?? ''));
        const code = !activity ? 'missing-activity'
          : activity.kind === 'measurement' ? 'unsupported-activity-kind'
            : question.approved && !hasApprovalRecord ? 'missing-approval-record'
              : !question.answerLeakageReviewed ? 'answer-leakage-not-reviewed'
                : 'ineligible-question';
        groupIssue(group, code, `groups.${groupId}.questionIds`, `Question ${questionId} is not an eligible challenge candidate.`);
      }
      if (activity && !SAFE_ACTIVITY_KINDS.has(activity.kind)) {
        groupIssue(group, 'unsupported-activity-kind', `groups.${groupId}.questionIds`, `${activity.kind} is not supported by the challenge renderer.`);
      }
      const sourceUnitId = sourceUnitByActivityId.get(question.activityId);
      if (!sourceUnitId || !definition.sourceUnitIds.includes(sourceUnitId)) {
        groupIssue(group, 'question-outside-group-scope', `groups.${groupId}.questionIds`, `Question ${questionId} does not belong to this group’s source units.`);
      }
      const currentFingerprint = currentFingerprints.get(questionId);
      if (currentFingerprint && (fingerprintQuestions.get(currentFingerprint)?.length ?? 0) > 1) {
        groupIssue(group, 'duplicate-content-fingerprint', `groups.${groupId}.questionIds`, `Question ${questionId} duplicates registered challenge content.`);
      }
      if (question.knowledgePointIds.length === 0 || new Set(question.knowledgePointIds).size !== question.knowledgePointIds.length) {
        groupIssue(group, 'invalid-question-knowledge-points', `groups.${groupId}.questionIds`, `Question ${questionId} needs non-empty, unique knowledge point tags.`);
      }
    }

    for (const difficulty of DIFFICULTIES) {
      const pool = groupQuestions.filter((question) => question.difficulty === difficulty && questionIsEligible(question, activitiesById.get(question.activityId)));
      const targetCount = Math.max(0, ...tasks.filter((task) => task.difficulty === difficulty).map((task) => task.targetCount));
      if (pool.length < targetCount * 2) {
        groupIssue(group, 'insufficient-candidate-pool', `groups.${groupId}.questionIds`, `${difficulty} has ${pool.length} eligible candidates; requires at least ${targetCount * 2}.`);
      }
      const poolCoverage = new Set(pool.flatMap((question) => question.knowledgePointIds));
      if (definition.coreKnowledgePointIds.some((id) => !poolCoverage.has(id))) {
        groupIssue(group, 'incomplete-candidate-coverage', `groups.${groupId}.questionIds`, `The ${difficulty} candidate pool does not cover every core knowledge point.`);
      }
    }
  }

  const groupStatusById: Record<string, ChallengeReleaseStatus> = {};
  for (const group of manifest.groups) {
    if (group.releaseIntent === 'suspended') groupStatusById[group.definition.id] = 'unavailable';
    else if (group.releaseIntent === 'planned') groupStatusById[group.definition.id] = 'planned';
    else groupStatusById[group.definition.id] = groupErrors.has(group.definition.id) || globalIssues.length > 0 ? 'unavailable' : 'ready';
  }

  return { errors, contentChanges, groupStatusById };
}
