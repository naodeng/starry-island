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

describe('Grade 2 Term 2 Math Unit 7 place value', () => {
  it('asks about the tens represented by the specified digit', () => {
    const questionId = 'grade-2/term-2/math/unit-07/basic/task-01/session-01/question-04';
    const question = activityById(questionId);

    expect(question, `Missing generated math question ${questionId}`).toBeDefined();
    expect(question?.kind).toBe('choice');
    if (question?.kind !== 'choice') return;
    expect(question.prompt).toBe('5,090中，数字9表示几个十？');
    const correctOption = question.options.find(({ id }) => id === question.correctOptionId);
    expect(correctOption?.label).toBe('9个十');
  });

  it('keeps the integrated matching task within place-value and comparison topics', () => {
    const questionId = 'grade-2/term-2/math/unit-07/high/task-02/session-01/question-04';
    const question = activityById(questionId);

    expect(question, `Missing generated math question ${questionId}`).toBeDefined();
    expect(question?.kind).toBe('match');
    if (question?.kind !== 'match') return;
    expect(question.pairs.find(({ left }) => left.includes('判断5,080'))?.right).toBe('先看它所在的数位');
    expect(question.pairs.some(({ left }) => left.includes('计算5,000减860'))).toBe(false);
  });
});
