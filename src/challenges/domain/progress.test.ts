import { describe, expect, it } from 'vitest';
import type { ChallengeGroupDefinition, TaskProgress } from './types';
import { deriveGroupProgress } from './progress';

const group: ChallengeGroupDefinition = {
  id: 'unit-1',
  kind: 'unit',
  grade: 2,
  semester: 1,
  subject: 'math',
  sourceUnitIds: ['grade-2/term-1/math/unit-01'],
  coreKnowledgePointIds: ['length'],
  mappingEvidence: { source: 'verified inventory', checkedAt: '2026-01-01', notes: 'unit' },
  tasks: ['basic-1', 'basic-2', 'advanced-1', 'advanced-2', 'high-1'].map((id, index) => ({
    id,
    difficulty: index < 2 ? 'basic' : index < 4 ? 'advanced' : 'high',
    targetCount: 15,
    requiredKnowledgePointIds: ['length'],
  })) as ChallengeGroupDefinition['tasks'],
};

function progressFor(passedCount: number): TaskProgress[] {
  return group.tasks.map((task, index) => ({
    taskId: task.id,
    bestCorrect: 12,
    bestTotal: 15,
    latestCorrect: index < passedCount ? 12 : 5,
    latestTotal: 15,
    completedCount: index + 1,
    everPassed: index < passedCount,
    updatedAt: '2026-01-01T00:00:00.000Z',
    revision: index + 1,
  }));
}

describe('deriveGroupProgress', () => {
  it.each([0, 1, 2, 3, 4])('does not award the badge after %i tasks have passed', (passedCount) => {
    expect(deriveGroupProgress(group, progressFor(passedCount))).toEqual({ passedCount, badgeEarned: false });
  });

  it('awards the badge after all five tasks have ever passed', () => {
    expect(deriveGroupProgress(group, progressFor(5))).toEqual({ passedCount: 5, badgeEarned: true });
  });

  it('keeps passed status when later attempts have weaker scores', () => {
    const progress = progressFor(5).map((item) => ({ ...item, latestCorrect: 0, everPassed: true }));
    expect(deriveGroupProgress(group, progress).badgeEarned).toBe(true);
  });

  it('ignores passed progress for task IDs outside this group', () => {
    const progress = [
      ...progressFor(4),
      { ...progressFor(1)[4], taskId: 'another-group-high-task', everPassed: true },
    ];
    expect(deriveGroupProgress(group, progress)).toEqual({ passedCount: 4, badgeEarned: false });
  });
});
