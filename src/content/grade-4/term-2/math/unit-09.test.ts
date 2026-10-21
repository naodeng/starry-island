import { describe, expect, it } from 'vitest';
import { curriculum } from '../../../curriculum';

describe('grade 4 term 2 math unit 9 assumption-method questions', () => {
  const activity = curriculum.units['grade-4/term-2/math/unit-09']
    ?.difficultyTracks.high.tasks[1]?.sessions[0]?.activities[3];

  it('states that the two vehicle types share the total of eight', () => {
    expect(activity?.prompt).toBe('两轮车和三轮车共8辆，共有21个轮子，其中三轮车几辆？');
    expect(activity).toMatchObject({
      kind: 'choice',
      correctOptionId: 'grade-4/term-2/math/unit-09/high/task-02/session-01/question-04/option-03',
    });
  });
});
