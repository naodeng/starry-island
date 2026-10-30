import { describe, expect, it } from 'vitest';
import { unit } from './unit-02';

describe('二年级上册数学第二单元 1～6 的表内乘法', () => {
  it(' includes the 1-times facts in the published practice', () => {
    const activities = Object.values(unit.difficultyTracks)
      .flatMap((track) => track.tasks.flatMap((task) => task.sessions.flatMap((session) => session.activities)));
    const question = activities.find(({ id }) => id === 'grade-2/term-1/math/unit-02/basic/task-01/session-01/question-01');

    expect(question).toMatchObject({
      kind: 'arithmetic',
      expression: '1 × 3',
      correctAnswer: 3,
    });
  });
});
