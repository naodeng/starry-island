import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import type { ChallengeBackupMergeSummary } from '../domain/backupMerge';
import type { ChallengeGroupManifest } from '../domain/types';
import ChallengeCenter from './ChallengeCenter';
import { getChallengeGroupTitle } from './ChallengeCenter';
import pilotManifest from '../content/pilot-manifest.json';

const emptySummary: ChallengeBackupMergeSummary = {
  addedActiveAttempts: 0,
  preservedLocalActiveAttempts: 0,
  preservedProgressForActiveTasks: 0,
  addedProgressRecords: 0,
  mergedProgressRecords: 0,
  addedWrongQuestions: 0,
  mergedWrongQuestions: 0,
};

const emptyClearResult = {
  counts: { attempts: 0, taskProgress: 0, recentQuestionAttempts: 0, wrongQuestions: 0 },
  recoveryPoint: null,
};

function dataManagementProps() {
  return {
    initialRecoveryPoint: null,
    quarantinedRecordCount: 0,
    onClearChallengeData: vi.fn().mockResolvedValue(emptyClearResult),
    onRestoreRecoveryPoint: vi.fn().mockResolvedValue(null),
    onExportQuarantinedRecords: vi.fn().mockResolvedValue(undefined),
    onExportDiagnostics: vi.fn().mockResolvedValue(undefined),
  };
}

