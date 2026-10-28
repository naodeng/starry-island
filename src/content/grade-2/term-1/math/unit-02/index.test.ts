import { describe, expect, it } from 'vitest';
import { unit } from './index';

describe('二年级上册数学第二单元分类活动', () => {
  it('gives the quantity-increase example an explicit before-and-after baseline', () => {
    const activity = Object.values(unit.difficultyTracks)
      .flatMap(({ tasks }) => tasks)
      .flatMap(({ sessions }) => sessions.flatMap(({ activities }) => activities))
      .find(({ id }) => id === 'grade-2/term-1/math/unit-02/advanced/task-02/session-01/question-08');

    expect(activity?.kind).toBe('categorize');
    if (activity?.kind !== 'categorize') return;
    expect(activity.items.some(({ label, categoryId }) => (
      label === '教室原有32名学生，又来了19名学生' && categoryId === activity.categories[0]?.id
    ))).toBe(true);
  });
});
