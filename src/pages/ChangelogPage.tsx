import { SeoHead } from '@/features/seo/SeoHead';
import { BRAND } from '@/config/brand';

const ENTRIES = [
  { version: '1.0.0', date: '2026-06-01', items: ['Initial release with 70+ developer tools', 'Dark/light mode, command palette, bookmarks', 'Blog system and SEO infrastructure', 'AdSense-ready ad placements'] },
];

export function ChangelogPage() {
  return (
    <>
      <SeoHead title="Changelog" description={`${BRAND.name} release history.`} path="/changelog" />
      <h1 className="font-display text-3xl font-bold mb-8">Changelog</h1>
      <div className="space-y-8">
        {ENTRIES.map((entry) => (
          <article key={entry.version} className="glass rounded-2xl p-6">
            <div className="flex items-baseline gap-3 mb-3">
              <h2 className="font-display text-xl font-semibold text-mint">v{entry.version}</h2>
              <time className="text-xs text-muted">{entry.date}</time>
            </div>
            <ul className="list-disc pl-5 text-muted space-y-1 text-sm">
              {entry.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </>
  );
}
