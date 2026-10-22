import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import type { ChallengeBackupMergeSummary } from '../domain/backupMerge';
import type { ChallengeDataClearResult, ChallengeRecoveryPointSummary } from '../domain/recovery';
import type { ChallengeRecoveryRestoreResult } from '../storage/repository';
import ChallengeDataManagement from './ChallengeDataManagement';

const recoveryPoint: ChallengeRecoveryPointSummary = {
  createdAt: '2026-10-22T00:00:00.000Z',
  expiresAt: '2026-10-23T00:00:00.000Z',
};

const clearResult: ChallengeDataClearResult = {
  counts: { attempts: 2, taskProgress: 3, recentQuestionAttempts: 1, wrongQuestions: 4 },
  recoveryPoint,
};

const restoreSummary: ChallengeBackupMergeSummary = {
  addedActiveAttempts: 0,
  preservedLocalActiveAttempts: 0,
  preservedProgressForActiveTasks: 0,
  addedProgressRecords: 3,
  mergedProgressRecords: 0,
  addedWrongQuestions: 4,
  mergedWrongQuestions: 0,
};

describe('ChallengeDataManagement', () => {
  it('requires an explicit phrase before clearing all challenge data', async () => {
    const onClear = vi.fn().mockResolvedValue(clearResult);
    render(<ChallengeDataManagement initialRecoveryPoint={null} onClear={onClear} onRestore={vi.fn()} />);

    fireEvent.click(screen.getByRole('button', { name: '清除全部闯关数据' }));
    expect(screen.getByRole('group', { name: '清除确认' })).toBeInTheDocument();
    const confirmButton = screen.getByRole('button', { name: '确认清除全部闯关数据' });
    expect(confirmButton).toBeDisabled();

    fireEvent.change(screen.getByRole('textbox', { name: '输入“清空闯关数据”以确认' }), {
      target: { value: '清空闯关数据' },
    });
    expect(confirmButton).toBeEnabled();
    fireEvent.click(confirmButton);

    await waitFor(() => expect(onClear).toHaveBeenCalledWith('all'));
    expect(await screen.findByRole('status')).toHaveTextContent('已创建 24 小时恢复点');
  });

  it('lets a user clear one category and preserves the returned recovery point', async () => {
    const onClear = vi.fn().mockResolvedValue({
      ...clearResult,
      counts: { attempts: 0, taskProgress: 0, recentQuestionAttempts: 0, wrongQuestions: 4 },
    });
    render(<ChallengeDataManagement initialRecoveryPoint={null} onClear={onClear} onRestore={vi.fn()} />);

    fireEvent.click(screen.getByRole('button', { name: '清除错题本' }));
    fireEvent.click(screen.getByRole('button', { name: '确认清除错题本' }));

    await waitFor(() => expect(onClear).toHaveBeenCalledWith('wrong-questions'));
    expect(await screen.findByRole('status')).toHaveTextContent('已清除 4 条错题记录');
    expect(screen.getByText(/恢复点有效至/)).toBeInTheDocument();
  });

  it('keeps the existing recovery point when there is nothing left to clear', async () => {
    const onClear = vi.fn().mockResolvedValue({
      counts: { attempts: 0, taskProgress: 0, recentQuestionAttempts: 0, wrongQuestions: 0 },
      recoveryPoint: null,
    });
    render(<ChallengeDataManagement initialRecoveryPoint={recoveryPoint} onClear={onClear} onRestore={vi.fn()} />);

    fireEvent.click(screen.getByRole('button', { name: '清除错题本' }));
    fireEvent.click(screen.getByRole('button', { name: '确认清除错题本' }));

    expect(await screen.findByRole('status')).toHaveTextContent('没有找到可清除的闯关记录；现有恢复点没有被替换。');
    expect(screen.getByRole('button', { name: '恢复已清除的闯关记录' })).toBeInTheDocument();
  });

  it('asks before restoring and hides the recovery point only after a complete restore', async () => {
    const onRestore = vi.fn().mockResolvedValue({ summary: restoreSummary, recoveryPointRetained: false } satisfies ChallengeRecoveryRestoreResult);
    render(<ChallengeDataManagement initialRecoveryPoint={recoveryPoint} onClear={vi.fn()} onRestore={onRestore} />);

    fireEvent.click(screen.getByRole('button', { name: '恢复已清除的闯关记录' }));
    expect(screen.getByRole('group', { name: '恢复确认' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: '确认恢复闯关记录' }));

    await waitFor(() => expect(onRestore).toHaveBeenCalledOnce());
    expect(await screen.findByRole('status')).toHaveTextContent('已恢复闯关记录');
    expect(screen.queryByRole('button', { name: '恢复已清除的闯关记录' })).not.toBeInTheDocument();
  });

  it('keeps the recovery point visible when restoration is deferred by a local active task', async () => {
    const onRestore = vi.fn().mockResolvedValue({
      summary: { ...restoreSummary, preservedProgressForActiveTasks: 1 },
      recoveryPointRetained: true,
    } satisfies ChallengeRecoveryRestoreResult);
    render(<ChallengeDataManagement initialRecoveryPoint={recoveryPoint} onClear={vi.fn()} onRestore={onRestore} />);

    fireEvent.click(screen.getByRole('button', { name: '恢复已清除的闯关记录' }));
    fireEvent.click(screen.getByRole('button', { name: '确认恢复闯关记录' }));

    expect(await screen.findByRole('status')).toHaveTextContent('1 个任务仍在进行，恢复点会保留');
    expect(screen.getByRole('button', { name: '恢复已清除的闯关记录' })).toBeInTheDocument();
  });
});
