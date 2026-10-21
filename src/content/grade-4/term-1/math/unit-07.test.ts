import { describe, expect, it } from 'vitest';
import { curriculum } from '../../../curriculum';

describe('grade 4 math unit 7 keeps chart comparison questions self-contained', () => {
  it('provides the data for the standalone bookmark comparison', () => {
    const question = curriculum.units['grade-4/term-1/math/unit-07']
      ?.difficultyTracks.high.tasks[1]?.sessions[0]?.activities[2];

    expect(question).toMatchObject({
      kind: 'choice',
      prompt: '书签第一场卖出12个、第二场卖出10个。第一场比第二场多卖多少个？',
      correctOptionId: 'grade-4/term-1/math/unit-07/high/task-02/session-01/question-03/option-01',
      explanation: '12−10=2，第一场比第二场多卖2个书签。',
    });
  });

  it('restates both totals before asking students to compare them', () => {
    const question = curriculum.units['grade-4/term-1/math/unit-07']
      ?.difficultyTracks.high.tasks[1]?.sessions[0]?.activities[5];

    expect(question).toMatchObject({
      kind: 'arithmetic',
      prompt: '第一场合计卖出36件，第二场合计卖出45件。第二场比第一场合计多卖出多少件？',
      correctAnswer: 9,
      explanation: '45−36=9，第二场合计多卖出9件。',
    });
  });
});
