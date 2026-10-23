import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import type { ChallengeGrowthSummary } from '../domain/growth';
import ChallengeGrowth from './ChallengeGrowth';

const summary: ChallengeGrowthSummary = {
  completedAttempts: 8,
  passedTaskCount: 3,
  earnedBadgeCount: 0,
  groups: [
    { groupId: 'unit-02', kind: 'unit', grade: 2, semester: 1, subject: 'math', sourceUnitIds: ['grade-2/term-1/math/unit-02'], taskCount: 5, passedTaskCount: 3, badgeEarned: false },
    { groupId: 'first-half', kind: 'semester', grade: 2, semester: 1, subject: 'math', sourceUnitIds: ['grade-2/term-1/math/unit-01'], stage: 'first-half', taskCount: 5, passedTaskCount: 0, badgeEarned: false },
  ],
};

describe('ChallengeGrowth', () => {
  it('announces while local growth data is loading', () => {
    render(<ChallengeGrowth summary={summary} status="loading" onNavigate={vi.fn()} />);

    expect(screen.getByRole('main')).toHaveAttribute('aria-busy', 'true');
    expect(screen.getByRole('heading', { name: '正在读取成长记录…' })).toBeInTheDocument();
  });

  it('keeps records intact and offers a return path when local growth data cannot be read', () => {
    const onNavigate = vi.fn();
    render(<ChallengeGrowth summary={summary} status="error" onNavigate={onNavigate} />);

    expect(screen.getByRole('heading', { name: '成长记录暂时无法打开' })).toBeInTheDocument();
    expect(screen.getByText(/闯关记录没有被更改/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: '返回闯关中心' }));
    expect(onNavigate).toHaveBeenCalledWith('/challenges');
  });

  it('shows local progress totals and the progress of each registered group', () => {
    render(<ChallengeGrowth summary={summary} status="ready" onNavigate={vi.fn()} />);

    expect(screen.getByRole('heading', { name: '闯关成长记录' })).toBeInTheDocument();
    expect(screen.getByText('8 次')).toBeInTheDocument();
    expect(screen.getByText('3 个任务')).toBeInTheDocument();
    expect(screen.getByText('0 枚徽章')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '二年级上册 · 数学 · 第2单元' }).closest('li')).toHaveTextContent('3/5 个任务已通过');
    expect(screen.getByRole('heading', { name: '二年级上册 · 数学 · 前半学期' }).closest('li')).toHaveTextContent('0/5 个任务已通过');
    expect(screen.getByText(/只统计此设备保存的数据/)).toBeInTheDocument();
  });

  it('shows an encouraging empty state and returns to the challenge center', () => {
    const onNavigate = vi.fn();
    render(<ChallengeGrowth summary={{ completedAttempts: 0, passedTaskCount: 0, earnedBadgeCount: 0, groups: [] }} status="ready" onNavigate={onNavigate} />);

    expect(screen.getByRole('status')).toHaveTextContent('完成一场挑战后，成长记录会出现在这里。');
    fireEvent.click(screen.getByRole('button', { name: '返回闯关中心' }));
    expect(onNavigate).toHaveBeenCalledWith('/challenges');
  });
});
