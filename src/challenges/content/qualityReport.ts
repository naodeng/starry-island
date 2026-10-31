import type { Difficulty } from '../../content/types';
import { assemblePaper, AssemblyError } from '../domain/assemble';
import type {
  ChallengeGroupManifest,
  ChallengeQualityGroupReport,
  ChallengeQualityInputs,
  ChallengeQualityReport,
  ChallengeQualityTaskReport,
  ChallengeQuestionRecord,
  ChallengeQuestionSnapshot,
  ChallengeSimulationFailure,
  ChallengeSimulationSummary,
  ValidationIssue,
} from '../domain/types';
import { isCompatibleChallengeGroupSource, resolveChallengeReleaseStatus, validateChallengeManifest } from './validateManifest';

const DIFFICULTIES: readonly Difficulty[] = ['basic', 'advanced', 'high'];
const SAFE_ACTIVITY_KINDS = new Set(['choice', 'match', 'order', 'categorize', 'arithmetic']);

function compareText(left: string, right: string): number {
  return left < right ? -1 : left > right ? 1 : 0;
}

function compareIssues(left: ValidationIssue, right: ValidationIssue): number {
  return compareText(left.groupId ?? '', right.groupId ?? '')
    || compareText(left.code, right.code)
    || compareText(left.path, right.path)
    || compareText(left.message, right.message);
}

function sortIssues(issues: readonly ValidationIssue[]): ValidationIssue[] {
  return [...issues].sort(compareIssues);
}

function emptySimulation(): ChallengeSimulationSummary {
  return { sampleCount: 0, successCount: 0, failureCount: 0, failures: [] };
}

function approvalIsValid(approvedBy: string | undefined, approvedAt: string | undefined): boolean {
  return Boolean(approvedBy?.trim()) && Number.isFinite(Date.parse(approvedAt ?? ''));
}

function buildSnapshots(
  input: ChallengeQualityInputs,
  group: ChallengeGroupManifest,
  fingerprintsByQuestionId: Readonly<Record<string, string>>,
): ChallengeQuestionSnapshot[] {
  const questionById = new Map(input.manifest.questions.map((question) => [question.questionId, question]));
  const snapshots: ChallengeQuestionSnapshot[] = [];
  for (const questionId of group.questionIds) {
    const question = questionById.get(questionId);
    const activity = question && input.activitiesById.get(question.activityId);
    if (!question || !activity) continue;
    snapshots.push({
      ...question,
      activity,
      contentFingerprint: fingerprintsByQuestionId[questionId] ?? question.approvedContentFingerprint,
    });
  }
  return snapshots;
}

function buildDifficultyStats(
  input: ChallengeQualityInputs,
  group: ChallengeGroupManifest,
  duplicateRepresentativeByQuestionId: ReadonlyMap<string, string>,
): ChallengeQualityGroupReport['difficultyStats'] {
  const questionById = new Map(input.manifest.questions.map((question) => [question.questionId, question]));
  const seenQuestionIds = new Set<string>();
  const seenActivityIds = new Set<string>();
  const candidateRecords: Array<{ question: ChallengeQuestionRecord }> = [];

  for (const questionId of group.questionIds) {
    if (seenQuestionIds.has(questionId)) continue;
    seenQuestionIds.add(questionId);
    if (duplicateRepresentativeByQuestionId.get(questionId) !== undefined
      && duplicateRepresentativeByQuestionId.get(questionId) !== questionId) continue;
    const question = questionById.get(questionId);
    const activity = question && input.activitiesById.get(question.activityId);
    const sourceUnitId = question && input.sourceUnitByActivityId.get(question.activityId);
    if (!question || !activity || !sourceUnitId || !group.definition.sourceUnitIds.includes(sourceUnitId)) continue;
    const sourceUnit = input.unitsById.get(sourceUnitId);
    if (!sourceUnit || !isCompatibleChallengeGroupSource(group, sourceUnitId, input.unitsById)) continue;
    if (group.definition.kind === 'unit' && (sourceUnit.type !== 'unit' || sourceUnit.formalUnitNumber === null || !sourceUnit.achievementEligible)) continue;
    if (activity.id !== question.activityId || !SAFE_ACTIVITY_KINDS.has(activity.kind)) continue;
    if (question.lifecycle !== 'active' || !question.approved || !approvalIsValid(question.approvedBy, question.approvedAt) || !question.answerLeakageReviewed) continue;
    if (question.knowledgePointIds.length === 0 || new Set(question.knowledgePointIds).size !== question.knowledgePointIds.length) continue;
    if (seenActivityIds.has(question.activityId)) continue;
    seenActivityIds.add(question.activityId);
    candidateRecords.push({ question });
  }

  return Object.fromEntries(DIFFICULTIES.map((difficulty) => {
    const tasks = group.definition.tasks.filter((task) => task.difficulty === difficulty);
    const targetCount = Math.max(0, ...tasks.map((task) => task.targetCount));
    const candidates = candidateRecords.filter(({ question }) => question.difficulty === difficulty);
    const coveredKnowledgePointIds = [...new Set(candidates.flatMap(({ question }) => question.knowledgePointIds))].sort(compareText);
    const missingKnowledgePointIds = group.definition.coreKnowledgePointIds
      .filter((knowledgePointId) => !coveredKnowledgePointIds.includes(knowledgePointId))
      .sort(compareText);
    return [difficulty, {
      targetCount,
      minimumRequiredCount: targetCount * 2,
      effectiveUniqueCount: candidates.length,
      coveredKnowledgePointIds,
      missingKnowledgePointIds,
    }];
  })) as ChallengeQualityGroupReport['difficultyStats'];
}

