import { describe, expect, it } from 'vitest';
import type { ChallengeGroupDefinition, TaskProgress } from './types';
import { deriveChallengeGrowth } from './growth';

const group: ChallengeGroupDefinition = {
  id: 'grade-2-term-1-math-unit-02',
  kind: 'unit',
  grade: 2,
  semester: 1,
  subject: 'math',
  sourceUnitIds: ['grade-2/term-1/math/unit-02'],
  coreKnowledgePointIds: ['addition'],
  mappingEvidence: { source: '教材目录', checkedAt: '2026-01-01', notes: '章节顺序' },
  tasks: ['basic-01', 'basic-02', 'advanced-01', 'advanced-02', 'high-01'].map((id, index) => ({
    id: `group/${id}`,
    difficulty: index < 2 ? 'basic' : index < 4 ? 'advanced' : 'high',
    targetCount: 15,
    requiredKnowledgePointIds: ['addition'],
  })) as ChallengeGroupDefinition['tasks'],
};

function progress(taskId: string, completedCount: number, everPassed: boolean): TaskProgress {
  return {
    taskId,
    bestCorrect: 12,
    bestTotal: 15,
    latestCorrect: 12,
    latestTotal: 15,
    completedCount,
    everPassed,
    updatedAt: '2026-01-01T00:00:00.000Z',
    revision: completedCount,
  };
}

describe('deriveChallengeGrowth', () => {
  it('summarizes saved completion counts, passed tasks, and earned group badges', () => {
    const records = [
      ...group.tasks.map((task, index) => progress(task.id, index + 1, true)),
      progress('removed-task/old-id', 2, false),
    ];

    expect(deriveChallengeGrowth([group], records)).toEqual({
      completedAttempts: 17,
      passedTaskCount: 5,
      earnedBadgeCount: 1,
      groups: [{
        groupId: group.id,
        kind: 'unit',
        grade: 2,
        semester: 1,
        subject: 'math',
        sourceUnitIds: ['grade-2/term-1/math/unit-02'],
        taskCount: 5,
        passedTaskCount: 5,
        badgeEarned: true,
      }],
    });
  });

  it('does not claim attempts or progress from malformed counters', () => {
    const malformed = { ...progress(group.tasks[0].id, 1, true), completedCount: Number.NaN };

    expect(deriveChallengeGrowth([group], [malformed])).toEqual({
      completedAttempts: 0,
      passedTaskCount: 1,
      earnedBadgeCount: 0,
      groups: [{
        groupId: group.id,
        kind: 'unit',
        grade: 2,
        semester: 1,
        subject: 'math',
        sourceUnitIds: ['grade-2/term-1/math/unit-02'],
        taskCount: 5,
        passedTaskCount: 1,
        badgeEarned: false,
      }],
    });
  });
});
