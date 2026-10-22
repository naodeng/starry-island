import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import ChallengeCenter from './ChallengeCenter';

describe('ChallengeCenter', () => {
  it('links to the local challenge growth record', () => {
    const onNavigate = vi.fn();
    render(<ChallengeCenter groups={[]} progressByTaskId={{}} progressAvailable onNavigate={onNavigate} />);

    fireEvent.click(screen.getByRole('button', { name: '查看成长记录' }));
    expect(onNavigate).toHaveBeenCalledWith('/challenges/growth');
  });
});
