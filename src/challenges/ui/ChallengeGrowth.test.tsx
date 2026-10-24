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
  it('announces loading state as an embeddable section', () => {
    const { container } = render(<ChallengeGrowth summary={summary} status="loading" onRetry={vi.fn()} />);

    expect(screen.getByRole('status')).toHaveTextContent('正在读取成长记录');
    expect(container.querySelector('.challenge-growth-view')).toHaveAttribute('aria-busy', 'true');
    expect(screen.queryByRole('main')).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { level: 1 })).not.toBeInTheDocument();
  });

  it('keeps local records intact and offers a retry when storage is unavailable', () => {
    const onRetry = vi.fn();
    render(<ChallengeGrowth summary={summary} status="error" onRetry={onRetry} />);

    expect(screen.getByRole('heading', { name: '成长记录暂时无法打开' })).toBeInTheDocument();
    expect(screen.getByText(/闯关记录没有被更改/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: '重新读取闯关进度' }));
    expect(onRetry).toHaveBeenCalledOnce();
  });

  it('shows local progress totals and registered route progress without owning a page heading', () => {
    render(<ChallengeGrowth summary={summary} status="ready" onRetry={vi.fn()} />);

    expect(screen.getByRole('heading', { name: '闯关成长记录', level: 2 })).toBeInTheDocument();
    expect(screen.getByText('8 次')).toBeInTheDocument();
    expect(screen.getByText('3 个任务')).toBeInTheDocument();
    expect(screen.getByText('0 枚徽章')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '二年级上册 · 数学 · 第2单元' }).closest('li')).toHaveTextContent('3/5 个任务已通过');
    expect(screen.getByRole('heading', { name: '二年级上册 · 数学 · 前半学期' }).closest('li')).toHaveTextContent('0/5 个任务已通过');
    expect(screen.getByText(/只统计此设备保存的数据/)).toBeInTheDocument();
    expect(screen.queryByRole('main')).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { level: 1 })).not.toBeInTheDocument();
  });

  it('shows an encouraging empty state after a successful read', () => {
    render(<ChallengeGrowth summary={{ completedAttempts: 0, passedTaskCount: 0, earnedBadgeCount: 0, groups: [] }} status="ready" onRetry={vi.fn()} />);

    expect(screen.getByRole('status')).toHaveTextContent('完成一场挑战后，成长记录会出现在这里。');
  });
});
