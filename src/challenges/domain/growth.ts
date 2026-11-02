import type { ChallengeGroupDefinition, TaskProgress } from './types';
import { deriveGroupProgress } from './progress';

export interface ChallengeGrowthDefinition {
  id: ChallengeGroupDefinition['id'];
  kind: ChallengeGroupDefinition['kind'];
  grade: ChallengeGroupDefinition['grade'];
  semester: ChallengeGroupDefinition['semester'];
  subject: ChallengeGroupDefinition['subject'];
  sourceUnitIds: readonly ChallengeGroupDefinition['sourceUnitIds'][number][];
  stage?: ChallengeGroupDefinition['stage'];
  tasks: readonly { id: string }[];
}

export interface ChallengeGrowthGroup {
  groupId: string;
  kind: ChallengeGroupDefinition['kind'];
  grade: number;
  semester: 1 | 2;
  subject: ChallengeGroupDefinition['subject'];
  sourceUnitIds: string[];
  stage?: ChallengeGroupDefinition['stage'];
  taskCount: number;
  passedTaskCount: number;
  badgeEarned: boolean;
}

export interface ChallengeGrowthSummary {
  completedAttempts: number;
  passedTaskCount: number;
  earnedBadgeCount: number;
  groups: ChallengeGrowthGroup[];
}

export function deriveChallengeGrowth(
  groups: readonly ChallengeGrowthDefinition[],
  taskProgress: readonly TaskProgress[],
): ChallengeGrowthSummary {
  const uniqueProgress = new Map(taskProgress.map((progress) => [progress.taskId, progress]));
  const savedProgress = [...uniqueProgress.values()];
  const groupsSummary = groups.map((group): ChallengeGrowthGroup => {
    const progress = deriveGroupProgress(group, savedProgress);
    return {
      groupId: group.id,
      kind: group.kind,
      grade: group.grade,
      semester: group.semester,
      subject: group.subject,
      sourceUnitIds: [...group.sourceUnitIds],
      ...(group.stage ? { stage: group.stage } : {}),
      taskCount: group.tasks.length,
      passedTaskCount: progress.passedCount,
      badgeEarned: progress.badgeEarned,
    };
  });

  return {
    completedAttempts: savedProgress.reduce((total, progress) => (
      total + (Number.isSafeInteger(progress.completedCount) && progress.completedCount >= 0 ? progress.completedCount : 0)
    ), 0),
    passedTaskCount: savedProgress.filter(({ everPassed }) => everPassed).length,
    earnedBadgeCount: groupsSummary.filter(({ badgeEarned }) => badgeEarned).length,
    groups: groupsSummary,
  };
}