describe('ChallengeCenter', () => {
  it('uses the registered unit grade, term, subject, and chapter in its title', () => {
    const englishGroup = pilotManifest.groups.find(({ definition }) => definition.id === 'grade-3-term-1-english-unit-01') as unknown as ChallengeGroupManifest;

    expect(getChallengeGroupTitle(englishGroup)).toBe('三年级上册英语 · 第一单元');
  });

  it('links to the local challenge growth record', () => {
    const onNavigate = vi.fn();
    render(<ChallengeCenter groups={[]} progressByTaskId={{}} progressAvailable onNavigate={onNavigate} onExportBackup={vi.fn()} onPrepareImportBackup={vi.fn()} onConfirmImportBackup={vi.fn()} onCancelImportBackup={vi.fn()} {...dataManagementProps()} />);

    fireEvent.click(screen.getByRole('button', { name: '查看成长记录' }));
    expect(onNavigate).toHaveBeenCalledWith('/challenges/growth');
  });

  it('exports a local JSON backup and confirms success without changing learning data', async () => {
    const onExportBackup = vi.fn().mockResolvedValue(undefined);
    render(<ChallengeCenter groups={[]} progressByTaskId={{}} progressAvailable onNavigate={vi.fn()} onExportBackup={onExportBackup} onPrepareImportBackup={vi.fn()} onConfirmImportBackup={vi.fn()} onCancelImportBackup={vi.fn()} {...dataManagementProps()} />);

    expect(screen.getByRole('checkbox', { name: '备份同时携带主题和语音偏好' })).not.toBeChecked();
    fireEvent.click(screen.getByRole('button', { name: '导出闯关备份' }));

    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent('闯关备份已生成并下载到此设备。'));
    expect(onExportBackup).toHaveBeenCalledWith(false);
  });

  it('includes preferences in an export only after the user opts in', async () => {
    const onExportBackup = vi.fn().mockResolvedValue(undefined);
    render(<ChallengeCenter groups={[]} progressByTaskId={{}} progressAvailable onNavigate={vi.fn()} onExportBackup={onExportBackup} onPrepareImportBackup={vi.fn()} onConfirmImportBackup={vi.fn()} onCancelImportBackup={vi.fn()} {...dataManagementProps()} />);

    fireEvent.click(screen.getByRole('checkbox', { name: '备份同时携带主题和语音偏好' }));
    fireEvent.click(screen.getByRole('button', { name: '导出闯关备份' }));

    await waitFor(() => expect(onExportBackup).toHaveBeenCalledWith(true));
  });

  it('reports a recoverable backup export error', async () => {
    const onExportBackup = vi.fn().mockRejectedValue(new Error('IndexedDB is unavailable'));
    render(<ChallengeCenter groups={[]} progressByTaskId={{}} progressAvailable onNavigate={vi.fn()} onExportBackup={onExportBackup} onPrepareImportBackup={vi.fn()} onConfirmImportBackup={vi.fn()} onCancelImportBackup={vi.fn()} {...dataManagementProps()} />);

    fireEvent.click(screen.getByRole('button', { name: '导出闯关备份' }));

    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent('闯关备份没有生成；本机记录没有更改，可以稍后重试。'));
  });

  it('only exports the explicitly requested local diagnostics and explains the data scope', async () => {
    const onExportDiagnostics = vi.fn().mockResolvedValue(undefined);
    render(<ChallengeCenter groups={[]} progressByTaskId={{}} progressAvailable onNavigate={vi.fn()} onExportBackup={vi.fn()} onPrepareImportBackup={vi.fn()} onConfirmImportBackup={vi.fn()} onCancelImportBackup={vi.fn()} {...dataManagementProps()} onExportDiagnostics={onExportDiagnostics} />);

    expect(onExportDiagnostics).not.toHaveBeenCalled();
    expect(screen.getByText(/只有点击后才会生成并下载；不会自动上传。/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: '手动导出脱敏诊断信息' }));

    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent('诊断信息已生成并下载到此设备；没有上传任何数据。'));
    expect(onExportDiagnostics).toHaveBeenCalledOnce();
  });

  it('shows a recoverable message when diagnostic export fails', async () => {
    const onExportDiagnostics = vi.fn().mockRejectedValue(new Error('storage unavailable'));
    render(<ChallengeCenter groups={[]} progressByTaskId={{}} progressAvailable onNavigate={vi.fn()} onExportBackup={vi.fn()} onPrepareImportBackup={vi.fn()} onConfirmImportBackup={vi.fn()} onCancelImportBackup={vi.fn()} {...dataManagementProps()} onExportDiagnostics={onExportDiagnostics} />);

    fireEvent.click(screen.getByRole('button', { name: '手动导出脱敏诊断信息' }));

    await waitFor(() => expect(screen.getByRole('alert')).toHaveTextContent('诊断信息没有生成；本机记录没有更改，可以稍后重试。'));
  });

  it('previews a backup merge and imports only after explicit confirmation', async () => {
    const onPrepareImportBackup = vi.fn().mockResolvedValue({
      summary: { ...emptySummary, addedProgressRecords: 2, preservedLocalActiveAttempts: 1 },
      preferences: { theme: 'dark', soundEnabled: false },
    });
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
      {...dataManagementProps()}
    />);
    const file = new File(['{}'], 'challenge-backup.json', { type: 'application/json' });

    const fileInput = container.querySelector<HTMLInputElement>('input[type="file"]');
    expect(fileInput).not.toBeNull();
    fireEvent.change(fileInput!, { target: { files: [file] } });

    expect(await screen.findByRole('group', { name: '导入预览' })).toHaveTextContent('新增成绩 2 项，合并成绩 0 项');
    expect(screen.getByRole('group', { name: '导入预览' })).toHaveTextContent('备份设置：主题为深色，语音已关闭。');
    expect(screen.getByRole('checkbox', { name: '应用备份中的主题和语音偏好' })).not.toBeChecked();
    expect(onPrepareImportBackup).toHaveBeenCalledWith(file);
    expect(onConfirmImportBackup).not.toHaveBeenCalled();

    fireEvent.click(screen.getByRole('button', { name: '确认安全合并' }));
    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent('闯关备份已安全合并到此设备；课程进度没有改变。'));
    expect(onConfirmImportBackup).toHaveBeenCalledWith(false);
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
      {...dataManagementProps()}
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
