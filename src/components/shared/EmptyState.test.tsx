import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import EmptyState from './EmptyState';

describe('EmptyState', () => {
  it('renders an empty state with its heading and description', () => {
    const { rerender } = render(<EmptyState title="还没有学习记录" description="完成一场学习后，这里会显示最近记录。" headingLevel={3} />);

    expect(screen.getByRole('heading', { level: 3, name: '还没有学习记录' })).toBeInTheDocument();
    expect(screen.getByText('完成一场学习后，这里会显示最近记录。')).toBeInTheDocument();
    rerender(<EmptyState title="还没有课程" description="换一个年级或学期试试看。" headingLevel={2} />);
    expect(screen.getByRole('heading', { level: 2, name: '还没有课程' })).toBeInTheDocument();
  });

  it('omits the action when none is provided', () => {
    render(<EmptyState title="还没有学习记录" description="完成一场学习后，这里会显示最近记录。" headingLevel={3} />);

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('renders a labelled action and invokes it by keyboard', async () => {
    const user = userEvent.setup();
    const onAction = vi.fn();
    render(
      <EmptyState
        title="还没有学习记录"
        description="完成一场学习后，这里会显示最近记录。"
        headingLevel={3}
        action={{ label: '浏览课程', onAction }}
      />,
    );

    const action = screen.getByRole('button', { name: '浏览课程' });
    await user.tab();
    expect(action).toHaveFocus();
    await user.keyboard('{Enter}');
    expect(onAction).toHaveBeenCalledOnce();
  });

  it('hides a decorative icon from assistive technology', () => {
    render(
      <EmptyState
        title="还没有学习记录"
        description="完成一场学习后，这里会显示最近记录。"
        headingLevel={3}
        icon={<span data-testid="decorative-icon" />}
      />,
    );

    expect(screen.getByTestId('decorative-icon').closest('[aria-hidden="true"]')).not.toBeNull();
  });
});
