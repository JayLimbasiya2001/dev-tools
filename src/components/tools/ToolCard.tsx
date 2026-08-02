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
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.02, 0.2), duration: 0.15 }}
      className="surface-card surface-card-hover p-5 group flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="badge badge-neutral">
            {cat?.icon} {cat?.name}
          </span>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleFavorite(tool.slug);
            }}
            className={cn(
              'p-1 rounded transition-colors text-xs cursor-pointer',
              fav ? 'text-amber-400' : 'text-muted hover:text-foreground',
            )}
            aria-label={fav ? 'Remove bookmark' : 'Bookmark tool'}
          >
            {fav ? '★' : '☆'}
          </button>
        </div>

        <Link to={`/tools/${tool.slug}`} className="block group/link">
          <h3 className="font-display font-semibold text-base text-foreground group-hover/link:text-accent transition-colors flex items-center justify-between">
            <span>{tool.name}</span>
            <span className="text-xs text-accent opacity-0 group-hover/link:opacity-100 transition-opacity font-mono">
              →
            </span>
          </h3>
          <p className="text-xs sm:text-sm text-muted mt-1.5 line-clamp-2 leading-relaxed font-normal">
            {tool.shortDescription}
          </p>
        </Link>
      </div>

      <div className="flex items-center justify-between gap-2 mt-4 pt-3 border-t border-border/60 text-[11px] font-mono text-muted">
        <div className="flex flex-wrap gap-1">
          {tool.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-[10px] text-muted/80">
              #{tag}
            </span>
          ))}
        </div>
        {tool.trending && (
          <span className="badge badge-accent text-[10px]">
            Popular
          </span>
        )}
      </div>
    </motion.article>
  );
}
