import { afterEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { IDBFactory } from 'fake-indexeddb';
import { loadPilotChallengeContent } from '../content/pilotContent';
import { createChallengeRepository } from '../storage/indexedDbRepository';
import type { ChallengeRepository } from '../storage/repository';
import { SoundProvider } from '../../sound/SoundProvider';
import ThemeProvider from '../../theme/ThemeProvider';
import ChallengeDataManagementPage from './ChallengeDataManagementPage';

vi.mock('../content/pilotContent', () => ({ loadPilotChallengeContent: vi.fn() }));

const repositories: ChallengeRepository[] = [];

function makeRepository() {
  const repository = createChallengeRepository({ factory: new IDBFactory(), databaseName: `settings-backup-${crypto.randomUUID()}` });
  repositories.push(repository);
  return repository;
}

function renderPage(repository: ChallengeRepository, onNavigate = vi.fn()) {
  return render(
    <ThemeProvider>
      <SoundProvider>
        <ChallengeDataManagementPage repository={repository} onNavigate={onNavigate} />
      </SoundProvider>
    </ThemeProvider>,
  );
}

afterEach(() => {
  for (const repository of repositories.splice(0)) repository.close();
  vi.clearAllMocks();
});

describe('ChallengeDataManagementPage', () => {
  it('loads the independent local data tools without loading challenge questions', async () => {
    const repository = makeRepository();
    const onNavigate = vi.fn();
    renderPage(repository, onNavigate);

    expect(await screen.findByRole('heading', { name: '备份与恢复', level: 1 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '闯关备份' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '数据管理与恢复' })).toBeInTheDocument();
    expect(loadPilotChallengeContent).not.toHaveBeenCalled();

    fireEvent.click(screen.getByRole('button', { name: '返回设置' }));
    expect(onNavigate).toHaveBeenCalledWith('/settings');
  });

  it('reports a read failure and retries without deleting local records', async () => {
    const repository = makeRepository();
    const getRecoveryPoint = vi.spyOn(repository, 'getRecoveryPoint')
      .mockRejectedValueOnce(new Error('storage unavailable'))
      .mockResolvedValue(null);
    const clearChallengeData = vi.spyOn(repository, 'clearChallengeData');
    renderPage(repository);

    expect(await screen.findByRole('heading', { name: '备份与恢复暂时无法打开' })).toBeInTheDocument();
    expect(screen.getByText(/不要清除此网站数据/)).toBeInTheDocument();
    expect(clearChallengeData).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button', { name: '重新读取' }));
    expect(await screen.findByRole('heading', { name: '备份与恢复', level: 1 })).toBeInTheDocument();
    expect(getRecoveryPoint).toHaveBeenCalledTimes(2);
  });
});
