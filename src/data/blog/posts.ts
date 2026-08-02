export type BlogCategory =
  | 'javascript'
  | 'react'
  | 'nodejs'
  | 'typescript'
  | 'css'
  | 'apis'
  | 'databases'
  | 'career';

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  category: BlogCategory;
  author: string;
  datePublished: string;
  content: string;
  tags: string[];
}

export const BLOG_CATEGORIES: { id: BlogCategory; label: string }[] = [
  { id: 'javascript', label: 'JavaScript' },
  { id: 'react', label: 'React' },
  { id: 'nodejs', label: 'Node.js' },
  { id: 'typescript', label: 'TypeScript' },
  { id: 'css', label: 'CSS' },
  { id: 'apis', label: 'APIs' },
  { id: 'databases', label: 'Databases' },
  { id: 'career', label: 'Career' },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'json-formatting-best-practices',
    title: 'JSON Formatting & Validation Best Practices for Production APIs',
    description: 'Learn when to minify JSON, how to validate payloads, avoid syntax mistakes, and keep your API responses consistent.',
    category: 'apis',
    author: 'Velomint Engineering',
    datePublished: '2026-05-15',
    tags: ['json', 'api', 'formatting', 'validation'],
    content: `## Why JSON formatting matters

Consistent JSON formatting improves debugging, code review, and documentation. In production, minified JSON reduces payload size — but during development, pretty-printed JSON saves hours of troubleshooting.

### Validate before you ship

Always validate JSON schemas at the edge. Use a JSON validator in CI and locally before deploying configuration changes to prevent breaking downstream API consumers.

### Minify selectively for edge delivery

Minify JSON for CDN-cached responses and mobile clients. Keep pretty-printed samples in your API docs for developer experience.

## Real API Examples & Debugging

When consuming external APIs like Stripe, GitHub, or OpenAI, JSON payloads often arrive unformatted. Using a client-side JSON Formatter restores clarity instantly without sending payloads over the network.`,
  },
  {
    slug: 'how-json-works-parsing-validation',
    title: 'How JSON Parsing Works & Debugging Common Syntax Errors',
    description: 'Deep dive into RFC 8259, JSON grammar, trailing comma pitfalls, and string escaping rules for developers.',
    category: 'javascript',
    author: 'Velomint Engineering',
    datePublished: '2026-06-10',
    tags: ['json', 'javascript', 'parsing', 'validation'],
    content: `## Anatomy of Strict JSON

JSON (RFC 8259) requires double quotes around keys, prohibits trailing commas, and enforces UTF-8 encoding.

### Common Syntax Errors

1. **Trailing commas:** \`{"a": 1,}\` is invalid in JSON.
2. **Unquoted keys:** \`{a: 1}\` is valid JS but invalid JSON.
3. **Single quotes:** Strings must use double quotes.

Use Velomint's JSON Validator and Formatter to detect line-number syntax errors before committing configs.`,
  },
  {
    slug: 'json-vs-xml-vs-yaml-guide',
    title: 'JSON vs XML vs YAML: Choosing the Right Data Format',
    description: 'Compare performance, readability, schema validation, and tool support across JSON, XML, and YAML.',
    category: 'apis',
    author: 'Velomint Engineering',
    datePublished: '2026-06-18',
    tags: ['json', 'xml', 'yaml', 'converters'],
    content: `## Format Comparison

- **JSON:** Ideal for Web APIs, modern frontends, and NoSQL databases.
- **YAML:** Preferred for Kubernetes, CI/CD pipelines, and application configuration.
- **XML:** Standard in legacy enterprise, SOAP services, and document markup.

Convert between formats easily using Velomint's JSON to YAML and XML to JSON converters.`,
  },
  {
    slug: 'jwt-security-frontend-developers',
    title: 'JWT Security: What Frontend Developers Must Know',
    description: 'Decode JWTs safely, inspect headers and claims, and avoid security vulnerabilities in token handling.',
    category: 'javascript',
    author: 'Velomint Security',
    datePublished: '2026-05-28',
    tags: ['jwt', 'security', 'auth', 'base64'],
    content: `## JWTs are not encrypted by default

Base64Url decoding allows anyone to inspect JWT claims. Never store sensitive passwords or secret keys in JWT payloads.

### Verifying Signatures

Always verify JWT signatures on the backend server. Frontend decoding with Velomint's JWT Decoder is strictly for debugging expiration times and scopes.`,
  },
  {
    slug: 'css-clamp-fluid-typography',
    title: 'Mastering CSS clamp() for Fluid Responsive Typography',
    description: 'Build responsive type scales and dynamic layouts without dozens of media queries using clamp().',
    category: 'css',
    author: 'Velomint Design',
    datePublished: '2026-06-01',
    tags: ['css', 'typography', 'responsive', 'clamp'],
    content: `## The clamp formula

\`clamp(min, preferred, max)\` calculates fluid text sizes bounded by accessible minimums and maximums.

Experiment visually with Velomint's CSS Clamp Generator to calculate viewport formulas.`,
  },
  {
    slug: 'hashing-vs-encryption-developer-guide',
    title: 'Hashing vs Encryption: Cryptographic Best Practices',
    description: 'Understand SHA-256 vs AES vs Base64 encoding. Know when to hash, encrypt, or encode in modern web apps.',
    category: 'typescript',
    author: 'Velomint Security',
    datePublished: '2026-06-25',
    tags: ['hash', 'crypto', 'base64', 'security'],
    content: `## One-Way Hashes vs Two-Way Encryption

Hashes (SHA-256, SHA-512) are deterministic one-way functions designed for integrity verification. Encoding (Base64) is two-way and unencrypted.

Use Velomint's Hash Generator and Base64 Encoder to test cryptographic outputs safely in your browser.`,
  },
];

export function getPost(slug: string) {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getPostsByCategory(category: BlogCategory) {
  return BLOG_POSTS.filter((p) => p.category === category);
}

export function getAllTags(): string[] {
  const tags = new Set(BLOG_POSTS.flatMap((p) => p.tags));
  return [...tags].sort((a, b) => a.localeCompare(b));
}

export function getPostsByTag(tag: string) {
  const t = tag.toLowerCase();
  return BLOG_POSTS.filter((p) => p.tags.some((x) => x.toLowerCase() === t));
}

export function getRelatedPosts(post: BlogPost, limit = 3) {
  return BLOG_POSTS.filter((p) => p.slug !== post.slug && p.category === post.category).slice(0, limit);
}

export function getBlogsForTool(toolSlug: string): BlogPost[] {
  const s = toolSlug.toLowerCase();
  const matched = BLOG_POSTS.filter((p) =>
    p.tags.some((t) => s.includes(t) || t.includes(s.split('-')[0])),
  );
  return matched.length ? matched : BLOG_POSTS.slice(0, 3);
}

