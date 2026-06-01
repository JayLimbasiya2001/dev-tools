import { Link, NavLink } from 'react-router-dom';
import { useThemeStore } from '@/stores/themeStore';
import { NAV_LINKS } from '@/config/site';
import { cn } from '@/lib/utils';

interface HeaderProps {
  onOpenCommand: () => void;
}

export function Header({ onOpenCommand }: HeaderProps) {
  const { resolved, toggle } = useThemeStore();

  return (
    <header className="sticky top-0 z-30 glass border-b border-border">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2 shrink-0" aria-label="Velomint home">
          <img src="/logo.svg" alt="" className="h-9 w-auto dark:invert-0 light:invert" width={140} height={36} />
        </Link>

        <nav className="hidden md:flex items-center gap-1" aria-label="Main">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              className={({ isActive }: { isActive: boolean }) =>
                cn(
                  'px-3 py-2 rounded-lg text-sm font-medium transition',
                  isActive ? 'text-mint bg-mint/10' : 'text-muted hover:text-foreground',
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenCommand}
            className="hidden sm:flex items-center gap-2 rounded-xl border border-border px-3 py-1.5 text-xs text-muted hover:border-mint/30"
          >
            <span>Search tools</span>
            <kbd className="kbd">⌘K</kbd>
          </button>
          <button
            type="button"
            onClick={toggle}
            className="btn-ghost p-2"
            aria-label={resolved === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {resolved === 'dark' ? '☀' : '☾'}
          </button>
          <Link to="/tools" className="btn-primary text-xs hidden sm:inline-flex">
            Browse Tools
          </Link>
        </div>
      </div>
    </header>
  );
}
