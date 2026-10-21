import { describe, expect, it } from 'vitest';
import { curriculum } from '../../../curriculum';

describe('Grade 2 Term 1 Math Unit 8 combinations', () => {
  it('uses a category instruction that covers each example in the combination record', () => {
    const questionId = 'grade-2/term-1/math/unit-08/high/task-01/session-01/question-04';
    const question = Object.values(curriculum.units)
      .flatMap((unit) => Object.values(unit.difficultyTracks))
      .flatMap((track) => track.tasks)
      .flatMap((task) => task.sessions)
      .flatMap((session) => session.activities)
      .find((activity) => activity.id === questionId);

    expect(question, `Missing generated math question ${questionId}`).toBeDefined();
    expect(question?.kind).toBe('categorize');
    expect(question?.prompt).toBe('把搭配记录分到“有效组合”或“还需确认”。');
  });
});
