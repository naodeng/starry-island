import { growthGroups } from '../content/growthGroups';
import { deriveChallengeGrowth } from './growth';
import type { ChallengeGrowthSummary } from './growth';
import { createChallengeRepository } from '../storage/indexedDbRepository';
import type { ChallengeRepository } from '../storage/repository';

type GrowthSummaryRepository = Pick<ChallengeRepository, 'getGroupProgress' | 'close'>;
type GrowthSummaryRepositoryFactory = () => GrowthSummaryRepository;

export async function loadChallengeGrowthSummary(
  createRepository: GrowthSummaryRepositoryFactory = createChallengeRepository,
): Promise<ChallengeGrowthSummary> {
  const repository = createRepository();
  try {
    const taskIds = growthGroups.flatMap((group) => group.tasks.map(({ id }) => id));
    const taskProgress = await repository.getGroupProgress(taskIds);
    return deriveChallengeGrowth(growthGroups, taskProgress);
  } finally {
    repository.close();
  }
}
