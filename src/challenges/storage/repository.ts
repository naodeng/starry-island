import type { ChallengeBackupData } from '../domain/backup';
import type { ChallengeBackupMergeSummary } from '../domain/backupMerge';
import type {
  ChallengeClearScope,
  ChallengeDataClearResult,
  ChallengeRecoveryPoint,
} from '../domain/recovery';
import type { ChallengeAttempt, TaskProgress, WrongQuestionRecord } from '../domain/types';
import type {
  QuarantineEligibilityBlockReason,
  QuarantineNormalization,
  QuarantineTargetStore,
} from '../domain/quarantineRecovery';

export class ChallengeRepositoryError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = 'ChallengeRepositoryError';
  }
}

export class RevisionConflictError extends ChallengeRepositoryError {
  constructor(message = 'The saved challenge state changed in another tab.') {
    super(message);
    this.name = 'RevisionConflictError';
  }
}

export class ActiveAttemptExistsError extends ChallengeRepositoryError {
  constructor(taskId: string) {
    super(`An active attempt already exists for task ${taskId}.`);
    this.name = 'ActiveAttemptExistsError';
  }
}

export class InvalidAttemptTransitionError extends ChallengeRepositoryError {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidAttemptTransitionError';
  }
}

export interface ChallengeRepository {
  getActiveAttempt(taskId: string): Promise<ChallengeAttempt | null>;
  getRecentQuestionIds(): Promise<string[]>;
  getTaskProgress(taskId: string): Promise<TaskProgress | null>;
  getAllTaskProgress(): Promise<TaskProgress[]>;
  getBackupSnapshot(): Promise<ChallengeBackupData>;
  mergeBackupData(imported: ChallengeBackupData, expectedLocal: ChallengeBackupData): Promise<ChallengeBackupMergeSummary>;
  getRecoveryPoint(now?: string): Promise<ChallengeRecoveryPoint | null>;
  clearChallengeData(scope: ChallengeClearScope, createdAt?: string): Promise<ChallengeDataClearResult>;
  restoreRecoveryPoint(now?: string): Promise<ChallengeRecoveryRestoreResult | null>;
  getGroupProgress(taskIds: readonly string[]): Promise<TaskProgress[]>;
  getWrongQuestions(): Promise<WrongQuestionRecord[]>;
  getQuarantinedRecordCount(): Promise<number>;
  getQuarantinedRecords(): Promise<QuarantinedChallengeRecord[]>;
  getQuarantinedRecordPage(afterKey?: IDBValidKey): Promise<QuarantinedRecordPage>;
  previewQuarantinedRecord(quarantineId: IDBValidKey, now?: string): Promise<QuarantineRecoveryPreview>;
  cancelQuarantinedRecordPreview(token: string): void;
  confirmQuarantinedRecordRestore(token: string): Promise<QuarantineRestoreResult>;
  beginAttempt(attempt: ChallengeAttempt): Promise<void>;
  saveAnswer(taskId: string, expectedRevision: number, nextAttempt: ChallengeAttempt): Promise<ChallengeAttempt>;
  completeAttempt(taskId: string, expectedRevision: number, completedAttempt: ChallengeAttempt, progress: TaskProgress): Promise<void>;
  discardAttempt(taskId: string, expectedRevision: number): Promise<void>;
  close(): void;
}

export interface QuarantinedChallengeRecord {
  sourceStore: string;
  sourceKey: IDBValidKey;
  quarantinedAt: string;
  reasonCode: string;
  record: unknown;
}

export type QuarantineRecoveryBlockReason = QuarantineEligibilityBlockReason | 'target-conflict';

export interface QuarantinedRecordSummary {
  quarantineId: IDBValidKey;
  sourceStore: string;
  sourceKey: IDBValidKey;
  quarantinedAt: string;
  reasonCode: string;
  status: 'eligible' | 'blocked';
  blockReason?: QuarantineRecoveryBlockReason;
  targetStore?: QuarantineTargetStore;
  targetKey?: IDBValidKey;
}

export interface QuarantinedRecordPage {
  items: QuarantinedRecordSummary[];
  nextCursor: IDBValidKey | null;
}

export type QuarantineRecoveryPreview =
  | {
    status: 'eligible';
    quarantineId: IDBValidKey;
    sourceStore: string;
    sourceKey: IDBValidKey;
    token: string;
    targetStore: QuarantineTargetStore;
    targetKey: IDBValidKey;
    normalization: QuarantineNormalization;
    expiresAt: string;
  }
  | {
    status: 'blocked';
    quarantineId: IDBValidKey;
    sourceStore: string;
    reason: QuarantineRecoveryBlockReason;
  };

export type QuarantineRestoreResult =
  | { status: 'restored' }
  | { status: 'stale-preview' }
  | { status: 'target-conflict' };

export interface ChallengeRecoveryRestoreResult {
  summary: ChallengeBackupMergeSummary;
  recoveryPointRetained: boolean;
}

export interface ChallengeRepositoryOptions {
  factory?: IDBFactory;
  databaseName?: string;
}
