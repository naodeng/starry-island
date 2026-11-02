import { describe, expect, it } from 'vitest';
import { pilotSupplementalActivities } from './pilotSupplementalActivities';

function evaluateAdditionAndSubtraction(expression: string): number {
  const tokens = expression.match(/\d+|[+-]/g) ?? [];
  if (tokens.length === 0 || tokens.length % 2 === 0) throw new Error(`Invalid expression: ${expression}`);
  let result = Number(tokens[0]);
  for (let index = 1; index < tokens.length; index += 2) {
    const operator = tokens[index];
    const operand = Number(tokens[index + 1]);
    result = operator === '+' ? result + operand : result - operand;
  }
  return result;
}

describe('二年级上册数学第二单元补充题', () => {
  it('provides fourteen unique candidates for every difficulty', () => {
    expect(pilotSupplementalActivities).toHaveLength(42);
    expect(new Set(pilotSupplementalActivities.map(({ activity }) => activity.id)).size).toBe(42);
    expect(Object.fromEntries(['basic', 'advanced', 'high'].map((difficulty) => [
      difficulty,
      pilotSupplementalActivities.filter((item) => item.difficulty === difficulty).length,
    ]))).toEqual({ basic: 14, advanced: 14, high: 14 });
  });

  it('has correct arithmetic answers and does not disclose the result in prompt or hint', () => {
    for (const { activity } of pilotSupplementalActivities) {
      if (activity.kind !== 'arithmetic') continue;
      expect(evaluateAdditionAndSubtraction(activity.expression)).toBe(activity.correctAnswer);
      expect(activity.prompt).not.toMatch(new RegExp(`(^|\\D)${activity.correctAnswer}(\\D|$)`));
      expect(activity.hint).not.toMatch(new RegExp(`(^|\\D)${activity.correctAnswer}(\\D|$)`));
    }
  });

  it('requires comparing two valid calculation strategies in the high-level task', () => {
    const advanced = pilotSupplementalActivities.find(({ activity }) =>
      activity.id === 'challenge-supplement-grade-2-term-1-math-unit-02-advanced-01')?.activity;
    const high = pilotSupplementalActivities.find(({ activity }) =>
      activity.id === 'challenge-supplement-grade-2-term-1-math-unit-02-high-01')?.activity;

    expect(advanced?.kind).toBe('arithmetic');
    expect(advanced?.prompt).toContain('28张卡片');
    expect(high?.kind).toBe('choice');
    if (high?.kind !== 'choice') return;
    const correctOption = high.options.find(({ id }) => id === high.correctOptionId);
    expect(high.prompt).toContain('收到27份');
    expect(correctOption?.label).toContain('38＋27');
    expect(correctOption?.label).toContain('27－19');
    expect(correctOption?.label.match(/46份/gu)).toHaveLength(2);
  });

  it('keeps all arithmetic questions in the high track multi-step', () => {
    const highArithmetic = pilotSupplementalActivities.filter(({ difficulty, activity }) => (
      difficulty === 'high' && activity.kind === 'arithmetic'
    ));
    expect(highArithmetic).toHaveLength(13);
    for (const { activity } of highArithmetic) {
      if (activity.kind === 'arithmetic') {
        expect(activity.expression.split(/[+-]/).filter(Boolean)).toHaveLength(3);
      }
    }
  });
});
