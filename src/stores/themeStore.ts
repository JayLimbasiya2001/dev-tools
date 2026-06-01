import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'dark' | 'light' | 'system';

interface ThemeState {
  theme: Theme;
  resolved: 'dark' | 'light';
  setTheme: (theme: Theme) => void;
  toggle: () => void;
}

function resolveTheme(theme: Theme): 'dark' | 'light' {
  if (theme === 'system') {
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }
  return theme;
}

function applyTheme(resolved: 'dark' | 'light') {
  document.documentElement.classList.toggle('light', resolved === 'light');
  document.documentElement.style.colorScheme = resolved;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: 'dark',
      resolved: 'dark',
      setTheme: (theme) => {
        const resolved = resolveTheme(theme);
        applyTheme(resolved);
        set({ theme, resolved });
      },
      toggle: () => {
        const next = get().resolved === 'dark' ? 'light' : 'dark';
        applyTheme(next);
        set({ theme: next, resolved: next });
      },
    }),
    {
      name: 'velomint-theme',
      onRehydrateStorage: () => (state) => {
        if (state) applyTheme(state.resolved);
      },
    },
  ),
);

export function initTheme() {
  const { theme, setTheme } = useThemeStore.getState();
  setTheme(theme);
}
