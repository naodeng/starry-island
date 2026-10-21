import { describe, expect, it } from 'vitest';
import { curriculum } from '../../../curriculum';

describe('grade 4 term 1 integrated practice uses self-contained large-number tasks', () => {
  const unit = curriculum.units['grade-4/term-1/math/integrated-practice-01'];

  it('maps each distinct number to its matching Chinese reading', () => {
    const activity = unit?.difficultyTracks.basic.tasks[0]?.sessions[0]?.activities[2];
    expect(activity).toMatchObject({
      kind: 'match',
      pairs: [
        { left: '100,000,000', right: '一亿' },
        { left: '10,000,000', right: '一千万' },
        { left: '110,000,000', right: '一亿一千万' },
      ],
    });
  });

  it('orders the one hundred million grouping from a stated starting value', () => {
    const activity = unit?.difficultyTracks.basic.tasks[1]?.sessions[0]?.activities[6];
    expect(activity).toMatchObject({
      kind: 'order',
      prompt: '先把一亿写成数值，再分成10个相等的组并核对。',
      correctOrder: [
        'grade-4/term-1/math/integrated-practice-01/basic/task-02/session-01/question-07/item-01',
        'grade-4/term-1/math/integrated-practice-01/basic/task-02/session-01/question-07/item-02',
        'grade-4/term-1/math/integrated-practice-01/basic/task-02/session-01/question-07/item-03',
        'grade-4/term-1/math/integrated-practice-01/basic/task-02/session-01/question-07/item-04',
      ],
    });
  });

  it('keeps an unverified package sample classified as an estimate', () => {
    const activity = unit?.difficultyTracks.high.tasks[0]?.sessions[0]?.activities[5];
    expect(activity).toMatchObject({
      kind: 'categorize',
      items: expect.arrayContaining([
        expect.objectContaining({ label: '只抽查一包，并把它的数量当作其他包的数量，未逐包核实', categoryId: 'grade-4/term-1/math/integrated-practice-01/high/task-01/session-01/question-06/category-02' }),
      ]),
    });
  });
});
