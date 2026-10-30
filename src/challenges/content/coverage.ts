import type { Curriculum, Difficulty } from '../../content/types';
import type { ChallengeGroupManifest, ChallengeManifest } from '../domain/types';

const SEMESTER_STAGES = ['first-half', 'second-half', 'end-term'] as const;
const EXPECTED_DIFFICULTY_COUNTS: Record<Difficulty, number> = { basic: 2, advanced: 2, high: 1 };

type SemesterStage = typeof SEMESTER_STAGES[number];

export type CoverageCurriculumCatalog = Pick<Curriculum, 'grades'>;

export interface CoverageTargetCounts {
  formalUnitGroups: number;
  semesterStageGroups: number;
  catalogCombinationIds: string[];
}

const V1_CATALOG_COMBINATION_IDS = Array.from({ length: 6 }, (_, gradeIndex) => {
  const gradeId = `grade-${gradeIndex + 1}`;
  return [1, 2].flatMap((termNumber) => ['chinese', 'math', 'english']
    .map((subjectId) => `${gradeId}/term-${termNumber}/${subjectId}`));
}).flat();

// 冻结目标来自 PRD 的 6×2×3 学期组合与 2026-10-29 当前教材目录中的 251 个正式单元。
// 正式课程清单发生变更时，应先更新基线和覆盖测试，再调整这些值。
export const V1_COVERAGE_TARGETS: CoverageTargetCounts = {
  formalUnitGroups: 251,
  semesterStageGroups: 108,
  catalogCombinationIds: V1_CATALOG_COMBINATION_IDS,
};

export interface CurriculumCoverageReport {
  reportSchemaVersion: 1;
  manifestVersion: string;
  expected: {
    unitGroups: number;
    unitTasks: number;
    semesterGroups: number;
    semesterTasks: number;
  };
  registered: {
    unitGroups: number;
    releasedUnitGroups: number;
    unitTasks: number;
    semesterGroups: number;
    releasedSemesterGroups: number;
    semesterTasks: number;
  };
  missing: {
    unitGroupIds: string[];
    semesterGroupIds: string[];
  };
  unreleasedGroupIds: string[];
  taskIssues: Array<{
    groupId: string;
    expectedTaskCount: number;
    actualTaskCount: number;
    expectedDifficultyCounts: Record<Difficulty, number>;
    actualDifficultyCounts: Record<Difficulty, number>;
  }>;
  mappingIssues: Array<{
    groupId: string;
    sourceUnitId: string;
    reason: string;
  }>;
  identityIssues: Array<{ groupId: string; reason: string }>;
  catalogIssues: Array<{ groupId: string; reason: string }>;
  duplicateGroupIds: string[];
  unexpectedGroupIds: string[];
  complete: boolean;
}

interface ExpectedUnitGroup {
  id: string;
  gradeId: string;
  termId: string;
  subjectId: string;
  sourceUnitId?: string;
}

interface ExpectedSemesterGroup {
  id: string;
  gradeId: string;
  termId: string;
  subjectId: string;
  stage: SemesterStage;
}

function createGroupId(gradeId: string, termId: string, subjectId: string, suffix: string): string {
  return `${gradeId}-${termId}-${subjectId}-${suffix}`;
}

