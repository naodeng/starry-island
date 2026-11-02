import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import TextbookMigrationGate from './TextbookMigrationGate';

vi.mock('../App', () => ({
  default: ({ showTextbookMigrationNotice }: { showTextbookMigrationNotice: boolean }) => (
    <div data-testid="app">app-ready:{String(showTextbookMigrationNotice)}</div>
  ),
}));

describe('TextbookMigrationGate', () => {
  it('does not mount the app until the local migrations finish', async () => {
    let resolve!: (value: { showNotice: boolean }) => void;
    const initialize = vi.fn(() => new Promise<{ showNotice: boolean }>((done) => { resolve = done; }));
    render(<TextbookMigrationGate initialize={initialize} />);

    expect(screen.getByRole('heading', { name: '正在更新二年级上册数学' })).toBeInTheDocument();
    expect(screen.getByRole('main').querySelector('.route-message-card')?.className).toMatch(/animal-card-/);
    expect(screen.queryByTestId('app')).not.toBeInTheDocument();
    resolve({ showNotice: true });
    expect(await screen.findByTestId('app')).toHaveTextContent('app-ready:true');
  });

  it('keeps the app gated after migration failure and retries on request', async () => {
    const initialize = vi.fn()
      .mockRejectedValueOnce(new Error('IndexedDB blocked'))
      .mockResolvedValueOnce({ showNotice: false });
    render(<TextbookMigrationGate initialize={initialize} />);

    expect(await screen.findByRole('heading', { name: '课程更新暂时没有完成' })).toBeInTheDocument();
    expect(screen.getByText(/尚未进入新版课程/)).toBeInTheDocument();
    expect(screen.queryByTestId('app')).not.toBeInTheDocument();
    const retry = screen.getByRole('button', { name: '重试更新' });
    expect(retry).toBeVisible();
    expect(screen.getByRole('alert').querySelector('.route-message-card')?.className).toMatch(/animal-card-/);
    fireEvent.click(retry);
    expect(await screen.findByTestId('app')).toHaveTextContent('app-ready:false');
    expect(initialize).toHaveBeenCalledTimes(2);
  });
});
