import { describe, expect, it } from 'vitest';
import { unit } from './index';

describe('二年级上册数学第一单元分类与整理', () => {
  const activities = Object.values(unit.difficultyTracks)
    .flatMap(({ tasks }) => tasks)
    .flatMap(({ sessions }) => sessions.flatMap(({ activities }) => activities));

  it('classifies every listed example exactly once and preserves the total', () => {
    const activity = activities.find(({ prompt }) => prompt === '把彩球按颜色分到“红色”或“蓝色”。');
    expect(activity?.kind).toBe('categorize');
    if (activity?.kind !== 'categorize') return;
    expect(activity.items).toHaveLength(6);
    expect(activity.items.filter(({ categoryId }) => categoryId === activity.categories[0]?.id)).toHaveLength(4);
    expect(activity.items.filter(({ categoryId }) => categoryId === activity.categories[1]?.id)).toHaveLength(2);
  });

  it('reports a tie when the two categories contain the same number of examples', () => {
    const activity = activities.find(({ prompt }) => prompt.includes('圆形 3件，长方形 3件'));
    expect(activity?.kind).toBe('choice');
    if (activity?.kind !== 'choice') return;
    expect(activity.options.find(({ id }) => id === activity.correctOptionId)?.label).toBe('两类数量一样多');
    expect(new Set(activity.options.map(({ label }) => label)).size).toBe(3);
  });
});
