import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import KnowledgeCardsPage from './KnowledgeCardsPage';

describe('KnowledgeCardsPage', () => {
  beforeEach(() => localStorage.clear());

  it('defaultsToGradeTwoTermOneChineseAndShowsItsKnowledgeCards', () => {
    render(<KnowledgeCardsPage track={{ gradeId: 'grade-2', termId: 'term-1' }} onNavigate={vi.fn()} />);

    expect(screen.getByRole('heading', { name: '知识卡片' })).toBeInTheDocument();
    expect(screen.getByLabelText('当前学习赛道')).toHaveTextContent('二年级 · 上学期');
    expect(screen.queryByLabelText('学期')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: '语文' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('heading', { name: '《小蝌蚪找妈妈》：成长顺序与观察线索' })).toBeInTheDocument();
    expect(screen.getByText('观察生物的变化，可以按先后记录外形和动作；判断要依据看见的线索。')).toBeVisible();
    expect(screen.getByText('豆苗先长出嫩芽，后来长出两片叶子。哪一步先发生？')).toBeVisible();
    expect(screen.getAllByRole('article')).toHaveLength(1);
  });

  it('supportsStepByStepReviewAndSwitchingToAllCards', async () => {
    const user = userEvent.setup();
    render(<KnowledgeCardsPage track={{ gradeId: 'grade-2', termId: 'term-1' }} onNavigate={vi.fn()} />);

    expect(screen.getByRole('button', { name: '逐张复习' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('progressbar', { name: '知识卡片复习进度' })).toHaveAttribute('aria-valuenow', '1');
    expect(screen.getAllByRole('article')).toHaveLength(1);

    await user.click(screen.getByRole('button', { name: '下一张' }));
    expect(screen.getByRole('heading', { name: '《我是什么》：水的自然现象' })).toBeInTheDocument();
    expect(screen.getByRole('progressbar', { name: '知识卡片复习进度' })).toHaveAttribute('aria-valuenow', '2');

    await user.click(screen.getByRole('button', { name: '全部浏览' }));
    expect(screen.getByRole('button', { name: '全部浏览' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getAllByRole('article')).toHaveLength(4);

    await user.click(screen.getByRole('button', { name: '逐张复习' }));
    expect(screen.getByRole('heading', { name: '《我是什么》：水的自然现象' })).toBeInTheDocument();
  });

  it('filtersWithinTheSelectedTrackAndShowsTheEnglishOfferingNote', async () => {
    const user = userEvent.setup();
    render(<KnowledgeCardsPage track={{ gradeId: 'grade-2', termId: 'term-2' }} onNavigate={vi.fn()} />);

    expect(screen.getByLabelText('当前学习赛道')).toHaveTextContent('二年级 · 下学期');
    expect(screen.queryByLabelText('学期')).not.toBeInTheDocument();
    expect(screen.getByLabelText('课程条目')).toHaveValue('unit-01');

    await user.click(screen.getByRole('button', { name: '数学' }));
    expect(screen.getByRole('heading', { name: '调查、记录并整理数据' })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: '英语' }));
    expect(screen.getByText('英语是否为学校本学期开设课程，请以学校安排为准。')).toBeVisible();
  });

  it('revealsTheAnswerAndOpensTheSelectedCourse', async () => {
    const user = userEvent.setup();
    const onNavigate = vi.fn();
    render(<KnowledgeCardsPage track={{ gradeId: 'grade-2', termId: 'term-1' }} onNavigate={onNavigate} />);

    const details = screen.getAllByText('查看答案和思路')[0]!;
    expect(details.closest('details')).not.toHaveAttribute('open');
    await user.click(details);
    expect(screen.getByText('长出嫩芽。')).toBeVisible();
    expect(screen.getByText('先后顺序是嫩芽出现，再长出叶子。')).toBeVisible();

    await user.click(screen.getByRole('button', { name: '进入本单元课程' }));
    expect(onNavigate).toHaveBeenCalledWith('/grade-2/term-1/chinese/unit-01');
  });

  it('initializesFromADirectUnitRoute', () => {
    render(<KnowledgeCardsPage unitKey="grade-2/term-2/math/unit-03" onNavigate={vi.fn()} />);

    expect(screen.getByLabelText('当前学习赛道')).toHaveTextContent('二年级 · 下学期');
    expect(screen.getByRole('button', { name: '数学' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByLabelText('课程条目')).toHaveValue('unit-03');
    expect(screen.getByRole('heading', { name: '认识轴对称图形和对称轴' })).toBeInTheDocument();
  });

  it('restoresTheDeepLinkedSelectionWhenBrowserHistoryReturnsToThatRoute', async () => {
    const user = userEvent.setup();
    const onNavigate = vi.fn();
    const unitKey = 'grade-2/term-1/math/unit-01';
    const track = { gradeId: 'grade-2', termId: 'term-1' } as const;
    const view = render(<KnowledgeCardsPage track={track} unitKey={unitKey} onNavigate={onNavigate} />);

    await user.click(screen.getByRole('button', { name: '英语' }));
    expect(onNavigate).toHaveBeenCalledWith('/knowledge');
    view.rerender(<KnowledgeCardsPage track={track} onNavigate={onNavigate} />);
    expect(screen.getByRole('button', { name: '英语' })).toHaveAttribute('aria-pressed', 'true');

    view.rerender(<KnowledgeCardsPage track={track} unitKey={unitKey} onNavigate={onNavigate} />);

    expect(screen.getByLabelText('当前学习赛道')).toHaveTextContent('二年级 · 上学期');
    expect(screen.getByRole('button', { name: '数学' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByLabelText('课程条目')).toHaveValue('unit-01');
    expect(screen.getByRole('heading', { name: '按物品特征选择分类标准' })).toBeInTheDocument();
  });
});
