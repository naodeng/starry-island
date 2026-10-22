import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import type { ChallengeBackupMergeSummary } from '../domain/backupMerge';
import ChallengeCenter from './ChallengeCenter';

const emptySummary: ChallengeBackupMergeSummary = {
  addedActiveAttempts: 0,
  preservedLocalActiveAttempts: 0,
  preservedProgressForActiveTasks: 0,
  addedProgressRecords: 0,
  mergedProgressRecords: 0,
  addedWrongQuestions: 0,
  mergedWrongQuestions: 0,
};

describe('ChallengeCenter', () => {
  it('links to the local challenge growth record', () => {
    const onNavigate = vi.fn();
    render(<ChallengeCenter groups={[]} progressByTaskId={{}} progressAvailable onNavigate={onNavigate} onExportBackup={vi.fn()} onPrepareImportBackup={vi.fn()} onConfirmImportBackup={vi.fn()} onCancelImportBackup={vi.fn()} />);

    fireEvent.click(screen.getByRole('button', { name: '查看成长记录' }));
    expect(onNavigate).toHaveBeenCalledWith('/challenges/growth');
  });

  it('exports a local JSON backup and confirms success without changing learning data', async () => {
    const onExportBackup = vi.fn().mockResolvedValue(undefined);
    render(<ChallengeCenter groups={[]} progressByTaskId={{}} progressAvailable onNavigate={vi.fn()} onExportBackup={onExportBackup} onPrepareImportBackup={vi.fn()} onConfirmImportBackup={vi.fn()} onCancelImportBackup={vi.fn()} />);

    fireEvent.click(screen.getByRole('button', { name: '导出闯关备份' }));

    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent('闯关备份已生成并下载到此设备。'));
    expect(onExportBackup).toHaveBeenCalledOnce();
  });

  it('reports a recoverable backup export error', async () => {
    const onExportBackup = vi.fn().mockRejectedValue(new Error('IndexedDB is unavailable'));
    render(<ChallengeCenter groups={[]} progressByTaskId={{}} progressAvailable onNavigate={vi.fn()} onExportBackup={onExportBackup} onPrepareImportBackup={vi.fn()} onConfirmImportBackup={vi.fn()} onCancelImportBackup={vi.fn()} />);

    fireEvent.click(screen.getByRole('button', { name: '导出闯关备份' }));

    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent('闯关备份没有生成；本机记录没有更改，可以稍后重试。'));
  });

  it('previews a backup merge and imports only after explicit confirmation', async () => {
    const onPrepareImportBackup = vi.fn().mockResolvedValue({ ...emptySummary, addedProgressRecords: 2, preservedLocalActiveAttempts: 1 });
    const onConfirmImportBackup = vi.fn().mockResolvedValue(undefined);
    const { container } = render(<ChallengeCenter
      groups={[]}
      progressByTaskId={{}}
      progressAvailable
      onNavigate={vi.fn()}
      onExportBackup={vi.fn()}
      onPrepareImportBackup={onPrepareImportBackup}
      onConfirmImportBackup={onConfirmImportBackup}
      onCancelImportBackup={vi.fn()}
    />);
    const file = new File(['{}'], 'challenge-backup.json', { type: 'application/json' });

    const fileInput = container.querySelector<HTMLInputElement>('input[type="file"]');
    expect(fileInput).not.toBeNull();
    fireEvent.change(fileInput!, { target: { files: [file] } });

    expect(await screen.findByRole('group', { name: '导入预览' })).toHaveTextContent('新增成绩 2 项，合并成绩 0 项');
    expect(onPrepareImportBackup).toHaveBeenCalledWith(file);
    expect(onConfirmImportBackup).not.toHaveBeenCalled();

    fireEvent.click(screen.getByRole('button', { name: '确认安全合并' }));
    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent('闯关备份已安全合并到此设备；课程进度没有改变。'));
    expect(onConfirmImportBackup).toHaveBeenCalledOnce();
  });

  it('does not leave a preview available when backup validation fails', async () => {
    const onPrepareImportBackup = vi.fn().mockRejectedValue(new Error('备份格式或完整性校验无效；本机记录没有更改。'));
    const { container } = render(<ChallengeCenter
      groups={[]}
      progressByTaskId={{}}
      progressAvailable
      onNavigate={vi.fn()}
      onExportBackup={vi.fn()}
      onPrepareImportBackup={onPrepareImportBackup}
      onConfirmImportBackup={vi.fn()}
      onCancelImportBackup={vi.fn()}
    />);

    const fileInput = container.querySelector<HTMLInputElement>('input[type="file"]');
    expect(fileInput).not.toBeNull();
    fireEvent.change(fileInput!, {
      target: { files: [new File(['invalid'], 'invalid.json', { type: 'application/json' })] },
    });

    expect(await screen.findByRole('alert')).toHaveTextContent('备份格式或完整性校验无效；本机记录没有更改。');
    expect(screen.queryByRole('group', { name: '导入预览' })).not.toBeInTheDocument();
  });
});