function verifyAssembledPaper(
  paper: readonly ChallengeQuestionSnapshot[],
  task: ChallengeGroupManifest['definition']['tasks'][number],
  seed: string,
): ChallengeSimulationFailure | undefined {
  const failure = (code: string, message: string): ChallengeSimulationFailure => ({ seed, code, message });
  if (paper.length !== task.targetCount) return failure('invalid-paper-size', `Expected ${task.targetCount} questions, received ${paper.length}.`);
  if (new Set(paper.map(({ questionId }) => questionId)).size !== paper.length) return failure('duplicate-paper-question', 'The assembled paper contains duplicate question IDs.');
  if (new Set(paper.map(({ activityId }) => activityId)).size !== paper.length) return failure('duplicate-paper-activity', 'The assembled paper contains duplicate activity IDs.');
  if (paper.some(({ difficulty, activityId, lifecycle, approved, answerLeakageReviewed, activity }) => difficulty !== task.difficulty
    || lifecycle !== 'active'
    || !approved
    || !answerLeakageReviewed
    || activityId !== activity.id
    || !SAFE_ACTIVITY_KINDS.has(activity.kind))) {
    return failure('invalid-paper-candidate', 'The assembled paper contains a question outside the task difficulty or supported activity kinds.');
  }
  const coveredKnowledgePointIds = new Set(paper.flatMap(({ knowledgePointIds }) => knowledgePointIds));
  const missingKnowledgePointId = task.requiredKnowledgePointIds.find((id) => !coveredKnowledgePointIds.has(id));
  if (missingKnowledgePointId) return failure('missing-paper-coverage', `The assembled paper does not cover ${missingKnowledgePointId}.`);
  return undefined;
}

function simulateTask(
  task: ChallengeGroupManifest['definition']['tasks'][number],
  candidates: readonly ChallengeQuestionSnapshot[],
  manifestVersion: string,
  seedCount: number,
): ChallengeSimulationSummary {
  const failures: ChallengeSimulationFailure[] = [];
  let successCount = 0;
  for (let sequence = 1; sequence <= seedCount; sequence += 1) {
    const seed = `${manifestVersion}:${task.id}:${sequence}`;
    try {
      const paper = assemblePaper(task, candidates, seed);
      const failure = verifyAssembledPaper(paper, task, seed);
      if (failure) failures.push(failure);
      else successCount += 1;
    } catch (error) {
      const code = error instanceof AssemblyError ? error.code : 'assembly-error';
      const message = error instanceof Error ? error.message : 'Paper assembly failed.';
      failures.push({ seed, code, message });
    }
  }
  return {
    sampleCount: seedCount,
    successCount,
    failureCount: failures.length,
    failures,
  };
}

function similarPairIssue(pair: ChallengeQualityReport['similarQuestionPairs'][number]): ValidationIssue {
  return {
    classification: 'informational',
    code: 'similar-question-template',
    path: `questions:${pair.questionIds.join(',')}`,
    message: pair.reason,
  };
}

