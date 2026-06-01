import { writeFileSync } from 'fs';

const DOMAIN = 'https://velomint.dev';
const STATIC = ['', '/tools', '/categories', '/blog', '/about', '/contact', '/privacy', '/terms', '/changelog'];

const tools = [
  'json-formatter', 'jwt-decoder', 'uuid-generator', 'rest-api-playground',
  // Extend with full tool slug list in CI
];

const urls = [
  ...STATIC.map((p) => ({ loc: `${DOMAIN}${p || '/'}`, priority: p ? '0.8' : '1.0' })),
  ...tools.map((slug) => ({ loc: `${DOMAIN}/tools/${slug}`, priority: '0.7' })),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u.loc}</loc><priority>${u.priority}</priority></url>`).join('\n')}
</urlset>`;

writeFileSync('public/sitemap.xml', xml);
console.log(`Wrote ${urls.length} URLs to public/sitemap.xml`);
