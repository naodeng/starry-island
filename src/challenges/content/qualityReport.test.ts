import { beforeAll, describe, expect, it } from 'vitest';
import type { ActivityDefinition, CurriculumUnit } from '../../content/types';
import { loadUnit } from '../../content/unitLoader';
import type { ChallengeManifest, ChallengeQualityInputs } from '../domain/types';
import { parseChallengeManifest } from './manifestSchema';
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
import { buildChallengeQualityReport, renderChallengeQualityMarkdown } from './qualityReport';
import rawManifest from './pilotManifest';

const safeKinds = new Set(['choice', 'match', 'order', 'categorize', 'arithmetic']);

interface MutableChallengeQualityInputs extends ChallengeQualityInputs {
  activitiesById: Map<string, ActivityDefinition>;
  sourceUnitByActivityId: Map<string, string>;
  unitsById: Map<string, CurriculumUnit>;
}

async function loadPilotInputs(): Promise<MutableChallengeQualityInputs> {
  const manifest: ChallengeManifest = structuredClone(parseChallengeManifest(rawManifest));
  const activitiesById = new Map<string, ActivityDefinition>();
  const sourceUnitByActivityId = new Map<string, string>();
  const unitsById = new Map<string, CurriculumUnit>();

  for (const sourceUnitId of new Set(manifest.groups.flatMap(({ definition }) => [
    ...definition.sourceUnitIds,
    ...(definition.learningTaskUnitIds ?? []),
  ]))) {
    const unit = await loadUnit(sourceUnitId);
    if (!unit) throw new Error(`Test fixture could not load ${sourceUnitId}.`);
    unitsById.set(sourceUnitId, unit);
    for (const track of Object.values(unit.difficultyTracks)) {
      for (const task of track.tasks) {
        for (const session of task.sessions) {
          for (const activity of session.activities) {
            if (!safeKinds.has(activity.kind)) continue;
            activitiesById.set(activity.id, activity);
            sourceUnitByActivityId.set(activity.id, sourceUnitId);
          }
        }
      }
    }
  }

  for (const supplemental of [...pilotSupplementalActivities, ...pilotEnglishSupplementalActivities, ...pilotChineseSupplementalActivities, ...grade1MathUnit01SupplementalActivities, ...grade1MathUnit02SupplementalActivities, ...grade1MathUnit03SupplementalActivities, ...grade1MathUnit04SupplementalActivities, ...grade1MathUnit05SupplementalActivities, ...grade1MathUnit06SupplementalActivities, ...grade1MathUnit07SupplementalActivities, ...grade1MathUnit08SupplementalActivities, ...grade1MathUnit09SupplementalActivities, ...grade1Term1EnglishUnit01SupplementalActivities, ...grade1Term1EnglishUnit02SupplementalActivities, ...grade1Term1EnglishUnit03SupplementalActivities, ...grade1Term1EnglishUnit04SupplementalActivities, ...grade1Term1EnglishUnit05SupplementalActivities, ...grade1Term1EnglishUnit06SupplementalActivities, ...grade1Term2MathUnit01SupplementalActivities, ...grade1Term2MathUnit02SupplementalActivities, ...grade1Term2MathUnit03SupplementalActivities, ...grade1Term2MathUnit04SupplementalActivities, ...grade1Term2MathUnit05SupplementalActivities, ...grade1Term2MathUnit06SupplementalActivities, ...grade1Term2MathUnit07SupplementalActivities, ...grade1Term2MathUnit08SupplementalActivities, ...grade1Term2EnglishUnit01SupplementalActivities, ...grade1Term2EnglishUnit02SupplementalActivities, ...grade1Term2EnglishUnit03SupplementalActivities, ...grade1Term2EnglishUnit04SupplementalActivities, ...grade1Term2EnglishUnit05SupplementalActivities, ...grade1Term2EnglishUnit06SupplementalActivities, ...grade1Term2ChineseSemesterSupplementalActivities, ...grade2Term1ChineseUnit01SupplementalActivities, ...grade2Term1ChineseUnit02SupplementalActivities, ...grade2Term1ChineseUnit03SupplementalActivities, ...grade2Term1ChineseUnit04SupplementalActivities, ...grade2Term1ChineseUnit05SupplementalActivities, ...grade2Term1ChineseUnit06SupplementalActivities, ...grade2Term1ChineseUnit07SupplementalActivities, ...grade2Term1ChineseUnit08SupplementalActivities, ...grade2Term1MathUnit01SupplementalActivities, ...grade2Term1MathUnit03SupplementalActivities]) {
    activitiesById.set(supplemental.activity.id, supplemental.activity);
    sourceUnitByActivityId.set(supplemental.activity.id, supplemental.sourceUnitId);
  }

  for (const supplemental of grade2Term1MathUnit04SupplementalActivities) {
    activitiesById.set(supplemental.activity.id, supplemental.activity);
    sourceUnitByActivityId.set(supplemental.activity.id, supplemental.sourceUnitId);
  }

  for (const supplemental of grade2Term1MathUnit05SupplementalActivities) {
    activitiesById.set(supplemental.activity.id, supplemental.activity);
    sourceUnitByActivityId.set(supplemental.activity.id, supplemental.sourceUnitId);
  }
  for (const supplemental of grade2Term1MathUnit06SupplementalActivities) {
    activitiesById.set(supplemental.activity.id, supplemental.activity);
    sourceUnitByActivityId.set(supplemental.activity.id, supplemental.sourceUnitId);
  }
  for (const supplemental of grade2Term1MathUnit07SupplementalActivities) {
    activitiesById.set(supplemental.activity.id, supplemental.activity);
    sourceUnitByActivityId.set(supplemental.activity.id, supplemental.sourceUnitId);
  }
  for (const supplemental of grade2Term1MathUnit08SupplementalActivities) {
    activitiesById.set(supplemental.activity.id, supplemental.activity);
    sourceUnitByActivityId.set(supplemental.activity.id, supplemental.sourceUnitId);
  }
  for (const supplemental of grade2Term1MathUnit09SupplementalActivities) {
    activitiesById.set(supplemental.activity.id, supplemental.activity);
    sourceUnitByActivityId.set(supplemental.activity.id, supplemental.sourceUnitId);
  }
  for (const supplemental of grade2Term1EnglishUnit01SupplementalActivities) {
    activitiesById.set(supplemental.activity.id, supplemental.activity);
    sourceUnitByActivityId.set(supplemental.activity.id, supplemental.sourceUnitId);
  }
  for (const supplemental of grade2Term1EnglishUnit01SupplementalActivities) {
    activitiesById.set(supplemental.activity.id, supplemental.activity);
    sourceUnitByActivityId.set(supplemental.activity.id, supplemental.sourceUnitId);
  }

  for (const supplemental of grade2Term1EnglishUnit02SupplementalActivities) {
    activitiesById.set(supplemental.activity.id, supplemental.activity);
    sourceUnitByActivityId.set(supplemental.activity.id, supplemental.sourceUnitId);
  }

  for (const supplemental of grade2Term1EnglishUnit03SupplementalActivities) {
    activitiesById.set(supplemental.activity.id, supplemental.activity);
    sourceUnitByActivityId.set(supplemental.activity.id, supplemental.sourceUnitId);
  }

  return { manifest, activitiesById, sourceUnitByActivityId, unitsById };
}

