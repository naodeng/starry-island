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

describe('Grade 2 Term 2 Math Unit 3 motion and symmetry', () => {
  it('states the symmetry condition before asking learners to complete half a figure', () => {
    const questionId = 'grade-2/term-2/math/unit-03/basic/task-01/session-01/question-03';
    const question = activityById(questionId);

    expect(question, `Missing generated math question ${questionId}`).toBeDefined();
    expect(question?.kind).toBe('match');
    if (question?.kind !== 'match') return;
    expect(question.pairs.find(({ left }) => left.includes('只画出一侧'))?.left).toBe('已知关于折痕轴对称，只画出一侧');
  });

  it('gives a concrete start and destination for the rotation step', () => {
    const questionId = 'grade-2/term-2/math/unit-03/high/task-02/session-01/question-04';
    const question = activityById(questionId);

    expect(question, `Missing generated math question ${questionId}`).toBeDefined();
    expect(question?.kind).toBe('categorize');
    if (question?.kind !== 'categorize') return;
    expect(question.items.find(({ label }) => label.includes('圆片'))?.label).toBe('把圆片从花心上方绕到右侧后放下');
  });
});
