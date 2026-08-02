import { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { SeoHead } from '@/features/seo/SeoHead';
import { breadcrumbSchema, itemListSchema, webPageSchema } from '@/features/seo/schemas';
import { TOOLS, searchTools } from '@/data/tools/registry';
import { CATEGORIES } from '@/data/categories';
import { ToolGrid } from '@/components/tools/ToolGrid';
import { useToolStore } from '@/stores/toolStore';

export function ToolsPage() {
  const [params] = useSearchParams();
  const initialQ = params.get('q') ?? '';
  const [query, setQuery] = useState(initialQ);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const favorites = useToolStore((s) => s.favorites);
  const [showFav, setShowFav] = useState(false);

  const tools = useMemo(() => {
    let list = query ? searchTools(query) : TOOLS;
    if (activeCategory !== 'all') {
      list = list.filter((t) => t.category === activeCategory);
    }
    if (showFav) {
      list = list.filter((t) => favorites.includes(t.slug));
    }
    return list.map((t) => {
      const { component, ...m } = t;
      void component;
      return m;
    });
  }, [query, activeCategory, showFav, favorites]);

  return (
    <>
      <SeoHead
        title="200+ Free Online Developer Tools Directory | Velomint"
        description="Browse 200+ free online developer tools for JSON formatting, JWT decoding, UUID generation, API testing, CSS generation, encoding, conversion, and more. 100% client-side privacy."
        path="/tools"
        keywords={['developer tools', 'online tools', 'free dev tools', 'json formatter', 'jwt decoder', 'web utilities']}
        jsonLd={[
          webPageSchema({
            name: '200+ Free Online Developer Tools Directory',
            description: 'Complete directory of Velomint developer utilities.',
            path: '/tools',
          }),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Developer Tools', path: '/tools' },
          ]),
          itemListSchema(
            TOOLS.map((t) => {
              void t.component;
              return { name: t.name, url: `/tools/${t.slug}` };
            }),
            'Velomint Developer Tools Directory',
          ),
        ]}
      />

      <nav aria-label="Breadcrumb" className="text-sm text-muted mb-4 font-mono">
        <ol className="flex items-center gap-2">
          <li><Link to="/" className="hover:text-mint transition">Home</Link></li>
          <li>/</li>
          <li className="text-foreground font-semibold">Developer Tools Directory</li>
        </ol>
      </nav>

      {/* HEADER HERO */}
      <section className="glass rounded-3xl p-8 sm:p-10 mb-8 border border-border/80 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-mint/10 via-transparent to-violet/10 pointer-events-none" />
        <div className="relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-mint/10 text-mint border border-mint/20 mb-3">
            <span>🚀 200+ Utilities</span>
            <span>·</span>
            <span>100% Client-Side</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            Developer Tools Directory
          </h1>
          <p className="text-muted mt-2 text-sm sm:text-base max-w-2xl">
            Instant browser utilities for code formatting, token decoding, cryptography, data conversion, and responsive design.
          </p>

          {/* SEARCH & FILTERS */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search tools by name, tag, or keyword (e.g. JSON, JWT, SQL)..."
                className="input-field py-3 px-11"
                aria-label="Search tools"
              />
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted text-sm">🔍</span>
            </div>

            <button
              type="button"
              onClick={() => setShowFav(!showFav)}
              className={showFav ? 'btn-primary text-xs py-3 px-5' : 'btn-secondary text-xs py-3 px-5'}
            >
              {showFav ? '★ Saved Favorites' : '☆ Filter Favorites'}
            </button>
          </div>

          {/* CATEGORY FILTER PILLS */}
          <div className="mt-6 flex flex-wrap gap-2 pt-4 border-t border-border/40">
            <button
              type="button"
              onClick={() => setActiveCategory('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono transition cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-mint text-midnight font-bold shadow-md'
                  : 'bg-card/70 text-muted hover:text-foreground hover:bg-card border border-border/60'
              }`}
            >
              All Tools ({TOOLS.length})
            </button>

            {CATEGORIES.map((cat) => {
              const count = TOOLS.filter((t) => t.category === cat.id).length;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono transition cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-mint text-midnight font-bold shadow-md'
                      : 'bg-card/70 text-muted hover:text-foreground hover:bg-card border border-border/60'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.name} ({count})</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* RESULTS COUNT & GRID */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs font-mono text-muted">
          Showing <span className="text-mint font-semibold">{tools.length}</span> tools
          {activeCategory !== 'all' && ` in ${activeCategory}`}
          {showFav && ' (starred only)'}
        </p>
      </div>

      <ToolGrid tools={tools} />
    </>
  );
}
