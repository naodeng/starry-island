import { describe, expect, it } from 'vitest';
// @ts-expect-error Node.js is used only to inspect the local review ledger during Vitest.
import { readFileSync } from 'node:fs';
import { submitAnswer } from '../../learning/answers';
import { loadUnit } from '../../content/unitLoader';
import { grade1MathUnit07SupplementalActivities } from './grade1MathUnit07SupplementalActivities';

const difficulties = ['basic', 'advanced', 'high'] as const;
const knowledgePointIds = ['clock-whole-hour-reading', 'clock-hand-roles'];

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
      for (const option of activity.options) {
        expect(submitAnswer(activity, option.id), `${activity.id}: ${option.label}`)
          .toBe(option.id === activity.correctOptionId);
      }
    }
  });

  it('每档均覆盖整时读数和时针/分针的作用', () => {
    for (const difficulty of difficulties) {
      const covered = new Set(grade1MathUnit07SupplementalActivities
        .filter((item) => item.difficulty === difficulty)
        .flatMap(({ knowledgePointIds }) => knowledgePointIds));
      expect(knowledgePointIds.filter((id) => covered.has(id))).toEqual(knowledgePointIds);
    }
  });

  it('新题不引入教材未教的半时、分钟换算或经过时间计算', () => {
    for (const { activity } of grade1MathUnit07SupplementalActivities) {
      const content = [activity.prompt, activity.hint, activity.explanation, ...activity.options.map(({ label }) => label)].join(' ');
      expect(content).not.toMatch(/半时|时半/u);
      expect(content).not.toMatch(/分钟|秒钟|经过时间|经过了\d+|用了多少|相差(?:多少|几)分钟/u);
      const numerals = content.match(/\d+/gu) ?? [];
      expect(numerals.every((numeral) => Number(numeral) >= 1 && Number(numeral) <= 12), activity.id).toBe(true);
    }
  });

  it('所有补充题都不映射到未纳入本单元的半时知识点', () => {
    expect(grade1MathUnit07SupplementalActivities.every(({ knowledgePointIds }) => (
      !knowledgePointIds.includes('clock-half-hour-reading')
    ))).toBe(true);
  });

  it('逐题台账记录 AI 主审且明确教育者复核数为零', () => {
    const lines: string[] = readFileSync('docs/challenges/grade-1-term-1-math-unit-07-question-review.tsv', 'utf8')
      .replace(/^\uFEFF/u, '')
      .trimEnd()
      .split(/\r?\n/u);
    const rows: string[][] = lines.slice(1).map((line: string) => line.split('\t'));

    expect(rows).toHaveLength(45);
    expect(rows.every((row: string[]) => row[4]?.includes('AI逐题复核'))).toBe(true);
    expect(rows.every((row: string[]) => row[5]?.includes('AI复核通过') && row[5]?.includes('0/45'))).toBe(true);
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
    expect(supplementalPrompts.filter((prompt) => coursePrompts.has(prompt))).toEqual([]);
  });
});
