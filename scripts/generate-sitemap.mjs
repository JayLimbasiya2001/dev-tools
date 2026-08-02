import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const CANONICAL_SITE_URL = 'https://velomint.vercel.app';

function getSiteUrl() {
  if (process.env.VITE_SITE_URL?.trim()) {
    return process.env.VITE_SITE_URL.replace(/\/$/, '');
  }
  return CANONICAL_SITE_URL;
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

const categoryDirectSlugs = [
  'json-tools',
  'jwt-tools',
  'encoding-tools',
  'hash-tools',
  'regex-tools',
  'uuid-tools',
  'sql-tools',
  'html-tools',
  'css-tools',
  'xml-tools',
  'yaml-tools',
];

const mainPages = [
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

const escapeXml = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function buildUrlSet(urls) {
  return `<?xml version="1.0" encoding="UTF-8"?>
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
}

// 1. MAIN SITEMAP
const mainUrls = mainPages.map((p) => ({
  loc: p.path === '/' ? `${SITE_URL}/` : `${SITE_URL}${p.path}`,
  priority: p.priority,
  changefreq: p.changefreq,
  lastmod: TODAY,
}));
writeFileSync(join(root, 'public/sitemap-main.xml'), buildUrlSet(mainUrls));

// 2. CATEGORY SITEMAP
const categoryUrls = [
  ...categories.map((id) => ({
    loc: `${SITE_URL}/categories/${id}`,
    priority: '0.85',
    changefreq: 'weekly',
    lastmod: TODAY,
  })),
  ...categoryDirectSlugs.map((slug) => ({
    loc: `${SITE_URL}/${slug}`,
    priority: '0.85',
    changefreq: 'weekly',
    lastmod: TODAY,
  })),
];
writeFileSync(join(root, 'public/sitemap-category.xml'), buildUrlSet(categoryUrls));

// 3. TOOLS SITEMAP (with both /tools/:slug and clean /:slug)
const toolUrls = toolSlugs.flatMap((slug) => [
  { loc: `${SITE_URL}/tools/${slug}`, priority: '0.8', changefreq: 'weekly', lastmod: TODAY },
  { loc: `${SITE_URL}/${slug}`, priority: '0.8', changefreq: 'weekly', lastmod: TODAY },
]);
writeFileSync(join(root, 'public/sitemap-tools.xml'), buildUrlSet(toolUrls));

// 4. BLOG SITEMAP
const blogUrls = blogSlugs.map((slug) => ({
  loc: `${SITE_URL}/blog/${slug}`,
  priority: '0.75',
  changefreq: 'monthly',
  lastmod: TODAY,
}));
writeFileSync(join(root, 'public/sitemap-blog.xml'), buildUrlSet(blogUrls));

// 5. ROOT SITEMAP INDEX
const sitemapIndexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${SITE_URL}/sitemap-main.xml</loc>
    <lastmod>${TODAY}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${SITE_URL}/sitemap-category.xml</loc>
    <lastmod>${TODAY}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${SITE_URL}/sitemap-tools.xml</loc>
    <lastmod>${TODAY}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${SITE_URL}/sitemap-blog.xml</loc>
    <lastmod>${TODAY}</lastmod>
  </sitemap>
</sitemapindex>`;

writeFileSync(join(root, 'public/sitemap.xml'), sitemapIndexXml);

const robotsTxt = `# Velomint — ${SITE_URL}
User-agent: *
Allow: /

Disallow: /assets/

Sitemap: ${SITE_URL}/sitemap.xml
Sitemap: ${SITE_URL}/sitemap-main.xml
Sitemap: ${SITE_URL}/sitemap-category.xml
Sitemap: ${SITE_URL}/sitemap-tools.xml
Sitemap: ${SITE_URL}/sitemap-blog.xml
`;

writeFileSync(join(root, 'public/robots.txt'), robotsTxt);

console.log(`✓ Modular SEO sitemaps generated for ${SITE_URL}`);
console.log(`  sitemap-main.xml — ${mainUrls.length} URLs`);
console.log(`  sitemap-category.xml — ${categoryUrls.length} URLs`);
console.log(`  sitemap-tools.xml — ${toolUrls.length} URLs`);
console.log(`  sitemap-blog.xml — ${blogUrls.length} URLs`);
console.log(`  sitemap.xml — Index containing 4 sub-sitemaps`);
