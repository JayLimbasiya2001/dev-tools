import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { ToolMeta } from '@/data/tools/types';
import { useToolStore } from '@/stores/toolStore';
import { getCategory } from '@/data/categories';
import { cn } from '@/lib/utils';

interface ToolCardProps {
  tool: ToolMeta;
  index?: number;
}

export function ToolCard({ tool, index = 0 }: ToolCardProps) {
  const { isFavorite, toggleFavorite } = useToolStore();
  const cat = getCategory(tool.category);
  const fav = isFavorite(tool.slug);

  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.03, 0.3), duration: 0.25 }}
      className="glass glass-hover rounded-2xl p-5 group relative flex flex-col justify-between overflow-hidden border border-border/80"
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-mint/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-violet/10 text-violet border border-violet/20">
            {cat?.icon} {cat?.name}
          </span>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleFavorite(tool.slug);
            }}
            className={cn('p-1.5 rounded-lg transition-transform active:scale-90', fav ? 'text-amber text-sm' : 'text-muted/60 hover:text-amber hover:bg-card text-xs')}
            aria-label={fav ? 'Remove bookmark' : 'Bookmark tool'}
          >
            {fav ? '★' : '☆'}
          </button>
        </div>

        <Link to={`/tools/${tool.slug}`} className="block group/link">
          <h3 className="font-display font-bold text-base sm:text-lg text-foreground group-hover/link:text-mint transition-colors flex items-center justify-between">
            <span>{tool.name}</span>
            <span className="text-xs text-mint opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all font-mono">
              →
            </span>
          </h3>
          <p className="text-xs sm:text-sm text-muted mt-1.5 line-clamp-2 leading-relaxed">
            {tool.shortDescription}
          </p>
        </Link>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 mt-4 pt-3 border-t border-border/40">
        <div className="flex flex-wrap gap-1">
          {tool.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-midnight/60 text-muted border border-border/50">
              #{tag}
            </span>
          ))}
        </div>
        {tool.trending && (
          <span className="text-[10px] font-mono text-mint bg-mint/10 px-2 py-0.5 rounded border border-mint/20">
            Popular
          </span>
        )}
      </div>
    </motion.article>
  );
}
