import { describe, expect, it } from 'vitest';
import { submitAnswer } from '../../learning/answers';
import { loadUnit } from '../../content/unitLoader';
import { grade1MathUnit07SupplementalActivities } from './grade1MathUnit07SupplementalActivities';

const difficulties = ['basic', 'advanced', 'high'] as const;
const knowledgePointIds = ['clock-whole-hour-reading', 'clock-half-hour-reading', 'clock-hand-roles'];

describe('一年级上册数学第七单元闯关补充题', () => {
  it('按本单元范围补足三档题量，所有答案都能通过生产评分器', () => {
    expect(grade1MathUnit07SupplementalActivities).toHaveLength(45);
    expect(new Set(grade1MathUnit07SupplementalActivities.map(({ activity }) => activity.id)).size).toBe(45);
    expect(Object.fromEntries(difficulties.map((difficulty) => [
      difficulty,
      grade1MathUnit07SupplementalActivities.filter((item) => item.difficulty === difficulty).length,
    ]))).toEqual({ basic: 15, advanced: 15, high: 15 });

    for (const { activity, sourceUnitId } of grade1MathUnit07SupplementalActivities) {
      expect(sourceUnitId).toBe('grade-1/term-1/math/unit-07');
      expect(activity.kind).toBe('choice');
      expect(activity.options).toHaveLength(3);
      expect(new Set(activity.options.map(({ label }) => label)).size).toBe(3);
      expect(activity.options.some(({ id }) => id === activity.correctOptionId)).toBe(true);
      expect(submitAnswer(activity, activity.correctOptionId)).toBe(true);
    }
  });

  it('每档均覆盖整时、半时和时针/分针的作用', () => {
    for (const difficulty of difficulties) {
      const covered = new Set(grade1MathUnit07SupplementalActivities
        .filter((item) => item.difficulty === difficulty)
        .flatMap(({ knowledgePointIds }) => knowledgePointIds));
      expect(knowledgePointIds.filter((id) => covered.has(id))).toEqual(knowledgePointIds);
    }
  });

  it('新题只练习读整时、半时和指针，不引入分钟换算或经过时间计算', () => {
    for (const { activity } of grade1MathUnit07SupplementalActivities) {
      const content = [activity.prompt, activity.hint, activity.explanation, ...activity.options.map(({ label }) => label)].join(' ');
      expect(content).not.toMatch(/分钟|秒钟|经过时间|经过了\d+|用了多少|相差(?:多少|几)分钟/u);
      const numerals = content.match(/\d+/gu) ?? [];
      expect(numerals.every((numeral) => Number(numeral) >= 1 && Number(numeral) <= 12), activity.id).toBe(true);
    }
  });

  it('补充题题干唯一且不复制本单元课程题干', async () => {
    const unit = await loadUnit('grade-1/term-1/math/unit-07');
    expect(unit).toBeDefined();
    const courseActivities = Object.values(unit!.difficultyTracks).flatMap((track) => track.tasks
      .flatMap((task) => task.sessions.flatMap((session) => session.activities)));
    const normalizePrompt = (prompt: string) => prompt.normalize('NFKC').replace(/[\s\p{P}\p{S}]/gu, '');
    const supplementalPrompts = grade1MathUnit07SupplementalActivities.map(({ activity }) => normalizePrompt(activity.prompt));
    const coursePrompts = new Set(courseActivities.map(({ prompt }) => normalizePrompt(prompt)));

    expect(new Set(supplementalPrompts).size).toBe(supplementalPrompts.length);
    expect(supplementalPrompts.every((prompt) => !coursePrompts.has(prompt))).toBe(true);
  });
});
