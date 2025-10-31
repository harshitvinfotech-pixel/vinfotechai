import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  resetToSystem: () => void;             // optional helper to remove manual override
  isFollowingSystem: boolean;            // true when no manual preference exists
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Safe initializer for SSR: don't access window/localStorage unless available
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'light';
    const saved = localStorage.getItem('theme') as Theme | null;
    if (saved) return saved;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  // Track whether user explicitly chose a theme (persisted in localStorage)
  const [hasUserPreference, setHasUserPreference] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return !!localStorage.getItem('theme');
  });

  // Apply theme class to <html> whenever theme changes (no localStorage write here)
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  // On mount: listen to system changes, but only change theme if user has NOT set a manual preference.
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const mq = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (event: MediaQueryListEvent | MediaQueryList) => {
      const matches = 'matches' in event ? event.matches : mq.matches;
      // Only auto-change when no manual preference is present
      if (!hasUserPreference) {
        setTheme(matches ? 'dark' : 'light');
      }
    };

    // Modern browsers: addEventListener('change'), fallback to addListener for older browsers
    if (typeof mq.addEventListener === 'function') {
      mq.addEventListener('change', handleChange as EventListener);
    } else {
      // addListener exists on older implementations
      // @ts-ignore - legacy signature
      mq.addListener(handleChange);
    }

    return () => {
      if (typeof mq.removeEventListener === 'function') {
        mq.removeEventListener('change', handleChange as EventListener);
      } else {
        // @ts-ignore - legacy signature
        mq.removeListener(handleChange);
      }
    };
  }, [hasUserPreference]);

  // Toggle triggered by user -> save preference and stop following system
  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    setHasUserPreference(true);
    try {
      localStorage.setItem('theme', next);
    } catch {
      // ignore storage errors (e.g. private mode)
    }
  };

  // Remove manual preference and resume following system
  const resetToSystem = () => {
    try {
      localStorage.removeItem('theme');
    } catch {
      /* ignore */
    }
    setHasUserPreference(false);
    if (typeof window !== 'undefined' && window.matchMedia) {
      const systemIsDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(systemIsDark ? 'dark' : 'light');
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        resetToSystem,
        isFollowingSystem: !hasUserPreference,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}