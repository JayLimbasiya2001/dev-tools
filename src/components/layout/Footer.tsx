import { Link } from 'react-router-dom';
import { BRAND } from '@/config/brand';
import { CATEGORIES } from '@/data/categories';
import { TOOLS } from '@/data/tools/registry';
import { BLOG_POSTS } from '@/data/blog/posts';

const POPULAR_TOOLS = TOOLS.filter((t) => t.trending || ['json-formatter', 'jwt-decoder', 'hash-generator', 'uuid-generator', 'sql-formatter', 'regex-tester'].includes(t.slug)).slice(0, 7);
const LATEST_BLOGS = BLOG_POSTS.slice(0, 4);

export function Footer() {
  return (
    <footer className="border-t border-border mt-20 bg-background text-foreground/90">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
        {/* BRAND COL */}
        <div className="lg:col-span-1 space-y-3">
          <Link to="/" aria-label="Velomint home">
            <img
              src="/logo.svg"
              alt={BRAND.name}
              className="h-7 w-auto dark:invert-0 light:invert mb-2"
              width={120}
              height={28}
              loading="lazy"
            />
          </Link>
          <p className="text-xs text-muted leading-relaxed">
            Fast, secure and browser-based developer utilities trusted by engineers worldwide for formatting, encoding, debugging and automation.
          </p>
          <div className="pt-2 text-[11px] font-mono text-muted space-y-1">
            <p>● 100% Client-Side Processing</p>
            <p>● Zero Server Log Policy</p>
            <p>● WCAG AA Accessible</p>
          </div>
          <p className="text-xs text-muted/60 pt-4">
            © {new Date().getFullYear()} {BRAND.name}. Built for developers.
          </p>
        </div>

        {/* CATEGORIES COL */}
        <div>
          <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-muted mb-4">
            Categories
          </h3>
          <ul className="space-y-2 text-xs">
            {CATEGORIES.map((c) => (
              <li key={c.id}>
                <Link to={`/categories/${c.id}`} className="text-muted hover:text-foreground transition-colors flex items-center gap-1.5">
                  <span>{c.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* POPULAR TOOLS COL */}
        <div>
          <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-muted mb-4">
            Popular Tools
          </h3>
          <ul className="space-y-2 text-xs">
            {POPULAR_TOOLS.map((t) => (
              <li key={t.slug}>
                <Link to={`/tools/${t.slug}`} className="text-muted hover:text-foreground transition-colors">
                  {t.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* GUIDES COL */}
        <div>
          <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-muted mb-4">
            Documentation
          </h3>
          <ul className="space-y-2 text-xs">
            {LATEST_BLOGS.map((b) => (
              <li key={b.slug}>
                <Link to={`/blog/${b.slug}`} className="text-muted hover:text-foreground transition-colors line-clamp-1">
                  {b.title}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/blog" className="text-xs font-mono text-accent hover:underline inline-block mt-2">
                All developer guides →
              </Link>
            </li>
          </ul>
        </div>

        {/* LEGAL COL */}
        <div>
          <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-muted mb-4">
            Product & Legal
          </h3>
          <ul className="space-y-2 text-xs">
            <li>
              <Link to="/about" className="text-muted hover:text-foreground transition-colors">
                About Velomint
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-muted hover:text-foreground transition-colors">
                Contact & Support
              </Link>
            </li>
            <li>
              <Link to="/changelog" className="text-muted hover:text-foreground transition-colors">
                Changelog
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="text-muted hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="text-muted hover:text-foreground transition-colors">
                Terms of Service
              </Link>
            </li>
            <li>
              <a
                href={BRAND.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-foreground transition-colors inline-flex items-center gap-1"
              >
                <span>GitHub Repository</span>
                <span className="text-[10px]">↗</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
