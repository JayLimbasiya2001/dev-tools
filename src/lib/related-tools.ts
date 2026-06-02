import type { ToolMeta } from '@/data/tools/types';
import { getClusterLinks } from '@/data/tools/internal-links';

export function getRelatedTools(
  current: ToolMeta,
  all: ToolMeta[],
  limit = 6,
): ToolMeta[] {
  const scored = all
    .filter((t) => t.slug !== current.slug)
    .map((t) => {
      let score = 0;
      if (t.category === current.category) score += 3;
      const sharedTags = t.tags.filter((tag) => current.tags.includes(tag));
      score += sharedTags.length * 2;
      const sharedKw = t.keywords.filter((k) => current.keywords.includes(k));
      score += sharedKw.length;
      return { tool: t, score };
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map((s) => s.tool);
}

/** Related tools engine: curated clusters first, then semantic scoring. */
export function getRelatedToolsForToolPage(
  current: ToolMeta,
  all: ToolMeta[],
  limit = 10,
): ToolMeta[] {
  const bySlug = new Map(all.map((t) => [t.slug, t]));

  const curated = getClusterLinks(current.slug)
    .map((slug) => bySlug.get(slug))
    .filter(Boolean) as ToolMeta[];

  const scored = getRelatedTools(current, all, 50);
  const combined = [...curated, ...scored]
    .filter((t) => t.slug !== current.slug);

  const dedup = new Map(combined.map((t) => [t.slug, t]));
  return [...dedup.values()].slice(0, limit);
}
