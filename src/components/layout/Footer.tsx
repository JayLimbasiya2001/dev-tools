import { Link } from 'react-router-dom';
import { FOOTER_LINKS } from '@/config/site';
import { BRAND } from '@/config/brand';
import { TOOLS } from '@/data/tools/registry';

const POPULAR_TOOLS = TOOLS.filter((t) => t.trending).slice(0, 8);

export function Footer() {
  return (
    <footer className="border-t border-border mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-1">
          <img src="/logo.svg" alt={BRAND.name} className="h-8 mb-4" width={120} height={32} loading="lazy" />
          <p className="text-sm text-muted max-w-xs">{BRAND.tagline}</p>
          <p className="text-xs text-muted/60 mt-4">
            © {new Date().getFullYear()} {BRAND.name}
          </p>
        </div>
        {Object.entries(FOOTER_LINKS).map(([section, links]) => (
          <div key={section}>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">{section}</h3>
            <ul className="space-y-2">
              {links.map((l) => (
                <li key={l.href}>
                  <Link to={l.href} className="text-sm text-muted hover:text-mint transition">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">Popular Tools</h3>
          <ul className="space-y-2">
            {POPULAR_TOOLS.map((t) => (
              <li key={t.slug}>
                <Link to={`/tools/${t.slug}`} className="text-sm text-muted hover:text-mint transition">
                  {t.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
