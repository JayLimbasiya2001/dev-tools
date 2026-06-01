import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { TOOLS, searchTools } from '@/data/tools/registry';
import { CATEGORIES } from '@/data/categories';

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const results = useMemo(() => (query ? searchTools(query) : TOOLS.slice(0, 12)), [query]);

  useEffect(() => {
    if (!open) setQuery('');
  }, [open]);

  const go = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-midnight/70 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            initial={{ opacity: 0, scale: 0.96, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -20 }}
            className="fixed left-1/2 top-[15%] z-50 w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 glass rounded-2xl shadow-2xl glow-mint overflow-hidden"
          >
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search tools, categories…"
              className="w-full bg-transparent px-5 py-4 text-foreground placeholder:text-muted border-b border-border focus:outline-none"
            />
            <ul className="max-h-80 overflow-auto py-2" role="listbox">
              {results.map((tool) => (
                <li key={tool.slug}>
                  <button
                    type="button"
                    role="option"
                    className="w-full text-left px-5 py-3 hover:bg-mint/10 flex items-center gap-3"
                    onClick={() => go(`/tools/${tool.slug}`)}
                  >
                    <span className="text-mint text-xs font-mono">{tool.category}</span>
                    <span className="font-medium">{tool.name}</span>
                  </button>
                </li>
              ))}
              {!query && (
                <>
                  <li className="px-5 py-2 text-xs text-muted uppercase tracking-wider">Categories</li>
                  {CATEGORIES.map((c) => (
                    <li key={c.id}>
                      <button
                        type="button"
                        className="w-full text-left px-5 py-2 hover:bg-violet/10 text-sm"
                        onClick={() => go(`/categories/${c.id}`)}
                      >
                        {c.icon} {c.name}
                      </button>
                    </li>
                  ))}
                </>
              )}
            </ul>
            <footer className="px-5 py-2 border-t border-border text-[10px] text-muted flex gap-4">
              <span><kbd className="kbd">↵</kbd> open</span>
              <span><kbd className="kbd">esc</kbd> close</span>
              <span><kbd className="kbd">mod</kbd>+<kbd className="kbd">k</kbd> toggle</span>
            </footer>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export function useCommandPalette() {
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
