import { describe, expect, it } from 'vitest';
import { curriculum } from '../../../curriculum';

describe('grade 4 term 2 math unit 1 boat questions are self-contained', () => {
  const activities = curriculum.units['grade-4/term-2/math/unit-01']
    ?.difficultyTracks.high.tasks[0]?.sessions[0]?.activities;

  it('states capacity or price in every question that uses it', () => {
    expect(activities?.[1]?.prompt).toContain('每条大船限乘6人');
    expect(activities?.[2]?.prompt).toContain('每条租金30元');
    expect(activities?.[3]?.prompt).toContain('小船每条租金24元');
    expect(activities?.[4]?.prompt).toContain('小船每条租金24元');
    expect(activities?.[5]?.prompt).toContain('4条大船和2条小船共168元');
    expect(activities?.[6]?.prompt).toContain('大船每条租金30元、小船每条租金24元');
    expect(activities?.[7]?.prompt).toContain('小船每条限乘4人、租金24元；大船每条限乘6人、租金30元');
  });

  it('does not use earlier-question context in the fifth boat question explanation', () => {
    expect(activities?.[4]).toMatchObject({
      kind: 'arithmetic',
      correctAnswer: 174,
      explanation: '5条大船150元，加上1条小船24元，共174元。',
    });
  });
});
