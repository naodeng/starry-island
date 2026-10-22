import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import ChallengeCenter from './ChallengeCenter';

describe('ChallengeCenter', () => {
  it('links to the local challenge growth record', () => {
    const onNavigate = vi.fn();
    render(<ChallengeCenter groups={[]} progressByTaskId={{}} progressAvailable onNavigate={onNavigate} onExportBackup={vi.fn()} />);

    fireEvent.click(screen.getByRole('button', { name: '查看成长记录' }));
    expect(onNavigate).toHaveBeenCalledWith('/challenges/growth');
  });

  it('exports a local JSON backup and confirms success without changing learning data', async () => {
    const onExportBackup = vi.fn().mockResolvedValue(undefined);
    render(<ChallengeCenter groups={[]} progressByTaskId={{}} progressAvailable onNavigate={vi.fn()} onExportBackup={onExportBackup} />);

    fireEvent.click(screen.getByRole('button', { name: '导出闯关备份' }));

    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent('闯关备份已生成并下载到此设备。'));
    expect(onExportBackup).toHaveBeenCalledOnce();
  });

  it('reports a recoverable backup export error', async () => {
    const onExportBackup = vi.fn().mockRejectedValue(new Error('IndexedDB is unavailable'));
    render(<ChallengeCenter groups={[]} progressByTaskId={{}} progressAvailable onNavigate={vi.fn()} onExportBackup={onExportBackup} />);

    fireEvent.click(screen.getByRole('button', { name: '导出闯关备份' }));

    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent('闯关备份没有生成；本机记录没有更改，可以稍后重试。'));
  });
});
