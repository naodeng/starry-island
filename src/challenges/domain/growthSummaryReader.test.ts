import { describe, expect, it, vi } from 'vitest';
import type { TaskProgress } from './types';
import { growthGroups } from '../content/growthGroups';
import { loadChallengeGrowthSummary } from './growthSummaryReader';

vi.mock('../content/pilotManifest', () => {
  throw new Error('The lightweight growth summary must not import pilotManifest.');
});

describe('loadChallengeGrowthSummary', () => {
  it('derivesSummaryFromLightweightGroupsAndSavedProgressWithoutLoadingPilotManifest', async () => {
    const taskId = growthGroups[0]!.tasks[0]!.id;
    const progress: TaskProgress = {
      taskId,
      bestCorrect: 4,
      bestTotal: 5,
      latestCorrect: 4,
      latestTotal: 5,
      completedCount: 2,
      everPassed: true,
      updatedAt: '2026-10-24T08:00:00.000Z',
      revision: 2,
    };
    const repository = {
      getGroupProgress: vi.fn().mockResolvedValue([progress]),
      close: vi.fn(),
    };

    const summary = await loadChallengeGrowthSummary(() => repository);

    expect(repository.getGroupProgress).toHaveBeenCalledWith(growthGroups.flatMap((group) => group.tasks.map(({ id }) => id)));
    expect(repository.getGroupProgress.mock.calls[0]![0]).toHaveLength(65);
    expect(summary).toMatchObject({
      completedAttempts: 2,
      passedTaskCount: 1,
      earnedBadgeCount: 0,
    });
    expect(summary.groups).toHaveLength(13);
    expect(summary.groups[0]).toMatchObject({ groupId: 'grade-2-term-1-math-unit-02', taskCount: 5, passedTaskCount: 1, badgeEarned: false });
    expect(repository.close).toHaveBeenCalledOnce();
  });

  it('closesTheRepositoryWhenProgressCannotBeRead', async () => {
    const repository = {
      getGroupProgress: vi.fn().mockRejectedValue(new Error('storage unavailable')),
      close: vi.fn(),
    };

    await expect(loadChallengeGrowthSummary(() => repository)).rejects.toThrow('storage unavailable');

    expect(repository.close).toHaveBeenCalledOnce();
  });
});
