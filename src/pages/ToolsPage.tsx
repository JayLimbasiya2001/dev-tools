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

      <nav aria-label="Breadcrumb" className="text-xs text-muted mb-4 font-mono">
        <ol className="flex items-center gap-2">
          <li><Link to="/" className="hover:text-foreground transition-colors">Home</Link></li>
          <li>/</li>
          <li className="text-foreground font-semibold">Developer Tools Directory</li>
        </ol>
      </nav>

      {/* HEADER HERO */}
      <section className="pb-8 border-b border-border mb-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-md text-xs font-mono bg-dark-elevated text-muted border border-border mb-3">
            <span>● 200+ Utilities</span>
            <span>·</span>
            <span>Client-Side Execution</span>
          </div>

          <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
            Developer Tools Directory
          </h1>
          <p className="text-muted mt-2 text-xs sm:text-sm max-w-2xl leading-relaxed">
            Instant browser utilities for code formatting, token decoding, cryptography, data conversion, and responsive design.
          </p>

          {/* SEARCH & FILTERS */}
          <div className="mt-6 flex flex-col sm:flex-row gap-2.5">
            <div className="relative flex-1">
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search tools by name, tag, or keyword (e.g. JSON, JWT, SQL)..."
                className="input-field py-2 px-9 text-xs"
                aria-label="Search tools"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted text-xs">🔍</span>
            </div>

            <button
              type="button"
              onClick={() => setShowFav(!showFav)}
              className={showFav ? 'btn-primary text-xs py-2 px-4' : 'btn-secondary text-xs py-2 px-4'}
            >
              {showFav ? '★ Starred Only' : '☆ Starred Only'}
            </button>
          </div>

          {/* CATEGORY FILTER PILLS */}
          <div className="mt-6 flex flex-wrap gap-1.5 pt-4 border-t border-border">
            <button
              type="button"
              onClick={() => setActiveCategory('all')}
              className={`px-3 py-1 rounded-md text-xs font-mono transition-colors cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-accent text-white font-semibold'
                  : 'bg-card text-muted hover:text-foreground border border-border'
              }`}
            >
              All ({TOOLS.length})
            </button>

            {CATEGORIES.map((cat) => {
              const count = TOOLS.filter((t) => t.category === cat.id).length;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 py-1 rounded-md text-xs font-mono transition-colors cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-accent text-white font-semibold'
                      : 'bg-card text-muted hover:text-foreground border border-border'
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
          Showing <span className="text-foreground font-semibold">{tools.length}</span> tools
          {activeCategory !== 'all' && ` in ${activeCategory}`}
          {showFav && ' (starred)'}
        </p>
      </div>

      <ToolGrid tools={tools} />
    </>
  );
}
