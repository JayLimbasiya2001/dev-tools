import { Link, NavLink } from 'react-router-dom';
import { useThemeStore } from '@/stores/themeStore';
import { NAV_LINKS } from '@/config/site';
import { BRAND } from '@/config/brand';
import { cn } from '@/lib/utils';

interface HeaderProps {
  onOpenCommand: () => void;
}

export function Header({ onOpenCommand }: HeaderProps) {
  const { resolved, toggle } = useThemeStore();

  return (
    <header className="sticky top-0 z-40 backdrop-blur-2xl bg-midnight/80 border-b border-border/80 shadow-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0 group" aria-label="Velomint home">
          <img src="/logo.svg" alt={BRAND.name} className="h-8 w-auto transition-transform group-hover:scale-105" width={130} height={32} />
        </Link>

        {/* NAVIGATION LINKS */}
        <nav className="hidden md:flex items-center gap-1 bg-card/60 p-1.5 rounded-2xl border border-border/60" aria-label="Main Navigation">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              className={({ isActive }: { isActive: boolean }) =>
                cn(
                  'px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200',
                  isActive
                    ? 'text-mint bg-mint/10 border border-mint/20 shadow-sm'
                    : 'text-muted hover:text-foreground hover:bg-card/80',
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* SEARCH & ACTIONS */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onOpenCommand}
            className="flex items-center gap-3 rounded-xl border border-border/80 bg-card/70 px-3.5 py-2 text-xs text-muted hover:border-mint/50 hover:text-foreground transition-all cursor-pointer shadow-sm group"
          >
            <span className="flex items-center gap-1.5">
              <span className="text-mint text-xs">🔍</span>
              <span className="hidden sm:inline">Search 200+ tools…</span>
              <span className="sm:hidden">Search</span>
            </span>
            <kbd className="kbd group-hover:border-mint/30">⌘K</kbd>
          </button>

          <button
            type="button"
            onClick={toggle}
            className="btn-ghost p-2.5 rounded-xl border border-border/60 hover:border-mint/30"
            aria-label={resolved === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            <span className="text-sm">{resolved === 'dark' ? '☀️' : '🌙'}</span>
          </button>

          <Link to="/tools" className="btn-primary text-xs hidden sm:inline-flex py-2 px-4">
            🚀 All Tools
          </Link>
        </div>
      </div>
    </header>
  );
}
