import { describe, expect, it } from 'vitest';
import type { ChallengeManifest, ChallengeGroupManifest, ChallengeGroupDefinition } from '../domain/types';
import type { CoverageCurriculumCatalog } from './coverage';
import curriculumManifest from '../../content/curriculum-manifest.json';
import challengeManifest from './pilot-manifest.json';
import { analyzeCurriculumCoverage } from './coverage';

const fixtureTargets = {
  formalUnitGroups: 2,
  semesterStageGroups: 3,
  catalogCombinationIds: ['grade-1/term-1/math'],
};

const unitIds = [
  'grade-1/term-1/math/unit-01',
  'grade-1/term-1/math/unit-02',
] as const;
const stages = ['first-half', 'second-half', 'end-term'] as const;

function createCurriculum(): CoverageCurriculumCatalog {
  return {
    grades: [{
      id: 'grade-1',
      title: '一年级',
      terms: [{
        id: 'term-1',
        title: '上学期',
        subjects: [{
          id: 'math',
          title: '数学',
          units: unitIds.map((curriculumUnitKey, index) => ({
            id: `unit-${String(index + 1).padStart(2, '0')}`,
            title: `单元 ${index + 1}`,
            status: 'active',
            type: 'unit',
            formalUnitNumber: index + 1,
            achievementEligible: true,
            textbookEditionId: 'grade-1/term-1/math',
            curriculumUnitKey,
          })),
        }],
      }],
    }],
  };
}

function createTasks(groupId: string) {
  return [
    { id: `${groupId}/basic-01`, difficulty: 'basic', targetCount: 15, requiredKnowledgePointIds: ['position'] },
    { id: `${groupId}/basic-02`, difficulty: 'basic', targetCount: 15, requiredKnowledgePointIds: ['position'] },
    { id: `${groupId}/advanced-01`, difficulty: 'advanced', targetCount: 15, requiredKnowledgePointIds: ['position'] },
    { id: `${groupId}/advanced-02`, difficulty: 'advanced', targetCount: 15, requiredKnowledgePointIds: ['position'] },
    { id: `${groupId}/high-01`, difficulty: 'high', targetCount: 15, requiredKnowledgePointIds: ['position'] },
  ];
}

function createGroup(
  id: string,
  kind: 'unit' | 'semester',
  sourceUnitIds: string[],
  options: { stage?: typeof stages[number]; releaseIntent?: 'released' | 'planned' | 'suspended'; tasks?: ReturnType<typeof createTasks> } = {},
): ChallengeGroupManifest {
  const definition: ChallengeGroupDefinition = {
    id,
    kind,
    grade: 1,
    semester: 1,
    subject: 'math',
    sourceUnitIds,
    ...(options.stage ? { stage: options.stage } : {}),
    coreKnowledgePointIds: ['position'],
    mappingEvidence: { source: 'fixture', checkedAt: '2026-10-23', notes: 'fixture' },
    tasks: (options.tasks ?? createTasks(id)) as ChallengeGroupDefinition['tasks'],
  };
  return { definition, questionIds: [], releaseIntent: options.releaseIntent ?? 'released' };
}

function createCompleteManifest(): ChallengeManifest {
  const groups: ChallengeGroupManifest[] = unitIds.map((sourceUnitId, index) => {
    const id = `grade-1-term-1-math-unit-${String(index + 1).padStart(2, '0')}`;
    return createGroup(id, 'unit', [sourceUnitId]);
  });
  for (const stage of stages) {
    const id = `grade-1-term-1-math-${stage}`;
    groups.push(createGroup(id, 'semester', [...unitIds], { stage }));
  }
  return { version: 'test-v1', questions: [], groups };
}

