import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

/** Resolves canonical URL at build time (Vercel-aware). */
function getSiteUrl() {
  if (process.env.VITE_SITE_URL) {
    return process.env.VITE_SITE_URL.replace(/\/$/, '');
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL.replace(/\/$/, '')}`;
  }
  return 'https://velomint.vercel.app';
}

function extractSlugs(filePath, pattern) {
  const content = readFileSync(filePath, 'utf8');
  return [...content.matchAll(pattern)].map((m) => m[1]);
}

const SITE_URL = getSiteUrl();
const TODAY = new Date().toISOString().slice(0, 10);

const toolSlugs = extractSlugs(
  join(root, 'src/data/tools/registry.ts'),
  /slug:\s*'([^']+)'/g,
);

const blogSlugs = extractSlugs(
  join(root, 'src/data/blog/posts.ts'),
  /slug:\s*'([^']+)'/g,
);

const categories = [
  'formatting',
  'encoding',
  'generators',
  'converters',
  'utilities',
  'advanced',
  'css',
  'frontend',
];

const staticPages = [
  { path: '/', priority: '1.0', changefreq: 'daily' },
  { path: '/tools', priority: '0.95', changefreq: 'daily' },
  { path: '/categories', priority: '0.9', changefreq: 'weekly' },
  { path: '/blog', priority: '0.85', changefreq: 'daily' },
  { path: '/about', priority: '0.6', changefreq: 'monthly' },
  { path: '/contact', priority: '0.6', changefreq: 'monthly' },
  { path: '/changelog', priority: '0.55', changefreq: 'weekly' },
  { path: '/privacy', priority: '0.3', changefreq: 'yearly' },
  { path: '/terms', priority: '0.3', changefreq: 'yearly' },
];

const urls = [
  ...staticPages.map((p) => ({
    loc: `${SITE_URL}${p.path === '/' ? '' : p.path}`,
    priority: p.priority,
    changefreq: p.changefreq,
    lastmod: TODAY,
  })),
  ...categories.map((id) => ({
    loc: `${SITE_URL}/categories/${id}`,
    priority: '0.8',
    changefreq: 'weekly',
    lastmod: TODAY,
  })),
  ...toolSlugs.map((slug) => ({
    loc: `${SITE_URL}/tools/${slug}`,
    priority: '0.75',
    changefreq: 'weekly',
    lastmod: TODAY,
  })),
  ...blogSlugs.map((slug) => ({
    loc: `${SITE_URL}/blog/${slug}`,
    priority: '0.7',
    changefreq: 'monthly',
    lastmod: TODAY,
  })),
];

const escapeXml = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urls
  .map(
    (u) => `  <url>
    <loc>${escapeXml(u.loc)}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>`;

const robotsTxt = `# Velomint — ${SITE_URL}
User-agent: *
Allow: /

# Block non-content paths
Disallow: /assets/

Sitemap: ${SITE_URL}/sitemap.xml
`;

writeFileSync(join(root, 'public/sitemap.xml'), sitemapXml);
writeFileSync(join(root, 'public/robots.txt'), robotsTxt);

console.log(`✓ SEO files generated for ${SITE_URL}`);
console.log(`  sitemap.xml — ${urls.length} URLs (${toolSlugs.length} tools, ${blogSlugs.length} blog posts)`);
console.log(`  robots.txt — Sitemap: ${SITE_URL}/sitemap.xml`);
