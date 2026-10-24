import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SoundProvider } from '../../sound/SoundProvider';
import ThemeProvider from '../../theme/ThemeProvider';
import type { ProgressState } from '../../storage/progress';
import SettingsPage from './SettingsPage';

const emptyProgress: ProgressState = {
  schemaVersion: 4,
  completedSessionIds: [],
  recentCompletions: [],
  learningStart: null,
};

function renderSettings(progress = emptyProgress, onNavigate = vi.fn(), onApplyLearningStart = vi.fn()) {
  return {
    onNavigate,
    onApplyLearningStart,
    ...render(
      <SoundProvider>
        <ThemeProvider>
          <SettingsPage progress={progress} onNavigate={onNavigate} onApplyLearningStart={onApplyLearningStart} />
        </ThemeProvider>
      </SoundProvider>,
    ),
  };
}

describe('SettingsPage', () => {
  beforeEach(() => window.localStorage.clear());

  it('shows the existing theme and speech preferences on a dedicated settings page', async () => {
    const user = userEvent.setup();
    renderSettings();

    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '设置', level: 1 })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: '跟随系统' })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: '浅色' })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: '深色' })).toBeInTheDocument();

    const speechSwitch = screen.getByRole('switch', { name: '语音提示与交互音效' });
    expect(speechSwitch).toBeChecked();
    await user.click(speechSwitch);
    expect(speechSwitch).not.toBeChecked();
    expect(window.localStorage.getItem('china-study-sound-enabled-v1')).toBe('false');
  });

  it('requires a second confirmation before replacing course progress', async () => {
    const user = userEvent.setup();
    const onApplyLearningStart = vi.fn();
    renderSettings(emptyProgress, vi.fn(), onApplyLearningStart);

    await user.click(screen.getByRole('combobox', { name: '年级' }));
    await user.click(await screen.findByRole('option', { name: '2 年级' }));
    await user.click(screen.getByRole('combobox', { name: '学期' }));
    await user.click(await screen.findByRole('option', { name: '下学期' }));
    await user.click(screen.getByRole('combobox', { name: '从第几单元开始' }));
    await user.click(await screen.findByRole('option', { name: '第 1 单元' }));
    await user.click(screen.getByRole('button', { name: '应用学习起点' }));

    expect(onApplyLearningStart).not.toHaveBeenCalled();
    expect(screen.getByRole('group', { name: '确认更改学习起点' })).toHaveTextContent('会替换当前进度记录');
    await user.click(screen.getByRole('button', { name: '确认并应用学习起点' }));
    expect(onApplyLearningStart).toHaveBeenCalledWith({ grade: 2, term: 2, unit: 1 });
    expect(await screen.findByText('已更新学习起点，星图也同步点亮啦！')).toHaveAttribute('role', 'status');
  });

  it('provides clear links to growth and backup management', async () => {
    const user = userEvent.setup();
    const { onNavigate } = renderSettings();

    await user.click(screen.getByRole('button', { name: /查看成长详情/ }));
    expect(onNavigate).toHaveBeenCalledWith('/growth');

    await user.click(screen.getByRole('button', { name: '打开备份与恢复' }));
    expect(onNavigate).toHaveBeenCalledWith('/settings/backup');
  });

  it('keeps an unregistered saved start visible and unavailable for selection', () => {
    renderSettings({ ...emptyProgress, learningStart: { grade: 6, term: 2, unit: 7 } });

    expect(screen.getByRole('combobox', { name: '年级' })).toHaveTextContent('6 年级');
    expect(screen.getByText(/尚未登记到课程目录/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '应用学习起点' })).toBeDisabled();
  });

  it('cancels the pending confirmation without changing progress', async () => {
    const user = userEvent.setup();
    const onApplyLearningStart = vi.fn();
    renderSettings(emptyProgress, vi.fn(), onApplyLearningStart);

    await user.click(screen.getByRole('button', { name: '应用学习起点' }));
    expect(screen.getByRole('group', { name: '确认更改学习起点' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: '返回修改' }));
    expect(screen.queryByRole('group', { name: '确认更改学习起点' })).not.toBeInTheDocument();
    expect(onApplyLearningStart).not.toHaveBeenCalled();
  });
});
