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
  it('reminds users to create a long-term backup before clearing challenge data', () => {
    render(<ChallengeDataManagement initialRecoveryPoint={null} quarantinedRecordCount={0} onClear={vi.fn()} onRestore={vi.fn()} onExportQuarantinedRecords={vi.fn()} />);

    expect(screen.getByText(/清除前请先导出本机备份/)).toBeInTheDocument();
    expect(screen.getByText(/24 小时恢复点不能替代长期备份/)).toBeInTheDocument();
  });

  it('requires an explicit phrase before clearing all challenge data', async () => {
    const onClear = vi.fn().mockResolvedValue(clearResult);
    render(<ChallengeDataManagement initialRecoveryPoint={null} quarantinedRecordCount={0} onClear={onClear} onRestore={vi.fn()} onExportQuarantinedRecords={vi.fn()} />);

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
    render(<ChallengeDataManagement initialRecoveryPoint={null} quarantinedRecordCount={0} onClear={onClear} onRestore={vi.fn()} onExportQuarantinedRecords={vi.fn()} />);

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
    render(<ChallengeDataManagement initialRecoveryPoint={recoveryPoint} quarantinedRecordCount={0} onClear={onClear} onRestore={vi.fn()} onExportQuarantinedRecords={vi.fn()} />);

    fireEvent.click(screen.getByRole('button', { name: '清除错题本' }));
    fireEvent.click(screen.getByRole('button', { name: '确认清除错题本' }));

    expect(await screen.findByRole('status')).toHaveTextContent('没有找到可清除的闯关记录；现有恢复点没有被替换。');
    expect(screen.getByRole('button', { name: '恢复已清除的闯关记录' })).toBeInTheDocument();
  });

  it('asks before restoring and hides the recovery point only after a complete restore', async () => {
    const onRestore = vi.fn().mockResolvedValue({ summary: restoreSummary, recoveryPointRetained: false } satisfies ChallengeRecoveryRestoreResult);
    render(<ChallengeDataManagement initialRecoveryPoint={recoveryPoint} quarantinedRecordCount={0} onClear={vi.fn()} onRestore={onRestore} onExportQuarantinedRecords={vi.fn()} />);

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
    render(<ChallengeDataManagement initialRecoveryPoint={recoveryPoint} quarantinedRecordCount={0} onClear={vi.fn()} onRestore={onRestore} onExportQuarantinedRecords={vi.fn()} />);

    fireEvent.click(screen.getByRole('button', { name: '恢复已清除的闯关记录' }));
    fireEvent.click(screen.getByRole('button', { name: '确认恢复闯关记录' }));

    expect(await screen.findByRole('status')).toHaveTextContent('1 个任务仍在进行，恢复点会保留');
    expect(screen.getByRole('button', { name: '恢复已清除的闯关记录' })).toBeInTheDocument();
  });

  it('uses the shared recovery guidance for a cross-tab conflict', async () => {
    const conflict = Object.assign(new Error('stale revision'), { name: 'RevisionConflictError' });
    render(<ChallengeDataManagement initialRecoveryPoint={recoveryPoint} quarantinedRecordCount={0} onClear={vi.fn()} onRestore={vi.fn().mockRejectedValue(conflict)} onExportQuarantinedRecords={vi.fn()} />);

    fireEvent.click(screen.getByRole('button', { name: '恢复已清除的闯关记录' }));
    fireEvent.click(screen.getByRole('button', { name: '确认恢复闯关记录' }));

    expect(await screen.findByRole('alert')).toHaveTextContent('本机记录在另一个页面发生了变化。请重新读取后继续');
    expect(screen.getByRole('button', { name: '恢复已清除的闯关记录' })).toBeInTheDocument();
  });

  it('offers an explicit local export for quarantined records and explains its contents', async () => {
    const onExportQuarantinedRecords = vi.fn().mockResolvedValue(undefined);
    render(<ChallengeDataManagement
      initialRecoveryPoint={null}
      quarantinedRecordCount={2}
      onClear={vi.fn()}
      onRestore={vi.fn()}
      onExportQuarantinedRecords={onExportQuarantinedRecords}
    />);

    expect(screen.getByText(/发现 2 条结构异常的闯关记录/)).toBeInTheDocument();
    expect(screen.getByText(/可能包含题目和作答内容；文件只下载到此设备/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: '导出隔离记录' }));

    await waitFor(() => expect(onExportQuarantinedRecords).toHaveBeenCalledOnce());
    expect(await screen.findByRole('status')).toHaveTextContent('没有上传任何数据');
  });
});
