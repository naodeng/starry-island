import { describe, expect, it } from 'vitest';
import { curriculum } from '../../../curriculum';

describe('二年级上册数学第五单元 7～9 的表内乘、除法', () => {
  it('uses the selected multiplication fact family and corresponding division', () => {
    const question = curriculum.units['grade-2/term-1/math/unit-05'].difficultyTracks.high.tasks[0]
      ?.sessions[0]?.activities.find(({ id }) => id.endsWith('/question-02'));

    expect(question?.kind).toBe('choice');
    if (question?.kind !== 'choice') return;
    expect(question.prompt).toContain('72块积木平均分成8组');
    expect(question.options.find(({ id }) => id === question.correctOptionId)?.label).toBe('9');
  });
});
