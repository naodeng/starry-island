import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import LoadingState from './LoadingState';

describe('LoadingState', () => {
  it('shows a semantic heading and a clear description', () => {
    render(<LoadingState title="正在打开错题本…" description="正在读取本机保存的记录。" headingLevel={1} />);

    expect(screen.getByRole('status')).toHaveTextContent('正在打开错题本…');
    expect(screen.getByRole('heading', { level: 1, name: '正在打开错题本…' })).toBeInTheDocument();
    expect(screen.getByText('正在读取本机保存的记录。')).toBeInTheDocument();
  });

  it('keeps the animated decoration hidden from assistive technology', () => {
    const { container } = render(<LoadingState title="正在读取" description="马上就好。" headingLevel={2} />);

    expect(container.querySelector('.loading-state-visual')).toHaveAttribute('aria-hidden', 'true');
    expect(container.querySelector('.loading-state-dots')).toHaveAttribute('aria-hidden', 'true');
    expect(screen.getByRole('heading', { level: 2, name: '正在读取' })).toBeInTheDocument();
  });
});
