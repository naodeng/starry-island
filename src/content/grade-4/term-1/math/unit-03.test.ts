import { describe, expect, it } from 'vitest';
import { curriculum } from '../../../curriculum';

describe('grade 4 math unit 3 stays within its angle-measurement scope', () => {
  const activities = curriculum.units['grade-4/term-1/math/unit-03']
    ?.difficultyTracks.high.tasks[0]?.sessions[0]?.activities;

  it('uses measured straight-angle evidence instead of a general vertical-angle theorem', () => {
    expect(activities?.[2]).toMatchObject({
      kind: 'choice',
      prompt: '量角器测得一条直线上的两个相邻角分别是67°和113°。这组读数说明什么？',
      correctOptionId: 'grade-4/term-1/math/unit-03/high/task-01/session-01/question-03/option-01',
    });
    expect(activities?.[4]).toMatchObject({
      kind: 'match',
      prompt: '把每个已知相邻角和另一个角的度数连起来。',
      pairs: [
        { left: '平角被分成72°和一个角', right: '108°' },
        { left: '平角被分成118°和一个角', right: '62°' },
        { left: '平角被分成35°和一个角', right: '145°' },
      ],
    });
    expect(activities?.[3]?.prompt).toContain('一个平角被射线分成');
    expect(activities?.[7]?.prompt).toContain('一个平角被射线分成');
    expect(activities?.[6]).toMatchObject({
      kind: 'categorize',
      prompt: '判断有关平角的说法，分到“正确”或“需要改正”。',
      items: [
        { label: '一条直线表示180°的平角' },
        { label: '一条直线被分成75°和105°两个相邻角' },
        { label: '一条直线上的相邻角是75°和115°' },
        { label: '两个相邻角相加一定是360°' },
      ],
    });
  });
});
