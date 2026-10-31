import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ChallengeGrowthSummary } from '../../challenges/domain/growth';
import { loadChallengeGrowthSummary } from '../../challenges/domain/growthSummaryReader';
import type { ProgressState } from '../../storage/progress';
import { curriculum } from '../../content/curriculum';
import { curriculumManifest, getUnitManifest } from '../../content/curriculumManifest';
import { getKnownCurriculumPositions } from '../../achievements/position';
import { resolveAppRoute } from '../../app/router';
import { resolveLearningSessionDestination } from '../../app/continueLearning';
import { loadCourseSelection, saveCourseSelection } from '../../storage/courseSelection';
import HomeDashboard from './HomeDashboard';

vi.mock('../../challenges/domain/growthSummaryReader', () => ({ loadChallengeGrowthSummary: vi.fn() }));

const emptyChallengeSummary: ChallengeGrowthSummary = {
  completedAttempts: 8,
  passedTaskCount: 3,
  earnedBadgeCount: 1,
  groups: [],
};

const emptyProgress: ProgressState = {
  schemaVersion: 4,
  completedSessionIds: [],
  recentCompletions: [],
  learningStart: null,
};

beforeEach(() => {
  localStorage.clear();
  vi.mocked(loadChallengeGrowthSummary).mockReset();
  vi.mocked(loadChallengeGrowthSummary).mockResolvedValue(emptyChallengeSummary);
});

