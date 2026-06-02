import { Link } from 'react-router-dom';
import { SeoHead } from '@/features/seo/SeoHead';
import { breadcrumbSchema, webPageSchema } from '@/features/seo/schemas';
import { ARTICLE_IDEAS } from '@/data/blog/ideas';

export function BlogIdeasPage() {
  return (
    <>
      <SeoHead
        title="100 Developer Article Ideas"
        description="A curated list of 100 high-signal developer blog post ideas across JSON, JWT, Regex, APIs, React, TypeScript, CSS, and web security."
        path="/blog/ideas"
        keywords={['blog ideas', 'developer blog', 'seo content plan', 'Velomint']}
        jsonLd={[
          webPageSchema({
            name: '100 Developer Article Ideas',
            description: 'Content plan ideas for the Velomint developer blog.',
            path: '/blog/ideas',
          }),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Blog', path: '/blog' },
            { name: 'Ideas', path: '/blog/ideas' },
          ]),
        ]}
      />

      <header className="mb-8">
        <h1 className="font-display text-3xl font-bold">100 Article Ideas</h1>
        <p className="text-muted mt-2">
          A ready-to-execute editorial backlog focused on search intent and developer pain.
        </p>
      </header>

      <div className="space-y-4">
        {ARTICLE_IDEAS.map((idea, i) => (
          <article key={`${idea.title}-${i}`} className="glass rounded-2xl p-5">
            <p className="text-xs font-mono text-violet uppercase">{idea.category}</p>
            <h2 className="font-display text-lg font-semibold mt-2">{idea.title}</h2>
            <p className="text-sm text-muted mt-2">{idea.angle}</p>
          </article>
        ))}
      </div>

      <div className="mt-12">
        <Link to="/blog" className="text-mint hover:underline">
          ← Back to blog
        </Link>
      </div>
    </>
  );
}

