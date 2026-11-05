import { beforeEach, describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getCompletedUnitCount, getCosmicRank } from '../../achievements/progress';
import { getExplorationZones } from '../../achievements/exploration';
import { saveCourseTrack } from '../../storage/courseTrack';
import AchievementDashboard from './AchievementDashboard';

describe('AchievementDashboard', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('showsTheLearnersRankAndSelectedTermOverviewWithDetailsCollapsed', () => {
    const completedSessionIds: string[] = [];
    const learningStart = null;
    const rank = getCosmicRank(getCompletedUnitCount(completedSessionIds, learningStart));
    const zones = getExplorationZones(completedSessionIds, learningStart);
    const visibleZones = zones.filter((zone) => zone.gradeId === 'grade-1' && zone.termId === 'term-1');

    render(<AchievementDashboard completedSessionIds={completedSessionIds} learningStart={learningStart} />);

    expect(screen.getByLabelText(`${rank.title}，当前头衔`)).toBeInTheDocument();
    expect(screen.getByLabelText('当前赛道：一年级 · 上学期')).toBeInTheDocument();
    expect(screen.queryByRole('tab', { name: '一年级' })).not.toBeInTheDocument();
    expect(screen.queryByRole('tab', { name: '上学期' })).not.toBeInTheDocument();
    expect(screen.getByLabelText(`${visibleZones.length} 个星区`)).toBeInTheDocument();
    expect(screen.getAllByText(/第\d+星区/)).toHaveLength(visibleZones.length);
    expect(screen.getByRole('progressbar', { name: /距离月球开拓者的进度/ })).toHaveAttribute('aria-valuenow', '0');
    expect(screen.getAllByRole('button', { name: /查看第\d+星区的单元进度/ })[0]).toHaveAttribute('aria-expanded', 'false');
  });

  it('readsTheSavedTrackAndOpensAndClosesVisibleDetails', async () => {
    const user = userEvent.setup();
    const completedSessionIds: string[] = [];
    const learningStart = null;
    saveCourseTrack({ gradeId: 'grade-2', termId: 'term-1' });
    const zones = getExplorationZones(completedSessionIds, learningStart);
    const visibleZones = zones.filter((zone) => zone.gradeId === 'grade-2' && zone.termId === 'term-1');
    render(<AchievementDashboard completedSessionIds={[]} learningStart={null} />);

    expect(screen.getByLabelText('当前赛道：二年级 · 上学期')).toBeInTheDocument();
    expect(screen.queryByRole('tab', { name: '二年级' })).not.toBeInTheDocument();
    expect(screen.getByLabelText(`${visibleZones.length} 个星区`)).toBeInTheDocument();
    expect(screen.getAllByText(/第\d+星区/)).toHaveLength(visibleZones.length);

    const zoneToggle = screen.getAllByRole('button', { name: /查看第\d+星区的单元进度/ })[0]!;
    const zoneDetails = document.getElementById(zoneToggle.getAttribute('aria-controls')!);
    expect(zoneDetails).not.toBeVisible();
    await user.click(zoneToggle);
    expect(zoneToggle).toHaveAttribute('aria-expanded', 'true');
    expect(zoneDetails).toBeVisible();
    await user.click(zoneToggle);
    expect(zoneToggle).toHaveAttribute('aria-expanded', 'false');
    expect(zoneDetails).not.toBeVisible();

    const courseToggle = screen.getByRole('button', { name: '查看二年级上学期语文进度' });
    const courseDetails = document.getElementById(courseToggle.getAttribute('aria-controls')!);
    expect(courseDetails).not.toBeVisible();
    await user.click(courseToggle);
    expect(courseToggle).toHaveAttribute('aria-expanded', 'true');
    expect(courseDetails).toBeVisible();
    expect(courseDetails).toHaveTextContent('待探索');
    await user.click(courseToggle);
    expect(courseToggle).toHaveAttribute('aria-expanded', 'false');
    expect(courseDetails).not.toBeVisible();
  });
});
