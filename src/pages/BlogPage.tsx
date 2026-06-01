import { Link } from 'react-router-dom';
import { SeoHead } from '@/features/seo/SeoHead';
import { BLOG_POSTS, BLOG_CATEGORIES } from '@/data/blog/posts';
import { readingTime } from '@/lib/utils';

export function BlogPage() {
  return (
    <>
      <SeoHead
        title="Developer Blog"
        description="Articles on JavaScript, React, TypeScript, APIs, CSS, and developer career growth."
        path="/blog"
      />
      <h1 className="font-display text-3xl font-bold mb-2">Blog</h1>
      <p className="text-muted mb-8">Insights for modern developers.</p>

      <div className="flex flex-wrap gap-2 mb-8">
        {BLOG_CATEGORIES.map((c) => (
          <span key={c.id} className="text-xs px-3 py-1 rounded-full bg-violet/10 text-violet font-mono">
            {c.label}
          </span>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {BLOG_POSTS.map((post) => (
          <article key={post.slug} className="glass rounded-2xl p-6 hover:border-mint/30 transition">
            <p className="text-xs font-mono text-mint uppercase">{post.category}</p>
            <h2 className="font-display text-xl font-semibold mt-2">
              <Link to={`/blog/${post.slug}`} className="hover:text-mint">{post.title}</Link>
            </h2>
            <p className="text-sm text-muted mt-2 line-clamp-2">{post.description}</p>
            <p className="text-xs text-muted mt-4">{readingTime(post.content)} min read · {post.datePublished}</p>
          </article>
        ))}
      </div>
    </>
  );
}
