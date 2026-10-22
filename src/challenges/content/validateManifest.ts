import type { ActivityDefinition, CurriculumUnit, Difficulty } from '../../content/types';
import { fingerprintActivity } from './fingerprint';
import { analyzeQuestionUniqueness } from './questionUniqueness';
import type {
  ChallengeGroupManifest,
  ChallengeManifest,
  ChallengeManifestValidationReport,
  ChallengeQuestionRecord,
  ChallengeReleaseStatus,
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

function makeIssue(
  classification: ValidationIssue['classification'],
  code: string,
  path: string,
  message: string,
  groupId?: string,
): ValidationIssue {
  return { classification, code, path, message, ...(groupId ? { groupId } : {}) };
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

export function resolveChallengeReleaseStatus(
  releaseIntent: ChallengeGroupManifest['releaseIntent'],
  hasReleasedGroupBlockingIssues: boolean,
  hasGlobalBlockingIssues: boolean,
): ChallengeReleaseStatus {
  if (releaseIntent === 'suspended') return 'unavailable';
  if (releaseIntent === 'planned') return 'planned';
  return hasReleasedGroupBlockingIssues || hasGlobalBlockingIssues ? 'unavailable' : 'ready';
}

export async function validateChallengeManifest(
  manifest: ChallengeManifest,
  activitiesById: ReadonlyMap<string, ActivityDefinition>,
  sourceUnitByActivityId: ReadonlyMap<string, string>,
  unitsById: ReadonlyMap<string, CurriculumUnit>,
  subtleCrypto: SubtleCrypto = globalThis.crypto.subtle,
): Promise<ChallengeManifestValidationReport> {
  const errors: ValidationIssue[] = [];
  const globalIssues: ValidationIssue[] = [];
  const informationalIssues: ValidationIssue[] = [];
  const groupIssuesById: Record<string, ValidationIssue[]> = {};
  const contentChanges: ChallengeManifestValidationReport['contentChanges'] = [];
  const questionById = new Map<string, ChallengeQuestionRecord>();
  const questionCounts = new Map<string, number>();
  const activityCounts = new Map<string, number>();
  const uniqueness = await analyzeQuestionUniqueness(manifest.questions, activitiesById, sourceUnitByActivityId, subtleCrypto);
  const duplicateGroupByQuestionId = new Map<string, (typeof uniqueness.exactDuplicateGroups)[number]>();
  for (const duplicateGroup of uniqueness.exactDuplicateGroups) {
    for (const questionId of duplicateGroup.questionIds) duplicateGroupByQuestionId.set(questionId, duplicateGroup);
    informationIssue('duplicate-content-fingerprint', 'questions', `Identical content is registered under ${duplicateGroup.questionIds.join(', ')}.`);
  }

  function globalIssue(code: string, path: string, message: string, groupId?: string) {
    const issue = makeIssue('global-blocking', code, path, message, groupId);
    globalIssues.push(issue);
    errors.push(issue);
  }

  function informationIssue(code: string, path: string, message: string, groupId?: string) {
    informationalIssues.push(makeIssue('informational', code, path, message, groupId));
  }

  function groupIssue(group: ChallengeGroupManifest, code: string, path: string, message: string) {
    const classification = group.releaseIntent === 'released' ? 'released-group-blocking' : 'informational';
    const issue = makeIssue(classification, code, path, message, group.definition.id);
    (groupIssuesById[group.definition.id] ??= []).push(issue);
    if (classification === 'released-group-blocking') errors.push(issue);
    else informationalIssues.push(issue);
  }

  if (manifest.questions.length === 0) globalIssue('empty-questions', 'questions', 'The manifest must contain at least one question.');
  if (manifest.groups.length === 0) globalIssue('empty-groups', 'groups', 'The manifest must contain at least one group.');
  if (!manifest.version.trim()) globalIssue('invalid-manifest-version', 'version', 'The manifest version must be non-empty.');

  for (const [index, question] of manifest.questions.entries()) {
    const path = `questions[${index}]`;
    if (!question.questionId.trim()) globalIssue('invalid-question-id', `${path}.questionId`, 'Question IDs must be non-empty and stable.');
    if (!question.activityId.trim()) globalIssue('invalid-activity-id', `${path}.activityId`, 'Activity IDs must be non-empty.');
    questionCounts.set(question.questionId, (questionCounts.get(question.questionId) ?? 0) + 1);
    activityCounts.set(question.activityId, (activityCounts.get(question.activityId) ?? 0) + 1);
    if (!questionById.has(question.questionId)) questionById.set(question.questionId, question);

    const activity = activitiesById.get(question.activityId);
    if (!activity) {
      globalIssue('missing-activity', `${path}.activityId`, `Activity ${question.activityId} was not found.`);
      continue;
    }
    if (activity.id !== question.activityId) {
      globalIssue('activity-id-mismatch', `${path}.activityId`, 'The registry key does not match ActivityDefinition.id.');
    }
    if (!sourceUnitByActivityId.has(question.activityId)) {
      globalIssue('missing-activity-source', `${path}.activityId`, 'The source unit for this activity is unknown.');
    }
    if (question.approved && (!question.approvedBy?.trim() || !Number.isFinite(Date.parse(question.approvedAt ?? '')))) {
      globalIssue('missing-approval-record', `${path}.approvedAt`, 'Approved questions need an author and valid approval date.');
    }

    const currentFingerprint = uniqueness.currentFingerprintByQuestionId[question.questionId]
      ?? await fingerprintActivity(activity, subtleCrypto);
    if (currentFingerprint !== question.approvedContentFingerprint) {
      contentChanges.push({
        questionId: question.questionId,
        approvedContentFingerprint: question.approvedContentFingerprint,
        currentContentFingerprint: currentFingerprint,
      });
      informationIssue('content-fingerprint-changed', path, 'Content changed after the recorded approval fingerprint; approval and release intent are unchanged.');
    }
  }

  for (const [questionId, count] of questionCounts) {
    if (count > 1) globalIssue('duplicate-question-id', 'questions', `Question ID ${questionId} is registered ${count} times.`);
  }
  for (const [activityId, count] of activityCounts) {
    if (count > 1) globalIssue('duplicate-activity-id', 'questions', `Activity ID ${activityId} is registered ${count} times.`);
  }
  const groupIds = new Set<string>();
  for (const group of manifest.groups) {
    if (!group.definition.id.trim()) {
      globalIssue('invalid-group-id', 'groups', 'Group IDs must be non-empty and stable.');
    } else if (groupIds.has(group.definition.id)) {
      globalIssue('duplicate-group-id', `groups.${group.definition.id}`, 'Group IDs must be unique.', group.definition.id);
    }
    groupIds.add(group.definition.id);
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
    if (group.releaseIntent === 'suspended' && !group.unavailableReason?.trim()) {
      groupIssue(group, 'missing-unavailable-reason', `groups.${groupId}.unavailableReason`, 'Suspended groups need a reason.');
    }
    if (definition.coreKnowledgePointIds.length === 0 || new Set(definition.coreKnowledgePointIds).size !== definition.coreKnowledgePointIds.length) {
      groupIssue(group, 'invalid-core-knowledge-points', `groups.${groupId}.coreKnowledgePointIds`, 'Core knowledge point IDs must be non-empty and unique.');
    }
    for (const unitId of definition.sourceUnitIds) {
      const unit = unitsById.get(unitId);
      if (!unit) {
        globalIssue('unknown-unit-source', `groups.${groupId}.sourceUnitIds`, `Unknown source unit ${unitId}.`, groupId);
      } else if (!compatibleGroupSource(group, unitId, unitsById)) {
        groupIssue(group, 'mismatched-unit-source', `groups.${groupId}.sourceUnitIds`, `Source unit ${unitId} does not match this group’s grade, term, and subject.`);
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
    const reportedDuplicateFingerprints = new Set<string>();
    for (const questionId of group.questionIds) {
      if (groupQuestionIdSet.has(questionId)) {
        groupIssue(group, 'duplicate-group-question', `groups.${groupId}.questionIds`, `Question ${questionId} occurs more than once in this group.`);
      }
      groupQuestionIdSet.add(questionId);
      const question = questionById.get(questionId);
      if (!question) {
        globalIssue('missing-question', `groups.${groupId}.questionIds`, `Question ${questionId} is not registered.`, groupId);
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
      const duplicateGroup = duplicateGroupByQuestionId.get(questionId);
      if (duplicateGroup && !reportedDuplicateFingerprints.has(duplicateGroup.fingerprint)) {
        groupIssue(group, 'duplicate-content-fingerprint', `groups.${groupId}.questionIds`, `Exact duplicate group ${duplicateGroup.questionIds.join(', ')} is referenced.`);
        reportedDuplicateFingerprints.add(duplicateGroup.fingerprint);
      }
      if (question.knowledgePointIds.length === 0 || new Set(question.knowledgePointIds).size !== question.knowledgePointIds.length) {
        groupIssue(group, 'invalid-question-knowledge-points', `groups.${groupId}.questionIds`, `Question ${questionId} needs non-empty, unique knowledge point tags.`);
      }
    }

    const seenCandidateQuestionIds = new Set<string>();
    const seenCandidateActivityIds = new Set<string>();
    const uniqueEligibleGroupQuestions = groupQuestions.filter((question) => {
      if (!questionIsEligible(question, activitiesById.get(question.activityId))) return false;
      const representativeQuestionId = duplicateGroupByQuestionId.get(question.questionId)?.representativeQuestionId ?? question.questionId;
      if (representativeQuestionId !== question.questionId
        || seenCandidateQuestionIds.has(question.questionId)
        || seenCandidateActivityIds.has(question.activityId)) return false;
      seenCandidateQuestionIds.add(question.questionId);
      seenCandidateActivityIds.add(question.activityId);
      return true;
    });
    for (const difficulty of DIFFICULTIES) {
      const pool = uniqueEligibleGroupQuestions.filter((question) => question.difficulty === difficulty);
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
    const groupIssues = groupIssuesById[group.definition.id] ?? [];
    const hasReleasedGroupBlockingIssues = groupIssues.some(({ classification }) => classification === 'released-group-blocking');
    groupStatusById[group.definition.id] = resolveChallengeReleaseStatus(
      group.releaseIntent,
      hasReleasedGroupBlockingIssues,
      globalIssues.length > 0,
    );
  }

  return { errors, globalIssues, groupIssuesById, informationalIssues, contentChanges, groupStatusById };
}

export const validatePilotManifest = validateChallengeManifest;
