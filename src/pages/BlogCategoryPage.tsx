import { Link, useParams } from 'react-router-dom';
import { SeoHead } from '@/features/seo/SeoHead';
import { breadcrumbSchema, collectionPageSchema, webPageSchema } from '@/features/seo/schemas';
import { BLOG_CATEGORIES, getPostsByCategory, type BlogCategory } from '@/data/blog/posts';
import { readingTime } from '@/lib/utils';

export function BlogCategoryPage() {
  const { id } = useParams<{ id: string }>();
  const category = BLOG_CATEGORIES.find((c) => c.id === (id as BlogCategory));
  const posts = id ? getPostsByCategory(id as BlogCategory) : [];

  if (!category) {
    return (
      <p>
        Category not found.{' '}
        <Link to="/blog" className="text-mint">
          Back to blog
        </Link>
      </p>
    );
  }

  return (
    <>
      <SeoHead
        title={`${category.label} Articles`}
        description={`Read ${category.label} articles and tutorials from Velomint. Practical guides for modern developers.`}
        path={`/blog/category/${category.id}`}
        keywords={[category.label.toLowerCase(), 'developer blog', 'tutorials', 'Velomint']}
        jsonLd={[
          webPageSchema({
            name: `${category.label} Articles`,
            description: `Velomint blog posts about ${category.label}.`,
            path: `/blog/category/${category.id}`,
          }),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Blog', path: '/blog' },
            { name: category.label, path: `/blog/category/${category.id}` },
          ]),
          collectionPageSchema({
            name: `${category.label} Articles`,
            description: `Velomint blog posts about ${category.label}.`,
            path: `/blog/category/${category.id}`,
            items: posts.map((p) => ({ name: p.title, url: `/blog/${p.slug}` })),
          }),
        ]}
      />

      <header className="mb-8">
        <p className="text-xs font-mono text-violet uppercase">Category</p>
        <h1 className="font-display text-3xl font-bold">{category.label}</h1>
        <p className="text-muted mt-2">{posts.length} articles</p>
      </header>

      <div className="grid gap-6 sm:grid-cols-2">
        {posts.map((post) => (
          <article key={post.slug} className="glass rounded-2xl p-6 hover:border-mint/30 transition">
            <h2 className="font-display text-xl font-semibold">
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

      <div className="mt-12">
        <Link to="/blog" className="text-mint hover:underline">
          ← Back to blog
        </Link>
      </div>
    </>
  );
}

