'use client';

import * as React from 'react';

export type Theme = 'dark' | 'light';

const STORAGE_KEY = 'kahf-theme';

/**
 * Runs before hydration to set data-theme, preventing a flash of the wrong
 * theme. Kept in sync with resolveTheme() below: an explicit stored choice
 * wins, otherwise fall back to the OS preference.
 */
export const themeInitScript = `(function(){try{var t=localStorage.getItem('${STORAGE_KEY}');if(t!=='dark'&&t!=='light'){t=matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';}document.documentElement.dataset.theme=t;}catch(e){document.documentElement.dataset.theme='dark';}})();`;

/**
 * The active theme lives on <html data-theme>, written by the init script above
 * before React hydrates. That attribute — not React state — is the source of
 * truth, so it is modelled as an external store. Reading it via
 * useSyncExternalStore lets the first client render match what the init script
 * already painted, with no setState-in-effect and no flash.
 */
const listeners = new Set<() => void>();

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  return () => listeners.delete(onChange);
}

function getSnapshot(): Theme {
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
}

/** The server cannot know the visitor's preference; the init script corrects it. */
function getServerSnapshot(): Theme {
  return 'dark';
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  // Keep browser chrome (mobile address bar) in step with the page. Must be a
  // literal colour — the meta tag cannot resolve a CSS variable.
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', theme === 'light' ? '#FBF7EF' : '#0F0F0D');
  listeners.forEach((l) => l());
}

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = React.createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // Follow the OS only while the visitor has made no explicit choice.
  React.useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: light)');
    const onChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem(STORAGE_KEY)) applyTheme(e.matches ? 'light' : 'dark');
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const toggleTheme = React.useCallback(() => {
    const next: Theme = getSnapshot() === 'dark' ? 'light' : 'dark';
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Private mode / storage disabled — the theme still applies for this session.
    }
    applyTheme(next);
  }, []);

  const value = React.useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = React.useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider');
  return ctx;
}
