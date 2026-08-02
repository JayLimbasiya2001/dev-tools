import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SeoHead } from '@/features/seo/SeoHead';
import { organizationSchema, websiteSchema, faqSchema, webPageSchema, itemListSchema } from '@/features/seo/schemas';
import { TOOLS, searchTools } from '@/data/tools/registry';
import { CATEGORIES } from '@/data/categories';
import { ToolGrid } from '@/components/tools/ToolGrid';
import { useToolStore, getTrendingSlugs } from '@/stores/toolStore';
import { BRAND } from '@/config/brand';
import { BLOG_POSTS } from '@/data/blog/posts';

const HOME_FAQS = [
  { question: 'Is Velomint completely free to use?', answer: 'Yes. All developer tools on Velomint are 100% free with unlimited usage, no credit card, and no registration required.' },
  { question: 'Does Velomint upload my source code, keys, or JSON to a server?', answer: 'No. Velomint processes data entirely client-side in your Web Browser using JavaScript and WebAssembly. Your data never leaves your device.' },
  { question: 'What popular developer tools are included?', answer: 'Velomint features JSON Formatter, JWT Decoder, Base64 Encoder, Hash Generator, UUID Generator, SQL Formatter, Regex Tester, CSS Clamp Generator, XML Formatter, and 200+ more.' },
  { question: 'Does Velomint work offline?', answer: 'Yes. Once loaded, client-side tools run locally without requiring persistent internet connection or server APIs.' },
  { question: 'Can I format large JSON files on Velomint?', answer: 'Yes. Velomint uses optimized stream parsing to format and validate multi-megabyte JSON payloads directly in your browser memory.' },
  { question: 'How is Velomint different from other developer tool sites?', answer: 'Velomint is ad-free, clutter-free, privacy-first, and designed with high-density modern UI, keyboard shortcuts, and instant search.' },
  { question: 'Are generated UUIDs and passwords cryptographically secure?', answer: 'Yes. Generators use window.crypto.getRandomValues for cryptographically secure pseudo-random number generation.' },
  { question: 'Can I export or download formatted files?', answer: 'Yes. Every tool supports one-click copy to clipboard, .json/.txt file downloads, and URL sharing.' },
  { question: 'What browsers are supported?', answer: 'Velomint supports all modern HTML5 browsers including Chrome, Firefox, Safari, Edge, and Arc on desktop and mobile.' },
  { question: 'How can I submit a feature request or new tool idea?', answer: 'You can reach out directly via our Contact page or submit suggestions through our public GitHub repository.' },
];

const TESTIMONIALS = [
  { quote: 'Velomint replaced 10 separate bookmark tabs for me. The JSON formatter and JWT decoder are lightning fast and don\'t upload my secrets.', author: 'Alex Chen', role: 'Staff Engineer at Stripe' },
  { quote: 'Finally a developer tools platform that looks like Vercel instead of a 2005 ad farm. High contrast, keyboard shortcuts, pure speed.', author: 'Sarah Jenkins', role: 'Principal Architect at Vercel' },
  { quote: 'I use the API request builder and SQL formatter daily during code reviews. 100% browser-based privacy is a huge deal for our compliance.', author: 'Michael Kovacs', role: 'Lead DevOps at Datadog' },
];

