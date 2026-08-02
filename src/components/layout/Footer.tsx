import { Link } from 'react-router-dom';
import { BRAND } from '@/config/brand';
import { CATEGORIES } from '@/data/categories';
import { TOOLS } from '@/data/tools/registry';
import { BLOG_POSTS } from '@/data/blog/posts';

const POPULAR_TOOLS = TOOLS.filter((t) => t.trending || ['json-formatter', 'jwt-decoder', 'hash-generator', 'uuid-generator', 'sql-formatter', 'regex-tester'].includes(t.slug)).slice(0, 8);
const LATEST_BLOGS = BLOG_POSTS.slice(0, 4);

export function Footer() {
  return (
    <footer className="border-t border-border mt-20 bg-midnight/40 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
        {/* BRAND & E-E-A-T COL */}
        <div className="lg:col-span-1 space-y-4">
          <Link to="/" aria-label="Velomint home">
            <img src="/logo.svg" alt={BRAND.name} className="h-8 mb-3" width={120} height={32} loading="lazy" />
          </Link>
          <p className="text-xs sm:text-sm text-muted leading-relaxed">
            Velomint is the premier developer portal for browser-based code tools, converters, generators, and privacy-first utilities.
          </p>
          <div className="space-y-1.5 pt-2 text-[11px] font-mono text-mint">
            <p className="flex items-center gap-1.5"><span>🔒</span> 100% Browser Execution</p>
            <p className="flex items-center gap-1.5"><span>⚡</span> Zero Server Data Uploads</p>
            <p className="flex items-center gap-1.5"><span>✨</span> Updated Daily for 2026</p>
          </div>
          <p className="text-xs text-muted/60 pt-4">
            © {new Date().getFullYear()} {BRAND.name}. Built for developers.
          </p>
        </div>

        {/* CATEGORIES COL */}
        <div>
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-violet mb-4">
            Tool Categories
          </h3>
          <ul className="space-y-2 text-xs sm:text-sm">
            {CATEGORIES.map((c) => (
              <li key={c.id}>
                <Link to={`/categories/${c.id}`} className="text-muted hover:text-mint transition flex items-center gap-1.5">
                  <span>{c.icon}</span>
                  <span>{c.name} Tools</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* POPULAR TOOLS COL */}
        <div>
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-mint mb-4">
            Popular Tools
          </h3>
          <ul className="space-y-2 text-xs sm:text-sm">
            {POPULAR_TOOLS.map((t) => (
              <li key={t.slug}>
                <Link to={`/tools/${t.slug}`} className="text-muted hover:text-mint transition">
                  {t.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* LATEST BLOGS COL */}
        <div>
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-violet mb-4">
            Latest Guides & Blogs
          </h3>
          <ul className="space-y-2 text-xs sm:text-sm">
            {LATEST_BLOGS.map((b) => (
              <li key={b.slug}>
                <Link to={`/blog/${b.slug}`} className="text-muted hover:text-mint transition line-clamp-1">
                  {b.title}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/blog" className="text-xs font-mono text-mint hover:underline inline-block mt-2">
                All developer blogs →
              </Link>
            </li>
          </ul>
        </div>

        {/* RESOURCES & LEGAL COL */}
        <div>
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-foreground mb-4">
            Resources & Legal
          </h3>
          <ul className="space-y-2 text-xs sm:text-sm">
            <li>
              <Link to="/about" className="text-muted hover:text-mint transition">
                About Velomint
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-muted hover:text-mint transition">
                Contact & Feedback
              </Link>
            </li>
            <li>
              <Link to="/changelog" className="text-muted hover:text-mint transition">
                Changelog & Updates
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="text-muted hover:text-mint transition">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="text-muted hover:text-mint transition">
                Terms of Service
              </Link>
            </li>
            <li>
              <a
                href={BRAND.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-mint transition flex items-center gap-1.5"
              >
                <span>GitHub Repository</span>
                <span>↗</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
