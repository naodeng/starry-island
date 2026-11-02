export interface ChallengeDiagnosticInput {
  generatedAt: string;
  appVersion: string;
  storageSchemaVersion: number;
  capabilities: {
    indexedDB: boolean;
    webLocks: boolean;
  };
  recordCounts: {
    activeAttempts: number;
    taskProgress: number;
    recentCompletionGroups: number;
    wrongQuestions: number;
  };
}

export interface ChallengeDiagnosticReport {
  format: 'starry-island-challenge-diagnostics';
  version: 1;
  generatedAt: string;
  appVersion: string;
  storage: {
    schemaVersion: number;
    recordCounts: ChallengeDiagnosticInput['recordCounts'];
  };
  capabilities: ChallengeDiagnosticInput['capabilities'];
}

function requireCount(value: number): number {
  if (!Number.isSafeInteger(value) || value < 0) throw new Error('诊断记录数量无效。');
  return value;
}

export function createChallengeDiagnosticReport(input: ChallengeDiagnosticInput): ChallengeDiagnosticReport {
  const generatedAtMs = Date.parse(input.generatedAt);
  if (!Number.isFinite(generatedAtMs)) throw new Error('诊断时间无效。');
  const appVersion = input.appVersion.trim();
  if (!/^[\da-z.+_-]{1,40}$/i.test(appVersion)) throw new Error('应用版本无效。');
  if (!Number.isSafeInteger(input.storageSchemaVersion) || input.storageSchemaVersion < 1) {
    throw new Error('诊断存储版本无效。');
  }
  if (typeof input.capabilities.indexedDB !== 'boolean' || typeof input.capabilities.webLocks !== 'boolean') {
    throw new Error('诊断环境信息无效。');
  }

  return {
    format: 'starry-island-challenge-diagnostics',
    version: 1,
    generatedAt: new Date(generatedAtMs).toISOString(),
    appVersion,
    storage: {
      schemaVersion: input.storageSchemaVersion,
      recordCounts: {
        activeAttempts: requireCount(input.recordCounts.activeAttempts),
        taskProgress: requireCount(input.recordCounts.taskProgress),
        recentCompletionGroups: requireCount(input.recordCounts.recentCompletionGroups),
        wrongQuestions: requireCount(input.recordCounts.wrongQuestions),
      },
    },
    capabilities: {
      indexedDB: input.capabilities.indexedDB,
      webLocks: input.capabilities.webLocks,
    },
  };
}
