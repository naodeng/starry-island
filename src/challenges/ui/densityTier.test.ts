import { describe, expect, it } from 'vitest';
import { getChallengeDensityTier } from './densityTier';

describe('getChallengeDensityTier', () => {
  it.each([
    [1, 'low'],
    [2, 'low'],
    [3, 'middle'],
    [4, 'middle'],
    [5, 'high'],
    [6, 'high'],
  ] as const)('maps grade %i to the confirmed density tier', (grade, expected) => {
    expect(getChallengeDensityTier(grade)).toBe(expected);
  });

  it('uses the middle tier for an unsupported grade as a neutral fallback', () => {
    expect(getChallengeDensityTier(0)).toBe('middle');
    expect(getChallengeDensityTier(7)).toBe('middle');
    expect(getChallengeDensityTier(Number.NaN)).toBe('middle');
  });
});
