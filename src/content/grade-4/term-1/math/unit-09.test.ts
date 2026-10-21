import { describe, expect, it } from 'vitest';
import { curriculum } from '../../../curriculum';

describe('grade 4 math unit 9 reviews only knowledge taught by term 1', () => {
  const activities = curriculum.units['grade-4/term-1/math/unit-09']
    ?.difficultyTracks.high.tasks[0]?.sessions[0]?.activities;

  it('reviews trapezoid and parallelogram height without introducing area formulas', () => {
    expect(activities?.[3]).toMatchObject({
      kind: 'choice',
      prompt: '关于梯形的高，哪项说法正确？',
      correctOptionId: 'grade-4/term-1/math/unit-09/high/task-01/session-01/question-04/option-01',
    });
    expect(activities?.[6]).toMatchObject({
      kind: 'choice',
      prompt: '平行四边形的一条底边和对应的高，哪项说明正确？',
      correctOptionId: 'grade-4/term-1/math/unit-09/high/task-01/session-01/question-07/option-01',
    });
  });

  it('checks sufficient information using term-1 geometry and angle facts', () => {
    expect(activities?.[5]).toMatchObject({
      kind: 'categorize',
      prompt: '判断题目所给信息能否确定所问内容。',
      items: [
        { label: '长方形长12米、宽8米，求周长', categoryId: 'grade-4/term-1/math/unit-09/high/task-01/session-01/question-06/category-01' },
        { label: '只知道一个梯形，判断它的两腰是否相等', categoryId: 'grade-4/term-1/math/unit-09/high/task-01/session-01/question-06/category-02' },
        { label: '一个角是125°，求它比平角小多少度', categoryId: 'grade-4/term-1/math/unit-09/high/task-01/session-01/question-06/category-01' },
        { label: '只知道一个钝角，求它的确切度数', categoryId: 'grade-4/term-1/math/unit-09/high/task-01/session-01/question-06/category-02' },
      ],
    });
  });
});
