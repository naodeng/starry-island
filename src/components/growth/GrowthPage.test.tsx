import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ChallengeGrowthSummary } from '../../challenges/domain/growth';
import { loadChallengeGrowthSummary } from '../../challenges/domain/growthSummaryReader';
import { curriculum } from '../../content/curriculum';
import type { ProgressState } from '../../storage/progress';
import GrowthPage from './GrowthPage';

vi.mock('../../challenges/domain/growthSummaryReader', () => ({ loadChallengeGrowthSummary: vi.fn() }));

const challengeSummary: ChallengeGrowthSummary = {
  completedAttempts: 17,
  passedTaskCount: 6,
  earnedBadgeCount: 2,
  groups: [
    { groupId: 'unit-02', kind: 'unit', grade: 2, semester: 1, subject: 'math', sourceUnitIds: ['grade-2/term-1/math/unit-02'], taskCount: 5, passedTaskCount: 3, badgeEarned: false },
  ],
};

const emptyProgress: ProgressState = {
  schemaVersion: 4,
  completedSessionIds: [],
  recentCompletions: [],
  learningStart: null,
};

const unitSessions = curriculum.units['grade-2/term-1/chinese/unit-01']!.difficultyTracks.basic.tasks
  .flatMap(({ sessions }) => sessions);

beforeEach(() => {
  vi.mocked(loadChallengeGrowthSummary).mockReset();
  vi.mocked(loadChallengeGrowthSummary).mockResolvedValue(challengeSummary);
});

