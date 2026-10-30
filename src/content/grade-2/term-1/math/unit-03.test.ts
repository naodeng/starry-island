import { describe, expect, it } from 'vitest';
import { unit } from './unit-03';

describe('二年级上册数学第三单元 1～6 的表内除法', () => {
  const activities = Object.values(unit.difficultyTracks)
    .flatMap((track) => track.tasks.flatMap((task) => task.sessions.flatMap((session) => session.activities)));

  it('covers division by each divisor from one through six', () => {
    const divisors = new Set<number>();
    for (const activity of activities) {
      if (activity.kind !== 'match') continue;
      for (const { left } of activity.pairs) {
        const match = left.match(/\d+ ÷ (\d+)/);
        if (match) divisors.add(Number(match[1]));
      }
    }
    expect([...divisors].sort((left, right) => left - right)).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it('uses multiplication to check a division fact', () => {
    const factFamily = activities.find(({ prompt }) => prompt.includes('星星贴纸的乘法和除法算式'));
    expect(factFamily?.kind).toBe('match');
    if (factFamily?.kind !== 'match') return;
    expect(factFamily.pairs.map(({ left, right }) => [left, right])).toContainEqual(['6 ÷ 1', '6']);
  });
});
