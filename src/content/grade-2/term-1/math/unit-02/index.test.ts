import { describe, expect, it } from 'vitest';
import { unit } from './index';

describe('二年级上册数学第二单元乘法练习', () => {
  it('uses the equal-addend meaning of multiplication', () => {
    const activities = Object.values(unit.difficultyTracks)
      .flatMap(({ tasks }) => tasks)
      .flatMap(({ sessions }) => sessions.flatMap(({ activities }) => activities));
    const activity = activities.find(({ prompt }) => prompt === '3×4表示什么？');

    expect(activity?.kind).toBe('choice');
    if (activity?.kind !== 'choice') return;
    expect(activity.options.find(({ id }) => id === activity.correctOptionId)?.label).toBe('3个4相加');
  });
});
