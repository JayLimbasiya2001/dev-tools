import { Link } from 'react-router-dom';
import { SeoHead } from '@/features/seo/SeoHead';
import { CATEGORIES } from '@/data/categories';
import { getToolsByCategory } from '@/data/tools/registry';

export function CategoriesPage() {
  return (
    <>
      <SeoHead title="Tool Categories" description="Browse Velomint developer tools by category." path="/categories" />
      <h1 className="font-display text-3xl font-bold mb-8">Categories</h1>
      <div className="grid gap-6 sm:grid-cols-2">
        {CATEGORIES.map((cat) => {
          const count = getToolsByCategory(cat.id).length;
          return (
            <Link
              key={cat.id}
              to={`/categories/${cat.id}`}
              className="glass rounded-2xl p-8 hover:border-mint/30 transition"
            >
              <span className="text-3xl">{cat.icon}</span>
              <h2 className="font-display text-xl font-semibold mt-3">{cat.name}</h2>
              <p className="text-muted text-sm mt-2">{cat.description}</p>
              <p className="text-xs text-mint mt-4 font-mono">{count} tools</p>
            </Link>
          );
        })}
      </div>
    </>
  );
}
