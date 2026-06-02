import type { BlogCategory } from './posts';

export interface ArticleIdea {
  category: BlogCategory | 'json' | 'jwt' | 'regex' | 'html' | 'frontend' | 'backend' | 'web-security';
  title: string;
  angle: string;
}

export const ARTICLE_IDEAS: ArticleIdea[] = [
  // JSON
  { category: 'json', title: 'JSON Schema vs TypeScript Types', angle: 'When to validate at runtime, where types end, and how to keep them in sync.' },
  { category: 'json', title: 'Top 15 JSON Parse Errors (and Fixes)', angle: 'Real error messages from browsers and how to troubleshoot quickly.' },
  { category: 'json', title: 'Minify vs Pretty Print', angle: 'Performance tradeoffs and DX best practices for APIs.' },
  { category: 'json', title: 'Designing Stable JSON APIs', angle: 'Versioning, backward compatibility, and breaking change strategies.' },
  { category: 'json', title: 'JSON for Logs: What to Include', angle: 'Structured logging fields that make incidents faster to debug.' },
  { category: 'json', title: 'Migrating from CSV to JSON', angle: 'How to model spreadsheets as objects, arrays, and nested relationships.' },
  { category: 'json', title: 'Config Drift: JSON vs YAML', angle: 'Pros, cons, and how to avoid silent formatting differences.' },
  { category: 'json', title: 'Validating Webhooks with JSON Schema', angle: 'Protect services from malformed payloads and breaking provider changes.' },

  // JWT
  { category: 'jwt', title: 'JWT Claims You Should Always Validate', angle: 'iss, aud, exp, nbf, iat — and the real-world pitfalls.' },
  { category: 'jwt', title: 'HS256 vs RS256 in 2026', angle: 'How to choose, rotate keys, and avoid shared secret sprawl.' },
  { category: 'jwt', title: 'Why JWT Payloads Are Not Private', angle: 'Base64URL is encoding, not encryption — and what to do instead.' },
  { category: 'jwt', title: 'Debugging 401s with Decoded Tokens', angle: 'A step-by-step checklist for auth failures.' },
  { category: 'jwt', title: 'Access vs Refresh Tokens', angle: 'Expiration strategies that balance security and user experience.' },
  { category: 'jwt', title: 'JWT Security Misconfigurations', angle: 'Algorithm confusion, none attacks, and missing audience checks.' },
  { category: 'jwt', title: 'OIDC id_token vs access_token', angle: 'What each token is for and how to validate correctly.' },

  // Regex
  { category: 'regex', title: 'Regex Performance: Avoid Catastrophic Backtracking', angle: 'Pattern rewrites that keep production endpoints safe.' },
  { category: 'regex', title: 'Anchors Explained: ^ and $', angle: 'Why validation rules fail without anchors and how to test them.' },
  { category: 'regex', title: 'Common Regex Patterns for Web Apps', angle: 'Usernames, slugs, IDs, and safe text extraction.' },
  { category: 'regex', title: 'Regex vs Parsers', angle: 'When regex is perfect and when it is the wrong tool.' },
  { category: 'regex', title: 'Unicode in Regex', angle: 'Character classes, \\p{} properties, and real i18n pitfalls.' },
  { category: 'regex', title: 'Building Safer Validation Rules', angle: 'Practical guidelines for forms and API payloads.' },

  // JavaScript
  { category: 'javascript', title: 'The Modern Clipboard API', angle: 'Reliable copy-to-clipboard patterns with fallbacks and UX.' },
  { category: 'javascript', title: 'URL Encoding Gotchas', angle: 'encodeURI vs encodeURIComponent and common bugs in query building.' },
  { category: 'javascript', title: 'Safer HTML Rendering in the Browser', angle: 'Escaping, sanitization, and XSS threat models.' },
  { category: 'javascript', title: 'Web Crypto: Hashing and Digests', angle: 'What SHA is good for, and what it is not.' },
  { category: 'javascript', title: 'Generating Random Values Correctly', angle: 'crypto.getRandomValues vs Math.random and security impact.' },
  { category: 'javascript', title: 'Parsing and Formatting Dates', angle: 'Why timezones break apps and how to design safer conversions.' },

  // React
  { category: 'react', title: 'Route-Level Code Splitting in React Router', angle: 'Patterns for fast navigations and stable UX.' },
  { category: 'react', title: 'Command Palette UX Patterns', angle: 'Accessibility, keyboard navigation, and search ranking.' },
  { category: 'react', title: 'Designing Form UX with React Hook Form + Zod', angle: 'Validation, error messages, and performance at scale.' },
  { category: 'react', title: 'Optimizing INP in React Apps', angle: 'Practical steps to reduce main-thread blocking.' },
  { category: 'react', title: 'State Management with Zustand', angle: 'Simple patterns that avoid re-render storms.' },

  // TypeScript
  { category: 'typescript', title: 'Zod Schemas That Scale', angle: 'Reusable validators, refinement patterns, and error ergonomics.' },
  { category: 'typescript', title: 'Type-Safe Tool Registries', angle: 'Build discoverability systems without losing type safety.' },
  { category: 'typescript', title: 'When to Use Generics vs Inference', angle: 'Avoiding over-typed APIs in real apps.' },
  { category: 'typescript', title: 'Fast Builds with TS Project References', angle: 'How tsconfig references keep large repos manageable.' },

  // Node.js / Backend
  { category: 'nodejs', title: 'Pragmatic API Request Debugging', angle: 'Headers, bodies, and cURL commands for fast reproduction.' },
  { category: 'backend', title: 'Designing Import Pipelines', angle: 'Converting CSV/XML into JSON safely with validation.' },
  { category: 'backend', title: 'HTTP Status Codes That Matter', angle: 'A production guide to 4xx/5xx and client UX.' },
  { category: 'backend', title: 'Content-Type and MIME Types', angle: 'Correct negotiation and common mistakes with uploads.' },

  // APIs
  { category: 'apis', title: 'Building Stable OpenAPI Specs', angle: 'Versioning, examples, and contract testing.' },
  { category: 'apis', title: 'GraphQL Variables Done Right', angle: 'Avoiding string concatenation and injection pitfalls.' },
  { category: 'apis', title: 'Mock Responses for Parallel Development', angle: 'How to keep mocks aligned with real APIs.' },
  { category: 'apis', title: 'Webhook Debugging Checklist', angle: 'Signature validation, retries, and idempotency.' },

  // CSS / HTML / Frontend
  { category: 'css', title: 'CSS clamp() Recipes', angle: 'Fluid typography patterns for real design systems.' },
  { category: 'css', title: 'Box Shadows That Look Premium', angle: 'Layered shadows, color mixing, and design heuristics.' },
  { category: 'css', title: 'Flexbox vs Grid Decision Guide', angle: 'Which layout tool to choose and why.' },
  { category: 'css', title: 'Accessible Color Contrast', angle: 'WCAG AA/AAA, text sizes, and real-world testing.' },
  { category: 'html', title: 'HTML Minification Without Breaking Layout', angle: 'Whitespace-sensitive contexts and safe minify rules.' },
  { category: 'frontend', title: 'SVG Optimization for Production', angle: 'viewBox, paths, metadata removal, and performance.' },
  { category: 'frontend', title: 'SVG to React Components', angle: 'Props, accessibility, and sizing correctly.' },
  { category: 'frontend', title: 'Responsive QA Without Guesswork', angle: 'Breakpoints, real devices, and quick testing workflows.' },

  // Web Security
  { category: 'web-security', title: 'XSS Basics for Frontend Devs', angle: 'Escaping vs sanitization and how attacks actually work.' },
  { category: 'web-security', title: 'Secret Handling 101', angle: 'Why tokens leak and safe handling practices.' },
  { category: 'web-security', title: 'CORS Debugging Guide', angle: 'Preflight, headers, and common deployment misconfigs.' },
  { category: 'web-security', title: 'Content Security Policy for Apps', angle: 'A pragmatic CSP you can deploy without breaking everything.' },
  { category: 'web-security', title: 'JWT Threat Models', angle: 'Replay attacks, token theft, and mitigation strategies.' },
];

