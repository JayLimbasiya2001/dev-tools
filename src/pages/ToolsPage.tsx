import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SeoHead } from '@/features/seo/SeoHead';
import { breadcrumbSchema } from '@/features/seo/schemas';
import { TOOLS, searchTools } from '@/data/tools/registry';
import { ToolGrid } from '@/components/tools/ToolGrid';
import { useToolStore } from '@/stores/toolStore';

export function ToolsPage() {
  const [params] = useSearchParams();
  const initialQ = params.get('q') ?? '';
  const [query, setQuery] = useState(initialQ);
  const favorites = useToolStore((s) => s.favorites);
  const [showFav, setShowFav] = useState(false);

  const tools = useMemo(() => {
    let list = query ? searchTools(query) : TOOLS;
    if (showFav) list = list.filter((t) => favorites.includes(t.slug));
    return list.map(({ component: _c, ...m }) => m);
  }, [query, showFav, favorites]);

  return (
    <>
      <SeoHead
        title="All Developer Tools"
        description="Browse 70+ free online developer tools for JSON, XML, encoding, API testing, CSS generation, and more."
        path="/tools"
        jsonLd={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Tools', path: '/tools' },
        ])}
      />
      <header className="mb-8">
        <h1 className="font-display text-3xl font-bold">All Tools</h1>
        <p className="text-muted mt-2">{TOOLS.length} utilities — search, filter, and bookmark your favorites.</p>
      </header>
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search tools…"
          className="input-field flex-1"
          aria-label="Search tools"
        />
        <button
          type="button"
          onClick={() => setShowFav(!showFav)}
          className={showFav ? 'btn-primary' : 'btn-secondary'}
        >
          {showFav ? '★ Favorites' : '☆ Favorites'}
        </button>
      </div>
      <ToolGrid tools={tools} />
    </>
  );
}
