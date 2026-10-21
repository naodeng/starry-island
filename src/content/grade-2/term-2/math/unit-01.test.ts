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

describe('Grade 2 Term 2 Math Unit 1 survey assumptions', () => {
  it('states the one-vote rule before treating votes above participants as an error', () => {
    const questionId = 'grade-2/term-2/math/unit-01/advanced/task-01/session-01/question-08';
    const question = activityById(questionId);

    expect(question, `Missing generated math question ${questionId}`).toBeDefined();
    expect(question?.prompt).toContain('每人只能投一票');
    expect(question?.kind).toBe('choice');
    if (question?.kind !== 'choice') return;
    expect(question.options.find(({ id }) => id === question.correctOptionId)?.label).toBe('是否有人重复投票或记录重复');
  });

  it('states the one-vote assumption in the duplicate-count match item', () => {
    const questionId = 'grade-2/term-2/math/unit-01/high/task-02/session-01/question-04';
    const question = activityById(questionId);

    expect(question, `Missing generated math question ${questionId}`).toBeDefined();
    expect(question?.kind).toBe('match');
    if (question?.kind !== 'match') return;
    expect(question.pairs.find(({ left }) => left.includes('总票数多于参加人数'))?.right).toBe('查重复投票或重复记录');
  });
});
