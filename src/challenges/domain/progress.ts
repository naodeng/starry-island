import type { ChallengeTaskDefinition, TaskProgress } from './types';

export interface GroupProgress {
  passedCount: number;
  badgeEarned: boolean;
}

export function deriveGroupProgress(
  group: { tasks: readonly Pick<ChallengeTaskDefinition, 'id'>[] },
  taskProgress: readonly TaskProgress[],
): GroupProgress {
  const passedTaskIds = new Set(taskProgress.filter(({ everPassed }) => everPassed).map(({ taskId }) => taskId));
  const passedCount = group.tasks.reduce((count, task) => count + Number(passedTaskIds.has(task.id)), 0);
  return { passedCount, badgeEarned: group.tasks.length === 5 && passedCount === 5 };
}
