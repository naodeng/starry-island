import type { ActivityDefinition, CurriculumUnit, Difficulty } from '../../content/types';

const DIFFICULTIES: Difficulty[] = ['basic', 'advanced', 'high'];
const COMPATIBLE_ACTIVITY_KINDS = new Set<ActivityDefinition['kind']>(['choice', 'arithmetic', 'match', 'order', 'categorize']);

export interface SourceInventoryTargetCounts {
  formalUnitCount: number;
  minimumUniqueActivitiesPerDifficulty: number;
}

export const V1_SOURCE_INVENTORY_TARGETS: SourceInventoryTargetCounts = {
  formalUnitCount: 254,
  minimumUniqueActivitiesPerDifficulty: 30,
};

interface DifficultyInventory {
  sourceActivityCount: number;
  compatibleActivityCount: number;
  uniqueCompatibleActivityCount: number;
  exactDuplicateCount: number;
  excludedActivityCount: number;
  minimumRequired: number;
  shortage: number;
}

interface DifficultySummary extends Omit<DifficultyInventory, 'minimumRequired'> {
  unitsMeetingMinimum: number;
}

export interface CurriculumSourceInventoryReport {
  reportSchemaVersion: 1;
  expectedFormalUnitCount: number;
  formalUnitCount: number;
  catalogBaselineMatches: boolean;
  minimumUniqueActivitiesPerDifficulty: number;
  catalogIssues: string[];
  duplicateActivityIds: string[];
  summary: {
    unitsMissingMinimum: number;
    byDifficulty: Record<Difficulty, DifficultySummary>;
  };
  units: Array<{
    unitId: string;
    title: string;
    formalUnitNumber: number | null;
    byDifficulty: Record<Difficulty, DifficultyInventory>;
  }>;
}

function normalize(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(normalize);
  if (value !== null && typeof value === 'object') {
    return Object.fromEntries(Object.keys(value)
      .sort()
      .map((key) => [key, normalize((value as Record<string, unknown>)[key])]));
  }
  return value;
}

function contentKey(activity: ActivityDefinition): string {
  const { id: _activityId, ...content } = activity;
  return JSON.stringify(normalize(content));
}

function activitiesByDifficulty(unit: CurriculumUnit, difficulty: Difficulty): ActivityDefinition[] {
  return unit.difficultyTracks[difficulty].tasks.flatMap((task) => task.sessions.flatMap((session) => session.activities));
}

function summarizeDifficulty(units: CurriculumSourceInventoryReport['units'], difficulty: Difficulty): DifficultySummary {
  return units.reduce<DifficultySummary>((summary, unit) => {
    const inventory = unit.byDifficulty[difficulty];
    summary.sourceActivityCount += inventory.sourceActivityCount;
    summary.compatibleActivityCount += inventory.compatibleActivityCount;
    summary.uniqueCompatibleActivityCount += inventory.uniqueCompatibleActivityCount;
    summary.exactDuplicateCount += inventory.exactDuplicateCount;
    summary.excludedActivityCount += inventory.excludedActivityCount;
    summary.unitsMeetingMinimum += inventory.shortage === 0 ? 1 : 0;
    summary.shortage += inventory.shortage;
    return summary;
  }, {
    sourceActivityCount: 0,
    compatibleActivityCount: 0,
    uniqueCompatibleActivityCount: 0,
    exactDuplicateCount: 0,
    excludedActivityCount: 0,
    unitsMeetingMinimum: 0,
    shortage: 0,
  });
}

