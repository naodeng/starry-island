import { describe, expect, it } from 'vitest';
import { curriculum } from '../../../curriculum';

describe('Grade 2 Term 1 Math Unit 5 object views', () => {
  it('asks learners to match observation details to record fields', () => {
    const questionId = 'grade-2/term-1/math/unit-05/high/task-01/session-01/question-03';
    const question = Object.values(curriculum.units)
      .flatMap((unit) => Object.values(unit.difficultyTracks))
      .flatMap((track) => track.tasks)
      .flatMap((task) => task.sessions)
      .flatMap((session) => session.activities)
      .find((activity) => activity.id === questionId);

    expect(question, `Missing generated math question ${questionId}`).toBeDefined();
    expect(question?.kind).toBe('match');
    expect(question?.prompt).toBe('把说明内容和记录栏目配起来。');
  });
});
