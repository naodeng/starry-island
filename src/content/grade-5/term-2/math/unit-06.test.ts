import { describe, expect, it } from 'vitest';
import { curriculum } from '../../../curriculum';

describe('grade 5 term 2 math unit 6 fraction-comparison task', () => {
  const activity = curriculum.units['grade-5/term-2/math/unit-06']
    ?.difficultyTracks.high.tasks[0]?.sessions[0]?.activities[5];

  it('asks for the comparison that the ordered steps establish', () => {
    expect(activity).toMatchObject({
      kind: 'order',
      prompt: expect.stringContaining('与1/2的大小'),
      explanation: expect.stringContaining('大于1/2'),
    });
  });
});
