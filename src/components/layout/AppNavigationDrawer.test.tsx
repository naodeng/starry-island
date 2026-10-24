import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import AppNavigationDrawer from './AppNavigationDrawer';

describe('AppNavigationDrawer', () => {
  it('closesOnBackdropAndRequestsFocusRestoration', () => {
    const onClose = vi.fn();
    const { container } = render(<AppNavigationDrawer open onClose={onClose} onNavigate={vi.fn()} />);
    const backdrop = container.querySelector('.app-navigation-backdrop');

    expect(backdrop).not.toBeNull();
    fireEvent.click(backdrop!);

    expect(onClose).toHaveBeenCalledWith(true);
  });

  it('closesAfterSelectingANavigationDestinationWithoutRequestingFocusRestoration', () => {
    const onClose = vi.fn();
    const onNavigate = vi.fn();
    render(<AppNavigationDrawer open onClose={onClose} onNavigate={onNavigate} />);

    fireEvent.click(screen.getByRole('button', { name: '闯关' }));

    expect(onNavigate).toHaveBeenCalledWith('/challenges');
    expect(onClose).toHaveBeenCalledWith(false);
  });
});
