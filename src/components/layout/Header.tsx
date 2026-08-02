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
    <header className="sticky top-0 z-40 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0 group" aria-label="Velomint home">
          <img
            src="/logo.svg"
            alt={BRAND.name}
            className="h-7 w-auto dark:invert-0 light:invert transition-opacity hover:opacity-80"
            width={120}
            height={28}
          />
        </Link>

        {/* NAVIGATION LINKS */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Main Navigation">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              className={({ isActive }: { isActive: boolean }) =>
                cn(
                  'px-3 py-1.5 rounded-md text-xs font-medium transition-colors',
                  isActive
                    ? 'text-foreground bg-card border border-border'
                    : 'text-muted hover:text-foreground hover:bg-card/50',
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* SEARCH & ACTIONS */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenCommand}
            className="flex items-center gap-2.5 rounded-lg border border-border bg-card px-3 py-1.5 text-xs text-muted hover:border-neutral-500 hover:text-foreground transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-1.5">
              <span className="text-xs">🔍</span>
              <span className="hidden sm:inline">Search tools…</span>
            </span>
            <kbd className="kbd">⌘K</kbd>
          </button>

          <button
            type="button"
            onClick={toggle}
            className="btn-ghost p-1.5 text-xs rounded-lg border border-border"
            aria-label={resolved === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {resolved === 'dark' ? '☀️' : '🌙'}
          </button>

          <Link to="/tools" className="btn-primary text-xs py-1.5 px-3.5 hidden sm:inline-flex">
            Browse Tools
          </Link>
        </div>
      </div>
    </header>
  );
}
