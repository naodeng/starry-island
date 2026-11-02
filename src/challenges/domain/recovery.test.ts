import { describe, expect, it } from 'vitest';
import type { ChallengeBackupData } from './backup';
import {
  createChallengeRecoveryPoint,
  getChallengeDataClearCounts,
  isChallengeRecoveryPoint,
  isChallengeRecoveryPointActive,
  type ChallengeClearScope,
} from './recovery';

const emptyData: ChallengeBackupData = {
  attempts: [],
  taskProgress: [],
  recentQuestionAttempts: [],
  wrongQuestions: [],
};

describe('challenge recovery points', () => {
  it('creates a single recovery point with a fixed 24-hour expiry', () => {
    const point = createChallengeRecoveryPoint(emptyData, '2026-10-22T00:00:00.000Z');

    expect(point).toMatchObject({
      key: 'recovery-point',
      format: 'starry-island-challenge-recovery',
      version: 1,
      createdAt: '2026-10-22T00:00:00.000Z',
      expiresAt: '2026-10-23T00:00:00.000Z',
      data: emptyData,
    });
    expect(isChallengeRecoveryPoint(point)).toBe(true);
    expect(isChallengeRecoveryPointActive(point, '2026-10-22T23:59:59.999Z')).toBe(true);
    expect(isChallengeRecoveryPointActive(point, '2026-10-23T00:00:00.000Z')).toBe(false);
  });

  it('rejects invalid dates, altered expiry windows, and malformed snapshot data', () => {
    expect(() => createChallengeRecoveryPoint(emptyData, 'not-a-date')).toThrow('恢复时间无效');
    const point = createChallengeRecoveryPoint(emptyData, '2026-10-22T00:00:00.000Z');

    expect(isChallengeRecoveryPoint({ ...point, expiresAt: '2026-10-24T00:00:00.000Z' })).toBe(false);
    expect(isChallengeRecoveryPoint({ ...point, data: { ...emptyData, attempts: null } })).toBe(false);
    expect(isChallengeRecoveryPointActive(point, 'not-a-date')).toBe(false);
    expect(isChallengeRecoveryPointActive(point, '2026-10-21T23:59:59.999Z')).toBe(false);
  });

  it.each<ChallengeClearScope>(['in-progress', 'wrong-questions', 'all'])(
    'counts only records affected by the %s clearing tier',
    (scope) => {
      const data: ChallengeBackupData = {
        attempts: [{ taskId: 'one' } as ChallengeBackupData['attempts'][number]],
        taskProgress: [{ taskId: 'one' } as ChallengeBackupData['taskProgress'][number]],
        recentQuestionAttempts: [['question-one']],
        wrongQuestions: [{ questionId: 'question-one' } as ChallengeBackupData['wrongQuestions'][number]],
      };
      const counts = getChallengeDataClearCounts(data, scope);

      expect(counts.attempts).toBe(scope === 'in-progress' || scope === 'all' ? 1 : 0);
      expect(counts.taskProgress).toBe(scope === 'all' ? 1 : 0);
      expect(counts.recentQuestionAttempts).toBe(scope === 'all' ? 1 : 0);
      expect(counts.wrongQuestions).toBe(scope === 'wrong-questions' || scope === 'all' ? 1 : 0);
      expect(counts.quarantinedRecords).toBe(0);
    },
  );
});
