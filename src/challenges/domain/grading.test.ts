import { describe, expect, it } from 'vitest';
import { gradeAttempt } from './grading';

describe('gradeAttempt', () => {
  it.each([
    ['basic', 70, 1],
    ['advanced', 80, 1],
    ['high', 85, 1],
  ] as const)('uses the %s passing threshold and rounds required questions up', (difficulty, percent, expectedCorrect) => {
    expect(gradeAttempt(difficulty, expectedCorrect, 1).passed).toBe(true);
    expect(gradeAttempt(difficulty, expectedCorrect - 1, 1).passed).toBe(false);
    expect(gradeAttempt(difficulty, Math.ceil(10 * percent / 100), 10).passed).toBe(true);
  });

  it.each([
    ['basic', [70, 85, 95]],
    ['advanced', [80, 90, 100]],
    ['high', [85, 95, 100]],
  ] as const)('assigns the %s star boundaries', (difficulty, boundaries) => {
    const total = 100;
    expect(gradeAttempt(difficulty, boundaries[0], total).stars).toBe(1);
    expect(gradeAttempt(difficulty, boundaries[1], total).stars).toBe(2);
    expect(gradeAttempt(difficulty, boundaries[2], total).stars).toBe(3);
    expect(gradeAttempt(difficulty, boundaries[0] - 1, total).stars).toBe(0);
  });

  it('returns a rounded display percentage and elapsed time', () => {
    expect(gradeAttempt('basic', 2, 3, 1250)).toEqual({
      correctCount: 2,
      totalCount: 3,
      scorePercent: 67,
      passed: false,
      stars: 0,
      elapsedMs: 1250,
    });
  });

  it.each([
    ['zero total', 'basic', 0, 0, 0],
    ['fractional correct count', 'basic', 1.5, 2, 0],
    ['negative correct count', 'basic', -1, 2, 0],
    ['correct count over total', 'basic', 3, 2, 0],
    ['negative elapsed', 'basic', 1, 2, -1],
    ['infinite elapsed', 'basic', 1, 2, Number.POSITIVE_INFINITY],
    ['NaN elapsed', 'basic', 1, 2, Number.NaN],
  ] as const)('rejects invalid input: %s', (_name, difficulty, correct, total, elapsed) => {
    expect(() => gradeAttempt(difficulty, correct, total, elapsed)).toThrow(RangeError);
  });
});
