import { describe, expect, it } from 'vitest';
import { curriculum } from '../../../curriculum';

describe('grade 4 English monkey story questions', () => {
  it('shows the story evidence in both high-tier evidence cards', () => {
    const task = curriculum.units['grade-4/term-1/english/unit-06']
      ?.difficultyTracks.high.tasks[0]?.sessions[0];
    const pairedQuestion = task?.activities[4];
    const correctionQuestion = task?.activities[5];

    for (const question of [pairedQuestion, correctionQuestion]) {
      expect(question?.kind).toBe('choice');
      expect(question?.prompt).toContain('I want a job.');
      expect(question?.prompt).toContain('You can be a singer.');
    }
  });
});