function collectExpectedGroups(curriculum: CoverageCurriculumCatalog): {
  units: ExpectedUnitGroup[];
  semesters: ExpectedSemesterGroup[];
  combinations: string[];
  catalogUnitsByKey: Map<string, { gradeId: string; termId: string; subjectId: string }>;
  catalogIssues: CurriculumCoverageReport['catalogIssues'];
} {
  const units: ExpectedUnitGroup[] = [];
  const semesters: ExpectedSemesterGroup[] = [];
  const combinations = new Set<string>();
  const catalogUnitsByKey = new Map<string, { gradeId: string; termId: string; subjectId: string }>();
  const catalogIssues: CurriculumCoverageReport['catalogIssues'] = [];

  for (const grade of curriculum.grades) {
    for (const term of grade.terms) {
      for (const subject of term.subjects) {
        combinations.add(`${grade.id}/${term.id}/${subject.id}`);
        for (const stage of SEMESTER_STAGES) {
          semesters.push({
            id: createGroupId(grade.id, term.id, subject.id, stage),
            gradeId: grade.id,
            termId: term.id,
            subjectId: subject.id,
            stage,
          });
        }

        for (const unit of subject.units) {
          if (unit.curriculumUnitKey) {
            if (catalogUnitsByKey.has(unit.curriculumUnitKey)) {
              catalogIssues.push({ groupId: unit.curriculumUnitKey, reason: '课程目录中存在重复的 curriculumUnitKey。' });
            } else {
              catalogUnitsByKey.set(unit.curriculumUnitKey, { gradeId: grade.id, termId: term.id, subjectId: subject.id });
            }
          }
          if (unit.type !== 'unit' || unit.achievementEligible !== true) continue;
          if (typeof unit.formalUnitNumber !== 'number' || !Number.isInteger(unit.formalUnitNumber) || unit.formalUnitNumber <= 0) {
            const groupId = createGroupId(grade.id, term.id, subject.id, `unit-${unit.id}`);
            catalogIssues.push({ groupId, reason: '正式单元缺少有效的正整数教材编号。' });
            continue;
          }

          const groupId = createGroupId(grade.id, term.id, subject.id, `unit-${String(unit.formalUnitNumber).padStart(2, '0')}`);
          if (!unit.curriculumUnitKey || !catalogUnitsByKey.has(unit.curriculumUnitKey)) {
            catalogIssues.push({ groupId, reason: '正式单元缺少有效的 curriculumUnitKey。' });
          }
          units.push({
            id: groupId,
            gradeId: grade.id,
            termId: term.id,
            subjectId: subject.id,
            ...(unit.curriculumUnitKey ? { sourceUnitId: unit.curriculumUnitKey } : {}),
          });
        }
      }
    }
  }

  const unitIds = new Set<string>();
  for (const unit of units) {
    if (unitIds.has(unit.id)) catalogIssues.push({ groupId: unit.id, reason: '课程目录中存在重复的正式单元编号。' });
    unitIds.add(unit.id);
  }
  const semesterIds = new Set<string>();
  for (const semester of semesters) {
    if (semesterIds.has(semester.id)) catalogIssues.push({ groupId: semester.id, reason: '课程目录中存在重复的年级、学期或学科组合。' });
    semesterIds.add(semester.id);
  }

  return { units, semesters, combinations: [...combinations], catalogUnitsByKey, catalogIssues };
}

function indexGroups(groups: ChallengeGroupManifest[]): {
  byId: Map<string, ChallengeGroupManifest>;
  duplicates: string[];
} {
  const groupsById = new Map<string, ChallengeGroupManifest[]>();
  for (const group of groups) {
    const id = group.definition.id;
    const existing = groupsById.get(id) ?? [];
    existing.push(group);
    groupsById.set(id, existing);
  }
  const duplicates = [...groupsById.entries()].filter(([, entries]) => entries.length > 1).map(([id]) => id).sort();
  const byId = new Map([...groupsById.entries()]
    .filter(([, entries]) => entries.length === 1)
    .map(([id, entries]) => [id, entries[0]!]));
  return { byId, duplicates };
}

function expectedIdentityMatches(
  group: ChallengeGroupManifest,
  expected: ExpectedUnitGroup | ExpectedSemesterGroup,
  kind: 'unit' | 'semester',
): boolean {
  const definition = group.definition;
  return definition.kind === kind
    && definition.grade === Number(expected.gradeId.replace('grade-', ''))
    && definition.semester === Number(expected.termId.replace('term-', ''))
    && definition.subject === expected.subjectId;
}

