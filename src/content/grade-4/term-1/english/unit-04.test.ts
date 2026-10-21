import { describe, expect, it } from 'vitest';
import { curriculum } from '../../../curriculum';

describe('grade 4 English story-based questions', () => {
  it('includes the story facts in both high-tier evidence cards', () => {
    const task = curriculum.units['grade-4/term-1/english/unit-04']
      ?.difficultyTracks.high.tasks[0]?.sessions[0];
    const orderQuestion = task?.activities[4];
    const correctionQuestion = task?.activities[5];

    for (const question of [orderQuestion, correctionQuestion]) {
      expect(question?.kind).toBe('choice');
      expect(question?.prompt).toContain('Mary 和妈妈乘小飞机出行');
      expect(question?.prompt).toContain('Mary 在雪地写');
      expect(question?.prompt).toContain('飞行员看到');
    }

    if (orderQuestion?.kind === 'choice') {
      expect(orderQuestion.options[0]?.label).toContain('。”；B：“');
    }
  });

  it('includes the needed story facts in the Information Centre follow-up', () => {
    const question = curriculum.units['grade-4/term-1/english/unit-04']
      ?.difficultyTracks.advanced.tasks[0]?.sessions[0]?.activities[5];

    expect(question?.kind).toBe('choice');
    expect(question?.prompt).toContain('Steven 在公园里找不到爸爸');
    expect(question?.prompt).toContain('他正在 hamburger shop');
  });
});
