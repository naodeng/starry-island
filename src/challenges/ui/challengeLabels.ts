import type { ChallengeGroupManifest, ChallengeTaskDefinition } from '../domain/types';

const difficultyLabels = {
  basic: '基础闯关',
  advanced: '进阶闯关',
  high: '高阶闯关',
} as const;

export function getChallengeTaskTitle(group: ChallengeGroupManifest, task: ChallengeTaskDefinition): string {
  const sameDifficultyTasks = group.definition.tasks.filter(({ difficulty }) => difficulty === task.difficulty);
  const index = sameDifficultyTasks.findIndex(({ id }) => id === task.id) + 1;
  return `${difficultyLabels[task.difficulty]} ${Math.max(1, index)}`;
}