describe('HomeDashboard', () => {
  it('showsTheFourHomeSectionsInApprovedOrder', () => {
    render(<HomeDashboard progress={emptyProgress} onNavigate={vi.fn()} />);

    const sections = within(screen.getByRole('main')).getAllByRole('heading', { level: 2 }).map(({ textContent }) => textContent);
    expect(sections.slice(0, 4)).toEqual(['继续学习', '当前进度', '最近学习记录', '闯关入口']);
  });

  it('letsLearnersChooseAndPersistTheCurrentGradeAndTermWithoutChangingLearningProgress', async () => {
    saveCourseSelection({ gradeId: 'grade-2', termId: 'term-2', subjectId: 'math' });
    const user = userEvent.setup();
    render(<HomeDashboard progress={emptyProgress} onNavigate={vi.fn()} />);

    expect(screen.getByRole('combobox', { name: '当前年级' })).toHaveTextContent('二年级');
    expect(screen.getByRole('combobox', { name: '当前学期' })).toHaveTextContent('下学期');
    await user.click(screen.getByRole('combobox', { name: '当前年级' }));
    await user.click(await screen.findByRole('option', { name: '3年级' }));
    await user.click(screen.getByRole('combobox', { name: '当前学期' }));
    await user.click(await screen.findByRole('option', { name: '下学期' }));

    expect(loadCourseSelection()).toMatchObject({ gradeId: 'grade-3', termId: 'term-2' });
    expect(emptyProgress).toMatchObject({ completedSessionIds: [], learningStart: null });
  });

  it('showsRecentLearningEmptyStateWithTitleAndDescription', () => {
    render(<HomeDashboard progress={emptyProgress} onNavigate={vi.fn()} />);

    const recentSection = screen.getByRole('region', { name: '最近学习记录' });
    expect(within(recentSection).getByRole('heading', { level: 3, name: '还没有学习记录' })).toBeInTheDocument();
    expect(within(recentSection).getByText('完成一场学习后，最近记录会显示在这里。')).toBeInTheDocument();
  });

  it('showsContinueLearningForTheResolvedBasicSession', async () => {
    const onNavigate = vi.fn();
    render(<HomeDashboard progress={emptyProgress} onNavigate={onNavigate} />);

    const continueButton = await screen.findByRole('button', { name: '继续学习' });
    fireEvent.click(continueButton);

    expect(onNavigate).toHaveBeenCalledWith(expect.stringMatching(/^\/grade-\d+\/term-[12]\/(chinese|math|english)\/[^/]+\/basic\/[^/]+\/[^/]+$/));
  });

  it('showsCourseAndChallengeProgressSeparately', async () => {
    render(<HomeDashboard progress={emptyProgress} onNavigate={vi.fn()} />);

    expect(screen.getByText('课程学习')).toBeInTheDocument();
    expect(screen.getByText('闯关挑战')).toBeInTheDocument();
    expect(await screen.findByRole('list', { name: '闯关成长摘要' })).toHaveTextContent('已完成 8 次挑战');
    expect(screen.getByRole('list', { name: '闯关成长摘要' })).toHaveTextContent('通过 3 个任务');
    expect(screen.getByRole('list', { name: '闯关成长摘要' })).toHaveTextContent('点亮 1 枚徽章');
  });

  it('showsAChallengeEmptyStateWhenThereAreNoChallengeRecords', async () => {
    vi.mocked(loadChallengeGrowthSummary).mockResolvedValueOnce({
      completedAttempts: 0,
      passedTaskCount: 0,
      earnedBadgeCount: 0,
      groups: [],
    });
    render(<HomeDashboard progress={emptyProgress} onNavigate={vi.fn()} />);

    expect(await screen.findByRole('heading', { level: 4, name: '还没有闯关成果' })).toBeInTheDocument();
    expect(screen.getByText('完成并提交一次挑战后，成绩和徽章会显示在这里。')).toBeInTheDocument();
    expect(document.querySelector('.home-dashboard .empty-state')).not.toBeInTheDocument();
    expect(screen.queryByRole('list', { name: '闯关成长摘要' })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: '进入闯关中心' })).toBeInTheDocument();
  });

  it('showsTheRecentHistoryEmptyStateAsACompactSectionMessage', () => {
    render(<HomeDashboard progress={emptyProgress} onNavigate={vi.fn()} />);

    const recentSection = screen.getByRole('region', { name: '最近学习记录' });
    expect(within(recentSection).getByRole('heading', { level: 3, name: '还没有学习记录' })).toBeInTheDocument();
    expect(within(recentSection).getByText('完成一场学习后，最近记录会显示在这里。')).toBeInTheDocument();
    expect(within(recentSection).queryByRole('article')).not.toBeInTheDocument();
  });

  it('showsThreeLatestRealLearningEventsWithRegisteredCourseLinks', async () => {
    const unitKey = 'grade-2/term-1/chinese/unit-01';
    const sessions = curriculum.units[unitKey]!.difficultyTracks.basic.tasks.flatMap(({ sessions: taskSessions }) => taskSessions).slice(0, 3);
    expect(sessions).toHaveLength(3);
    const progress: ProgressState = {
      ...emptyProgress,
      recentCompletions: [
        { sessionId: sessions[2]!.id, completedAt: '2026-10-24T12:00:00.000Z' },
        { sessionId: sessions[2]!.id, completedAt: '2026-10-23T12:00:00.000Z' },
        { sessionId: sessions[1]!.id, completedAt: '2026-10-22T12:00:00.000Z' },
        { sessionId: sessions[0]!.id, completedAt: '2026-10-21T12:00:00.000Z' },
      ],
    };
    render(<HomeDashboard progress={progress} onNavigate={vi.fn()} />);

    const recentSection = screen.getByRole('region', { name: '最近学习记录' });
    const links = await within(recentSection).findAllByRole('link');
    expect(links).toHaveLength(3);
    const newestPath = (await resolveLearningSessionDestination(sessions[2]!.id))!.path;
    const previousPath = (await resolveLearningSessionDestination(sessions[1]!.id))!.path;
    expect(links.map((link) => link.getAttribute('href'))).toEqual([newestPath, newestPath, previousPath]);
    for (const link of links) {
      expect(link).toHaveAttribute('href', expect.stringMatching(/^\/grade-\d+\/term-[12]\/(chinese|math|english)\/[^/]+\/basic\/[^/]+\/[^/]+$/));
      expect((await resolveAppRoute(link.getAttribute('href')!)).kind).toBe('session');
    }
    expect(within(recentSection).queryByRole('link', { name: new RegExp(sessions[0]!.title) })).not.toBeInTheDocument();
  });

  it('offersCourseBrowseWhenBasicTrackIsComplete', async () => {
    const completedSessionIds = getKnownCurriculumPositions().flatMap((position) => (
      getUnitManifest(position.curriculumUnitKey!, curriculumManifest)!.sessionIds.basic
    ));
    const onNavigate = vi.fn();
    render(<HomeDashboard progress={{ ...emptyProgress, completedSessionIds }} onNavigate={onNavigate} />);

    fireEvent.click(await screen.findByRole('button', { name: '浏览课程' }));

    expect(onNavigate).toHaveBeenCalledWith('/courses');
  });

  it('keepsCourseEntryAvailableWhileChallengeSummaryLoads', async () => {
    vi.mocked(loadChallengeGrowthSummary).mockImplementationOnce(() => new Promise(() => {}));
    render(<HomeDashboard progress={emptyProgress} onNavigate={vi.fn()} />);

    expect(await screen.findByRole('button', { name: '继续学习' })).toBeInTheDocument();
    expect(screen.getByText('正在读取闯关进度…')).toBeInTheDocument();
  });

  it('keepsCourseEntryAvailableWhenChallengeStorageFails', async () => {
    vi.mocked(loadChallengeGrowthSummary).mockRejectedValueOnce(new Error('IndexedDB unavailable'));
    render(<HomeDashboard progress={emptyProgress} onNavigate={vi.fn()} />);

    expect(await screen.findByRole('button', { name: '继续学习' })).toBeInTheDocument();
    await waitFor(() => expect(screen.getByRole('alert')).toHaveTextContent('闯关进度暂时无法读取'));
  });
});
