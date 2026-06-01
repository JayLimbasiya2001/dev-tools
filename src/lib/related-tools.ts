import type { ToolMeta } from '@/data/tools/types';

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