export async function buildChallengeQualityReport(
  input: ChallengeQualityInputs,
  options: { seedCount?: number } = {},
): Promise<ChallengeQualityReport> {
  const seedCount = options.seedCount ?? 100;
  if (!Number.isInteger(seedCount) || seedCount <= 0) throw new RangeError('seedCount must be a positive integer.');

  const validation = await validateChallengeManifest(
    input.manifest,
    input.activitiesById,
    input.sourceUnitByActivityId,
    input.unitsById,
  );
  const uniqueness = validation.questionUniqueness;
  const duplicateRepresentativeByQuestionId = new Map<string, string>();
  for (const duplicateGroup of uniqueness.exactDuplicateGroups) {
    for (const questionId of duplicateGroup.questionIds) duplicateRepresentativeByQuestionId.set(questionId, duplicateGroup.representativeQuestionId);
  }

  const allErrors = [...validation.errors];
  const allWarnings = [...validation.informationalIssues, ...uniqueness.similarQuestionPairs.map(similarPairIssue)];
  const groups: ChallengeQualityGroupReport[] = [];
  const questionById = new Map(input.manifest.questions.map((question) => [question.questionId, question]));
  for (const group of input.manifest.groups) {
    const groupId = group.definition.id;
    const candidates = buildSnapshots(input, group, uniqueness.currentFingerprintByQuestionId);
    const tasks: ChallengeQualityTaskReport[] = [];
    for (const task of [...group.definition.tasks].sort((left, right) => compareText(left.id, right.id))) {
      const simulation = group.releaseIntent === 'released'
        ? simulateTask(task, candidates, input.manifest.version, seedCount)
        : emptySimulation();
      const taskReport: ChallengeQualityTaskReport = {
        taskId: task.id,
        difficulty: task.difficulty,
        targetCount: task.targetCount,
        requiredKnowledgePointIds: [...task.requiredKnowledgePointIds].sort(compareText),
        simulation,
      };
      tasks.push(taskReport);
      if (simulation.failureCount > 0) {
        allErrors.push({
          classification: 'released-group-blocking',
          code: 'simulation-failed',
          path: `groups.${groupId}.tasks.${task.id}.simulation`,
          message: `${simulation.failureCount} of ${simulation.sampleCount} paper assembly seeds failed.`,
          groupId,
        });
      }
    }

    const groupIssues = validation.groupIssuesById[groupId] ?? [];
    const simulationErrors = allErrors.filter((issue) => issue.groupId === groupId && issue.code === 'simulation-failed');
    const status = resolveChallengeReleaseStatus(
      group.releaseIntent,
      groupIssues.some(({ classification }) => classification === 'released-group-blocking') || simulationErrors.length > 0,
      validation.globalIssues.length > 0,
    );
    const groupWarnings = [
      ...groupIssues.filter(({ classification }) => classification === 'informational'),
      ...uniqueness.similarQuestionPairs
        .filter((pair) => group.questionIds.includes(pair.questionIds[0]) || group.questionIds.includes(pair.questionIds[1]))
        .map((pair) => ({ ...similarPairIssue(pair), groupId })),
    ];
    const groupBlockingIssues = [
      ...validation.globalIssues.filter((issue) => !issue.groupId || issue.groupId === groupId),
      ...groupIssues.filter(({ classification }) => classification === 'released-group-blocking'),
      ...simulationErrors,
    ];
    const taskSimulations = tasks.map(({ simulation }) => simulation);
    groups.push({
      groupId,
      kind: group.definition.kind,
      releaseIntent: group.releaseIntent,
      status,
      blockingIssues: sortIssues(groupBlockingIssues),
      warnings: sortIssues(groupWarnings),
      difficultyStats: buildDifficultyStats(input, group, duplicateRepresentativeByQuestionId),
      tasks,
      simulation: {
        sampleCount: taskSimulations.reduce((sum, simulation) => sum + simulation.sampleCount, 0),
        successCount: taskSimulations.reduce((sum, simulation) => sum + simulation.successCount, 0),
        failureCount: taskSimulations.reduce((sum, simulation) => sum + simulation.failureCount, 0),
        failures: taskSimulations.flatMap(({ failures }) => failures),
      },
    });
  }

  allErrors.sort(compareIssues);
  allWarnings.sort(compareIssues);
  groups.sort((left, right) => compareText(left.groupId, right.groupId));
  const releasedGroups = groups.filter(({ releaseIntent }) => releaseIntent === 'released');
  const readyReleasedGroupCount = releasedGroups.filter(({ status }) => status === 'ready').length;
  const contentChanges = validation.contentChanges.map((change) => {
    const question = questionById.get(change.questionId);
    const referencedGroups = input.manifest.groups.filter(({ questionIds }) => questionIds.includes(change.questionId));
    return {
      ...change,
      groupIds: referencedGroups.map(({ definition }) => definition.id).sort(compareText),
      taskIds: referencedGroups.flatMap(({ definition }) => definition.tasks
        .filter((task) => task.difficulty === question?.difficulty)
        .map(({ id }) => id)).sort(compareText),
    };
  }).sort((left, right) => compareText(left.questionId, right.questionId));
  return {
    reportSchemaVersion: 1,
    manifestVersion: input.manifest.version,
    overall: {
      passed: allErrors.length === 0 && readyReleasedGroupCount === releasedGroups.length,
      blockingIssueCount: allErrors.length,
      warningCount: allWarnings.length,
      releasedGroupCount: releasedGroups.length,
      readyReleasedGroupCount,
    },
    errors: allErrors,
    warnings: allWarnings,
    groups,
    contentChanges,
    exactDuplicateGroups: [...uniqueness.exactDuplicateGroups],
    similarQuestionPairs: [...uniqueness.similarQuestionPairs],
  };
}