describe('GrowthPage', () => {
  it('showsTheUnifiedGrowthTitleAndThreeViewSwitches', () => {
    render(<GrowthPage progress={emptyProgress} initialView="overview" onNavigate={vi.fn()} />);

    expect(screen.getByRole('heading', { name: '成长中心', level: 1 })).toBeInTheDocument();
    expect(screen.getByRole('tablist', { name: '成长视图' })).toBeInTheDocument();
    expect(screen.getAllByRole('tab').map((tab) => tab.textContent)).toEqual(['成长概览', '学习星图', '闯关成长']);
    expect(screen.getByRole('tab', { name: '成长概览' })).toHaveAttribute('aria-selected', 'true');
  });

  it('showsLearningAndChallengeMetricsSeparatelyWithoutATotalScore', async () => {
    const completedSessionIds = unitSessions.map(({ id }) => id);
    render(<GrowthPage progress={{ ...emptyProgress, completedSessionIds }} initialView="overview" onNavigate={vi.fn()} />);

    const learningSummary = screen.getByRole('region', { name: '课程学习成长摘要' });
    const challengeSummary = screen.getByRole('region', { name: '闯关成长摘要' });
    expect(learningSummary).toHaveTextContent('月球开拓者');
    expect(learningSummary).toHaveTextContent('1 座知识岛');
    expect(await within(challengeSummary).findByText('17 次挑战')).toBeInTheDocument();
    expect(challengeSummary).toHaveTextContent('6 个任务');
    expect(challengeSummary).toHaveTextContent('2 枚徽章');
    expect(screen.queryByText(/总分|综合进度|合计/)).not.toBeInTheDocument();
  });

  it('showsSeparateEmptySummariesBeforeAnyProgress', async () => {
    const onNavigate = vi.fn();
    vi.mocked(loadChallengeGrowthSummary).mockResolvedValueOnce({
      completedAttempts: 0,
      passedTaskCount: 0,
      earnedBadgeCount: 0,
      groups: [],
    });
    render(<GrowthPage progress={emptyProgress} initialView="overview" onNavigate={onNavigate} />);

    expect(screen.getByRole('heading', { name: '还没有课程进度' })).toBeInTheDocument();
    const learningSummary = screen.getByRole('region', { name: '课程学习成长摘要' });
    expect(learningSummary).toHaveTextContent('已点亮 0 座知识岛');
    expect(await screen.findByRole('heading', { name: '还没有闯关成果' })).toBeInTheDocument();
    const challengeSummary = screen.getByRole('region', { name: '闯关成长摘要' });
    expect(challengeSummary).toHaveTextContent('0 次挑战');
    expect(challengeSummary).toHaveTextContent('0 个任务');
    expect(challengeSummary).toHaveTextContent('0 枚徽章');
    expect(screen.getByRole('button', { name: '查看学习星图' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '查看闯关课程' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: '查看闯关课程' }));
    expect(onNavigate).toHaveBeenCalledWith('/challenges');
    fireEvent.click(screen.getByRole('button', { name: '查看学习星图' }));
    expect(screen.getByRole('tab', { name: '学习星图' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('heading', { name: '每完成一点，星岛就亮一点' })).toBeInTheDocument();
  });

  it('showsAnEmptyRecentGrowthState', () => {
    render(<GrowthPage progress={emptyProgress} initialView="overview" onNavigate={vi.fn()} />);

    const recent = screen.getByRole('region', { name: '最近课程学习' });
    expect(within(recent).getByRole('heading', { name: '暂时没有课程学习记录' })).toBeInTheDocument();
    expect(within(recent).getByText('完成一场课程学习后，完成时间和课程链接会显示在这里。')).toBeInTheDocument();
  });

  it('keepsChallengeReadErrorsDistinctFromNoRecords', async () => {
    vi.mocked(loadChallengeGrowthSummary).mockRejectedValueOnce(new Error('IndexedDB unavailable'));
    render(<GrowthPage progress={emptyProgress} initialView="overview" onNavigate={vi.fn()} />);

    expect(await screen.findByRole('alert')).toHaveTextContent('闯关成长数据暂时无法读取');
    expect(screen.queryByRole('heading', { name: '还没有闯关成果' })).not.toBeInTheDocument();
  });

  it('showsOnlyTimestampedCourseCompletionEventsWithRegisteredLinks', async () => {
    const progress: ProgressState = {
      ...emptyProgress,
      recentCompletions: [
        { sessionId: unitSessions[1]!.id, completedAt: '2026-10-24T12:00:00.000Z' },
        { sessionId: 'removed-course/session-01', completedAt: '2026-10-23T12:00:00.000Z' },
        { sessionId: unitSessions[0]!.id, completedAt: '2026-10-22T12:00:00.000Z' },
      ],
    };
    render(<GrowthPage progress={progress} initialView="overview" onNavigate={vi.fn()} />);

    const activities = screen.getByRole('region', { name: '最近课程学习' });
    const links = await within(activities).findAllByRole('link');
    expect(links).toHaveLength(2);
    expect(links.map((link) => link.getAttribute('href'))).toEqual([
      expect.stringMatching(/^\/grade-\d+\/term-[12]\/chinese\/[^/]+\/basic\/[^/]+\/[^/]+$/),
      expect.stringMatching(/^\/grade-\d+\/term-[12]\/chinese\/[^/]+\/basic\/[^/]+\/[^/]+$/),
    ]);
    expect(within(activities).getAllByRole('time')).toHaveLength(2);
    expect(screen.queryByRole('region', { name: '最近闯关活动' })).not.toBeInTheDocument();
  });

  it('opensTheLearningStarMapForItsLegacyInitialView', () => {
    render(<GrowthPage progress={emptyProgress} initialView="learning" onNavigate={vi.fn()} />);

    expect(screen.getByRole('tab', { name: '学习星图' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('heading', { name: '每完成一点，星岛就亮一点' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '成长中心', level: 1 })).toBeInTheDocument();
  });

  it('opensChallengeGrowthForItsLegacyInitialView', async () => {
    render(<GrowthPage progress={emptyProgress} initialView="challenge" onNavigate={vi.fn()} />);

    expect(screen.getByRole('tab', { name: '闯关成长' })).toHaveAttribute('aria-selected', 'true');
    await screen.findByRole('heading', { name: '各路线进度' });
    expect(screen.getByText('17 次')).toBeInTheDocument();
  });

  it('keepsLearningGrowthAvailableWhenChallengeStorageFails', async () => {
    vi.mocked(loadChallengeGrowthSummary).mockRejectedValueOnce(new Error('IndexedDB unavailable'));
    const user = userEvent.setup();
    render(<GrowthPage progress={emptyProgress} initialView="overview" onNavigate={vi.fn()} />);

    await waitFor(() => expect(screen.getByRole('alert')).toHaveTextContent('闯关成长数据暂时无法读取'));
    fireEvent.click(screen.getByRole('button', { name: '重新读取闯关进度' }));
    expect(await screen.findByText('17 次挑战')).toBeInTheDocument();
    await user.click(screen.getByRole('tab', { name: '学习星图' }));
    expect(screen.getByRole('heading', { name: '每完成一点，星岛就亮一点' })).toBeInTheDocument();
  }, 30_000);

  it('changesViewsWithKeyboardArrowKeysAndVisibleFocus', async () => {
    const user = userEvent.setup();
    render(<GrowthPage progress={emptyProgress} initialView="overview" onNavigate={vi.fn()} />);
    const overview = screen.getByRole('tab', { name: '成长概览' });
    overview.focus();

    await user.keyboard('{ArrowRight}');

    expect(screen.getByRole('tab', { name: '学习星图' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tab', { name: '学习星图' })).toHaveFocus();
    expect(screen.getByRole('tab', { name: '学习星图' })).toHaveAttribute('tabindex', '0');
  });
});
