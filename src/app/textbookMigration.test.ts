import { describe, expect, it, vi } from 'vitest';
import { runGrade2Term1MathTextbookMigration } from './textbookMigration';

describe('Grade 2 Term 1 Math textbook migration startup', () => {
  it('runs local progress cleanup before opening the challenge database and reports a pending notice', async () => {
    const calls: string[] = [];
    const result = await runGrade2Term1MathTextbookMigration({
      migrateProgress: () => { calls.push('progress'); return 'migrated'; },
      hasPendingNotice: () => true,
      createRepository: () => ({
        getBackupSnapshot: async () => { calls.push('indexeddb'); return { attempts: [], taskProgress: [], recentQuestionAttempts: [], wrongQuestions: [] }; },
        close: () => { calls.push('close'); },
      }),
    });

    expect(calls).toEqual(['progress', 'indexeddb', 'close']);
    expect(result).toEqual({ showNotice: true });
  });

  it('closes the challenge repository and fails closed when IndexedDB migration fails', async () => {
    const close = vi.fn();
    await expect(runGrade2Term1MathTextbookMigration({
      migrateProgress: () => 'already-migrated',
      hasPendingNotice: () => true,
      createRepository: () => ({
        getBackupSnapshot: async () => { throw new Error('database blocked'); },
        close,
      }),
    })).rejects.toThrow('database blocked');
    expect(close).toHaveBeenCalledOnce();
  });
});