function countDifficulty(tasks: ChallengeGroupManifest['definition']['tasks']): Record<Difficulty, number> {
  const actual: Record<Difficulty, number> = { basic: 0, advanced: 0, high: 0 };
  for (const task of tasks) {
    if (task.difficulty in actual) actual[task.difficulty as Difficulty] += 1;
  }
  return actual;
}

function validateTaskShape(group: ChallengeGroupManifest, taskIssues: CurriculumCoverageReport['taskIssues']): void {
  const actualDifficultyCounts = countDifficulty(group.definition.tasks);
  const isExpectedDistribution = (Object.keys(EXPECTED_DIFFICULTY_COUNTS) as Difficulty[])
    .every((difficulty) => actualDifficultyCounts[difficulty] === EXPECTED_DIFFICULTY_COUNTS[difficulty]);
  if (group.definition.tasks.length === 5 && isExpectedDistribution) return;
  taskIssues.push({
    groupId: group.definition.id,
    expectedTaskCount: 5,
    actualTaskCount: group.definition.tasks.length,
    expectedDifficultyCounts: { ...EXPECTED_DIFFICULTY_COUNTS },
    actualDifficultyCounts,
  });
}

function recordMappingIssues(
  group: ChallengeGroupManifest,
  expected: ExpectedUnitGroup | ExpectedSemesterGroup,
  catalogUnitsByKey: Map<string, { gradeId: string; termId: string; subjectId: string }>,
  kind: 'unit' | 'semester',
  mappingIssues: CurriculumCoverageReport['mappingIssues'],
): void {
  const expectedEditionId = `${expected.gradeId}/${expected.termId}/${expected.subjectId}`;
  if (kind === 'unit') {
    const expectedSourceId = (expected as ExpectedUnitGroup).sourceUnitId;
    if (!expectedSourceId || group.definition.sourceUnitIds.length !== 1 || group.definition.sourceUnitIds[0] !== expectedSourceId) {
      mappingIssues.push({
        groupId: group.definition.id,
        sourceUnitId: group.definition.sourceUnitIds.join(', '),
        reason: '单元组必须且只能引用对应的正式课程单元。',
      });
    }
  } else if (group.definition.sourceUnitIds.length === 0) {
    mappingIssues.push({
      groupId: group.definition.id,
      sourceUnitId: '',
      reason: '学期阶段组至少要引用一个课程单元或复习条目。',
    });
  }

  for (const sourceUnitId of group.definition.sourceUnitIds) {
    const unit = catalogUnitsByKey.get(sourceUnitId);
    if (!unit || `${unit.gradeId}/${unit.termId}/${unit.subjectId}` !== expectedEditionId) {
      mappingIssues.push({
        groupId: group.definition.id,
        sourceUnitId,
        reason: '来源单元不存在于同一年级、学期和学科的课程清单中。',
      });
    }
  }
}

