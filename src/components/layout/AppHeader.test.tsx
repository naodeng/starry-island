import { afterEach, describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AppHeader from './AppHeader';

afterEach(() => window.history.replaceState({}, '', '/'));

describe('AppHeader', () => {
  it('opensNavigationWithFocusAndRestoresFocusAfterEscape', async () => {
    const user = userEvent.setup();
    render(<AppHeader onNavigate={vi.fn()} />);
    const menuButton = screen.getByRole('button', { name: '打开导航菜单' });

    expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    await user.click(menuButton);

    expect(menuButton).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('dialog', { name: '全局导航' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '首页' })).toHaveFocus();

    await user.keyboard('{Escape}');

    expect(screen.queryByRole('dialog', { name: '全局导航' })).not.toBeInTheDocument();
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    expect(menuButton).toHaveFocus();
  });

  it('navigatesToTheCourseCatalogAndClosesWithoutTakingFocusFromTheRoute', async () => {
    const user = userEvent.setup();
    const onNavigate = vi.fn();
    render(<AppHeader onNavigate={onNavigate} />);

    await user.click(screen.getByRole('button', { name: '打开导航菜单' }));
    await user.click(screen.getByRole('button', { name: '课程' }));

    expect(onNavigate).toHaveBeenCalledWith('/courses');
    expect(screen.queryByRole('dialog', { name: '全局导航' })).not.toBeInTheDocument();
  });

  it('usesTheBrandLinkForTheHomeRoute', async () => {
    const user = userEvent.setup();
    const onNavigate = vi.fn();
    render(<AppHeader onNavigate={onNavigate} />);

    await user.click(screen.getByRole('link', { name: '星岛学园首页' }));

    expect(onNavigate).toHaveBeenCalledWith('/');
  });

  it('marksTheCurrentPageAndClosesWhenBrowserHistoryChanges', async () => {
    const user = userEvent.setup();
    window.history.replaceState({}, '', '/courses');
    render(<AppHeader onNavigate={vi.fn()} />);
    await user.click(screen.getByRole('button', { name: '打开导航菜单' }));

    expect(screen.getByRole('button', { name: '课程' })).toHaveAttribute('aria-current', 'page');
    window.dispatchEvent(new PopStateEvent('popstate'));

    await waitFor(() => expect(screen.queryByRole('dialog', { name: '全局导航' })).not.toBeInTheDocument());
  });
});
