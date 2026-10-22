import { describe, expect, it } from 'vitest';
import { createChallengeDiagnosticReport } from './diagnostics';

const input = {
  generatedAt: '2026-10-22T00:00:00.000Z',
  appVersion: '0.2.0',
  storageSchemaVersion: 2,
  capabilities: { indexedDB: true, webLocks: false },
  recordCounts: { activeAttempts: 2, taskProgress: 3, recentCompletionGroups: 1, wrongQuestions: 4 },
};

describe('manual challenge diagnostics', () => {
  it('exports only the version, capability flags, and aggregate record counts', () => {
    const report = createChallengeDiagnosticReport({
      ...input,
      studentName: 'must-not-be-exported',
      answers: { questionId: 'must-not-be-exported' },
      questionText: 'must-not-be-exported',
    } as typeof input);

    expect(report).toEqual({
      format: 'starry-island-challenge-diagnostics',
      version: 1,
      generatedAt: input.generatedAt,
      appVersion: input.appVersion,
      storage: {
        schemaVersion: 2,
        recordCounts: input.recordCounts,
      },
      capabilities: input.capabilities,
    });
    expect(JSON.stringify(report)).not.toContain('must-not-be-exported');
    expect(Object.keys(report)).toEqual(['format', 'version', 'generatedAt', 'appVersion', 'storage', 'capabilities']);
  });

  it('normalizes the timestamp and rejects invalid versions, timestamps, and counts', () => {
    expect(createChallengeDiagnosticReport({ ...input, generatedAt: '2026-10-22T08:00:00+08:00' }).generatedAt)
      .toBe('2026-10-22T00:00:00.000Z');
    expect(() => createChallengeDiagnosticReport({ ...input, generatedAt: 'bad-date' })).toThrow('诊断时间无效');
    expect(() => createChallengeDiagnosticReport({ ...input, appVersion: '' })).toThrow('应用版本无效');
    expect(() => createChallengeDiagnosticReport({ ...input, storageSchemaVersion: 0 })).toThrow('诊断存储版本无效');
    expect(() => createChallengeDiagnosticReport({
      ...input,
      capabilities: { indexedDB: true, webLocks: 'yes' as unknown as boolean },
    })).toThrow('诊断环境信息无效');
    expect(() => createChallengeDiagnosticReport({
      ...input,
      recordCounts: { ...input.recordCounts, wrongQuestions: -1 },
    })).toThrow('诊断记录数量无效');
  });
});