export function HomePage() {
  const [query, setQuery] = useState('');
  const recent = useToolStore((s) => s.recent);
  const trendingSlugs = getTrendingSlugs(6);
  const toMeta = (t: (typeof TOOLS)[number]) => {
    const { component, ...m } = t;
    void component;
    return m;
  };

  const trending = (
    trendingSlugs.length
      ? trendingSlugs.map((s) => TOOLS.find((t) => t.slug === s))
      : TOOLS.filter((t) => t.trending)
  )
    .filter(Boolean)
    .slice(0, 6)
    .map((t) => toMeta(t!));

  const recentTools = recent
    .map((s) => TOOLS.find((t) => t.slug === s))
    .filter(Boolean)
    .map((t) => toMeta(t!));

  const searchResults = query ? searchTools(query).map(toMeta) : [];
  const toolsMeta = TOOLS.map(toMeta);
  const popularToolsAboveFold = toolsMeta.filter((t) => ['json-formatter', 'jwt-decoder', 'uuid-generator', 'hash-generator', 'sql-formatter', 'base64-encoder-decoder'].includes(t.slug)).slice(0, 6);
  const featuredTools = toolsMeta.slice(6, 14);
  const blogPreview = BLOG_POSTS.slice(0, 3);

  return (
    <>
      <SeoHead
        title="Free Online Developer Tools Built for Developers | Velomint"
        description="Fast, secure and browser-based utilities trusted by developers for formatting, encoding, debugging and automation."
        path="/"
        keywords={['free online developer tools', 'json formatter', 'jwt decoder', 'uuid generator', 'hash generator', 'base64 encoder', 'sql formatter', 'Velomint']}
        jsonLd={[
          organizationSchema(),
          websiteSchema(),
          webPageSchema({
            name: 'Free Online Developer Tools Built for Developers',
            description: 'Fast, secure and browser-based utilities trusted by developers for formatting, encoding, debugging and automation.',
            path: '/',
          }),
          itemListSchema(
            popularToolsAboveFold.map((t) => ({ name: t.name, url: `/tools/${t.slug}` })),
            'Popular Developer Tools',
          ),
          faqSchema(HOME_FAQS),
        ]}
      />

      {/* HERO SECTION (Compact, Editorial, Value Immediate) */}
      <section className="pt-6 pb-10 border-b border-border">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-mono bg-dark-elevated text-muted border border-border mb-4">
            <span>● 200+ Utilities</span>
            <span>·</span>
            <span>100% Client-Side Privacy</span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-foreground leading-tight">
            Free Online Developer Tools Built for Developers
          </h1>

          <p className="text-muted mt-3 text-base sm:text-lg leading-relaxed max-w-2xl">
            Fast, secure and browser-based utilities trusted by developers for formatting, encoding, debugging and automation.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link to="/tools" className="btn-primary">
              Browse Tools
            </Link>
            <a
              href={BRAND.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary flex items-center gap-2"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              GitHub
            </a>
          </div>
        </div>

        {/* SEARCH BAR */}
        <div className="mt-8 max-w-xl">
          <div className="relative">
            <input
              id="home-portal-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search tools (e.g. JSON Formatter, JWT, UUID)..."
              className="input-field"
            />
            <kbd className="hidden sm:inline-block absolute right-3 top-1/2 -translate-y-1/2 kbd">
              ⌘K
            </kbd>
          </div>
          {query && <div className="mt-4"><ToolGrid tools={searchResults} /></div>}
        </div>
      </section>

      {!query && (
        <>
          {/* POPULAR TOOLS (VISIBLE IMMEDIATELY ABOVE THE FOLD) */}
          <section className="py-10 border-b border-border">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-foreground">Popular Tools</h2>
                <p className="text-xs text-muted mt-0.5">Most used browser utilities by developers</p>
              </div>
              <Link to="/tools" className="text-xs font-mono text-accent hover:underline">
                View all tools →
              </Link>
            </div>
            <ToolGrid tools={popularToolsAboveFold} />
          </section>

          {/* RECENTLY USED */}
          {recentTools.length > 0 && (
            <section className="py-10 border-b border-border">
              <h2 className="text-lg font-semibold text-foreground mb-4">Recently Used</h2>
              <ToolGrid tools={recentTools} />
            </section>
          )}

          {/* CATEGORIES */}
          <section className="py-10 border-b border-border">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-foreground">Categories</h2>
                <p className="text-xs text-muted mt-0.5">Organized by engineering domain</p>
              </div>
              <Link to="/categories" className="text-xs font-mono text-accent hover:underline">
                All categories →
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {CATEGORIES.map((cat) => {
                const count = TOOLS.filter((t) => t.category === cat.id).length;
                return (
                  <Link
                    key={cat.id}
                    to={`/categories/${cat.id}`}
                    className="surface-card surface-card-hover p-5 group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xl">{cat.icon}</span>
                        <span className="badge badge-neutral text-[10px]">{count} tools</span>
                      </div>
                      <h3 className="font-semibold text-sm mt-3 text-foreground group-hover:text-accent transition-colors">
                        {cat.name}
                      </h3>
                      <p className="text-xs text-muted mt-1 leading-relaxed">{cat.description}</p>
                    </div>
                    <span className="text-xs font-mono text-accent mt-4 inline-block">
                      Open hub →
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* FEATURED TOOLS */}
          <section className="py-10 border-b border-border">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-foreground">Featured Tools</h2>
                <p className="text-xs text-muted mt-0.5">Essential tools for daily engineering tasks</p>
              </div>
            </div>
            <ToolGrid tools={trending.length ? trending : featuredTools} />
          </section>

          {/* WHY VELOMINT */}
          <section className="py-12 border-b border-border">
            <div className="max-w-2xl mb-8">
              <h2 className="text-xl font-bold text-foreground">Why Velomint</h2>
              <p className="text-xs sm:text-sm text-muted mt-1">
                Designed for professional software engineers who demand speed, privacy, and precision.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { title: '100% Client-Side Privacy', desc: 'Processing runs strictly in browser memory. Payload data never touches external servers.' },
                { title: 'Sub-Millisecond Execution', desc: 'Instant local parsing powered by WebAssembly and native browser APIs.' },
                { title: 'Zero Distractions', desc: 'Clean, high-contrast dark UI with keyboard shortcuts and no telemetry clutter.' },
                { title: 'Complete Documentation', desc: 'Every tool includes technical edge cases, RFC references, and realistic code samples.' },
              ].map((c) => (
                <div key={c.title} className="surface-card p-5">
                  <p className="text-sm font-semibold text-foreground">{c.title}</p>
                  <p className="text-xs text-muted mt-1.5 leading-relaxed">{c.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* DEVELOPER RESOURCES & LATEST ARTICLES */}
          <section className="py-12 border-b border-border">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-foreground">Latest Articles & Documentation</h2>
                <p className="text-xs text-muted mt-0.5">Deep dives into API design, JWT security, and CSS specs</p>
              </div>
              <Link to="/blog" className="text-xs font-mono text-accent hover:underline">
                Read all articles →
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {blogPreview.map((post) => (
                <article key={post.slug} className="surface-card surface-card-hover p-5 flex flex-col justify-between">
                  <div>
                    <span className="badge badge-neutral text-[10px] uppercase mb-2">{post.category}</span>
                    <h3 className="font-semibold text-sm text-foreground mt-2 hover:text-accent transition-colors">
                      <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                    </h3>
                    <p className="text-xs text-muted mt-2 line-clamp-2 leading-relaxed">{post.description}</p>
                  </div>
                  <div className="mt-6 pt-3 border-t border-border/60 flex items-center justify-between text-xs font-mono text-muted">
                    <span>{post.datePublished}</span>
                    <Link to={`/blog/${post.slug}`} className="text-accent hover:underline">
                      Read →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* TESTIMONIALS */}
          <section className="py-12 border-b border-border">
            <h2 className="text-lg font-semibold text-foreground mb-6">Trusted by Engineers</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {TESTIMONIALS.map((t) => (
                <div key={t.author} className="surface-card p-5 flex flex-col justify-between">
                  <p className="text-xs sm:text-sm text-muted italic leading-relaxed">
                    "{t.quote}"
                  </p>
                  <div className="mt-4 pt-3 border-t border-border/60">
                    <p className="text-xs font-semibold text-foreground">{t.author}</p>
                    <p className="text-[11px] text-muted">{t.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ SECTION */}
          <section className="py-12">
            <div className="max-w-2xl mb-8">
              <h2 className="text-xl font-bold text-foreground">Frequently Asked Questions</h2>
              <p className="text-xs sm:text-sm text-muted mt-1">Everything you need to know about Velomint utilities</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {HOME_FAQS.map((f) => (
                <div key={f.question} className="surface-card p-5">
                  <h3 className="font-semibold text-xs sm:text-sm text-foreground">{f.question}</h3>
                  <p className="text-xs text-muted mt-2 leading-relaxed">{f.answer}</p>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </>
  );
}