export function analyzeCurriculumCoverage(
  curriculum: CoverageCurriculumCatalog,
  manifest: ChallengeManifest,
  targets: CoverageTargetCounts = V1_COVERAGE_TARGETS,
): CurriculumCoverageReport {
  const expected = collectExpectedGroups(curriculum);
  if (expected.units.length !== targets.formalUnitGroups) {
    expected.catalogIssues.push({
      groupId: '课程目录',
      reason: `V1.0 正式单元目标为 ${targets.formalUnitGroups} 个，课程目录当前登记 ${expected.units.length} 个。`,
    });
  }
  if (expected.semesters.length !== targets.semesterStageGroups) {
    expected.catalogIssues.push({
      groupId: '课程目录',
      reason: `V1.0 学期阶段组目标为 ${targets.semesterStageGroups} 个，课程目录当前推导出 ${expected.semesters.length} 个。`,
    });
  }
  const expectedCombinations = new Set(targets.catalogCombinationIds);
  for (const combinationId of targets.catalogCombinationIds) {
    if (!expected.combinations.includes(combinationId)) {
      expected.catalogIssues.push({ groupId: combinationId, reason: `课程目录缺少 V1.0 组合 ${combinationId}。` });
    }
  }
  for (const combinationId of expected.combinations) {
    if (!expectedCombinations.has(combinationId)) {
      expected.catalogIssues.push({ groupId: combinationId, reason: `课程目录包含非 V1.0 组合 ${combinationId}。` });
    }
  }
  const { byId, duplicates } = indexGroups(manifest.groups);
  const expectedIds = new Set([...expected.units, ...expected.semesters].map(({ id }) => id));
  const unexpectedGroupIds = [...byId.keys()].filter((id) => !expectedIds.has(id)).sort();
  const missingUnitGroupIds: string[] = [];
  const missingSemesterGroupIds: string[] = [];
  const unreleasedGroupIds: string[] = [];
  const taskIssues: CurriculumCoverageReport['taskIssues'] = [];
  const mappingIssues: CurriculumCoverageReport['mappingIssues'] = [];
  const identityIssues: CurriculumCoverageReport['identityIssues'] = [];
  let registeredUnitGroups = 0;
  let releasedUnitGroups = 0;
  let registeredUnitTasks = 0;
  let registeredSemesterGroups = 0;
  let releasedSemesterGroups = 0;
  let registeredSemesterTasks = 0;

  const inspect = (item: ExpectedUnitGroup | ExpectedSemesterGroup, kind: 'unit' | 'semester') => {
    const group = byId.get(item.id);
    if (!group) {
      (kind === 'unit' ? missingUnitGroupIds : missingSemesterGroupIds).push(item.id);
      return;
    }
    if (kind === 'unit') {
      registeredUnitGroups += 1;
      registeredUnitTasks += group.definition.tasks.length;
    }
    else {
      registeredSemesterGroups += 1;
      registeredSemesterTasks += group.definition.tasks.length;
    }
    if (group.releaseIntent === 'released') {
      if (kind === 'unit') releasedUnitGroups += 1;
      else releasedSemesterGroups += 1;
    } else {
      unreleasedGroupIds.push(item.id);
    }

    if (!expectedIdentityMatches(group, item, kind)) {
      identityIssues.push({ groupId: item.id, reason: `清单中的组定义与课程目录预期的 ${kind === 'unit' ? '单元' : '学期阶段'} 身份不一致。` });
    }
    if (kind === 'semester' && group.definition.stage !== (item as ExpectedSemesterGroup).stage) {
      identityIssues.push({ groupId: item.id, reason: '学期阶段标识与组 ID 不一致。' });
    }
    validateTaskShape(group, taskIssues);
    recordMappingIssues(group, item, expected.catalogUnitsByKey, kind, mappingIssues);
  };

  for (const unit of expected.units) inspect(unit, 'unit');
  for (const semester of expected.semesters) inspect(semester, 'semester');

  const complete = missingUnitGroupIds.length === 0
    && missingSemesterGroupIds.length === 0
    && unreleasedGroupIds.length === 0
    && taskIssues.length === 0
    && mappingIssues.length === 0
    && identityIssues.length === 0
    && expected.catalogIssues.length === 0
    && duplicates.length === 0
    && unexpectedGroupIds.length === 0
    && registeredUnitGroups === expected.units.length
    && registeredUnitTasks === expected.units.length * 5
    && releasedUnitGroups === expected.units.length
    && registeredSemesterGroups === expected.semesters.length
    && releasedSemesterGroups === expected.semesters.length
    && registeredSemesterTasks === expected.semesters.length * 5;

  return {
    reportSchemaVersion: 1,
    manifestVersion: manifest.version,
    expected: {
      unitGroups: expected.units.length,
      unitTasks: expected.units.length * 5,
      semesterGroups: expected.semesters.length,
      semesterTasks: expected.semesters.length * 5,
    },
    registered: {
      unitGroups: registeredUnitGroups,
      releasedUnitGroups,
      unitTasks: registeredUnitTasks,
      semesterGroups: registeredSemesterGroups,
      releasedSemesterGroups,
      semesterTasks: registeredSemesterTasks,
    },
    missing: { unitGroupIds: missingUnitGroupIds, semesterGroupIds: missingSemesterGroupIds },
    unreleasedGroupIds: unreleasedGroupIds.sort(),
    taskIssues: taskIssues.sort((left, right) => left.groupId.localeCompare(right.groupId)),
    mappingIssues: mappingIssues.sort((left, right) => left.groupId.localeCompare(right.groupId) || left.sourceUnitId.localeCompare(right.sourceUnitId)),
    identityIssues: identityIssues.sort((left, right) => left.groupId.localeCompare(right.groupId)),
    catalogIssues: expected.catalogIssues.sort((left, right) => left.groupId.localeCompare(right.groupId)),
    duplicateGroupIds: duplicates,
    unexpectedGroupIds,
    complete,
  };
}

