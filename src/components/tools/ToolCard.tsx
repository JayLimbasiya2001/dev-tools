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
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03 }}
      className="glass rounded-2xl p-5 group hover:border-mint/30 transition relative"
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <span className="text-xs font-mono text-violet/80">{cat?.icon} {cat?.name}</span>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            toggleFavorite(tool.slug);
          }}
          className={cn('text-lg transition', fav ? 'text-amber' : 'text-muted hover:text-amber')}
          aria-label={fav ? 'Remove bookmark' : 'Bookmark tool'}
        >
          {fav ? '★' : '☆'}
        </button>
      </div>
      <Link to={`/tools/${tool.slug}`} className="block">
        <h3 className="font-display font-semibold text-lg group-hover:text-mint transition">{tool.name}</h3>
        <p className="text-sm text-muted mt-1 line-clamp-2">{tool.shortDescription}</p>
        <div className="flex flex-wrap gap-1.5 mt-3">
          {tool.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-violet/10 text-violet">
              {tag}
            </span>
          ))}
        </div>
      </Link>
    </motion.article>
  );
}
