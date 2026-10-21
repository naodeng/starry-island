import { describe, expect, it } from 'vitest';
import { curriculum } from '../../curriculum';

describe('Grade 3 Term 1 fraction names', () => {
  it('uses standard Chinese fraction names in all runtime denominator questions', () => {
    const unit = curriculum.units['grade-3/term-1/math/unit-08'];
    expect(unit).toBeDefined();
    if (!unit) return;

    const questions = Object.values(unit.difficultyTracks)
      .flatMap((track) => track.tasks)
      .flatMap((task) => task.sessions)
      .flatMap((session) => session.activities)
      .filter((activity) => activity.id.endsWith('/question-02'));

    expect(questions).toHaveLength(6);
    for (const question of questions) {
      expect(question.kind).toBe('choice');
      if (question.kind !== 'choice') continue;
      expect(question.options.every(({ label }) => !/[0-9]/.test(label))).toBe(true);
      expect(question.options.find(({ id }) => id === question.correctOptionId)?.label)
        .toMatch(/^[二三四]分之一$/);
      expect(question.explanation).toMatch(/是 [二三四]分之一。$/);
    }
  });
});