describe('analyzeCurriculumCoverage', () => {
  it('fails closed when the curriculum catalog is missing the frozen V1.0 inventory', () => {
    const report = analyzeCurriculumCoverage({ grades: [] }, { version: 'empty-catalog', questions: [], groups: [] });

    expect(report.complete).toBe(false);
    expect(report.catalogIssues).toEqual(expect.arrayContaining([
      expect.objectContaining({ reason: 'V1.0 正式单元目标为 254 个，课程目录当前登记 0 个。' }),
      expect.objectContaining({ reason: 'V1.0 学期阶段组目标为 108 个，课程目录当前推导出 0 个。' }),
    ]));
  });

  it('rejects a substituted grade-term-subject combination even when the stage count matches', () => {
    const curriculum = createCurriculum();
    curriculum.grades[0]!.terms[0]!.id = 'term-2';
    const targets = {
      formalUnitGroups: 2,
      semesterStageGroups: 3,
      catalogCombinationIds: ['grade-1/term-1/math'],
    };

    const report = analyzeCurriculumCoverage(curriculum, { version: 'substituted-combo', questions: [], groups: [] }, targets);

    expect(report.catalogIssues.map((issue) => issue.reason)).toContain('课程目录缺少 V1.0 组合 grade-1/term-1/math。');
    expect(report.catalogIssues.map((issue) => issue.reason)).toContain('课程目录包含非 V1.0 组合 grade-1/term-2/math。');
    expect(report.complete).toBe(false);
  });

  it('audits the repository catalog against the V1.0 unit and semester targets', () => {
    const report = analyzeCurriculumCoverage(curriculumManifest as unknown as CoverageCurriculumCatalog, challengeManifest as ChallengeManifest);

    expect(report.expected).toEqual({ unitGroups: 254, unitTasks: 1270, semesterGroups: 108, semesterTasks: 540 });
    expect(report.registered).toEqual({
      unitGroups: 6,
      releasedUnitGroups: 6,
      unitTasks: 30,
      semesterGroups: 1,
      releasedSemesterGroups: 1,
      semesterTasks: 5,
    });
    expect(report.missing.unitGroupIds).toHaveLength(248);
    expect(report.missing.semesterGroupIds).toHaveLength(107);
    expect(report.unreleasedGroupIds).toEqual([]);
    expect(report.taskIssues).toEqual([]);
    expect(report.mappingIssues).toEqual([]);
    expect(report.identityIssues).toEqual([]);
    expect(report.catalogIssues).toEqual([]);
    expect(report.unexpectedGroupIds).toEqual([]);
    expect(report.complete).toBe(false);
  });

  it('counts all formal units and all three semester stages, including their fifteen required tasks', () => {
    const report = analyzeCurriculumCoverage(createCurriculum(), createCompleteManifest(), fixtureTargets);

    expect(report.expected).toEqual({ unitGroups: 2, unitTasks: 10, semesterGroups: 3, semesterTasks: 15 });
    expect(report.registered).toEqual({
      unitGroups: 2,
      releasedUnitGroups: 2,
      unitTasks: 10,
      semesterGroups: 3,
      releasedSemesterGroups: 3,
      semesterTasks: 15,
    });
    expect(report.complete).toBe(true);
  });

  it('lists missing formal-unit groups and all semester stages without inventing coverage', () => {
    const report = analyzeCurriculumCoverage(createCurriculum(), { version: 'test-v1', questions: [], groups: [] }, fixtureTargets);

    expect(report.missing.unitGroupIds).toEqual([
      'grade-1-term-1-math-unit-01',
      'grade-1-term-1-math-unit-02',
    ]);
    expect(report.missing.semesterGroupIds).toEqual(stages.map((stage) => `grade-1-term-1-math-${stage}`));
    expect(report.complete).toBe(false);
  });

  it('does not count planned groups as V1.0 released coverage', () => {
    const manifest = createCompleteManifest();
    manifest.groups[0]!.releaseIntent = 'planned';

    const report = analyzeCurriculumCoverage(createCurriculum(), manifest, fixtureTargets);

    expect(report.registered.unitGroups).toBe(2);
    expect(report.registered.releasedUnitGroups).toBe(1);
    expect(report.unreleasedGroupIds).toContain('grade-1-term-1-math-unit-01');
    expect(report.complete).toBe(false);
  });

  it('reports groups whose task count or difficulty distribution differs from the PRD', () => {
    const manifest = createCompleteManifest();
    manifest.groups[0]!.definition.tasks = createTasks('grade-1-term-1-math-unit-01').slice(0, 4) as ChallengeGroupDefinition['tasks'];
    manifest.groups[2]!.definition.tasks = createTasks('grade-1-term-1-math-first-half').map((task) => ({ ...task, difficulty: 'basic' })) as ChallengeGroupDefinition['tasks'];

    const report = analyzeCurriculumCoverage(createCurriculum(), manifest, fixtureTargets);

    expect(report.taskIssues.map((issue) => issue.groupId)).toEqual([
      'grade-1-term-1-math-first-half',
      'grade-1-term-1-math-unit-01',
    ]);
    expect(report.complete).toBe(false);
  });

  it('rejects semester groups that source units outside their grade, term, and subject', () => {
    const manifest = createCompleteManifest();
    manifest.groups[2]!.definition.sourceUnitIds = ['grade-1/term-2/math/unit-01'];

    const report = analyzeCurriculumCoverage(createCurriculum(), manifest, fixtureTargets);

    expect(report.mappingIssues).toEqual([{
      groupId: 'grade-1-term-1-math-first-half',
      sourceUnitId: 'grade-1/term-2/math/unit-01',
      reason: '来源单元不存在于同一年级、学期和学科的课程清单中。',
    }]);
    expect(report.complete).toBe(false);
  });

  it('reports duplicate and unexpected group IDs instead of silently choosing one', () => {
    const manifest = createCompleteManifest();
    manifest.groups.push({ ...manifest.groups[0]!, releaseIntent: 'planned' });
    manifest.groups.push(createGroup('grade-9-term-1-math-unit-01', 'unit', [unitIds[0]]));

    const report = analyzeCurriculumCoverage(createCurriculum(), manifest, fixtureTargets);

    expect(report.duplicateGroupIds).toEqual(['grade-1-term-1-math-unit-01']);
    expect(report.unexpectedGroupIds).toEqual(['grade-9-term-1-math-unit-01']);
    expect(report.complete).toBe(false);
  });
});
