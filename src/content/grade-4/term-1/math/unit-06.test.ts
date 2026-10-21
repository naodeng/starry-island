import { describe, expect, it } from 'vitest';
import { curriculum } from '../../../curriculum';

describe('grade 4 math unit 6 uses the taught quotient-invariance method', () => {
  it('explains the common scaling step without later-grade factor terminology', () => {
    const activity = curriculum.units['grade-4/term-1/math/unit-06']
      ?.difficultyTracks.high.tasks[0]?.sessions[0]?.activities[7];

    expect(activity).toMatchObject({
      kind: 'order',
      prompt: '用商不变规律简算960÷32。',
      explanation: '960÷32=120÷4=30。',
    });
    if (activity?.kind === 'order') {
      expect(activity.items).toEqual(expect.arrayContaining([
        { id: expect.any(String), label: '找出能同时整除960和32的数8' },
        { id: expect.any(String), label: '被除数和除数同时除以8，得到120÷4' },
      ]));
    }
  });
});
