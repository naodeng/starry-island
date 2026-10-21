import { beforeAll, describe, expect, it } from 'vitest';
import type { ActivityDefinition, CurriculumUnit, Difficulty } from '../../content/types';
import { fingerprintActivity } from './fingerprint';
import { validatePilotManifest } from './validateManifest';
import type { ChallengeGroupManifest, ChallengeManifest, ChallengeQuestionRecord } from '../domain/types';

const UNIT_1 = 'grade-2/term-1/math/unit-01';
const UNIT_2 = 'grade-2/term-1/math/unit-02';
const DIFFICULTIES: readonly Difficulty[] = ['basic', 'advanced', 'high'];
const UNIT_KNOWLEDGE = ['length-units', 'measurement-and-estimation'];
const SEMESTER_KNOWLEDGE = [...UNIT_KNOWLEDGE, 'addition-subtraction', 'problem-solving'];
const nodeCryptoSpecifier = ['node', 'crypto'].join(':');
const { webcrypto } = await import(nodeCryptoSpecifier);

interface Fixture {
  manifest: ChallengeManifest;
  activitiesById: Map<string, ActivityDefinition>;
  sourceUnitByActivityId: Map<string, string>;
  unitsById: Map<string, CurriculumUnit>;
}

function makeUnit(id: string, formalUnitNumber: number | null, type: CurriculumUnit['type'] = 'unit') {
  return {
    id,
    subject: 'math',
    title: id === UNIT_1 ? '第一单元 · 长度单位' : '第二单元 · 加法和减法',
    type,
    formalUnitNumber,
    achievementEligible: formalUnitNumber !== null && type === 'unit',
    textbookEditionId: 'grade-2/term-1/math',
    sourceTopics: ['已核对教材目录主题'],
    difficultyTracks: { basic: { difficulty: 'basic', tasks: [] }, advanced: { difficulty: 'advanced', tasks: [] }, high: { difficulty: 'high', tasks: [] } },
  } as CurriculumUnit;
}

function makeActivity(id: string, prompt: string): ActivityDefinition {
  return {
    id,
    kind: 'choice',
    prompt,
    hint: '先回想题目中的条件。',
    explanation: '根据题目条件选择正确答案。',
    options: [
      { id: 'correct', label: '正确答案' },
      { id: 'incorrect', label: '另一种说法' },
    ],
    correctOptionId: 'correct',
  };
}

function makeTasks(groupId: string, kind: 'unit' | 'semester', coreKnowledgePointIds: string[]) {
  const targetCount = kind === 'unit' ? 15 : 25;
  return [
    { id: `${groupId}/basic-01`, difficulty: 'basic', targetCount, requiredKnowledgePointIds: coreKnowledgePointIds },
    { id: `${groupId}/basic-02`, difficulty: 'basic', targetCount, requiredKnowledgePointIds: coreKnowledgePointIds },
    { id: `${groupId}/advanced-01`, difficulty: 'advanced', targetCount, requiredKnowledgePointIds: coreKnowledgePointIds },
    { id: `${groupId}/advanced-02`, difficulty: 'advanced', targetCount, requiredKnowledgePointIds: coreKnowledgePointIds },
    { id: `${groupId}/high-01`, difficulty: 'high', targetCount, requiredKnowledgePointIds: coreKnowledgePointIds.slice(0, 2) },
  ] as ChallengeGroupManifest['definition']['tasks'];
}

function makeGroup(id: string, kind: 'unit' | 'semester', questionIds: string[]): ChallengeGroupManifest {
  const coreKnowledgePointIds = kind === 'unit' ? UNIT_KNOWLEDGE : SEMESTER_KNOWLEDGE;
  return {
    definition: {
      id,
      kind,
      grade: 2,
      semester: 1,
      subject: 'math',
      sourceUnitIds: kind === 'unit' ? [UNIT_1] : [UNIT_1, UNIT_2],
      ...(kind === 'semester' ? { stage: 'first-half' as const } : {}),
      coreKnowledgePointIds,
      mappingEvidence: {
        source: kind === 'unit' ? 'checked unit catalog' : 'checked stage mapping in repository fixture',
        checkedAt: '2026-10-21',
        notes: 'Synthetic fixture mapping for validator tests.',
      },
      tasks: makeTasks(id, kind, coreKnowledgePointIds),
    },
    questionIds,
    releaseIntent: 'released',
  };
}

