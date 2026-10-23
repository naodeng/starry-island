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

describe('pilot supplemental challenge activities', () => {
  it('provides fourteen unique candidates for every difficulty', () => {
    expect(pilotSupplementalActivities).toHaveLength(42);
    expect(new Set(pilotSupplementalActivities.map(({ activity }) => activity.id)).size).toBe(42);
    expect(Object.fromEntries(['basic', 'advanced', 'high'].map((difficulty) => [
      difficulty,
      pilotSupplementalActivities.filter((item) => item.difficulty === difficulty).length,
    ]))).toEqual({ basic: 14, advanced: 14, high: 14 });
  });

  it('has correct arithmetic answers and no result disclosed in the prompt', () => {
    for (const { activity } of pilotSupplementalActivities) {
      expect(evaluateAdditionAndSubtraction(activity.expression)).toBe(activity.correctAnswer);
      expect(activity.prompt).not.toMatch(new RegExp(`(^|\\D)${activity.correctAnswer}(\\D|$)`));
      expect(activity.hint).not.toMatch(new RegExp(`(^|\\D)${activity.correctAnswer}(\\D|$)`));
    }
  });

  it('keeps every high supplemental candidate multi-step so high tasks can integrate knowledge across the paper', () => {
    for (const item of pilotSupplementalActivities.filter(({ difficulty }) => difficulty === 'high')) {
      expect(item.activity.expression.split(/[+-]/).filter(Boolean)).toHaveLength(3);
    }
  });
});
