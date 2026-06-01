import { Link, useParams } from 'react-router-dom';
import { SeoHead } from '@/features/seo/SeoHead';
import { breadcrumbSchema } from '@/features/seo/schemas';
import { getCategory, type CategoryId } from '@/data/categories';
import { getToolsByCategory } from '@/data/tools/registry';
import { ToolGrid } from '@/components/tools/ToolGrid';

export function CategoryPage() {
  const { id } = useParams<{ id: string }>();
  const cat = id ? getCategory(id as CategoryId) : undefined;
  const tools = id ? getToolsByCategory(id as CategoryId).map(({ component: _c, ...m }) => m) : [];

  if (!cat) {
    return <p>Category not found. <Link to="/categories" className="text-mint">Back</Link></p>;
  }

  return (
    <>
      <SeoHead
        title={`${cat.name} Tools`}
        description={cat.description}
        path={`/categories/${cat.id}`}
        jsonLd={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Categories', path: '/categories' },
          { name: cat.name, path: `/categories/${cat.id}` },
        ])}
      />
      <h1 className="font-display text-3xl font-bold">{cat.icon} {cat.name}</h1>
      <p className="text-muted mt-2 mb-8">{cat.description}</p>
      <ToolGrid tools={tools} />
    </>
  );
}