async function makeFixture(): Promise<Fixture> {
  const activitiesById = new Map<string, ActivityDefinition>();
  const sourceUnitByActivityId = new Map<string, string>();
  const unitsById = new Map<string, CurriculumUnit>([[UNIT_1, makeUnit(UNIT_1, 1)], [UNIT_2, makeUnit(UNIT_2, 2)]]);
  const questions: ChallengeQuestionRecord[] = [];
  const groupQuestions: Record<'unit' | 'semester', string[]> = { unit: [], semester: [] };

  for (const difficulty of DIFFICULTIES) {
    for (let index = 0; index < 50; index += 1) {
      const sourceUnitId = index < 30 ? UNIT_1 : UNIT_2;
      const activityId = `${sourceUnitId}/${difficulty}/candidate-${String(index + 1).padStart(2, '0')}`;
      const questionId = `${activityId}/challenge-question`;
      const knowledgePointIds = sourceUnitId === UNIT_1 ? UNIT_KNOWLEDGE : SEMESTER_KNOWLEDGE.slice(2);
      const activity = makeActivity(activityId, `测试题 ${difficulty} ${index + 1}`);
      activitiesById.set(activityId, activity);
      sourceUnitByActivityId.set(activityId, sourceUnitId);
      questions.push({
        questionId,
        activityId,
        difficulty,
        knowledgePointIds,
        lifecycle: 'active',
        approved: true,
        answerLeakageReviewed: true,
        approvedContentFingerprint: await fingerprintActivity(activity, webcrypto.subtle),
        approvedBy: 'fixture-author',
        approvedAt: '2026-10-21T00:00:00.000Z',
      });
      if (index < 30) groupQuestions.unit.push(questionId);
      groupQuestions.semester.push(questionId);
    }
  }

  return {
    manifest: {
      version: 'pilot-test-v1',
      questions,
      groups: [
        makeGroup('grade-2-term-1-math-unit-01', 'unit', groupQuestions.unit),
        makeGroup('grade-2-term-1-math-first-half', 'semester', groupQuestions.semester),
      ],
    },
    activitiesById,
    sourceUnitByActivityId,
    unitsById,
  };
}

function cloneFixture(fixture: Fixture): Fixture {
  return {
    manifest: structuredClone(fixture.manifest),
    activitiesById: new Map(fixture.activitiesById),
    sourceUnitByActivityId: new Map(fixture.sourceUnitByActivityId),
    unitsById: new Map(fixture.unitsById),
  };
}

