import { describe, expect, it } from 'vitest';
import { curriculum } from '../../../curriculum';

describe('grade 4 English home safety questions', () => {
  it('states that the visitor is a stranger in the door safety question', () => {
    const question = curriculum.units['grade-4/term-1/english/unit-05']
      ?.difficultyTracks.advanced.tasks[0]?.sessions[0]?.activities[5];

    expect(question?.kind).toBe('choice');
    expect(question?.prompt).toContain('有陌生人敲门');
  });
});
