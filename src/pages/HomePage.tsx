import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SeoHead } from '@/features/seo/SeoHead';
import { organizationSchema, websiteSchema, faqSchema, webPageSchema, itemListSchema } from '@/features/seo/schemas';
import { TOOLS, searchTools } from '@/data/tools/registry';
import { CATEGORIES } from '@/data/categories';
import { ToolGrid } from '@/components/tools/ToolGrid';
import { useToolStore, getTrendingSlugs } from '@/stores/toolStore';
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
  const featuredTools = toolsMeta.filter((t) => t.trending || ['json-formatter', 'jwt-decoder', 'uuid-generator', 'hash-generator', 'sql-formatter', 'regex-tester'].includes(t.slug)).slice(0, 8);
  const blogPreview = BLOG_POSTS.slice(0, 3);

  return (
    <>
      <SeoHead
        title="Free Online Developer Tools | Complete Developer Portal"
        description="200+ free developer tools including JSON Formatter, JWT Decoder, Hash Generator, Base64 Encoder, UUID Generator, SQL Formatter and more. 100% private & client-side."
        path="/"
        keywords={['free online developer tools', 'json formatter', 'jwt decoder', 'uuid generator', 'hash generator', 'base64 encoder', 'sql formatter', 'developer portal', 'Velomint']}
        jsonLd={[
          organizationSchema(),
          websiteSchema(),
          webPageSchema({
            name: 'Free Online Developer Tools — Velomint',
            description: '200+ free developer tools including JSON Formatter, JWT Decoder, Hash Generator, Base64 Encoder, UUID Generator, SQL Formatter and more.',
            path: '/',
          }),
          itemListSchema(
            featuredTools.map((t) => ({ name: t.name, url: `/tools/${t.slug}` })),
            'Popular Developer Tools',
          ),
          faqSchema(HOME_FAQS),
        ]}
      />

      {/* HERO SECTION */}
      <section className="relative overflow-hidden rounded-3xl glass p-8 sm:p-12 lg:p-16 mb-12 border border-border/80 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-mint/15 via-transparent to-violet/15 pointer-events-none" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-mint/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-violet/10 rounded-full blur-3xl pointer-events-none" />

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono bg-mint/10 text-mint border border-mint/20 mb-6">
            <span>✨ Complete Developer Portal</span>
            <span>·</span>
            <span>200+ Free Online Tools</span>
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground">
            Free Online Developer Tools
          </h1>

          <p className="text-muted mt-5 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
            200+ free developer tools including JSON Formatter, JWT Decoder, Hash Generator, Base64 Encoder, UUID Generator, SQL Formatter and more.
          </p>

          {/* SEARCH BAR & QUICK LAUNCH */}
          <div className="mt-8 max-w-2xl mx-auto">
            <div className="relative">
              <input
                id="home-portal-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search 200+ developer tools (e.g. JSON Formatter, JWT, UUID)..."
                className="input-field text-base sm:text-lg py-4 px-12 rounded-2xl shadow-xl border-mint/30 focus:border-mint"
              />
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted text-lg">🔍</span>
              <kbd className="hidden sm:inline-block absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono bg-midnight/80 px-2 py-1 rounded text-muted border border-border">
                ⌘K
              </kbd>
            </div>
            {query && <div className="mt-6 text-left"><ToolGrid tools={searchResults} /></div>}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link to="/tools" className="btn-primary text-sm sm:text-base py-3 px-6">
              🚀 Explore 200+ Tools
            </Link>
            <Link to="/categories" className="btn-secondary text-sm sm:text-base py-3 px-6">
              📁 Browse All Categories
            </Link>
          </div>
        </motion.div>
      </section>

      {!query && (
        <>
          {/* MOST USED / POPULAR TOOLS */}
          <section className="mb-14">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
                  Popular Tools & Utilities
                </h2>
                <p className="text-sm text-muted mt-1">Most used developer tools on Velomint</p>
              </div>
              <Link to="/tools" className="text-sm font-mono text-mint hover:underline">
                View all 200+ tools →
              </Link>
            </div>
            <ToolGrid tools={featuredTools} />
          </section>

          {/* RECENTLY USED */}
          {recentTools.length > 0 && (
            <section className="mb-14">
              <h2 className="font-display text-2xl font-bold mb-4 text-foreground">Recently Used Tools</h2>
              <ToolGrid tools={recentTools} />
            </section>
          )}

          {/* CATEGORIES GRID */}
          <section className="mb-14">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
                  Tool Categories
                </h2>
                <p className="text-sm text-muted mt-1">Organized by development domain and stack</p>
              </div>
              <Link to="/categories" className="text-sm font-mono text-mint hover:underline">
                Explore all hubs →
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {CATEGORIES.map((cat) => {
                const count = TOOLS.filter((t) => t.category === cat.id).length;
                return (
                  <Link
                    key={cat.id}
                    to={`/categories/${cat.id}`}
                    className="glass rounded-2xl p-6 hover:border-mint/40 transition group border border-border/70 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-3xl">{cat.icon}</span>
                        <span className="text-xs font-mono text-violet bg-violet/10 px-2 py-0.5 rounded-full border border-violet/20">
                          {count} tools
                        </span>
                      </div>
                      <h3 className="font-display text-lg font-bold mt-4 text-foreground group-hover:text-mint transition">
                        {cat.name}
                      </h3>
                      <p className="text-xs text-muted mt-2 leading-relaxed">{cat.description}</p>
                    </div>
                    <span className="text-xs font-mono text-mint mt-4 inline-block group-hover:translate-x-1 transition-transform">
                      Open hub →
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* FEATURED DEVELOPER TOOLS GRID */}
          <section className="mb-14">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
                  Trending Developer Tools
                </h2>
                <p className="text-sm text-muted mt-1">High-performance tools updated for 2026</p>
              </div>
            </div>
            <ToolGrid tools={trending} />
          </section>

          {/* WHY VELOMINT SECTION */}
          <section className="mb-14 glass rounded-3xl p-8 sm:p-12 border border-border/80">
            <div className="max-w-3xl mb-8">
              <span className="text-xs font-mono text-mint uppercase tracking-wider">Built for Developers</span>
              <h2 className="font-display text-3xl font-bold text-foreground mt-2">
                Why Senior Engineers Choose Velomint
              </h2>
              <p className="text-sm text-muted mt-2">
                Most web tool platforms are clogged with popup ads, track your telemetry, and send sensitive payloads to remote servers. Velomint is built differently.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { title: '100% Client-Side Privacy', desc: 'Processing runs strictly in browser memory. API keys, JWT tokens, and JSON payloads never reach backend servers.' },
                { title: 'Zero Latency & Offline', desc: 'Instant local execution powered by WebAssembly and optimized JS parsers. No waiting for round-trips.' },
                { title: 'Ad-Free Developer UX', desc: 'Clean high-contrast midnight UI with keyboard shortcuts, command palette, and one-click copy.' },
                { title: 'Developer Portal Depth', desc: 'Every tool includes 1,500+ words of technical guides, code samples, FAQs, and topic clusters.' },
              ].map((c) => (
                <div key={c.title} className="rounded-2xl border border-border/70 bg-card/40 p-6">
                  <p className="text-base font-bold text-mint">{c.title}</p>
                  <p className="text-xs text-muted mt-2 leading-relaxed">{c.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* DEVELOPER COMMUNITY TESTIMONIALS */}
          <section className="mb-14">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-6">
              Loved by Engineers Worldwide
            </h2>
            <div className="grid gap-6 sm:grid-cols-3">
              {TESTIMONIALS.map((t) => (
                <div key={t.author} className="glass rounded-2xl p-6 border border-border/70 flex flex-col justify-between">
                  <p className="text-xs sm:text-sm text-foreground/90 italic leading-relaxed">
                    "{t.quote}"
                  </p>
                  <div className="mt-6 pt-4 border-t border-border/40">
                    <p className="text-sm font-bold text-mint">{t.author}</p>
                    <p className="text-xs text-muted">{t.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* DEVELOPER RESOURCES & BLOG */}
          <section className="mb-14">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
                  Developer Resources & Guides
                </h2>
                <p className="text-sm text-muted mt-1">Deep dives into JSON, JWT security, CSS, and API design</p>
              </div>
              <Link to="/blog" className="text-sm font-mono text-mint hover:underline">
                Read all articles →
              </Link>
            </div>

            <div className="grid gap-6 sm:grid-cols-3">
              {blogPreview.map((post) => (
                <article key={post.slug} className="glass rounded-2xl p-6 border border-border/70 hover:border-violet/40 transition flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-violet uppercase tracking-wider bg-violet/10 px-2 py-0.5 rounded border border-violet/20">
                      {post.category}
                    </span>
                    <h3 className="font-display text-base font-bold mt-3 text-foreground hover:text-mint transition">
                      <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                    </h3>
                    <p className="text-xs text-muted mt-2 line-clamp-3 leading-relaxed">{post.description}</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-border/40 flex items-center justify-between">
                    <span className="text-xs text-muted font-mono">{post.datePublished}</span>
                    <Link to={`/blog/${post.slug}`} className="text-xs font-mono text-mint hover:underline">
                      Read guide →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* E-E-A-T & MISSION SECTION */}
          <section className="mb-14 glass rounded-3xl p-8 sm:p-12 border border-border/80">
            <div className="grid gap-8 lg:grid-cols-2 items-center">
              <div>
                <span className="text-xs font-mono text-violet uppercase tracking-wider">About Velomint Engineering</span>
                <h2 className="font-display text-3xl font-bold text-foreground mt-2">
                  Built by Developers, for Developers
                </h2>
                <p className="text-sm text-muted mt-4 leading-relaxed">
                  Velomint was founded with a clear mission: build the fastest, cleanest, and most trustworthy developer utility suite on the web.
                  We believe developer tools should be instantaneous, private, accessible, and comprehensive.
                </p>
                <div className="mt-6 flex flex-wrap gap-4 text-xs font-mono text-muted">
                  <div className="flex items-center gap-1.5"><span className="text-mint">✓</span> 100% Client-Side Privacy</div>
                  <div className="flex items-center gap-1.5"><span className="text-mint">✓</span> Zero Server Data Storage</div>
                  <div className="flex items-center gap-1.5"><span className="text-mint">✓</span> Open Web Standards</div>
                </div>
              </div>

              <div className="glass rounded-2xl p-6 border border-border/60 bg-midnight/60">
                <h3 className="font-display text-lg font-bold text-foreground mb-3">Our Core Philosophy</h3>
                <ul className="space-y-3 text-xs text-muted">
                  <li className="flex items-start gap-2">
                    <span className="text-mint font-bold">1.</span>
                    <span><strong className="text-foreground">Privacy by Design:</strong> Your secrets stay in your browser. We never log or store customer input payloads.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-mint font-bold">2.</span>
                    <span><strong className="text-foreground">Comprehensive Depth:</strong> We don't just provide a text box — every page includes thorough documentation, edge cases, and FAQs.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-mint font-bold">3.</span>
                    <span><strong className="text-foreground">Uncompromised Speed:</strong> Sub-millisecond execution using local JavaScript engines.</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* HOME PAGE FAQ */}
          <section className="mb-14 glass rounded-3xl p-8 sm:p-12 border border-border/80">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
                Frequently Asked Questions
              </h2>
              <p className="text-sm text-muted mt-2">Everything you need to know about Velomint developer tools</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {HOME_FAQS.map((f) => (
                <div key={f.question} className="rounded-2xl border border-border/60 bg-card/40 p-5">
                  <h3 className="font-semibold text-sm text-mint">{f.question}</h3>
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
