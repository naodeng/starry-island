import { describe, expect, it } from 'vitest';
import { curriculum } from '../../../curriculum';

describe('grade 4 term 2 lunch integrated practice budget review', () => {
  const activity = curriculum.units['grade-4/term-2/math/integrated-practice-01']
    ?.difficultyTracks.advanced.tasks[0]?.sessions[0]?.activities[5];

  it('explains each budget classification consistently with its key', () => {
    expect(activity).toMatchObject({
      kind: 'categorize',
      explanation: '总价依次是24、33、18、32元；第1、3项不超过30元，第2、4项超过30元。',
    });
    if (activity?.kind === 'categorize') {
      expect(activity.items.map(item => item.categoryId)).toEqual([
        activity.categories[0]?.id,
        activity.categories[1]?.id,
        activity.categories[0]?.id,
        activity.categories[1]?.id,
      ]);
    }
  });
});
