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
    if (!query.trim()) return TOOLS.slice(0, 8);
    return searchTools(query).slice(0, 10);
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
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, results.length));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + results.length) % Math.max(1, results.length));
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
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs"
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            initial={{ opacity: 0, scale: 0.98, y: -16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -16 }}
            transition={{ duration: 0.15 }}
            className="fixed left-1/2 top-[15%] z-50 w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 bg-card border border-border rounded-xl shadow-2xl overflow-hidden"
          >
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border">
              <span className="text-muted text-sm">🔍</span>
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search tools, categories, commands…"
                className="w-full bg-transparent text-foreground placeholder:text-muted/60 text-sm focus:outline-none font-medium"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="text-xs text-muted hover:text-foreground font-mono px-2 py-0.5 rounded bg-dark-elevated"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="max-h-[340px] overflow-y-auto p-2 space-y-1">
              <p className="px-3 py-1 text-[10px] font-mono uppercase tracking-wider text-muted">
                {query ? `Matching Tools (${results.length})` : 'Popular Utilities'}
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
                      'w-full text-left px-3.5 py-2.5 rounded-lg flex items-center justify-between gap-3 transition-colors cursor-pointer',
                      isSelected
                        ? 'bg-dark-elevated text-foreground border border-neutral-700'
                        : 'hover:bg-dark-elevated/50 text-muted hover:text-foreground border border-transparent',
                    )}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-midnight text-muted border border-border shrink-0">
                        {tool.category}
                      </span>
                      <span className="text-xs font-medium truncate text-foreground">{tool.name}</span>
                    </div>
                    <span className={cn('text-xs font-mono transition-opacity shrink-0', isSelected ? 'text-accent opacity-100' : 'opacity-0')}>
                      Open →
                    </span>
                  </button>
                );
              })}

              {!query && (
                <div className="mt-3 pt-2 border-t border-border">
                  <p className="px-3 py-1 text-[10px] font-mono uppercase tracking-wider text-muted">
                    Categories
                  </p>
                  <div className="grid grid-cols-2 gap-1 px-1">
                    {CATEGORIES.map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        className="text-left px-3 py-1.5 rounded-md hover:bg-dark-elevated text-xs text-muted hover:text-foreground flex items-center gap-2 transition cursor-pointer"
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

            <footer className="px-4 py-2 border-t border-border bg-dark-elevated/40 text-[10px] font-mono text-muted flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span><kbd className="kbd">↑</kbd> <kbd className="kbd">↓</kbd> navigate</span>
                <span><kbd className="kbd">↵</kbd> select</span>
                <span><kbd className="kbd">esc</kbd> close</span>
              </div>
              <span className="text-muted/60">Velomint Command Menu</span>
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
