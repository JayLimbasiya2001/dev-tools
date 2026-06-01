import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ToolUsage {
  slug: string;
  count: number;
  lastUsed: number;
}

interface ToolState {
  favorites: string[];
  recent: string[];
  usage: Record<string, ToolUsage>;
  toggleFavorite: (slug: string) => void;
  recordUsage: (slug: string) => void;
  isFavorite: (slug: string) => boolean;
}

const MAX_RECENT = 12;

export const useToolStore = create<ToolState>()(
  persist(
    (set, get) => ({
      favorites: [],
      recent: [],
      usage: {},
      toggleFavorite: (slug) =>
        set((s) => ({
          favorites: s.favorites.includes(slug)
            ? s.favorites.filter((f) => f !== slug)
            : [...s.favorites, slug],
        })),
      recordUsage: (slug) =>
        set((s) => {
          const recent = [slug, ...s.recent.filter((r) => r !== slug)].slice(0, MAX_RECENT);
          const prev = s.usage[slug];
          const usage = {
            ...s.usage,
            [slug]: {
              slug,
              count: (prev?.count ?? 0) + 1,
              lastUsed: Date.now(),
            },
          };
          return { recent, usage };
        }),
      isFavorite: (slug) => get().favorites.includes(slug),
    }),
    { name: 'velomint-tools' },
  ),
);

export function getTrendingSlugs(limit = 8): string[] {
  const usage = useToolStore.getState().usage;
  return Object.values(usage)
    .sort((a, b) => (b as ToolUsage).count - (a as ToolUsage).count)
    .slice(0, limit)
    .map((u) => (u as ToolUsage).slug);
}