function cloneInputs(input: ChallengeQualityInputs): MutableChallengeQualityInputs {
  return {
    manifest: structuredClone(input.manifest),
    activitiesById: new Map(input.activitiesById),
    sourceUnitByActivityId: new Map(input.sourceUnitByActivityId),
    unitsById: new Map(input.unitsById),
  };
}

describe('buildChallengeQualityReport', () => {
  let inputs: MutableChallengeQualityInputs;

  beforeAll(async () => {
    inputs = await loadPilotInputs();
  });

  it('runs all 100 deterministic seeds for each released task', async () => {
    const first = await buildChallengeQualityReport(inputs);
    const second = await buildChallengeQualityReport(inputs);

    expect(first.reportSchemaVersion).toBe(1);
    expect(first.overall.passed).toBe(true);
    for (const group of first.groups.filter(({ releaseIntent }) => releaseIntent === 'released')) {
      for (const task of group.tasks) {
        expect(task.simulation).toMatchObject({ sampleCount: 100, successCount: 100, failureCount: 0, failures: [] });
      }
    }
    expect(first).toEqual(second);
  }, 30_000);

  it('does not simulate planned or suspended groups', async () => {
    const deferred = cloneInputs(inputs);
    const unitGroup = deferred.manifest.groups.find(({ definition }) => definition.kind === 'unit')!;
    const semesterGroup = deferred.manifest.groups.find(({ definition }) => definition.kind === 'semester')!;
    unitGroup.releaseIntent = 'planned';
    semesterGroup.releaseIntent = 'suspended';
    semesterGroup.unavailableReason = '等待阶段内容确认';

    const report = await buildChallengeQualityReport(deferred, { seedCount: 3 });

    expect(report.groups.find(({ groupId }) => groupId === unitGroup.definition.id)?.tasks.every(({ simulation }) => simulation.sampleCount === 0)).toBe(true);
    expect(report.groups.find(({ groupId }) => groupId === semesterGroup.definition.id)?.tasks.every(({ simulation }) => simulation.sampleCount === 0)).toBe(true);
    expect(report.overall.passed).toBe(true);
  });

  it('fails release readiness when task IDs collide across released groups', async () => {
    const duplicated = cloneInputs(inputs);
    const [unitGroup, semesterGroup] = duplicated.manifest.groups;
    semesterGroup.definition.tasks[0].id = unitGroup.definition.tasks[0].id;

    const report = await buildChallengeQualityReport(duplicated, { seedCount: 1 });

    expect(report.overall.passed).toBe(false);
    expect(report.groups.filter(({ status }) => status === 'unavailable').map(({ groupId }) => groupId).sort()).toEqual([
      unitGroup.definition.id,
      semesterGroup.definition.id,
    ].sort());
    expect(report.groups.filter(({ status }) => status === 'ready'))
      .toHaveLength(inputs.manifest.groups.filter(({ releaseIntent }) => releaseIntent === 'released').length - 2);
    expect(report.errors).toContainEqual(expect.objectContaining({ code: 'duplicate-task-id' }));
  });

  it.each(['planned', 'suspended'] as const)('does not let a %s pool shortage block another released ready group', async (releaseIntent) => {
    const deferred = cloneInputs(inputs);
    const unitGroup = deferred.manifest.groups.find(({ definition }) => definition.kind === 'unit')!;
    const semesterGroup = deferred.manifest.groups.find(({ definition }) => definition.kind === 'semester')!;
    unitGroup.releaseIntent = releaseIntent;
    unitGroup.questionIds = [];
    if (releaseIntent === 'suspended') unitGroup.unavailableReason = '等待补充题库';

    const report = await buildChallengeQualityReport(deferred, { seedCount: 1 });
    const unitReport = report.groups.find(({ groupId }) => groupId === unitGroup.definition.id)!;
    const semesterReport = report.groups.find(({ groupId }) => groupId === semesterGroup.definition.id)!;

    expect(unitReport.status).toBe(releaseIntent === 'planned' ? 'planned' : 'unavailable');
    expect(semesterReport.status).toBe('ready');
    expect(report.overall.passed).toBe(true);
  });

  it('marks a released group unavailable when any task seed cannot assemble a paper', async () => {
    const invalid = cloneInputs(inputs);
    const group = invalid.manifest.groups.find(({ definition }) => definition.kind === 'unit')!;
    const newCoreIds = Array.from({ length: 16 }, (_, index) => `simulation-core-${index + 1}`);
    group.definition.coreKnowledgePointIds = newCoreIds;
    group.definition.tasks[0].requiredKnowledgePointIds = newCoreIds;
    group.definition.tasks[1].requiredKnowledgePointIds = [newCoreIds[0]];
    group.definition.tasks[2].requiredKnowledgePointIds = newCoreIds;
    group.definition.tasks[3].requiredKnowledgePointIds = [newCoreIds[0]];
    group.definition.tasks[4].requiredKnowledgePointIds = [newCoreIds[0], newCoreIds[1]];
    const questionsById = new Map(invalid.manifest.questions.map((question) => [question.questionId, question]));
    const basicQuestionIds = group.questionIds.filter((questionId) => questionsById.get(questionId)?.difficulty === 'basic');
    for (const [index, questionId] of basicQuestionIds.entries()) {
      const question = questionsById.get(questionId)!;
      question.knowledgePointIds = [newCoreIds[index % newCoreIds.length]];
    }
    for (const questionId of group.questionIds.filter((id) => questionsById.get(id)?.difficulty !== 'basic')) {
      const question = questionsById.get(questionId)!;
      question.knowledgePointIds = [newCoreIds[0], newCoreIds[1]];
    }

    const report = await buildChallengeQualityReport(invalid, { seedCount: 2 });
    const unitReport = report.groups.find(({ groupId }) => groupId === group.definition.id)!;
    const blockedTask = unitReport.tasks.find(({ taskId }) => taskId === group.definition.tasks[0].id)!;

    expect(blockedTask.simulation).toMatchObject({ sampleCount: 2, successCount: 0, failureCount: 2 });
    expect(blockedTask.simulation.failures[0]).toMatchObject({ code: 'uncoverable-task' });
    expect(unitReport.status).toBe('unavailable');
    expect(report.errors).toContainEqual(expect.objectContaining({ code: 'simulation-failed', groupId: group.definition.id }));
    expect(report.overall.passed).toBe(false);
  }, 30_000);

  it('reports effective candidate counts and missing knowledge coverage', async () => {
    const insufficient = cloneInputs(inputs);
    const group = insufficient.manifest.groups.find(({ definition }) => definition.kind === 'unit')!;
    const questionById = new Map(insufficient.manifest.questions.map((question) => [question.questionId, question]));
    const basicIds = group.questionIds.filter((id) => questionById.get(id)?.difficulty === 'basic');
    group.questionIds = group.questionIds.filter((id) => id !== basicIds[0]);
    for (const questionId of basicIds.slice(1)) {
      const question = questionById.get(questionId)!;
      question.knowledgePointIds = [group.definition.coreKnowledgePointIds[1]];
    }

    const report = await buildChallengeQualityReport(insufficient, { seedCount: 1 });
    const unitReport = report.groups.find(({ groupId }) => groupId === group.definition.id)!;

    expect(unitReport.difficultyStats.basic).toMatchObject({ effectiveUniqueCount: 29, minimumRequiredCount: 30 });
    expect(unitReport.difficultyStats.basic.missingKnowledgePointIds).toContain(group.definition.coreKnowledgePointIds[0]);
    expect(unitReport.status).toBe('unavailable');
  });

  it('reports fingerprint changes without failing a ready group', async () => {
    const changed = cloneInputs(inputs);
    const question = changed.manifest.questions[0];
    const activity = changed.activitiesById.get(question.activityId)!;
    changed.activitiesById.set(question.activityId, { ...activity, prompt: `${activity.prompt}（记录变更）` });

    const report = await buildChallengeQualityReport(changed, { seedCount: 1 });

    expect(report.contentChanges).toContainEqual(expect.objectContaining({
      questionId: question.questionId,
      groupIds: expect.arrayContaining([changed.manifest.groups[0].definition.id]),
      taskIds: expect.arrayContaining(changed.manifest.groups[0].definition.tasks.filter(({ difficulty }) => difficulty === question.difficulty).map(({ id }) => id)),
    }));
    expect(report.groups.find(({ groupId }) => groupId === changed.manifest.groups[0].definition.id)?.status).toBe('ready');
    expect(report.overall.passed).toBe(true);
  });

  it('includes deterministic duplicate and similarity metadata without prompt text', async () => {
    const enriched = cloneInputs(inputs);
    const group = enriched.manifest.groups.find(({ definition }) => definition.kind === 'unit')!;
    const exactSource = enriched.manifest.questions.find(({ questionId }) => group.questionIds.includes(questionId))!;
    const exactSourceActivity = enriched.activitiesById.get(exactSource.activityId)!;
    const duplicateActivityId = 'quality-duplicate-activity';
    const duplicateQuestionId = 'zz-quality-duplicate-question';
    enriched.activitiesById.set(duplicateActivityId, { ...exactSourceActivity, id: duplicateActivityId });
    enriched.sourceUnitByActivityId.set(duplicateActivityId, enriched.sourceUnitByActivityId.get(exactSource.activityId)!);
    enriched.manifest.questions.push({ ...exactSource, questionId: duplicateQuestionId, activityId: duplicateActivityId });
    group.questionIds.push(duplicateQuestionId);

    const similarQuestions = enriched.manifest.questions.filter(({ questionId }) => group.questionIds.includes(questionId) && questionId !== exactSource.questionId).slice(0, 2);
    const [similarA, similarB] = similarQuestions;
    const similarActivityA = enriched.activitiesById.get(similarA.activityId)!;
    const similarActivityB = enriched.activitiesById.get(similarB.activityId)!;
    enriched.activitiesById.set(similarA.activityId, { ...similarActivityA, prompt: '小明有12盒彩笔，送给同学3盒。' });
    enriched.activitiesById.set(similarB.activityId, { ...similarActivityB, prompt: '小明有 ４０ 盒彩笔，送给同学 ８ 盒！' });

    const report = await buildChallengeQualityReport(enriched, { seedCount: 1 });
    const serialized = JSON.stringify(report);

    expect(report.exactDuplicateGroups).toContainEqual(expect.objectContaining({
      representativeQuestionId: [exactSource.questionId, duplicateQuestionId].sort()[0],
      questionIds: expect.arrayContaining([exactSource.questionId, duplicateQuestionId]),
    }));
    expect(report.groups.find(({ groupId }) => groupId === group.definition.id)?.difficultyStats[exactSource.difficulty].effectiveUniqueCount).toBe(30);
    expect(report.similarQuestionPairs).toContainEqual(expect.objectContaining({
      questionIds: [similarA.questionId, similarB.questionId].sort(),
    }));
    expect(serialized).not.toContain('小明有12盒彩笔');
    expect(serialized).not.toContain('小明有 ４０ 盒彩笔');
  });

  it('keeps JSON and Markdown reports free of question content and personal data', async () => {
    const report = await buildChallengeQualityReport(inputs, { seedCount: 1 });
    const serialized = JSON.stringify(report);
    const markdown = renderChallengeQualityMarkdown(report);
    const sampleQuestion = inputs.manifest.questions[0];
    const sampleActivity = inputs.activitiesById.get(sampleQuestion.activityId)!;

    expect(serialized).not.toContain(sampleActivity.prompt);
    expect(serialized).not.toContain(sampleActivity.hint);
    expect(serialized).not.toContain(sampleActivity.explanation);
    expect(serialized).not.toContain('Codex content-author self-review');
    expect(markdown).toContain('闯关题库质量报告');
    expect(markdown).not.toContain(sampleActivity.prompt);
    expect(markdown).not.toContain(sampleActivity.hint);
    expect(markdown).not.toContain(sampleActivity.explanation);
  });
});
