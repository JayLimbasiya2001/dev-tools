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
    title: 'JSON Formatting Best Practices for Production APIs',
    description: 'Learn when to minify JSON, how to validate payloads, and tools that keep your API responses consistent.',
    category: 'apis',
    author: 'Velomint Team',
    datePublished: '2026-05-15',
    tags: ['json', 'api', 'formatting'],
    content: `## Why JSON formatting matters

Consistent JSON formatting improves debugging, code review, and documentation. In production, minified JSON reduces payload size — but during development, pretty-printed JSON saves hours.

### Validate before you ship

Always validate JSON schemas at the edge. Use a JSON validator in CI and locally before deploying configuration changes.

### Minify selectively

Minify JSON for CDN-cached responses and mobile clients. Keep pretty-printed samples in your API docs for developer experience.

## Tools that help

Velomint's JSON Formatter, Validator, and Minifier run entirely in your browser — no data leaves your machine.`,
  },
  {
    slug: 'react-performance-checklist-2026',
    title: 'React Performance Checklist for 2026',
    description: 'A practical checklist for Core Web Vitals, lazy loading, and bundle optimization in React 19 apps.',
    category: 'react',
    author: 'Velomint Team',
    datePublished: '2026-05-20',
    tags: ['react', 'performance', 'core web vitals'],
    content: `## Core Web Vitals first

LCP, INP, and CLS should drive your optimization priorities — not arbitrary bundle size targets.

### Code splitting

Use route-level lazy loading with \`React.lazy\` and Suspense. Prefetch critical routes on hover for dashboard apps.

### Images

Always specify width and height. Use lazy loading for below-the-fold media.

## Measuring success

Run Lighthouse on mobile throttling weekly. Track regressions in CI.`,
  },
  {
    slug: 'jwt-security-frontend-developers',
    title: 'JWT Security What Frontend Developers Must Know',
    description: 'Decode JWTs safely, understand claims, and never treat the payload as trusted data.',
    category: 'javascript',
    author: 'Velomint Team',
    datePublished: '2026-05-28',
    tags: ['jwt', 'security', 'auth'],
    content: `## JWTs are not encrypted

Anyone can decode the payload. Never store secrets in JWT claims.

### Validate server-side

Frontend decoding is for debugging only. Authorization decisions belong on the server.

### Use short expirations

Pair access tokens with refresh flows. Rotate signing keys regularly.`,
  },
  {
    slug: 'css-clamp-fluid-typography',
    title: 'Mastering CSS clamp() for Fluid Typography',
    description: 'Build responsive type scales without dozens of media queries using clamp().',
    category: 'css',
    author: 'Velomint Team',
    datePublished: '2026-06-01',
    tags: ['css', 'typography', 'responsive'],
    content: `## The clamp formula

\`clamp(min, preferred, max)\` gives you fluid values bounded by sensible limits.

### Example

\`font-size: clamp(1rem, 2.5vw, 2.5rem);\` scales smoothly between mobile and desktop.

Try Velomint's CSS Clamp Generator to experiment visually.`,
  },
];

export function getPost(slug: string) {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getPostsByCategory(category: BlogCategory) {
  return BLOG_POSTS.filter((p) => p.category === category);
}

export function getRelatedPosts(post: BlogPost, limit = 3) {
  return BLOG_POSTS.filter((p) => p.slug !== post.slug && p.category === post.category).slice(0, limit);
}