describe('validatePilotManifest', () => {
  let fixture: Fixture;

  beforeAll(async () => {
    fixture = await makeFixture();
  });

  it('marks complete released unit and semester groups ready', async () => {
    const report = await validatePilotManifest(
      fixture.manifest,
      fixture.activitiesById,
      fixture.sourceUnitByActivityId,
      fixture.unitsById,
    );

    expect(report.errors).toEqual([]);
    expect(report.groupStatusById).toEqual({
      'grade-2-term-1-math-unit-01': 'ready',
      'grade-2-term-1-math-first-half': 'ready',
    });
  });

  it('rejects missing references, duplicate question IDs and shared activity aliases', async () => {
    const missingActivity = cloneFixture(fixture);
    missingActivity.manifest.questions[0].activityId = 'missing/activity';
    const missingReport = await validatePilotManifest(missingActivity.manifest, missingActivity.activitiesById, missingActivity.sourceUnitByActivityId, missingActivity.unitsById);
    expect(missingReport.errors.map(({ code }) => code)).toContain('missing-activity');

    const duplicate = cloneFixture(fixture);
    duplicate.manifest.questions.push({ ...duplicate.manifest.questions[0] });
    const duplicateReport = await validatePilotManifest(duplicate.manifest, duplicate.activitiesById, duplicate.sourceUnitByActivityId, duplicate.unitsById);
    expect(duplicateReport.errors.map(({ code }) => code)).toContain('duplicate-question-id');

    const aliased = cloneFixture(fixture);
    aliased.manifest.questions[1].activityId = aliased.manifest.questions[0].activityId;
    const aliasReport = await validatePilotManifest(aliased.manifest, aliased.activitiesById, aliased.sourceUnitByActivityId, aliased.unitsById);
    expect(aliasReport.errors.map(({ code }) => code)).toContain('duplicate-activity-id');
  });

  it('rejects exact duplicate question content from an effective candidate pool', async () => {
    const duplicate = cloneFixture(fixture);
    const copy = { ...duplicate.manifest.questions[0], questionId: 'duplicate-content-id' };
    duplicate.manifest.questions.push(copy);
    duplicate.manifest.groups[0].questionIds.push(copy.questionId);

    const report = await validatePilotManifest(duplicate.manifest, duplicate.activitiesById, duplicate.sourceUnitByActivityId, duplicate.unitsById);

    expect(report.errors.map(({ code }) => code)).toContain('duplicate-content-fingerprint');
    expect(report.groupStatusById[duplicate.manifest.groups[0].definition.id]).toBe('unavailable');
  });

  it('rejects inactive, unapproved, unsafe and unsupported-measurement candidates', async () => {
    for (const update of [
      (question: ChallengeQuestionRecord) => { question.lifecycle = 'disabled'; },
      (question: ChallengeQuestionRecord) => { question.approved = false; },
      (question: ChallengeQuestionRecord) => { question.answerLeakageReviewed = false; },
    ]) {
      const invalid = cloneFixture(fixture);
      update(invalid.manifest.questions[0]);
      const report = await validatePilotManifest(invalid.manifest, invalid.activitiesById, invalid.sourceUnitByActivityId, invalid.unitsById);
      expect(report.groupStatusById[invalid.manifest.groups[0].definition.id]).toBe('unavailable');
      expect(report.errors.length).toBeGreaterThan(0);
    }

    const measurement = cloneFixture(fixture);
    const question = measurement.manifest.questions[0];
    measurement.activitiesById.set(question.activityId, {
      id: question.activityId,
      kind: 'measurement',
      prompt: '虚拟线段的长度是多少？',
      hint: '观察尺子。',
      explanation: '线段与尺上目标长度相同。',
      objectLabel: '虚拟线段',
      targetLengthCm: 8,
      minCm: 5,
      maxCm: 10,
    });
    question.approvedContentFingerprint = await fingerprintActivity(measurement.activitiesById.get(question.activityId)!, webcrypto.subtle);
    const report = await validatePilotManifest(measurement.manifest, measurement.activitiesById, measurement.sourceUnitByActivityId, measurement.unitsById);
    expect(report.errors.map(({ code }) => code)).toContain('unsupported-activity-kind');
  });

  it('requires author and time on self-approved candidates', async () => {
    const invalid = cloneFixture(fixture);
    delete invalid.manifest.questions[0].approvedBy;
    const report = await validatePilotManifest(invalid.manifest, invalid.activitiesById, invalid.sourceUnitByActivityId, invalid.unitsById);
    expect(report.errors.map(({ code }) => code)).toContain('missing-approval-record');
    expect(report.groupStatusById[invalid.manifest.groups[0].definition.id]).toBe('unavailable');
  });

  it('requires formal unit references and keeps question source units inside each group', async () => {
    const invalidUnit = cloneFixture(fixture);
    invalidUnit.unitsById.set(UNIT_1, makeUnit(UNIT_1, null, 'integrated-practice'));
    const unitReport = await validatePilotManifest(invalidUnit.manifest, invalidUnit.activitiesById, invalidUnit.sourceUnitByActivityId, invalidUnit.unitsById);
    expect(unitReport.errors.map(({ code }) => code)).toContain('invalid-unit-source');

    const outOfScope = cloneFixture(fixture);
    outOfScope.manifest.groups[0].questionIds.push(outOfScope.manifest.questions.find(({ activityId }) => activityId.startsWith(UNIT_2))!.questionId);
    const scopeReport = await validatePilotManifest(outOfScope.manifest, outOfScope.activitiesById, outOfScope.sourceUnitByActivityId, outOfScope.unitsById);
    expect(scopeReport.errors.map(({ code }) => code)).toContain('question-outside-group-scope');
  });

  it('allows reviewed auxiliary knowledge tags while requiring non-empty, unique question tags', async () => {
    const auxiliary = cloneFixture(fixture);
    auxiliary.manifest.questions[0].knowledgePointIds.push('measuring-tools');
    const auxiliaryReport = await validatePilotManifest(auxiliary.manifest, auxiliary.activitiesById, auxiliary.sourceUnitByActivityId, auxiliary.unitsById);
    expect(auxiliaryReport.errors).toEqual([]);
    expect(auxiliaryReport.groupStatusById[auxiliary.manifest.groups[0].definition.id]).toBe('ready');

    const invalid = cloneFixture(fixture);
    invalid.manifest.questions[0].knowledgePointIds = ['length-units', 'length-units'];
    const invalidReport = await validatePilotManifest(invalid.manifest, invalid.activitiesById, invalid.sourceUnitByActivityId, invalid.unitsById);
    expect(invalidReport.errors.map(({ code }) => code)).toContain('invalid-question-knowledge-points');
  });

  it('requires exactly one group of each kind and five tasks with the 2/2/1 difficulty structure', async () => {
    const invalid = cloneFixture(fixture);
    invalid.manifest.groups.pop();
    invalid.manifest.groups[0].definition.tasks = invalid.manifest.groups[0].definition.tasks.slice(1) as ChallengeGroupManifest['definition']['tasks'];
    const report = await validatePilotManifest(invalid.manifest, invalid.activitiesById, invalid.sourceUnitByActivityId, invalid.unitsById);

    expect(report.errors.map(({ code }) => code)).toContain('invalid-group-count');
    expect(report.errors.map(({ code }) => code)).toContain('invalid-task-structure');
  });

  it('requires paired basic and advanced tasks to cover every core knowledge point', async () => {
    const invalid = cloneFixture(fixture);
    invalid.manifest.groups[0].definition.tasks[0].requiredKnowledgePointIds = ['length-units'];
    invalid.manifest.groups[0].definition.tasks[1].requiredKnowledgePointIds = ['length-units'];
    invalid.manifest.groups[0].definition.tasks[2].requiredKnowledgePointIds = ['length-units'];
    invalid.manifest.groups[0].definition.tasks[3].requiredKnowledgePointIds = ['length-units'];
    expect(invalid.manifest.groups[0].definition.coreKnowledgePointIds).toEqual(['length-units', 'measurement-and-estimation']);
    expect(invalid.manifest.groups[0].definition.tasks.slice(0, 4).map(({ requiredKnowledgePointIds }) => requiredKnowledgePointIds))
      .toEqual([['length-units'], ['length-units'], ['length-units'], ['length-units']]);
    const report = await validatePilotManifest(invalid.manifest, invalid.activitiesById, invalid.sourceUnitByActivityId, invalid.unitsById);
    expect(report.errors).toContainEqual(expect.objectContaining({
      code: 'incomplete-tier-coverage',
      groupId: invalid.manifest.groups[0].definition.id,
    }));
  });

  it('enforces task sizes, twice-sized pools, task-level high integration and stage evidence', async () => {
    const invalid = cloneFixture(fixture);
    const unitGroup = invalid.manifest.groups[0];
    unitGroup.definition.tasks[0].targetCount = 14;
    unitGroup.definition.tasks[4].requiredKnowledgePointIds = ['length-units'];
    const semesterGroup = invalid.manifest.groups[1];
    semesterGroup.definition.mappingEvidence.source = '';
    semesterGroup.definition.stage = undefined;
    semesterGroup.questionIds = semesterGroup.questionIds.slice(0, 149);

    const report = await validatePilotManifest(invalid.manifest, invalid.activitiesById, invalid.sourceUnitByActivityId, invalid.unitsById);
    const codes = report.errors.map(({ code }) => code);

    expect(codes).toContain('invalid-target-count');
    expect(codes).toContain('insufficient-high-task-integration');
    expect(codes).toContain('missing-stage-evidence');
    expect(codes).toContain('insufficient-candidate-pool');
    expect(report.groupStatusById[semesterGroup.definition.id]).toBe('unavailable');
  });

  it('allows single-concept high candidates when the assembled high task covers multiple concepts', async () => {
    const valid = cloneFixture(fixture);
    const highQuestion = valid.manifest.questions.find(({ difficulty }) => difficulty === 'high')!;
    highQuestion.knowledgePointIds = ['length-units'];

    const report = await validatePilotManifest(valid.manifest, valid.activitiesById, valid.sourceUnitByActivityId, valid.unitsById);

    expect(report.errors).toEqual([]);
    expect(report.groupStatusById[valid.manifest.groups[0].definition.id]).toBe('ready');
  });

  it('maps planned and suspended groups without making them ready', async () => {
    const planned = cloneFixture(fixture);
    planned.manifest.groups[0].releaseIntent = 'planned';
    planned.manifest.groups[1].releaseIntent = 'suspended';
    planned.manifest.groups[1].unavailableReason = '阶段边界尚待确认';
    const report = await validatePilotManifest(planned.manifest, planned.activitiesById, planned.sourceUnitByActivityId, planned.unitsById);

    expect(report.groupStatusById).toEqual({
      'grade-2-term-1-math-unit-01': 'planned',
      'grade-2-term-1-math-first-half': 'unavailable',
    });
  });

  it('reports content fingerprint changes without revoking approval or readiness', async () => {
    const changed = cloneFixture(fixture);
    const record = changed.manifest.questions[0];
    const activity = changed.activitiesById.get(record.activityId)!;
    changed.activitiesById.set(record.activityId, { ...activity, prompt: `${activity.prompt}（修订题干）` });

    const report = await validatePilotManifest(changed.manifest, changed.activitiesById, changed.sourceUnitByActivityId, changed.unitsById);

    expect(report.contentChanges).toContainEqual({
      questionId: record.questionId,
      approvedContentFingerprint: record.approvedContentFingerprint,
      currentContentFingerprint: await fingerprintActivity(changed.activitiesById.get(record.activityId)!, webcrypto.subtle),
    });
    expect(record.approved).toBe(true);
    expect(report.groupStatusById[changed.manifest.groups[0].definition.id]).toBe('ready');
  });
});
