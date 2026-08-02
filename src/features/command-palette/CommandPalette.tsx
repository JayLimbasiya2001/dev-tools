import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { TOOLS, searchTools } from '@/data/tools/registry';
import { CATEGORIES } from '@/data/categories';
import { cn } from '@/lib/utils';

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();

  const results = useMemo(() => {
    if (!query.trim()) return TOOLS.slice(0, 10);
    return searchTools(query).slice(0, 12);
  }, [query]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const go = (path: string) => {
    navigate(path);
    onClose();
    setQuery('');
  };

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % results.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + results.length) % results.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (results[selectedIndex]) {
          go(`/tools/${results[selectedIndex].slug}`);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, results, selectedIndex]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-midnight/80 backdrop-blur-md"
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            initial={{ opacity: 0, scale: 0.95, y: -24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -24 }}
            transition={{ duration: 0.2 }}
            className="fixed left-1/2 top-[12%] z-50 w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2 glass rounded-3xl shadow-2xl border border-border/80 glow-mint overflow-hidden bg-slate/95"
          >
            <div className="flex items-center gap-3 px-5 py-4 border-b border-border/80">
              <span className="text-mint text-lg">🔍</span>
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a tool name, format, or command (e.g. JSON, JWT, UUID)..."
                className="w-full bg-transparent text-foreground placeholder:text-muted/60 text-base focus:outline-none font-medium"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="text-xs text-muted hover:text-foreground font-mono px-2 py-1 rounded bg-card/60"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="max-h-[380px] overflow-y-auto p-2 space-y-1">
              <p className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-muted">
                {query ? `Matching Tools (${results.length})` : 'Popular Developer Utilities'}
              </p>

              {results.map((tool, idx) => {
                const isSelected = idx === selectedIndex;
                return (
                  <button
                    key={tool.slug}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => go(`/tools/${tool.slug}`)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={cn(
                      'w-full text-left px-4 py-3 rounded-2xl flex items-center justify-between gap-3 transition-colors cursor-pointer',
                      isSelected
                        ? 'bg-mint/15 border border-mint/30 text-foreground shadow-sm'
                        : 'hover:bg-card/60 text-foreground/90 border border-transparent',
                    )}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className={cn('text-xs font-mono px-2 py-0.5 rounded-full border shrink-0', isSelected ? 'bg-mint/20 text-mint border-mint/30' : 'bg-violet/10 text-violet border-violet/20')}>
                        {tool.category}
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold truncate text-foreground">{tool.name}</p>
                        <p className="text-xs text-muted truncate">{tool.shortDescription}</p>
                      </div>
                    </div>
                    <span className={cn('text-xs font-mono transition-transform shrink-0', isSelected ? 'text-mint translate-x-1' : 'text-muted/50')}>
                      Open →
                    </span>
                  </button>
                );
              })}

              {!query && (
                <div className="mt-4 pt-3 border-t border-border/60">
                  <p className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-violet">
                    Browse Categories
                  </p>
                  <div className="grid grid-cols-2 gap-1 px-1">
                    {CATEGORIES.map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        className="text-left px-3 py-2 rounded-xl hover:bg-card/80 text-xs text-muted hover:text-foreground flex items-center gap-2 transition"
                        onClick={() => go(`/categories/${c.id}`)}
                      >
                        <span>{c.icon}</span>
                        <span className="truncate">{c.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <footer className="px-5 py-3 border-t border-border/80 bg-midnight/50 text-[11px] font-mono text-muted flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span><kbd className="kbd">↑</kbd> <kbd className="kbd">↓</kbd> navigate</span>
                <span><kbd className="kbd">↵</kbd> select</span>
                <span><kbd className="kbd">esc</kbd> close</span>
              </div>
              <span className="text-mint font-semibold">Velomint Command Hub</span>
            </footer>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* eslint-disable react-refresh/only-export-components */
function useCommandPaletteInternal() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);
  return { open, setOpen, toggle: () => setOpen((o) => !o) };
}

export { useCommandPaletteInternal as useCommandPalette };
