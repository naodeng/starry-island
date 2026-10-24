import { useEffect, useRef, useState } from 'react';
import type { MouseEvent } from 'react';
import { Button } from 'animal-island-ui';
import { MenuIcon } from 'naive-icons';
import AppNavigationDrawer from './AppNavigationDrawer';

interface AppHeaderProps {
  onNavigate: (path: string) => void;
}

export default function AppHeader({ onNavigate }: AppHeaderProps) {
  const [navigationOpen, setNavigationOpen] = useState(false);
  const restoreFocusOnClose = useRef(false);
  const previouslyOpen = useRef(false);
  const currentPath = window.location.pathname.replace(/\/+$/, '') || '/';

  useEffect(() => {
    if (!navigationOpen && previouslyOpen.current && restoreFocusOnClose.current) {
      document.getElementById('app-navigation-trigger')?.focus();
      restoreFocusOnClose.current = false;
    }
    previouslyOpen.current = navigationOpen;
  }, [navigationOpen]);

  useEffect(() => {
    function closeForHistoryNavigation() {
      restoreFocusOnClose.current = false;
      setNavigationOpen(false);
    }
    window.addEventListener('popstate', closeForHistoryNavigation);
    return () => window.removeEventListener('popstate', closeForHistoryNavigation);
  }, []);

  function closeNavigation(restoreFocus: boolean) {
    restoreFocusOnClose.current = restoreFocus;
    setNavigationOpen(false);
  }

  function handleBrandClick(event: MouseEvent<HTMLAnchorElement>) {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    onNavigate('/');
  }

  return (
    <>
      <header className="app-global-header">
        <div className="app-global-header-inner">
          <a className="app-brand-link" href="/" aria-label="星岛学园首页" onClick={handleBrandClick}>
            <img src="/assets/brand/starry-island-logo-512.png" alt="" width="42" height="42" />
            <span>星岛学园</span>
          </a>
          <Button
            id="app-navigation-trigger"
            className="app-navigation-trigger"
            type="default"
            aria-label={navigationOpen ? '关闭导航菜单' : '打开导航菜单'}
            aria-expanded={navigationOpen}
            aria-haspopup="dialog"
            aria-controls="app-navigation-drawer"
            icon={<MenuIcon size={20} aria-hidden="true" />}
            onClick={() => navigationOpen ? closeNavigation(true) : setNavigationOpen(true)}
          >
            菜单
          </Button>
        </div>
      </header>
      <AppNavigationDrawer
        open={navigationOpen}
        currentPath={currentPath}
        onClose={closeNavigation}
        onNavigate={onNavigate}
      />
    </>
  );
}
