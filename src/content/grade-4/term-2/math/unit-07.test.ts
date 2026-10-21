import { describe, expect, it } from 'vitest';
import { curriculum } from '../../../curriculum';

describe('grade 4 term 2 math unit 7 transformations', () => {
  const activities = curriculum.units['grade-4/term-2/math/unit-07']
    ?.difficultyTracks.high.tasks[0]?.sessions[0]?.activities;

  it('explains preserved shape and size without above-grade terminology', () => {
    expect(activities?.[2]).toMatchObject({
      kind: 'choice',
      correctOptionId: 'grade-4/term-2/math/unit-07/high/task-01/session-01/question-03/option-01',
    });
    expect(activities?.[2]?.explanation).toContain('形状、大小相同');
    expect(activities?.[2]?.explanation).not.toContain('全等');
  });
});
