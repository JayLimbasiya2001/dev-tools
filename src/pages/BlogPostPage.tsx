import { Link, useParams } from 'react-router-dom';
import { marked } from 'marked';
import { SeoHead } from '@/features/seo/SeoHead';
import { articleSchema, breadcrumbSchema } from '@/features/seo/schemas';
import { getPost, getRelatedPosts, BLOG_CATEGORIES } from '@/data/blog/posts';
import { readingTime } from '@/lib/utils';

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPost(slug) : undefined;

  if (!post) {
    return <p>Article not found. <Link to="/blog" className="text-mint">Back to blog</Link></p>;
  }

  const html = marked.parse(post.content) as string;
  const related = getRelatedPosts(post);
  const headings = post.content.match(/^## .+$/gm) ?? [];
  const categoryLabel = BLOG_CATEGORIES.find((c) => c.id === post.category)?.label;

  return (
    <>
      <SeoHead
        title={post.title}
        description={post.description}
        path={`/blog/${post.slug}`}
        type="article"
        keywords={[...post.tags, post.category, 'developer blog', 'Velomint']}
        publishedTime={post.datePublished}
        jsonLd={[
          articleSchema(post),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Blog', path: '/blog' },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        ]}
      />

      <article className="lg:grid lg:grid-cols-[1fr_240px] gap-10">
        <div>
          <header className="mb-8">
            <div className="flex flex-wrap items-center gap-2">
              <Link to={`/blog/category/${post.category}`} className="text-xs font-mono text-mint hover:underline">
                {categoryLabel}
              </Link>
              {post.tags.map((t) => (
                <Link
                  key={t}
                  to={`/blog/tag/${encodeURIComponent(t)}`}
                  className="text-[10px] px-2 py-0.5 rounded-full border border-border text-muted hover:text-mint hover:border-mint/30"
                >
                  #{t}
                </Link>
              ))}
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold mt-2">{post.title}</h1>
            <p className="text-muted mt-3">{post.description}</p>
            <p className="text-xs text-muted mt-4">
              {post.author} · {post.datePublished} · {readingTime(post.content)} min read
            </p>
          </header>

          <div
            className="prose prose-invert max-w-none prose-headings:font-display prose-a:text-mint"
            dangerouslySetInnerHTML={{ __html: html }}
          />

          {related.length > 0 && (
            <section className="mt-12 border-t border-border pt-8">
              <h2 className="font-display text-xl font-bold mb-4">Related Articles</h2>
              <ul className="space-y-3">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link to={`/blog/${r.slug}`} className="text-mint hover:underline">{r.title}</Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {headings.length > 0 && (
          <aside className="hidden lg:block">
            <nav aria-label="Table of contents" className="glass rounded-2xl p-4 sticky top-24">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">On this page</h2>
              <ul className="space-y-2 text-sm">
                {headings.map((h) => {
                  const text = h.replace(/^## /, '');
                  const id = text.toLowerCase().replace(/\s+/g, '-');
                  return (
                    <li key={id}>
                      <a href={`#${id}`} className="text-muted hover:text-mint">{text}</a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </aside>
        )}
      </article>
    </>
  );
}
