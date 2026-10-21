import { describe, expect, it } from 'vitest';
import { curriculum } from '../../../curriculum';

function activityById(questionId: string) {
  return Object.values(curriculum.units)
    .flatMap((unit) => Object.values(unit.difficultyTracks))
    .flatMap((track) => track.tasks)
    .flatMap((task) => task.sessions)
    .flatMap((session) => session.activities)
    .find((activity) => activity.id === questionId);
}

describe('Grade 2 Term 2 Math Unit 5 operation order', () => {
  it('states that the additional amount is given to each person', () => {
    const questionId = 'grade-2/term-2/math/unit-05/high/task-01/session-01/question-05';
    const question = activityById(questionId);

    expect(question, `Missing generated math question ${questionId}`).toBeDefined();
    expect(question?.kind).toBe('categorize');
    if (question?.kind !== 'categorize') return;
    expect(question.items.find(({ label }) => label.includes('总数平均分给每人'))?.label)
      .toBe('总数平均分给每人后，每人再多拿2个：总数÷人数+2');
  });
});
