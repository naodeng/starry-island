import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SoundProvider } from '../../sound/SoundProvider';
import ThemeProvider from '../../theme/ThemeProvider';
import type { ProgressState } from '../../storage/progress';
import SettingsPanel from './SettingsPanel';

vi.mock('../../achievements/position', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../achievements/position')>();
  return { ...actual, getRegisteredLearningPositions: vi.fn(() => []) };
});

const emptyProgress: ProgressState = {
  schemaVersion: 4,
  completedSessionIds: [],
  recentCompletions: [],
  learningStart: null,
};

describe('SettingsPanel', () => {
  it('explainsWhenNoRegisteredLearningStartIsAvailable', () => {
    render(
      <SoundProvider>
        <ThemeProvider>
          <SettingsPanel progress={emptyProgress} onApplyLearningStart={vi.fn()} onNavigate={vi.fn()} />
        </ThemeProvider>
      </SoundProvider>,
    );

    expect(screen.getByRole('heading', { name: '暂时没有可选择的课程起点' })).toBeInTheDocument();
    expect(screen.getByText('课程单元登记后，就可以在这里选择学习起点。')).toBeInTheDocument();
    expect(screen.queryByRole('combobox')).not.toBeInTheDocument();
  });
});
