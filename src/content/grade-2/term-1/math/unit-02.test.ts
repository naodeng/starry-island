import { describe, expect, it } from 'vitest';
import { unit } from './unit-02';

describe('grade 2 term 1 math unit 2 calculation prompts', () => {
  it('keeps the standalone subtraction prompt self-contained', () => {
    const activities = Object.values(unit.difficultyTracks)
      .flatMap(track => track.tasks.flatMap(task => task.sessions.flatMap(session => session.activities)));
    const question = activities.find(activity => activity.id === 'grade-2/term-1/math/unit-02/high/task-01/session-01/question-07');

    expect(question).toMatchObject({
      kind: 'arithmetic',
      prompt: '计算：86 - 29 = ?',
      expression: '86 - 29',
      correctAnswer: 57,
    });
  });
});
