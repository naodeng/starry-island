import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import type { ChallengeBackupMergeSummary } from '../domain/backupMerge';
import ChallengeBackupPanel from './ChallengeBackupPanel';

const emptySummary: ChallengeBackupMergeSummary = {
  addedActiveAttempts: 0,
  preservedLocalActiveAttempts: 0,
  preservedProgressForActiveTasks: 0,
  addedProgressRecords: 0,
  mergedProgressRecords: 0,
  addedWrongQuestions: 0,
  mergedWrongQuestions: 0,
};

function renderPanel(overrides: Partial<React.ComponentProps<typeof ChallengeBackupPanel>> = {}) {
  const props: React.ComponentProps<typeof ChallengeBackupPanel> = {
    onExportBackup: vi.fn().mockResolvedValue(undefined),
    onExportDiagnostics: vi.fn().mockResolvedValue(undefined),
    onPrepareImportBackup: vi.fn().mockResolvedValue({ summary: emptySummary, preferences: null }),
    onConfirmImportBackup: vi.fn().mockResolvedValue(undefined),
    onCancelImportBackup: vi.fn(),
    ...overrides,
  };
  const view = render(<ChallengeBackupPanel {...props} />);
  return { ...view, props };
}

describe('ChallengeBackupPanel', () => {
  it('exports only challenge data and includes preferences only after explicit opt-in', async () => {
    const { props } = renderPanel();

    expect(screen.getByRole('checkbox', { name: '备份同时携带主题和语音偏好' })).not.toBeChecked();
    fireEvent.click(screen.getByRole('button', { name: '导出闯关备份' }));
    await waitFor(() => expect(props.onExportBackup).toHaveBeenCalledWith(false));

    fireEvent.click(screen.getByRole('checkbox', { name: '备份同时携带主题和语音偏好' }));
    fireEvent.click(screen.getByRole('button', { name: '导出闯关备份' }));
    await waitFor(() => expect(props.onExportBackup).toHaveBeenLastCalledWith(true));
    expect(screen.getByText(/不包含课程进度/)).toBeInTheDocument();
  });

  it('previews safe merge and leaves imported preferences unchecked until confirmation', async () => {
    const onPrepareImportBackup = vi.fn().mockResolvedValue({
      summary: { ...emptySummary, addedProgressRecords: 2, preservedLocalActiveAttempts: 1 },
      preferences: { theme: 'dark', soundEnabled: false },
    });
    const onConfirmImportBackup = vi.fn().mockResolvedValue(undefined);
    const { container } = renderPanel({ onPrepareImportBackup, onConfirmImportBackup });
    const input = container.querySelector<HTMLInputElement>('input[type="file"]');
    expect(input).not.toBeNull();
    fireEvent.change(input!, { target: { files: [new File(['{}'], 'challenge-backup.json', { type: 'application/json' })] } });

    expect(await screen.findByRole('group', { name: '导入预览' })).toHaveTextContent('新增成绩 2 项，合并成绩 0 项');
    expect(screen.getByRole('group', { name: '导入预览' })).toHaveTextContent('备份设置：主题为深色，语音已关闭。');
    expect(screen.getByRole('checkbox', { name: '应用备份中的主题和语音偏好' })).not.toBeChecked();
    expect(onConfirmImportBackup).not.toHaveBeenCalled();

    fireEvent.click(screen.getByRole('checkbox', { name: '应用备份中的主题和语音偏好' }));
    fireEvent.click(screen.getByRole('button', { name: '确认安全合并' }));
    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent('闯关备份已安全合并到此设备；课程进度没有改变。'));
    expect(onConfirmImportBackup).toHaveBeenCalledWith(true);
  });

  it('keeps local records untouched when preview validation fails', async () => {
    const onPrepareImportBackup = vi.fn().mockRejectedValue(new Error('备份格式或完整性校验无效；本机记录没有更改。'));
    const { container } = renderPanel({ onPrepareImportBackup });
    const input = container.querySelector<HTMLInputElement>('input[type="file"]');
    fireEvent.change(input!, { target: { files: [new File(['bad'], 'invalid.json', { type: 'application/json' })] } });

    expect(await screen.findByRole('alert')).toHaveTextContent('备份格式或完整性校验无效；本机记录没有更改。');
    expect(screen.queryByRole('group', { name: '导入预览' })).not.toBeInTheDocument();
  });

  it('exports diagnostics only after an explicit request', async () => {
    const onExportDiagnostics = vi.fn().mockResolvedValue(undefined);
    renderPanel({ onExportDiagnostics });

    expect(onExportDiagnostics).not.toHaveBeenCalled();
    expect(screen.getByText(/不会自动上传/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: '手动导出脱敏诊断信息' }));

    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent('诊断信息已生成并下载到此设备；没有上传任何数据。'));
    expect(onExportDiagnostics).toHaveBeenCalledOnce();
  });
});
