import { describe, expect, it } from 'vitest';
import { curriculum } from '../../../curriculum';

describe('二年级上册数学第七单元时间题', () => {
  it('将钟面相邻刻度间的一小格计为1分钟', () => {
    const questionId = 'grade-2/term-1/math/unit-07/basic/task-01/session-01/question-05';
    const question = Object.values(curriculum.units)
      .flatMap((unit) => Object.values(unit.difficultyTracks))
      .flatMap((track) => track.tasks)
      .flatMap((task) => task.sessions)
      .flatMap((session) => session.activities)
      .find((activity) => activity.id === questionId);

    expect(question?.kind).toBe('choice');
    if (question?.kind !== 'choice') return;
    expect(question.options.find(({ id }) => id === question.correctOptionId)?.label).toBe('1分');
  });
});
