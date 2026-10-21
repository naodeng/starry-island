import { describe, expect, it } from 'vitest';
import { curriculum } from '../../../curriculum';

describe('grade 4 English weekend schedule questions', () => {
  it('includes the schedule in the follow-up question card', () => {
    const question = curriculum.units['grade-4/term-1/english/unit-02']
      ?.difficultyTracks.advanced.tasks[0]?.sessions[0]?.activities[5];

    expect(question?.kind).toBe('choice');
    expect(question?.prompt).toContain('星期六上午去钓鱼，下午采摘水果，晚上看望祖父母。');
  });
});
