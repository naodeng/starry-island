import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

const playedSources: string[] = [];

class AppTestAudio {
  currentTime = 0;
  paused = true;
  preload = 'auto';
  play = vi.fn(() => {
    playedSources.push(this.src);
    this.paused = false;
    return Promise.resolve();
  });
  pause = vi.fn(() => { this.paused = true; });

  constructor(public src: string) {}
}

describe('App', () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.history.replaceState({}, '', '/');
    playedSources.length = 0;
    vi.stubGlobal('Audio', AppTestAudio);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    window.localStorage.clear();
    window.history.replaceState({}, '', '/');
  });

  it('rendersHomeAndOpensTheCourseCatalogFromGlobalNavigation', async () => {
    const user = userEvent.setup();
    render(<App />);

    expect(await screen.findByRole('heading', { name: '今天，想从哪里出发？' })).toBeInTheDocument();
    await waitFor(() => expect(document.title).toBe('今天，想从哪里出发？ | 星岛学园'));
    expect(screen.getByRole('contentinfo', { name: '版权与许可' })).toHaveTextContent('© 2026 naodeng All Rights Reserved.');
    expect(screen.getByRole('link', { name: 'naodeng 的个人网站' })).toHaveAttribute('href', 'https://inaodeng.com');
    await user.click(screen.getByRole('button', { name: '打开导航菜单' }));
    await user.click(screen.getByRole('button', { name: '课程' }));
    expect(await screen.findByRole('group', { name: '选择学习年级和学期' })).toBeInTheDocument();
    await user.click(await screen.findByRole('button', { name: '设置' }));

    expect(window.location.pathname).toBe('/settings');
    expect(await screen.findByRole('heading', { name: '设置', level: 1 })).toBeInTheDocument();
    expect(await screen.findByRole('heading', { name: '显示主题' })).toBeInTheDocument();
  });

  it('opensTheLazyChallengeCenterAndCrossSubjectPilotGroups', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(await screen.findByRole('button', { name: '进入闯关中心' }));
    expect(await screen.findByRole('heading', { name: '闯关中心' }, { timeout: 5000 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '选择一条挑战航线' })).toBeInTheDocument();
    const soundsBeforeChallengeNavigation = playedSources.length;

    const unitChallengeCard = screen.getByRole('heading', { name: '二年级上册数学 · 第二单元' }).closest('.challenge-group-card');
    expect(unitChallengeCard).not.toBeNull();
    await user.click(within(unitChallengeCard as HTMLElement).getByRole('button', { name: '查看挑战任务' }));
    expect(await screen.findByRole('heading', { name: '选择一个任务开始' }, { timeout: 5000 })).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /开始挑战/ })).toHaveLength(5);
    expect(window.location.pathname).toBe('/challenges/group/grade-2-term-1-math-unit-02');
    expect(playedSources).toHaveLength(soundsBeforeChallengeNavigation);

    await user.click(screen.getByRole('button', { name: '返回闯关中心' }));
    const englishChallengeCard = screen.getByRole('heading', { name: '三年级上册英语 · 第一单元' }).closest('.challenge-group-card');
    expect(englishChallengeCard).not.toBeNull();
    await user.click(within(englishChallengeCard as HTMLElement).getByRole('button', { name: '查看挑战任务' }));
    expect(await screen.findByRole('heading', { name: '选择一个任务开始' }, { timeout: 5000 })).toBeInTheDocument();
    expect(window.location.pathname).toBe('/challenges/group/grade-3-term-1-english-unit-01');
    expect(playedSources).toHaveLength(soundsBeforeChallengeNavigation);
  });

  it('appliesTheChosenLearningStartFromTheDedicatedSettingsPage', async () => {
    const user = userEvent.setup();
    window.history.replaceState({}, '', '/courses');
    render(<App />);

    await user.click(await screen.findByRole('button', { name: '设置' }));
    await user.click(screen.getByRole('combobox', { name: '学期' }));
    await user.click(await screen.findByRole('option', { name: '下学期' }));
    await user.click(screen.getByRole('button', { name: '应用学习起点' }));
    await user.click(screen.getByRole('button', { name: '确认并应用学习起点' }));

    expect(screen.getByRole('heading', { name: '设置', level: 1 })).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: '学期' })).toHaveTextContent('下学期');
    expect(window.localStorage.getItem('china-study-progress-v1')).toContain('"term":2');
  });

  it('opens backup management from settings without entering the challenge center', async () => {
    const user = userEvent.setup();
    window.history.replaceState({}, '', '/settings');
    render(<App />);

    await user.click(await screen.findByRole('button', { name: '打开备份与恢复' }));

    expect(window.location.pathname).toBe('/settings/backup');
    expect(await screen.findByRole('heading', { name: '备份与恢复暂时无法打开' })).toBeInTheDocument();
    expect(screen.getByText(/现有闯关记录没有被更改/)).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: '闯关中心' })).not.toBeInTheDocument();
  });

  it('returnsFromASessionThroughHistoryAndMovesFocusToEachRouteHeading', async () => {
    const user = userEvent.setup();
    window.history.replaceState({}, '', '/courses');
    render(<App />);
    const pushState = vi.spyOn(window.history, 'pushState');
    const historyBack = vi.spyOn(window.history, 'back').mockImplementation(() => {});

    await user.click((await screen.findAllByRole('button', { name: /进入单元/ }))[0]);
    await screen.findAllByRole('button', { name: /查看任务/ });
    await waitFor(() => expect(screen.getByRole('heading', { level: 1 })).toHaveFocus());
    expect(screen.getByRole('heading', { level: 1 })).toHaveFocus();
    expect(document.title).toBe(`${screen.getByRole('heading', { level: 1 }).textContent} | 星岛学园`);

    await user.click(screen.getAllByRole('button', { name: /查看任务/ })[0]);
    await waitFor(() => expect(document.querySelector('.session-card')).not.toBeNull());
    await waitFor(() => expect(screen.getByRole('heading', { level: 1 })).toHaveFocus());
    expect(screen.getByRole('heading', { level: 1 })).toHaveFocus();
    const firstSessionCard = document.querySelector('.session-card') as HTMLElement;
    await user.click(within(firstSessionCard).getByRole('button', { name: /开始第 1 场/ }));
    await screen.findByRole('button', { name: /提交答案|检查配对|检查顺序|检查分类|检查测量/ });
    await waitFor(() => expect(screen.getByRole('heading', { level: 1 })).toHaveFocus());
    expect(screen.getByRole('heading', { level: 1 })).toHaveFocus();

    const navigationPushCount = pushState.mock.calls.length;
    await user.click(screen.getByRole('button', { name: /返回单元/ }));

    expect(historyBack).toHaveBeenCalledOnce();
    expect(pushState).toHaveBeenCalledTimes(navigationPushCount);
  });

  it('persistsTheSoundSwitchAndKeepsItselfSilentWhenSoundIsDisabled', async () => {
    const user = userEvent.setup();
    window.history.replaceState({}, '', '/courses');
    const view = render(<App />);
    await user.click(await screen.findByRole('button', { name: '设置' }));
    expect(window.location.pathname).toBe('/settings');
    expect(playedSources).toEqual(['/audio/interaction-click.mp3']);

    const soundSwitch = screen.getByRole('switch', { name: '语音提示与交互音效' });
    expect(soundSwitch).toBeChecked();
    await user.click(soundSwitch);
    expect(soundSwitch).not.toBeChecked();
    expect(window.localStorage.getItem('china-study-sound-enabled-v1')).toBe('false');
    expect(playedSources).toHaveLength(1);

    view.unmount();
    render(<App />);
    expect(await screen.findByRole('heading', { name: '设置', level: 1 })).toBeInTheDocument();
    expect(screen.getByRole('switch', { name: '语音提示与交互音效' })).not.toBeChecked();
    expect(playedSources).toHaveLength(1);
  });

  it('playsInteractionCueWhenANumberAnswerInputIsClicked', async () => {
    const user = userEvent.setup();
    window.history.replaceState({}, '', '/grade-2/term-1/math/unit-02/basic/task-01/session-01');
    render(<App />);

    await user.click(await screen.findByRole('spinbutton', { name: '输入计算结果' }));

    expect(playedSources).toEqual(['/audio/interaction-click.mp3']);
  });

  it('updatesTheCurrentPageWhenBrowserHistoryChanges', async () => {
    render(<App />);

    act(() => {
      window.history.pushState({}, '', '/grade-2/term-1/chinese/unit-01');
      window.dispatchEvent(new PopStateEvent('popstate'));
    });

    expect(await screen.findByRole('heading', { name: '第一单元 · 大自然的秘密' })).toHaveFocus();
    expect(screen.getByText(/本课程依据 TapXWorld 固定快照/)).toBeInTheDocument();
  });
});
