import type { ChallengeResult } from './types';
import type { Difficulty } from '../../content/types';

const THRESHOLDS: Record<Difficulty, { pass: number; stars: readonly [number, number, number] }> = {
  basic: { pass: 70, stars: [70, 85, 95] },
  advanced: { pass: 80, stars: [80, 90, 100] },
  high: { pass: 85, stars: [85, 95, 100] },
};

function validateCounts(correctCount: number, totalCount: number, elapsedMs: number): void {
  if (!Number.isInteger(totalCount) || totalCount <= 0) throw new RangeError('totalCount must be a positive integer.');
  if (!Number.isInteger(correctCount) || correctCount < 0 || correctCount > totalCount) {
    throw new RangeError('correctCount must be an integer between zero and totalCount.');
  }
  if (!Number.isFinite(elapsedMs) || elapsedMs < 0) throw new RangeError('elapsedMs must be finite and non-negative.');
}

export function gradeAttempt(
  difficulty: Difficulty,
  correctCount: number,
  totalCount: number,
  elapsedMs = 0,
): ChallengeResult {
  validateCounts(correctCount, totalCount, elapsedMs);
  const thresholds = THRESHOLDS[difficulty];
  if (!thresholds) throw new RangeError(`Unsupported difficulty: ${difficulty}`);
  const meets = (percent: number) => correctCount >= Math.ceil(totalCount * percent / 100);
  const stars = thresholds.stars.reduce<number>((count, threshold) => count + Number(meets(threshold)), 0) as 0 | 1 | 2 | 3;

  return {
    correctCount,
    totalCount,
    scorePercent: Math.round(correctCount / totalCount * 100),
    passed: meets(thresholds.pass),
    stars,
    elapsedMs,
  };
}
