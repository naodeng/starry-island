import { createChallengeRepository } from '../challenges/storage/indexedDbRepository';
import type { ChallengeBackupData } from '../challenges/domain/backup';
import {
  hasPendingGrade2Term1MathMigrationNotice,
  migrateGrade2Term1MathProgress,
} from '../storage/progress';

interface MigrationRepository {
  getBackupSnapshot(): Promise<ChallengeBackupData>;
  close(): void;
}

interface Grade2Term1MathMigrationDependencies {
  migrateProgress: () => 'migrated' | 'already-migrated';
  hasPendingNotice: () => boolean;
  createRepository: () => MigrationRepository;
}

const defaultDependencies: Grade2Term1MathMigrationDependencies = {
  migrateProgress: migrateGrade2Term1MathProgress,
  hasPendingNotice: hasPendingGrade2Term1MathMigrationNotice,
  createRepository: createChallengeRepository,
};

export async function runGrade2Term1MathTextbookMigration(
  dependencies: Grade2Term1MathMigrationDependencies = defaultDependencies,
): Promise<{ showNotice: boolean }> {
  const progressMigration = dependencies.migrateProgress();
  const repository = dependencies.createRepository();
  try {
    // Opening the repository performs the versioned, atomic IndexedDB upgrade.
    await repository.getBackupSnapshot();
  } finally {
    repository.close();
  }
  return { showNotice: progressMigration === 'migrated' || dependencies.hasPendingNotice() };
}

let initialization: Promise<{ showNotice: boolean }> | undefined;

export function initializeGrade2Term1MathTextbookMigration(): Promise<{ showNotice: boolean }> {
  if (!initialization) {
    initialization = runGrade2Term1MathTextbookMigration().catch((error: unknown) => {
      initialization = undefined;
      throw error;
    });
  }
  return initialization;
}
