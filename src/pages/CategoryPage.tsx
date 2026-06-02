import { Link, useParams } from 'react-router-dom';
import { SeoHead } from '@/features/seo/SeoHead';
import { breadcrumbSchema, collectionPageSchema, webPageSchema } from '@/features/seo/schemas';
import { getCategory, type CategoryId } from '@/data/categories';
import { getToolsByCategory } from '@/data/tools/registry';
import { ToolGrid } from '@/components/tools/ToolGrid';

export function CategoryPage() {
  const { id } = useParams<{ id: string }>();
  const cat = id ? getCategory(id as CategoryId) : undefined;
  const tools = id
    ? getToolsByCategory(id as CategoryId).map((t) => {
        const { component, ...m } = t;
        void component;
        return m;
      })
    : [];

  if (!cat) {
    return <p>Category not found. <Link to="/categories" className="text-mint">Back</Link></p>;
  }

  return (
    <>
      <SeoHead
        title={`${cat.name} Tools — Free Online Developer Utilities`}
        description={`${cat.description} Explore ${tools.length} free ${cat.name.toLowerCase()} tools on Velomint.`}
        path={`/categories/${cat.id}`}
        keywords={[cat.name.toLowerCase(), 'developer tools', 'free online tools', cat.id]}
        jsonLd={[
          webPageSchema({ name: `${cat.name} Tools`, description: cat.description, path: `/categories/${cat.id}` }),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Categories', path: '/categories' },
            { name: cat.name, path: `/categories/${cat.id}` },
          ]),
          collectionPageSchema({
            name: `${cat.name} Tools`,
            description: cat.description,
            path: `/categories/${cat.id}`,
            items: tools.map((t) => ({ name: t.name, url: `/tools/${t.slug}` })),
          }),
        ]}
      />
      <h1 className="font-display text-3xl font-bold">{cat.icon} {cat.name}</h1>
      <p className="text-muted mt-2 mb-8">{cat.description}</p>
      <ToolGrid tools={tools} />
    </>
  );
}