export function renderCurriculumCoverageMarkdown(report: CurriculumCoverageReport): string {
  const status = report.complete ? '完整性门禁通过' : '尚未达到 V1.0 全课程覆盖';
  const lines = [
    '# 闯关全课程覆盖报告',
    '',
    `- 闯关清单版本：${report.manifestVersion}`,
    `- 覆盖状态：${status}`,
    `- 正式单元组：${report.registered.releasedUnitGroups}/${report.expected.unitGroups} 已发布（${report.registered.unitGroups} 已登记）`,
    `- 单元任务：${report.registered.unitTasks}/${report.expected.unitTasks} 已登记`,
    `- 学期阶段组：${report.registered.releasedSemesterGroups}/${report.expected.semesterGroups} 已发布（${report.registered.semesterGroups} 已登记）`,
    `- 学期任务：${report.registered.semesterTasks}/${report.expected.semesterTasks} 已登记`,
    `- 结构问题：${report.taskIssues.length + report.mappingIssues.length + report.identityIssues.length + report.catalogIssues.length + report.duplicateGroupIds.length + report.unexpectedGroupIds.length}`,
    '',
    '本报告只核对课程目录覆盖、组身份、来源单元映射、发布状态及五任务结构；不代表题目质量审核通过。题目级审核与组卷质量仍须运行 `npm run challenge:quality` 并完成人工内容检查。',
  ];
  const issueSections: Array<[string, string[]]> = [
    ['缺失正式单元组', report.missing.unitGroupIds],
    ['缺失学期阶段组', report.missing.semesterGroupIds],
    ['未发布组', report.unreleasedGroupIds],
    ['任务结构问题', report.taskIssues.map((issue) => `${issue.groupId}：${issue.actualTaskCount} 个任务，难度分布 ${JSON.stringify(issue.actualDifficultyCounts)}`)],
    ['来源映射问题', report.mappingIssues.map((issue) => `${issue.groupId} → ${issue.sourceUnitId || '无来源'}：${issue.reason}`)],
    ['组身份问题', report.identityIssues.map((issue) => `${issue.groupId}：${issue.reason}`)],
    ['课程目录问题', report.catalogIssues.map((issue) => `${issue.groupId}：${issue.reason}`)],
    ['重复组 ID', report.duplicateGroupIds],
    ['非预期组 ID', report.unexpectedGroupIds],
  ];
  for (const [title, issues] of issueSections) {
    if (issues.length === 0) continue;
    lines.push('', `## ${title}（${issues.length}）`, '');
    for (const issue of issues.slice(0, 50)) lines.push(`- ${issue}`);
    if (issues.length > 50) lines.push(`- 其余 ${issues.length - 50} 项详见 JSON 报告。`);
  }
  return `${lines.join('\n')}\n`;
}
