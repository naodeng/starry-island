import { isChallengeBackupData } from './backup';
import type { ChallengeBackupData } from './backup';

export const CHALLENGE_RECOVERY_POINT_TTL_MS = 24 * 60 * 60 * 1000;

export type ChallengeClearScope = 'in-progress' | 'wrong-questions' | 'all';

export interface ChallengeRecoveryPoint {
  key: 'recovery-point';
  format: 'starry-island-challenge-recovery';
  version: 1;
  createdAt: string;
  expiresAt: string;
  data: ChallengeBackupData;
}

export interface ChallengeClearCounts {
  attempts: number;
  taskProgress: number;
  recentQuestionAttempts: number;
  wrongQuestions: number;
}

export interface ChallengeRecoveryPointSummary {
  createdAt: string;
  expiresAt: string;
}

export interface ChallengeDataClearResult {
  counts: ChallengeClearCounts;
  recoveryPoint: ChallengeRecoveryPointSummary | null;
}

export function createChallengeRecoveryPoint(
  data: ChallengeBackupData,
  createdAt = new Date().toISOString(),
): ChallengeRecoveryPoint {
  const createdAtMs = Date.parse(createdAt);
  if (!Number.isFinite(createdAtMs)) throw new Error('恢复时间无效，闯关数据没有更改。');
  if (!isChallengeBackupData(data)) throw new Error('闯关数据结构无效，不能创建恢复点。');

  const normalizedCreatedAt = new Date(createdAtMs).toISOString();
  return {
    key: 'recovery-point',
    format: 'starry-island-challenge-recovery',
    version: 1,
    createdAt: normalizedCreatedAt,
    expiresAt: new Date(createdAtMs + CHALLENGE_RECOVERY_POINT_TTL_MS).toISOString(),
    data,
  };
}

export function isChallengeRecoveryPoint(value: unknown): value is ChallengeRecoveryPoint {
  if (typeof value !== 'object' || value === null) return false;
  const point = value as Partial<ChallengeRecoveryPoint>;
  const createdAtMs = typeof point.createdAt === 'string' ? Date.parse(point.createdAt) : Number.NaN;
  const expiresAtMs = typeof point.expiresAt === 'string' ? Date.parse(point.expiresAt) : Number.NaN;
  return point.key === 'recovery-point'
    && point.format === 'starry-island-challenge-recovery'
    && point.version === 1
    && Number.isFinite(createdAtMs)
    && expiresAtMs === createdAtMs + CHALLENGE_RECOVERY_POINT_TTL_MS
    && isChallengeBackupData(point.data);
}

export function isChallengeRecoveryPointActive(
  value: unknown,
  now = new Date().toISOString(),
): value is ChallengeRecoveryPoint {
  if (!isChallengeRecoveryPoint(value)) return false;
  const nowMs = Date.parse(now);
  const createdAtMs = Date.parse(value.createdAt);
  return Number.isFinite(nowMs)
    && createdAtMs <= nowMs
    && nowMs < Date.parse(value.expiresAt);
}

export function getChallengeDataClearCounts(
  data: ChallengeBackupData,
  scope: ChallengeClearScope,
): ChallengeClearCounts {
  return {
    attempts: scope === 'in-progress' || scope === 'all' ? data.attempts.length : 0,
    taskProgress: scope === 'all' ? data.taskProgress.length : 0,
    recentQuestionAttempts: scope === 'all' ? data.recentQuestionAttempts.length : 0,
    wrongQuestions: scope === 'wrong-questions' || scope === 'all' ? data.wrongQuestions.length : 0,
  };
}

export function hasChallengeDataToClear(counts: ChallengeClearCounts): boolean {
  return Object.values(counts).some((count) => count > 0);
}
