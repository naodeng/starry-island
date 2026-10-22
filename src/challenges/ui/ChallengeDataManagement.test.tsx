import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import type { ChallengeBackupMergeSummary } from '../domain/backupMerge';
import type { ChallengeDataClearResult, ChallengeRecoveryPointSummary } from '../domain/recovery';
import type {
  ChallengeRecoveryRestoreResult,
  QuarantineRecoveryPreview,
  QuarantinedRecordPage,
  QuarantineRestoreResult,
} from '../storage/repository';
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

const quarantinePage: QuarantinedRecordPage = {
  items: [
    {
      quarantineId: 12,
      sourceStore: 'attempts',
      sourceKey: 'grade-2-term-1-math-unit-02/basic-01',
      quarantinedAt: '2026-10-21T10:00:00.000Z',
      reasonCode: 'invalid-attempts',
      status: 'eligible',
      targetStore: 'attempts',
      targetKey: 'grade-2-term-1-math-unit-02/basic-01',
    },
    {
      quarantineId: 11,
      sourceStore: 'attempts',
      sourceKey: 'unsafe-task',
      quarantinedAt: '2026-10-20T10:00:00.000Z',
      reasonCode: 'untrusted-reason-with-answer-text',
      status: 'blocked',
      blockReason: 'unsupported-snapshot-version',
      // Deliberately attach an untrusted extra field to ensure views never render it.
      record: { prompt: '保密题干', options: ['保密选项'], answer: '保密答案', explanation: '保密讲解' },
    } as QuarantinedRecordPage['items'][number],
  ],
  nextCursor: null,
};

const eligiblePreview: QuarantineRecoveryPreview = {
  status: 'eligible',
  quarantineId: 12,
  sourceStore: 'attempts',
  sourceKey: 'grade-2-term-1-math-unit-02/basic-01',
  token: 'preview-token',
  targetStore: 'attempts',
  targetKey: 'grade-2-term-1-math-unit-02/basic-01',
  normalization: 'attempt-snapshot-v1',
  expiresAt: new Date(Date.now() + 5 * 60 * 1000).toISOString(),
};

function quarantineRecoveryProps(overrides: Partial<{
  onLoadQuarantinedRecordPage: (afterKey?: IDBValidKey) => Promise<QuarantinedRecordPage>;
  onPreviewQuarantinedRecord: (quarantineId: IDBValidKey) => Promise<QuarantineRecoveryPreview>;
  onCancelQuarantinedRecordPreview: (token: string) => void;
  onConfirmQuarantinedRecordRestore: (token: string) => Promise<QuarantineRestoreResult>;
}> = {}) {
  return {
    onLoadQuarantinedRecordPage: vi.fn().mockResolvedValue(quarantinePage),
    onPreviewQuarantinedRecord: vi.fn().mockResolvedValue(eligiblePreview),
    onCancelQuarantinedRecordPreview: vi.fn(),
    onConfirmQuarantinedRecordRestore: vi.fn().mockResolvedValue({ status: 'restored' } satisfies QuarantineRestoreResult),
    ...overrides,
  };
}

