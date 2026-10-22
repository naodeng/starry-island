import type { ChallengeBackupData } from '../domain/backup';
import type { ChallengeBackupMergeSummary } from '../domain/backupMerge';
import type { ChallengeAttempt, TaskProgress, WrongQuestionRecord } from '../domain/types';

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
  getGroupProgress(taskIds: readonly string[]): Promise<TaskProgress[]>;
  getWrongQuestions(): Promise<WrongQuestionRecord[]>;
  beginAttempt(attempt: ChallengeAttempt): Promise<void>;
  saveAnswer(taskId: string, expectedRevision: number, nextAttempt: ChallengeAttempt): Promise<ChallengeAttempt>;
  completeAttempt(taskId: string, expectedRevision: number, completedAttempt: ChallengeAttempt, progress: TaskProgress): Promise<void>;
  discardAttempt(taskId: string, expectedRevision: number): Promise<void>;
  close(): void;
}

export interface ChallengeRepositoryOptions {
  factory?: IDBFactory;
  databaseName?: string;
}
