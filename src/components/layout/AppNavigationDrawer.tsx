import { useEffect, useRef } from 'react';
import type { KeyboardEvent } from 'react';
import { Button } from 'animal-island-ui';
import { BookIcon, CloseIcon, CompassIcon, FlagIcon, HomeIcon, SettingsIcon, StarIcon } from 'naive-icons';

interface AppNavigationDrawerProps {
  open: boolean;
  currentPath?: string;
  onClose: (restoreFocus: boolean) => void;
  onNavigate: (path: string) => void;
}

const PRIMARY_DESTINATIONS = [
  { label: '首页', path: '/', Icon: HomeIcon },
  { label: '课程', path: '/courses', Icon: BookIcon },
  { label: '闯关', path: '/challenges', Icon: FlagIcon },
  { label: '成长', path: '/growth', Icon: StarIcon },
  { label: '错题', path: '/challenges/wrong-questions', Icon: CompassIcon },
] as const;

function isCurrentDestination(path: string, currentPath: string): boolean {
  if (path === '/') return currentPath === '/';
  if (path === '/challenges') return currentPath === path || currentPath.startsWith('/challenges/group/') || currentPath.startsWith('/challenges/task/');
  if (path === '/growth') return currentPath === path || currentPath === '/achievements' || currentPath === '/challenges/growth';
  if (path === '/settings') return currentPath === path || currentPath.startsWith('/settings/');
  return currentPath === path;
}

export default function AppNavigationDrawer({
  open,
  currentPath = typeof window === 'undefined' ? '/' : window.location.pathname.replace(/\/+$/, '') || '/',
  onClose,
  onNavigate,
}: AppNavigationDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) drawerRef.current?.querySelector<HTMLButtonElement>('[data-navigation-item="true"]')?.focus();
  }, [open]);

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Escape') {
      event.preventDefault();
      onClose(true);
      return;
    }
    if (event.key !== 'Tab') return;

    const focusable = [...(drawerRef.current?.querySelectorAll<HTMLButtonElement>('button:not(:disabled)') ?? [])];
    const first = focusable[0];
    const last = focusable.at(-1);
    if (!first || !last) return;
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  if (!open) return null;

  function navigate(path: string) {
    onClose(false);
    onNavigate(path);
  }

  return (
    <div className="app-navigation-layer">
      <div className="app-navigation-backdrop" aria-hidden="true" onClick={() => onClose(true)} />
      <div
        id="app-navigation-drawer"
        ref={drawerRef}
        className="app-navigation-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="全局导航"
        onKeyDown={handleKeyDown}
      >
        <div className="app-navigation-heading">
          <h2>导航</h2>
          <Button type="default" className="app-navigation-close" aria-label="关闭导航菜单" icon={<CloseIcon size={18} aria-hidden="true" />} onClick={() => onClose(true)}>
            关闭
          </Button>
        </div>
        <nav className="app-navigation-list" aria-label="主要页面">
          {PRIMARY_DESTINATIONS.map(({ label, path, Icon }) => (
            <Button
              key={path}
              type="text"
              className="app-navigation-item"
              data-navigation-item="true"
              aria-current={isCurrentDestination(path, currentPath) ? 'page' : undefined}
              icon={<Icon size={19} aria-hidden="true" />}
              onClick={() => navigate(path)}
            >
              {label}
            </Button>
          ))}
        </nav>
        <div className="app-navigation-settings">
          <Button
            type="text"
            className="app-navigation-item"
            aria-current={isCurrentDestination('/settings', currentPath) ? 'page' : undefined}
            icon={<SettingsIcon size={19} aria-hidden="true" />}
            onClick={() => navigate('/settings')}
          >
            设置
          </Button>
        </div>
      </div>
    </div>
  );
}