export function analyzeCurriculumSourceInventory(
  sourceUnits: readonly CurriculumUnit[],
  targets: SourceInventoryTargetCounts = V1_SOURCE_INVENTORY_TARGETS,
): CurriculumSourceInventoryReport {
  const formalUnits = sourceUnits
    .filter((unit) => unit.type === 'unit' && unit.achievementEligible)
    .sort((left, right) => left.id < right.id ? -1 : left.id > right.id ? 1 : 0);
  const catalogIssues: string[] = [];
  for (const unit of formalUnits) {
    if (unit.formalUnitNumber === null || !Number.isInteger(unit.formalUnitNumber) || unit.formalUnitNumber <= 0) {
      catalogIssues.push(`正式单元 ${unit.id} 缺少有效的正整数教材编号。`);
    }
  }
  if (formalUnits.length !== targets.formalUnitCount) {
    catalogIssues.push(`正式单元目录目标为 ${targets.formalUnitCount} 个，当前可盘点 ${formalUnits.length} 个。`);
  }

  const activityIds = new Map<string, number>();
  const units = formalUnits.map((unit) => {
    const byDifficulty = Object.fromEntries(DIFFICULTIES.map((difficulty) => {
      const activities = activitiesByDifficulty(unit, difficulty);
      const seenContent = new Set<string>();
      let compatibleActivityCount = 0;
      let uniqueCompatibleActivityCount = 0;
      for (const activity of activities) {
        activityIds.set(activity.id, (activityIds.get(activity.id) ?? 0) + 1);
        if (!COMPATIBLE_ACTIVITY_KINDS.has(activity.kind)) continue;
        compatibleActivityCount += 1;
        const key = contentKey(activity);
        if (!seenContent.has(key)) {
          seenContent.add(key);
          uniqueCompatibleActivityCount += 1;
        }
      }
      const shortage = Math.max(0, targets.minimumUniqueActivitiesPerDifficulty - uniqueCompatibleActivityCount);
      const inventory: DifficultyInventory = {
        sourceActivityCount: activities.length,
        compatibleActivityCount,
        uniqueCompatibleActivityCount,
        exactDuplicateCount: compatibleActivityCount - uniqueCompatibleActivityCount,
        excludedActivityCount: activities.length - compatibleActivityCount,
        minimumRequired: targets.minimumUniqueActivitiesPerDifficulty,
        shortage,
      };
      return [difficulty, inventory];
    })) as Record<Difficulty, DifficultyInventory>;
    return { unitId: unit.id, title: unit.title, formalUnitNumber: unit.formalUnitNumber, byDifficulty };
  });
  const duplicateActivityIds = [...activityIds.entries()]
    .filter(([, occurrenceCount]) => occurrenceCount > 1)
    .map(([activityId]) => activityId)
    .sort();

  const byDifficulty = Object.fromEntries(DIFFICULTIES.map((difficulty) => [
    difficulty,
    summarizeDifficulty(units, difficulty),
  ])) as Record<Difficulty, DifficultySummary>;

  return {
    reportSchemaVersion: 1,
    expectedFormalUnitCount: targets.formalUnitCount,
    formalUnitCount: formalUnits.length,
    catalogBaselineMatches: formalUnits.length === targets.formalUnitCount && catalogIssues.length === 0,
    minimumUniqueActivitiesPerDifficulty: targets.minimumUniqueActivitiesPerDifficulty,
    catalogIssues: catalogIssues.sort(),
    duplicateActivityIds,
    summary: {
      unitsMissingMinimum: units.filter((unit) => DIFFICULTIES.some((difficulty) => unit.byDifficulty[difficulty].shortage > 0)).length,
      byDifficulty,
    },
    units,
  };
}

const DIFFICULTY_LABELS: Record<Difficulty, string> = { basic: '基础', advanced: '进阶', high: '高阶' };

export function renderCurriculumSourceInventoryMarkdown(report: CurriculumSourceInventoryReport): string {
  const lines = [
    '# 全课程闯关源素材盘点',
    '',
    `- 正式单元目录：${report.formalUnitCount}/${report.expectedFormalUnitCount}${report.catalogBaselineMatches ? '，与冻结基线一致' : '，与冻结基线不一致'}`,
    `- 每难度最低唯一兼容素材数：${report.minimumUniqueActivitiesPerDifficulty}`,
    `- 仍有素材缺口的正式单元：${report.summary.unitsMissingMinimum}/${report.formalUnitCount}`,
    `- 跨活动 ID 冲突：${report.duplicateActivityIds.length}`,
    '',
    '以下统计只表示课程活动在数量上兼容当前闯关题型；精确去重在同一正式单元、同一难度内进行，不代表题目已审核或可以发布。报告不包含题干、答案、提示或讲解。测量活动因现有挑战渲染方式不兼容而排除。',
    '',
    '## 难度汇总',
    '',
    '| 难度 | 源活动数 | 兼容活动数 | 精确去重后 | 重复活动数 | 排除活动数 | 达到最低量的单元 | 缺口 |',
    '|---|---:|---:|---:|---:|---:|---:|---:|',
  ];
  for (const difficulty of DIFFICULTIES) {
    const summary = report.summary.byDifficulty[difficulty];
    lines.push(`| ${DIFFICULTY_LABELS[difficulty]} | ${summary.sourceActivityCount} | ${summary.compatibleActivityCount} | ${summary.uniqueCompatibleActivityCount} | ${summary.exactDuplicateCount} | ${summary.excludedActivityCount} | ${summary.unitsMeetingMinimum}/${report.formalUnitCount} | ${summary.shortage} |`);
  }
  lines.push('', '## 正式单元明细', '', '| 课程单元 | 基础唯一素材/缺口 | 进阶唯一素材/缺口 | 高阶唯一素材/缺口 |', '|---|---:|---:|---:|');
  for (const unit of report.units) {
    const basic = unit.byDifficulty.basic;
    const advanced = unit.byDifficulty.advanced;
    const high = unit.byDifficulty.high;
    lines.push(`| ${unit.unitId} · ${unit.title} | ${basic.uniqueCompatibleActivityCount}/${basic.minimumRequired}（缺 ${basic.shortage}） | ${advanced.uniqueCompatibleActivityCount}/${advanced.minimumRequired}（缺 ${advanced.shortage}） | ${high.uniqueCompatibleActivityCount}/${high.minimumRequired}（缺 ${high.shortage}） |`);
  }
  if (report.catalogIssues.length > 0) {
    lines.push('', `## 课程目录问题（${report.catalogIssues.length}）`, '');
    for (const issue of report.catalogIssues) lines.push(`- ${issue}`);
  }
  if (report.duplicateActivityIds.length > 0) {
    lines.push('', `## 重复活动 ID（${report.duplicateActivityIds.length}）`, '');
    for (const activityId of report.duplicateActivityIds) lines.push(`- ${activityId}`);
  }
  return `${lines.join('\n')}\n`;
}
