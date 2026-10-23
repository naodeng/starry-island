import { describe, expect, it } from 'vitest';
import type { ActivityDefinition, CurriculumUnit, Difficulty } from '../../content/types';
import { analyzeCurriculumSourceInventory, renderCurriculumSourceInventoryMarkdown } from './sourceInventory';

const fixtureTargets = { formalUnitCount: 1, minimumUniqueActivitiesPerDifficulty: 2 };
const difficulties: Difficulty[] = ['basic', 'advanced', 'high'];

function choice(id: string, prompt: string): ActivityDefinition {
  return {
    id,
    kind: 'choice',
    prompt,
    hint: '仔细观察。',
    explanation: '根据题目条件判断。',
    options: [{ id: 'a', label: '甲' }, { id: 'b', label: '乙' }, { id: 'c', label: '丙' }],
    correctOptionId: 'a',
  };
}

function measurement(id: string): ActivityDefinition {
  return {
    id,
    kind: 'measurement',
    prompt: '测量物体长度。',
    hint: '从零刻度开始。',
    explanation: '读出刻度。',
    objectLabel: '铅笔',
    targetLengthCm: 10,
    minCm: 8,
    maxCm: 12,
  };
}

function createUnit(
  id: string,
  activities: Partial<Record<Difficulty, ActivityDefinition[]>> = {},
  options: { type?: CurriculumUnit['type']; achievementEligible?: boolean; formalUnitNumber?: number | null } = {},
): CurriculumUnit {
  const difficultyTracks = Object.fromEntries(difficulties.map((difficulty) => [difficulty, {
    difficulty,
    tasks: [{
      id: `${id}/${difficulty}/task-01`,
      title: '练习',
      objective: '复习本单元内容。',
      order: 1,
      sessions: [{
        id: `${id}/${difficulty}/session-01`,
        title: '练习',
        durationMinutes: 20,
        objective: '复习本单元内容。',
        companionId: 'companion-01',
        activities: activities[difficulty] ?? [],
      }],
    }],
  }])) as CurriculumUnit['difficultyTracks'];

  return {
    id,
    subject: 'math',
    title: id,
    type: options.type ?? 'unit',
    formalUnitNumber: options.formalUnitNumber === undefined ? 1 : options.formalUnitNumber,
    achievementEligible: options.achievementEligible ?? true,
    textbookEditionId: 'grade-1/term-1/math',
    sourceTopics: ['基础知识'],
    difficultyTracks,
  };
}

describe('analyzeCurriculumSourceInventory', () => {
  it('counts supported source activities, removes exact duplicates, and reports each difficulty shortage', () => {
    const unit = createUnit('grade-1/term-1/math/unit-01', {
      basic: [choice('basic-1', '同一道题'), choice('basic-2', '同一道题'), measurement('basic-measurement')],
      advanced: [choice('advanced-1', '进阶题一'), choice('advanced-2', '进阶题二')],
      high: [choice('high-1', '高阶题')],
    });

    const report = analyzeCurriculumSourceInventory([unit], fixtureTargets);

    expect(report.units).toEqual([{
      unitId: unit.id,
      title: unit.title,
      formalUnitNumber: 1,
      byDifficulty: {
        basic: { sourceActivityCount: 3, compatibleActivityCount: 2, uniqueCompatibleActivityCount: 1, exactDuplicateCount: 1, excludedActivityCount: 1, minimumRequired: 2, shortage: 1 },
        advanced: { sourceActivityCount: 2, compatibleActivityCount: 2, uniqueCompatibleActivityCount: 2, exactDuplicateCount: 0, excludedActivityCount: 0, minimumRequired: 2, shortage: 0 },
        high: { sourceActivityCount: 1, compatibleActivityCount: 1, uniqueCompatibleActivityCount: 1, exactDuplicateCount: 0, excludedActivityCount: 0, minimumRequired: 2, shortage: 1 },
      },
    }]);
    expect(report.summary.byDifficulty.basic).toMatchObject({
      sourceActivityCount: 3,
      compatibleActivityCount: 2,
      uniqueCompatibleActivityCount: 1,
      exactDuplicateCount: 1,
      excludedActivityCount: 1,
      unitsMeetingMinimum: 0,
      shortage: 1,
    });
    expect(report.summary.unitsMissingMinimum).toBe(1);
  });

  it('ignores review units and reports repeated source IDs without exposing activity text', () => {
    const formal = createUnit('grade-1/term-1/math/unit-01', {
      basic: [choice('shared-id', '不应出现在报告中的题干')],
      advanced: [choice('advanced', '进阶题')],
      high: [choice('shared-id', '高阶题')],
    });
    const review = createUnit('grade-1/term-1/math/review-01', {
      basic: [choice('shared-id', '另一道题')],
    }, { type: 'review', achievementEligible: false, formalUnitNumber: null });

    const report = analyzeCurriculumSourceInventory([formal, review], fixtureTargets);
    const markdown = renderCurriculumSourceInventoryMarkdown(report);

    expect(report.units.map(({ unitId }) => unitId)).toEqual([formal.id]);
    expect(report.duplicateActivityIds).toEqual(['shared-id']);
    expect(report.catalogIssues).toEqual([]);
    expect(markdown).toContain('不代表题目已审核或可以发布');
    expect(markdown).not.toContain('不应出现在报告中的题干');
  });

  it('fails the catalog baseline closed when formal unit count differs from the target', () => {
    const report = analyzeCurriculumSourceInventory([], fixtureTargets);

    expect(report.catalogIssues).toEqual(['正式单元目录目标为 1 个，当前可盘点 0 个。']);
    expect(report.summary.unitsMissingMinimum).toBe(0);
  });
});
