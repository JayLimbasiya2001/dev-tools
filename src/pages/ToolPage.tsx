import { Suspense, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { SeoHead } from '@/features/seo/SeoHead';
import { breadcrumbSchema, faqSchema, toolSchema, toolSeoTitle, toolSeoDescription, toolSeoKeywords, webPageSchema } from '@/features/seo/schemas';
import { resolveSiteUrl } from '@/config/site-url';
import { getTool, TOOLS } from '@/data/tools/registry';
import { getCategory } from '@/data/categories';
import { useToolStore } from '@/stores/toolStore';
import { getRelatedToolsForToolPage } from '@/lib/related-tools';
import { ToolGrid } from '@/components/tools/ToolGrid';
import { ToolCardSkeleton } from '@/components/ui/Skeleton';
import { AdSlot } from '@/features/ads/AdSlot';
import { copyToClipboard } from '@/lib/clipboard';
import { buildToolContent } from '@/features/tool-seo/buildContent';
import { ToolContentSections, ToolHero, ToolToc, TrustBadges, SocialShareBar } from '@/features/tool-seo/ToolLandingSections';

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
  const allMeta = TOOLS.map((t) => {
    const { component, ...m } = t;
    void component;
    return m;
  });
  const related = getRelatedToolsForToolPage(tool, allMeta, 9);
  const content = buildToolContent(tool);
  const shareUrl = `${resolveSiteUrl()}/tools/${tool.slug}`;

  const categoryName = cat?.name ?? 'Developer';
  const categoryHubName = `${categoryName} Tools`;

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
            { name: 'Developer Tools', path: '/tools' },
            { name: categoryHubName, path: `/categories/${tool.category}` },
            { name: tool.name, path: `/tools/${tool.slug}` },
          ]),
          toolSchema(tool),
          faqSchema(content.faqs),
        ]}
      />

      <nav aria-label="Breadcrumb" className="text-sm text-muted mb-4 font-mono">
        <ol className="flex flex-wrap items-center gap-2">
          <li><Link to="/" className="hover:text-mint transition">Home</Link></li>
          <li>/</li>
          <li><Link to="/tools" className="hover:text-mint transition">Developer Tools</Link></li>
          <li>/</li>
          <li><Link to={`/categories/${tool.category}`} className="hover:text-mint transition">{categoryHubName}</Link></li>
          <li>/</li>
          <li className="text-foreground font-semibold">{tool.name}</li>
        </ol>
      </nav>

      <div className="lg:grid lg:grid-cols-[1fr_320px] gap-8 items-start">
        <div className="space-y-8">
          <ToolHero
            tool={tool}
            category={cat}
            highlights={content.heroHighlights}
            actions={
              <>
                <a href="#tool" className="btn-primary text-sm">
                  ⚡ Open Tool Workspace
                </a>
                <button
                  type="button"
                  className="btn-secondary text-sm"
                  onClick={() => toggleFavorite(tool.slug)}
                >
                  {isFavorite ? '★ Saved in Favorites' : '☆ Save Tool'}
                </button>
                <button
                  type="button"
                  className="btn-secondary text-sm"
                  onClick={() => copyToClipboard(shareUrl, 'Link copied')}
                >
                  🔗 Share URL
                </button>
              </>
            }
          />

          <TrustBadges />

          <SocialShareBar title={toolSeoTitle(tool)} url={shareUrl} />

          <section id="tool" className="scroll-mt-24">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-display text-lg font-bold text-foreground">
                {tool.name} Interface
              </h2>
              <span className="badge badge-accent">
                Client-Side Engine
              </span>
            </div>
            <div className="surface-card p-5 sm:p-6 shadow-sm">
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
            </div>
          </section>

          <AdSlot placement="in-content" />

          <ToolContentSections
            tool={tool}
            content={content}
            relatedSlugs={related.map((t) => ({ slug: t.slug, name: t.name }))}
          />

          {related.length > 0 && (
            <section className="mt-12">
              <h2 className="font-display text-xl font-bold mb-4">Related Developer Utilities</h2>
              <ToolGrid tools={related} />
            </section>
          )}
        </div>

        <aside className="hidden lg:flex lg:flex-col gap-6 lg:sticky lg:top-24 lg:self-start">
          <ToolToc />
          <AdSlot placement="sidebar-primary" />
          <AdSlot placement="sidebar-secondary" />
        </aside>
      </div>
    </>
  );
}