// Fill to 100 ideas with high-signal variants
const FILLER: ArticleIdea[] = [
  { category: 'apis', title: 'Designing Pagination that Scales', angle: 'Cursor vs offset pagination and UX implications.' },
  { category: 'apis', title: 'Idempotency Keys Explained', angle: 'Preventing duplicate charges and double writes in APIs.' },
  { category: 'typescript', title: 'Runtime Validation Patterns', angle: 'Why types are not enough when data crosses network boundaries.' },
  { category: 'react', title: 'Skeleton Loaders Done Right', angle: 'Preventing layout shift while keeping perceived speed high.' },
  { category: 'frontend', title: 'Core Web Vitals for Tool Sites', angle: 'LCP, INP, CLS strategies for multi-tool SPAs.' },
  { category: 'javascript', title: 'Handling Large Text Inputs', angle: 'Performance techniques for editors, diff views, and formatters.' },
  { category: 'css', title: 'Building a Token System', angle: 'Mapping brand colors to variables for light/dark theming.' },
  { category: 'backend', title: 'Logging That Engineers Actually Use', angle: 'Structured logs, correlation IDs, and redaction.' },
  { category: 'json', title: 'Designing Error Responses', angle: 'Consistent error envelopes that improve client debugging.' },
  { category: 'regex', title: 'Regex for Log Parsing', angle: 'Extracting ids, statuses, and timestamps reliably.' },
  { category: 'jwt', title: 'Key Rotation Playbook', angle: 'How to rotate without breaking users.' },
  { category: 'html', title: 'Escaping HTML Entities Correctly', angle: 'When to escape, where it breaks, and safe rendering pipelines.' },
];

while (ARTICLE_IDEAS.length < 100) {
  ARTICLE_IDEAS.push(FILLER[ARTICLE_IDEAS.length % FILLER.length]);
}

