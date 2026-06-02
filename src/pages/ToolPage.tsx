import { Suspense, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { SeoHead } from '@/features/seo/SeoHead';
import { breadcrumbSchema, toolSchema, toolSeoTitle, toolSeoDescription, toolSeoKeywords, webPageSchema } from '@/features/seo/schemas';
import { resolveSiteUrl } from '@/config/site-url';
import { getTool, TOOLS } from '@/data/tools/registry';
import { getCategory } from '@/data/categories';
import { useToolStore } from '@/stores/toolStore';
import { getRelatedTools } from '@/lib/related-tools';
import { ToolGrid } from '@/components/tools/ToolGrid';
import { ToolCardSkeleton } from '@/components/ui/Skeleton';
import { AdSlot } from '@/features/ads/AdSlot';
import { copyToClipboard } from '@/lib/clipboard';

export function ToolPage() {
  const { slug } = useParams<{ slug: string }>();
  const tool = slug ? getTool(slug) : undefined;
  const recordUsage = useToolStore((s) => s.recordUsage);
  const toggleFavorite = useToolStore((s) => s.toggleFavorite);
  const isFavorite = useToolStore((s) => (slug ? s.isFavorite(slug) : false));

  useEffect(() => {
    if (slug && tool) recordUsage(slug);
  }, [slug, tool, recordUsage]);

  if (!tool) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold">Tool not found</h1>
        <Link to="/tools" className="text-mint mt-4 inline-block">Browse all tools</Link>
      </div>
    );
  }

  const cat = getCategory(tool.category);
  const ToolComponent = tool.component;
  const allMeta = TOOLS.map(({ component: _c, ...m }) => m);
  const related = getRelatedTools(tool, allMeta);
  const shareUrl = `${resolveSiteUrl()}/tools/${tool.slug}`;

  return (
    <>
      <SeoHead
        title={toolSeoTitle(tool)}
        description={toolSeoDescription(tool)}
        path={`/tools/${tool.slug}`}
        keywords={toolSeoKeywords(tool)}
        jsonLd={[
          webPageSchema({
            name: tool.name,
            description: tool.description,
            path: `/tools/${tool.slug}`,
          }),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Tools', path: '/tools' },
            { name: tool.name, path: `/tools/${tool.slug}` },
          ]),
          toolSchema(tool),
        ]}
      />

      <nav aria-label="Breadcrumb" className="text-sm text-muted mb-4">
        <ol className="flex flex-wrap gap-2">
          <li><Link to="/" className="hover:text-mint">Home</Link></li>
          <li>/</li>
          <li><Link to="/tools" className="hover:text-mint">Tools</Link></li>
          <li>/</li>
          <li><Link to={`/categories/${tool.category}`} className="hover:text-mint">{cat?.name}</Link></li>
          <li>/</li>
          <li className="text-foreground">{tool.name}</li>
        </ol>
      </nav>

      <div className="lg:grid lg:grid-cols-[1fr_280px] gap-8">
        <div>
          <header className="mb-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs font-mono text-violet mb-1">{cat?.icon} {cat?.name}</p>
                <h1 className="font-display text-3xl font-bold">{tool.name}</h1>
                <p className="text-muted mt-2 max-w-2xl">{tool.description}</p>
              </div>
              <div className="flex gap-2">
                <button type="button" className="btn-secondary text-xs" onClick={() => toggleFavorite(tool.slug)}>
                  {isFavorite ? '★ Saved' : '☆ Save'}
                </button>
                <button type="button" className="btn-secondary text-xs" onClick={() => copyToClipboard(shareUrl, 'Link copied')}>
                  Share
                </button>
              </div>
            </div>
          </header>

          <Suspense
            fallback={
              <div className="space-y-4">
                <ToolCardSkeleton />
                <ToolCardSkeleton />
              </div>
            }
          >
            <ToolComponent />
          </Suspense>

          {related.length > 0 && (
            <section className="mt-12">
              <h2 className="font-display text-xl font-bold mb-4">Related Tools</h2>
              <ToolGrid tools={related} />
            </section>
          )}
        </div>
        <aside className="hidden lg:flex lg:flex-col gap-6 lg:sticky lg:top-24 lg:self-start">
          <AdSlot placement="sidebar-primary" />
          <AdSlot placement="sidebar-secondary" />
        </aside>
      </div>
    </>
  );
}
