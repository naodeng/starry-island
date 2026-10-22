export type ChallengeDensityTier = 'low' | 'middle' | 'high';

export function getChallengeDensityTier(grade: number): ChallengeDensityTier {
  if (grade === 1 || grade === 2) return 'low';
  if (grade === 3 || grade === 4) return 'middle';
  if (grade === 5 || grade === 6) return 'high';
  return 'middle';
}
