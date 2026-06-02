import { Link, useParams } from 'react-router-dom';
import { SeoHead } from '@/features/seo/SeoHead';
import { breadcrumbSchema, collectionPageSchema, webPageSchema } from '@/features/seo/schemas';
import { getPostsByTag } from '@/data/blog/posts';
import { readingTime } from '@/lib/utils';

export function BlogTagPage() {
  const { tag } = useParams<{ tag: string }>();
  const safeTag = (tag ?? '').toLowerCase();
  const posts = tag ? getPostsByTag(tag) : [];

  if (!safeTag) {
    return (
      <p>
        Tag not found.{' '}
        <Link to="/blog" className="text-mint">
          Back to blog
        </Link>
      </p>
    );
  }

  return (
    <>
      <SeoHead
        title={`#${safeTag} Articles`}
        description={`Read developer articles tagged #${safeTag}. Practical guides and checklists from Velomint.`}
        path={`/blog/tag/${encodeURIComponent(safeTag)}`}
        keywords={[safeTag, 'developer blog', 'tutorials', 'Velomint']}
        jsonLd={[
          webPageSchema({
            name: `#${safeTag} Articles`,
            description: `Velomint blog posts tagged ${safeTag}.`,
            path: `/blog/tag/${encodeURIComponent(safeTag)}`,
          }),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Blog', path: '/blog' },
            { name: `#${safeTag}`, path: `/blog/tag/${encodeURIComponent(safeTag)}` },
          ]),
          collectionPageSchema({
            name: `#${safeTag} Articles`,
            description: `Velomint blog posts tagged ${safeTag}.`,
            path: `/blog/tag/${encodeURIComponent(safeTag)}`,
            items: posts.map((p) => ({ name: p.title, url: `/blog/${p.slug}` })),
          }),
        ]}
      />

      <header className="mb-8">
        <p className="text-xs font-mono text-violet uppercase">Tag</p>
        <h1 className="font-display text-3xl font-bold">#{safeTag}</h1>
        <p className="text-muted mt-2">{posts.length} articles</p>
      </header>

      {posts.length === 0 ? (
        <p className="text-muted">No posts found for this tag yet.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {posts.map((post) => (
            <article key={post.slug} className="glass rounded-2xl p-6 hover:border-mint/30 transition">
              <p className="text-xs font-mono text-mint uppercase">{post.category}</p>
              <h2 className="font-display text-xl font-semibold mt-2">
                <Link to={`/blog/${post.slug}`} className="hover:text-mint">
                  {post.title}
                </Link>
              </h2>
              <p className="text-sm text-muted mt-2 line-clamp-2">{post.description}</p>
              <p className="text-xs text-muted mt-4">
                {readingTime(post.content)} min read · {post.datePublished}
              </p>
            </article>
          ))}
        </div>
      )}

      <div className="mt-12">
        <Link to="/blog" className="text-mint hover:underline">
          ← Back to blog
        </Link>
      </div>
    </>
  );
}

