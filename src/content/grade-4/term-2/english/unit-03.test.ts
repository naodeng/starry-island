import { describe, expect, it } from 'vitest';
import { curriculum } from '../../../curriculum';

describe('grade 4 English travel-plan questions', () => {
  it('includes the travel facts needed to answer story questions', () => {
    const unit = curriculum.units['grade-4/term-2/english/unit-03'];
    const questions = [
      unit?.difficultyTracks.basic.tasks[1]?.sessions[0]?.activities[4],
      unit?.difficultyTracks.advanced.tasks[1]?.sessions[0]?.activities[4],
      unit?.difficultyTracks.advanced.tasks[1]?.sessions[0]?.activities[5],
      unit?.difficultyTracks.high.tasks[0]?.sessions[0]?.activities[4],
      unit?.difficultyTracks.high.tasks[1]?.sessions[0]?.activities[4],
    ];
    const requiredFacts = [
      '哈尔滨滑雪',
      '乘火车带孩子去哈尔滨',
      '在海里游泳',
      '先去 Beijing，再到 Kunming，然后去 Thailand，最后到 Australia',
      '可能要花一年，也可能要花两年',
    ];

    questions.forEach((question, index) => {
      expect(question?.kind).toBe('choice');
      expect(question?.prompt).toContain(requiredFacts[index]);
    });
  });
});
