import { describe, expect, it } from 'vitest';
import { curriculum } from '../../../curriculum';

describe('Grade 2 Term 1 Math Unit 3 angle observation', () => {
  it('explains angle parts without introducing the formal term ray', () => {
    const questionId = 'grade-2/term-1/math/unit-03/basic/task-01/session-01/question-03';
    const question = Object.values(curriculum.units)
      .flatMap((unit) => Object.values(unit.difficultyTracks))
      .flatMap((track) => track.tasks)
      .flatMap((task) => task.sessions)
      .flatMap((session) => session.activities)
      .find((activity) => activity.id === questionId);

    expect(question, `Missing generated math question ${questionId}`).toBeDefined();
    expect(question?.kind).toBe('match');
    expect(question?.explanation).not.toContain('射线');
  });

  it('identifies the open angle between the scissors blades, not only their vertex', () => {
    const questionId = 'grade-2/term-1/math/unit-03/high/task-01/session-01/question-02';
    const question = Object.values(curriculum.units)
      .flatMap((unit) => Object.values(unit.difficultyTracks))
      .flatMap((track) => track.tasks)
      .flatMap((task) => task.sessions)
      .flatMap((session) => session.activities)
      .find((activity) => activity.id === questionId);

    expect(question, `Missing generated math question ${questionId}`).toBeDefined();
    expect(question?.kind).toBe('match');
    if (question?.kind !== 'match') return;

    expect(question.pairs.find(({ left }) => left === '展开的剪刀')?.right).toBe('两片刀刃张开处');
  });
});