describe('ChallengeDataManagement', () => {
  it('reminds users to create a long-term backup before clearing challenge data', () => {
    render(<ChallengeDataManagement initialRecoveryPoint={null} quarantinedRecordCount={0} onClear={vi.fn()} onRestore={vi.fn()} onExportQuarantinedRecords={vi.fn()} {...quarantineRecoveryProps()} />);

    expect(screen.getByText(/清除前请先导出本机备份/)).toBeInTheDocument();
    expect(screen.getByText(/24 小时恢复点不能替代长期备份/)).toBeInTheDocument();
  });

  it('requires an explicit phrase before clearing all challenge data', async () => {
    const onClear = vi.fn().mockResolvedValue(clearResult);
    render(<ChallengeDataManagement initialRecoveryPoint={null} quarantinedRecordCount={0} onClear={onClear} onRestore={vi.fn()} onExportQuarantinedRecords={vi.fn()} {...quarantineRecoveryProps()} />);

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
    render(<ChallengeDataManagement initialRecoveryPoint={null} quarantinedRecordCount={0} onClear={onClear} onRestore={vi.fn()} onExportQuarantinedRecords={vi.fn()} {...quarantineRecoveryProps()} />);

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
    render(<ChallengeDataManagement initialRecoveryPoint={recoveryPoint} quarantinedRecordCount={0} onClear={onClear} onRestore={vi.fn()} onExportQuarantinedRecords={vi.fn()} {...quarantineRecoveryProps()} />);

    fireEvent.click(screen.getByRole('button', { name: '清除错题本' }));
    fireEvent.click(screen.getByRole('button', { name: '确认清除错题本' }));

    expect(await screen.findByRole('status')).toHaveTextContent('没有找到可清除的闯关记录；现有恢复点没有被替换。');
    expect(screen.getByRole('button', { name: '恢复已清除的闯关记录' })).toBeInTheDocument();
  });

  it('asks before restoring and hides the recovery point only after a complete restore', async () => {
    const onRestore = vi.fn().mockResolvedValue({ summary: restoreSummary, recoveryPointRetained: false } satisfies ChallengeRecoveryRestoreResult);
    render(<ChallengeDataManagement initialRecoveryPoint={recoveryPoint} quarantinedRecordCount={0} onClear={vi.fn()} onRestore={onRestore} onExportQuarantinedRecords={vi.fn()} {...quarantineRecoveryProps()} />);

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
    render(<ChallengeDataManagement initialRecoveryPoint={recoveryPoint} quarantinedRecordCount={0} onClear={vi.fn()} onRestore={onRestore} onExportQuarantinedRecords={vi.fn()} {...quarantineRecoveryProps()} />);

    fireEvent.click(screen.getByRole('button', { name: '恢复已清除的闯关记录' }));
    fireEvent.click(screen.getByRole('button', { name: '确认恢复闯关记录' }));

    expect(await screen.findByRole('status')).toHaveTextContent('1 个任务仍在进行，恢复点会保留');
    expect(screen.getByRole('button', { name: '恢复已清除的闯关记录' })).toBeInTheDocument();
  });

  it('uses the shared recovery guidance for a cross-tab conflict', async () => {
    const conflict = Object.assign(new Error('stale revision'), { name: 'RevisionConflictError' });
    render(<ChallengeDataManagement initialRecoveryPoint={recoveryPoint} quarantinedRecordCount={0} onClear={vi.fn()} onRestore={vi.fn().mockRejectedValue(conflict)} onExportQuarantinedRecords={vi.fn()} {...quarantineRecoveryProps()} />);

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
      {...quarantineRecoveryProps()}
    />);

    expect(screen.getByText(/发现 2 条结构异常的闯关记录/)).toBeInTheDocument();
    expect(screen.getByText(/可能包含题目和作答内容；文件只下载到此设备/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: '导出隔离记录' }));

    await waitFor(() => expect(onExportQuarantinedRecords).toHaveBeenCalledOnce());
    expect(await screen.findByRole('status')).toHaveTextContent('没有上传任何数据');
  });

  it('does-not-load-or-restore-quarantine-records-on-mount', () => {
    const recovery = quarantineRecoveryProps();
    render(<ChallengeDataManagement
      initialRecoveryPoint={null}
      quarantinedRecordCount={2}
      onClear={vi.fn()}
      onRestore={vi.fn()}
      onExportQuarantinedRecords={vi.fn()}
      {...recovery}
    />);

    expect(recovery.onLoadQuarantinedRecordPage).not.toHaveBeenCalled();
    expect(recovery.onPreviewQuarantinedRecord).not.toHaveBeenCalled();
    expect(recovery.onConfirmQuarantinedRecordRestore).not.toHaveBeenCalled();
    expect(screen.getByRole('button', { name: '检查可恢复记录' })).toBeInTheDocument();
  });

  it('renders-only-safe-page-summary-and-preview', async () => {
    const recovery = quarantineRecoveryProps();
    render(<ChallengeDataManagement
      initialRecoveryPoint={null}
      quarantinedRecordCount={2}
      onClear={vi.fn()}
      onRestore={vi.fn()}
      onExportQuarantinedRecords={vi.fn()}
      {...recovery}
    />);

    fireEvent.click(screen.getByRole('button', { name: '检查可恢复记录' }));
    expect(await screen.findByRole('list', { name: '隔离记录列表' })).toBeInTheDocument();
    expect(screen.getByText('记录可安全预览；确认前会再次检查。')).toBeInTheDocument();
    expect(screen.getByText('快照版本不受支持，原记录仍保存在隔离区。')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: '预览 unsafe-task' })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: '预览隔离记录 12' })).toBeInTheDocument();
    expect(document.body).not.toHaveTextContent(/保密题干|保密选项|保密答案|保密讲解|untrusted-reason/);

    fireEvent.click(screen.getByRole('button', { name: '预览隔离记录 12' }));
    expect(await screen.findByRole('group', { name: '恢复预览' })).toHaveTextContent('闯关答题');
    expect(screen.getByRole('group', { name: '恢复预览' })).toHaveTextContent('grade-2-term-1-math-unit-02/basic-01');
    expect(screen.getByRole('group', { name: '恢复预览' })).toHaveTextContent('只补入已知结构版本 1');
    expect(document.body).not.toHaveTextContent(/保密题干|保密选项|保密答案|保密讲解/);
    expect(recovery.onPreviewQuarantinedRecord).toHaveBeenCalledWith(12);
  });

  it('cancels-preview-without-calling-restore', async () => {
    const recovery = quarantineRecoveryProps();
    render(<ChallengeDataManagement
      initialRecoveryPoint={null}
      quarantinedRecordCount={2}
      onClear={vi.fn()}
      onRestore={vi.fn()}
      onExportQuarantinedRecords={vi.fn()}
      {...recovery}
    />);

    fireEvent.click(screen.getByRole('button', { name: '检查可恢复记录' }));
    fireEvent.click(await screen.findByRole('button', { name: '预览隔离记录 12' }));
    await screen.findByRole('group', { name: '恢复预览' });
    fireEvent.click(screen.getByRole('button', { name: '取消恢复预览' }));

    expect(recovery.onCancelQuarantinedRecordPreview).toHaveBeenCalledWith('preview-token');
    expect(recovery.onConfirmQuarantinedRecordRestore).not.toHaveBeenCalled();
    expect(screen.queryByRole('group', { name: '恢复预览' })).not.toBeInTheDocument();
  });

  it('confirms-once-and-refreshes-quarantine-count', async () => {
    const recovery = quarantineRecoveryProps();
    const onConfirmQuarantinedRecordRestore = vi.fn().mockResolvedValue({ status: 'restored' } satisfies QuarantineRestoreResult);
    const props = { ...recovery, onConfirmQuarantinedRecordRestore };
    const { rerender } = render(<ChallengeDataManagement
      initialRecoveryPoint={null}
      quarantinedRecordCount={2}
      onClear={vi.fn()}
      onRestore={vi.fn()}
      onExportQuarantinedRecords={vi.fn()}
      {...props}
    />);

    fireEvent.click(screen.getByRole('button', { name: '检查可恢复记录' }));
    fireEvent.click(await screen.findByRole('button', { name: '预览隔离记录 12' }));
    await screen.findByRole('group', { name: '恢复预览' });
    fireEvent.click(screen.getByRole('button', { name: '确认恢复这条记录' }));

    expect(await screen.findByRole('status')).toHaveTextContent('已恢复一条闯关答题记录；其余隔离记录没有改变。');
    expect(onConfirmQuarantinedRecordRestore).toHaveBeenCalledOnce();
    expect(onConfirmQuarantinedRecordRestore).toHaveBeenCalledWith('preview-token');
    rerender(<ChallengeDataManagement
      initialRecoveryPoint={null}
      quarantinedRecordCount={1}
      onClear={vi.fn()}
      onRestore={vi.fn()}
      onExportQuarantinedRecords={vi.fn()}
      {...props}
    />);
    expect(screen.getByText(/发现 1 条结构异常的闯关记录/)).toBeInTheDocument();
  });

  it('shows-safe-guidance-for-conflict-expired-preview-and-storage-error', async () => {
    const blockedPreview: QuarantineRecoveryPreview = {
      status: 'blocked', quarantineId: 12, sourceStore: 'attempts', reason: 'target-conflict',
    };
    const conflictRecovery = quarantineRecoveryProps({ onPreviewQuarantinedRecord: vi.fn().mockResolvedValue(blockedPreview) });
    const { rerender } = render(<ChallengeDataManagement initialRecoveryPoint={null} quarantinedRecordCount={2} onClear={vi.fn()} onRestore={vi.fn()} onExportQuarantinedRecords={vi.fn()} {...conflictRecovery} />);
    fireEvent.click(screen.getByRole('button', { name: '检查可恢复记录' }));
    fireEvent.click(await screen.findByRole('button', { name: '预览隔离记录 12' }));
    expect(await screen.findByRole('alert')).toHaveTextContent('目标位置已有记录，原隔离记录仍保留；不会覆盖或合并。');
    expect(screen.queryByRole('button', { name: '确认恢复这条记录' })).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: '关闭预览' }));
    fireEvent.click(screen.getByRole('button', { name: '收起隔离记录' }));

    const expiredRecovery = quarantineRecoveryProps({ onConfirmQuarantinedRecordRestore: vi.fn().mockResolvedValue({ status: 'stale-preview' }) });
    rerender(<ChallengeDataManagement initialRecoveryPoint={null} quarantinedRecordCount={2} onClear={vi.fn()} onRestore={vi.fn()} onExportQuarantinedRecords={vi.fn()} {...expiredRecovery} />);
    fireEvent.click(screen.getByRole('button', { name: '检查可恢复记录' }));
    fireEvent.click(await screen.findByRole('button', { name: '预览隔离记录 12' }));
    await screen.findByRole('group', { name: '恢复预览' });
    fireEvent.click(screen.getByRole('button', { name: '确认恢复这条记录' }));
    expect(await screen.findByRole('alert')).toHaveTextContent('预览已失效；隔离记录仍保留，请重新检查后再试。');
    fireEvent.click(screen.getByRole('button', { name: '收起隔离记录' }));

    const storageRecovery = quarantineRecoveryProps({ onPreviewQuarantinedRecord: vi.fn().mockRejectedValue(new Error('IndexedDB internal store name')) });
    rerender(<ChallengeDataManagement initialRecoveryPoint={null} quarantinedRecordCount={2} onClear={vi.fn()} onRestore={vi.fn()} onExportQuarantinedRecords={vi.fn()} {...storageRecovery} />);
    fireEvent.click(screen.getByRole('button', { name: '检查可恢复记录' }));
    fireEvent.click(await screen.findByRole('button', { name: '预览隔离记录 12' }));
    expect(await screen.findByRole('alert')).toHaveTextContent('记录暂时无法检查；原隔离记录仍保留，可以稍后重试。');
    expect(document.body).not.toHaveTextContent('IndexedDB internal store name');
  });

  it('keeps-export-available-for-unrecoverable-records', async () => {
    const onExportQuarantinedRecords = vi.fn().mockResolvedValue(undefined);
    const recovery = quarantineRecoveryProps();
    render(<ChallengeDataManagement
      initialRecoveryPoint={null}
      quarantinedRecordCount={1}
      onClear={vi.fn()}
      onRestore={vi.fn()}
      onExportQuarantinedRecords={onExportQuarantinedRecords}
      {...recovery}
    />);

    fireEvent.click(screen.getByRole('button', { name: '检查可恢复记录' }));
    await screen.findByRole('list', { name: '隔离记录列表' });
    expect(screen.getByRole('button', { name: '导出隔离记录' })).toBeEnabled();
    expect(screen.queryByRole('button', { name: /确认恢复/ })).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: '导出隔离记录' }));
    await waitFor(() => expect(onExportQuarantinedRecords).toHaveBeenCalledOnce());
  });
});