export function renderChallengeQualityMarkdown(report: ChallengeQualityReport): string {
  const lines = [
    '# 闯关题库质量报告',
    '',
    `- 清单版本：\`${report.manifestVersion}\``,
    `- 发布门禁：${report.overall.passed ? '通过' : '未通过'}`,
    `- 阻断问题：${report.overall.blockingIssueCount}`,
    `- 提示：${report.overall.warningCount}`,
    '',
    '## 分组结果',
  ];

  for (const group of report.groups) {
    lines.push('', `### \`${group.groupId}\``, '', `- 类型：${group.kind}`, `- 发布意图：${group.releaseIntent}`, `- 状态：${group.status}`);
    lines.push('', '| 难度 | 目标题量 | 有效唯一题量 | 最低题量 | 覆盖缺项 |', '| --- | ---: | ---: | ---: | --- |');
    for (const difficulty of DIFFICULTIES) {
      const stats = group.difficultyStats[difficulty];
      lines.push(`| ${difficulty} | ${stats.targetCount} | ${stats.effectiveUniqueCount} | ${stats.minimumRequiredCount} | ${stats.missingKnowledgePointIds.join('、') || '无'} |`);
    }
    lines.push('', `模拟：${group.simulation.successCount}/${group.simulation.sampleCount} 成功，${group.simulation.failureCount} 失败。`);
    for (const task of group.tasks) {
      lines.push(`- 任务 \`${task.taskId}\`：${task.simulation.successCount}/${task.simulation.sampleCount} 成功，${task.simulation.failureCount} 失败。`);
    }
    for (const issue of group.blockingIssues) lines.push(`- 阻断：\`${issue.code}\` ${issue.path}：${issue.message}`);
    for (const issue of group.warnings) lines.push(`- 提示：\`${issue.code}\` ${issue.path}：${issue.message}`);
  }

  if (report.contentChanges.length > 0) {
    lines.push('', '## 内容指纹变化');
    for (const change of report.contentChanges) {
      lines.push(`- \`${change.questionId}\`：${change.approvedContentFingerprint} → ${change.currentContentFingerprint}；引用组：${change.groupIds.map((id) => `\`${id}\``).join('、') || '无'}；相关任务：${change.taskIds.map((id) => `\`${id}\``).join('、') || '无'}`);
    }
  }
  if (report.exactDuplicateGroups.length > 0) {
    lines.push('', '## 精确重复');
    for (const group of report.exactDuplicateGroups) {
      lines.push(`- 代表题 \`${group.representativeQuestionId}\`；重复题：${group.questionIds.map((id) => `\`${id}\``).join('、')}`);
    }
  }
  if (report.similarQuestionPairs.length > 0) {
    lines.push('', '## 相似题提示');
    for (const pair of report.similarQuestionPairs) {
      lines.push(`- \`${pair.questionIds[0]}\` / \`${pair.questionIds[1]}\`：${pair.reason}`);
    }
  }
  if (report.errors.length > 0) {
    lines.push('', '## 全局阻断问题');
    for (const issue of report.errors.filter(({ groupId }) => !groupId)) {
      lines.push(`- \`${issue.code}\` ${issue.path}：${issue.message}`);
    }
  }
  return `${lines.join('\n')}\n`;
}
