import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SeoHead } from '@/features/seo/SeoHead';
import { organizationSchema, websiteSchema, faqSchema, webPageSchema, itemListSchema } from '@/features/seo/schemas';
import { TOOLS, searchTools } from '@/data/tools/registry';
import { CATEGORIES } from '@/data/categories';
import { ToolGrid } from '@/components/tools/ToolGrid';
import { useToolStore, getTrendingSlugs } from '@/stores/toolStore';
import { BRAND } from '@/config/brand';
import { BLOG_POSTS } from '@/data/blog/posts';

const FAQS = [
  { question: 'Is Velomint free to use?', answer: 'Yes. All 70+ tools are free and run entirely in your browser with no account required.' },
  { question: 'Does Velomint send my data to a server?', answer: 'No. Tools are frontend-only. Your input never leaves your device unless you use features like the REST playground that explicitly make outbound requests.' },
  { question: 'Can I bookmark tools?', answer: 'Yes. Click the star on any tool card to save favorites locally.' },
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
  const blogPreview = BLOG_POSTS.slice(0, 2);

  return (
    <>
      <SeoHead
        title="Free Developer Tools — JSON, JWT, UUID, API & More"
        description="Velomint offers 70+ free browser-based developer tools. Format JSON, decode JWT, generate UUIDs, test APIs, build CSS — fast, private, no signup."
        path="/"
        keywords={['developer tools', 'online dev tools', 'json formatter', 'jwt decoder', 'free tools', 'Velomint']}
        jsonLd={[
          organizationSchema(),
          websiteSchema(),
          webPageSchema({
            name: 'Velomint Developer Tools',
            description: 'Premium free developer tools platform.',
            path: '/',
          }),
          itemListSchema(
            TOOLS.filter((t) => t.trending).map((t) => {
              void t.component;
              return { name: t.name, url: `/tools/${t.slug}` };
            }),
            'Trending Developer Tools',
          ),
          faqSchema(FAQS),
        ]}
      />

      <section className="relative overflow-hidden rounded-3xl glass p-8 sm:p-12 mb-12">
        <div className="absolute inset-0 bg-gradient-to-br from-mint/10 via-transparent to-violet/10 pointer-events-none" />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative max-w-2xl">
          <p className="text-sm font-mono text-mint mb-3">70+ browser-based utilities</p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            <span className="text-gradient">{BRAND.name}</span>
            <br />
            <span className="text-foreground/90 text-3xl sm:text-4xl lg:text-5xl font-semibold mt-2 block">{BRAND.tagline}</span>
          </h1>
          <p className="text-muted mt-4 text-lg max-w-xl">
            The premium developer toolkit for formatting, encoding, API testing, and CSS generation — built for speed, privacy, and precision.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/tools" className="btn-primary">Explore All Tools</Link>
            <Link to="/categories" className="btn-secondary">Browse Categories</Link>
          </div>
        </motion.div>
      </section>

      <section className="mb-12" aria-label="Search tools">
        <label htmlFor="home-search" className="sr-only">Search tools</label>
        <input
          id="home-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search 70+ developer tools…"
          className="input-field text-lg py-4"
        />
        {query && <div className="mt-6"><ToolGrid tools={searchResults} /></div>}
      </section>

      {!query && (
        <>
          <section className="mb-12">
            <h2 className="font-display text-2xl font-bold mb-4">Why Velomint</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { title: 'Privacy-first', desc: 'Most tools run locally in your browser. No uploads for standard workflows.' },
                { title: 'Premium UX', desc: 'Keyboard shortcuts, command palette, skeleton loaders, and polished motion.' },
                { title: 'Discoverability', desc: 'Categories, tags, trending, recent tools, and related-tool suggestions.' },
                { title: 'SEO-friendly', desc: 'Every tool page is a complete landing page with schema and FAQs.' },
              ].map((c) => (
                <div key={c.title} className="glass rounded-2xl p-6">
                  <p className="text-mint font-semibold">{c.title}</p>
                  <p className="text-sm text-muted mt-2">{c.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {recentTools.length > 0 && (
            <section className="mb-12">
              <h2 className="font-display text-2xl font-bold mb-4">Recently Used</h2>
              <ToolGrid tools={recentTools} />
            </section>
          )}

          <section className="mb-12">
            <h2 className="font-display text-2xl font-bold mb-4">Trending Tools</h2>
            <ToolGrid tools={trending} />
          </section>

          <section className="mb-12">
            <h2 className="font-display text-2xl font-bold mb-6">Categories</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.id}
                  to={`/categories/${cat.id}`}
                  className="glass rounded-2xl p-6 hover:border-mint/30 transition group"
                >
                  <span className="text-2xl">{cat.icon}</span>
                  <h3 className="font-display font-semibold mt-2 group-hover:text-mint">{cat.name}</h3>
                  <p className="text-sm text-muted mt-1">{cat.description}</p>
                </Link>
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-2xl font-bold">All Tools</h2>
              <Link to="/tools" className="text-sm text-mint hover:underline">View all →</Link>
            </div>
            <ToolGrid tools={toolsMeta.slice(0, 9)} />
          </section>

          <section className="mt-16">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-2xl font-bold">From the Blog</h2>
              <Link to="/blog" className="text-sm text-mint hover:underline">Read more →</Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {blogPreview.map((post) => (
                <article key={post.slug} className="glass rounded-2xl p-6 hover:border-mint/30 transition">
                  <p className="text-xs font-mono text-violet uppercase">{post.category}</p>
                  <h3 className="font-display text-lg font-semibold mt-2">
                    <Link to={`/blog/${post.slug}`} className="hover:text-mint">{post.title}</Link>
                  </h3>
                  <p className="text-sm text-muted mt-2 line-clamp-2">{post.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-16 glass rounded-2xl p-8">
            <h2 className="font-display text-xl font-bold mb-6">FAQ</h2>
            <dl className="space-y-4">
              {FAQS.map((f) => (
                <div key={f.question}>
                  <dt className="font-medium text-mint">{f.question}</dt>
                  <dd className="text-sm text-muted mt-1">{f.answer}</dd>
                </div>
              ))}
            </dl>
          </section>
        </>
      )}
    </>
  );
}
