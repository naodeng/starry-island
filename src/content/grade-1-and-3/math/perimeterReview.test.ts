import { describe, expect, it } from 'vitest';
import { curriculum } from '../../curriculum';

describe('Grade 3 Term 1 perimeter matching questions', () => {
  it('includes the perimeter unit in every matching answer', () => {
    const unit = curriculum.units['grade-3/term-1/math/unit-07'];
    expect(unit).toBeDefined();
    if (!unit) return;

    const questions = Object.values(unit.difficultyTracks)
      .flatMap((track) => track.tasks)
      .flatMap((task) => task.sessions)
      .flatMap((session) => session.activities)
      .filter((activity) => activity.id.endsWith('/question-03'));

    expect(questions).toHaveLength(6);
    for (const question of questions) {
      if (question.kind === 'match') {
        expect(question.pairs.every(({ right }) => right.endsWith('厘米'))).toBe(true);
      } else if (question.kind === 'choice') {
        expect(question.options.every(({ label }) => label.includes('厘米'))).toBe(true);
      } else {
        throw new Error(`Unexpected question type for ${question.id}: ${question.kind}`);
      }
    }
  });
});
