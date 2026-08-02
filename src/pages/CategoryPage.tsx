import { Link, useParams } from 'react-router-dom';
import { SeoHead } from '@/features/seo/SeoHead';
import { breadcrumbSchema, collectionPageSchema, faqSchema, webPageSchema } from '@/features/seo/schemas';
import { CATEGORIES, getCategory, type CategoryId } from '@/data/categories';
import { getToolsByCategory } from '@/data/tools/registry';
import { ToolGrid } from '@/components/tools/ToolGrid';
import { BLOG_POSTS } from '@/data/blog/posts';

const CATEGORY_EXPANDED_DATA: Record<string, {
  intro: string[];
  faqs: { question: string; answer: string }[];
  examples: { title: string; desc: string; code: string }[];
}> = {
  formatting: {
    intro: [
      'Structured data formats such as JSON, XML, HTML, CSS, JavaScript, SQL, YAML, and Markdown are essential for modern software development.',
      'Minified API responses or unformatted configuration files increase cognitive load and make debugging difficult. Velomint formatting tools allow software developers to instantly validate syntax, prettify code structures with 2-space or 4-space indentation, and minify payloads for production delivery.',
      'All formatting tools run 100% locally in JavaScript without sending your code or payloads to remote servers.',
    ],
    faqs: [
      { question: 'What formatting tools are included in this category?', answer: 'This hub includes JSON Formatter, JSON Validator, XML Formatter, HTML Formatter, CSS Formatter, JavaScript Formatter, SQL Formatter, YAML Formatter, and Markdown Formatter.' },
      { question: 'Does formatting change data values or property types?', answer: 'No. Formatting only adjusts whitespace and line breaks while keeping object keys, arrays, strings, booleans, and numbers identical.' },
      { question: 'Is my input data private?', answer: 'Yes. Processing happens client-side in your Web browser. Payload data is never stored or uploaded.' },
    ],
    examples: [
      { title: 'JSON Pretty Print', desc: 'Transform minified API JSON into clean 2-space indented objects.', code: '{"id":1,"user":"Ada"} ➔ {\n  "id": 1,\n  "user": "Ada"\n}' },
      { title: 'SQL Query Indentation', desc: 'Beautify complex SELECT and JOIN queries for readability.', code: 'SELECT * FROM users WHERE status=\'active\' ➔ SELECT *\nFROM users\nWHERE status = \'active\'' },
    ],
  },
  encoding: {
    intro: [
      'Data encoding converts raw bytes, strings, tokens, and entities into safe transport formats for HTTP headers, query strings, and HTML markup.',
      'Explore Base64 encoder/decoders, JWT token inspection, URL percent encoding, HTML entity escaping, and Unicode/ASCII character lookups.',
      'Verify JWT payload expiration times, scopes, and claims safely without revealing authentication tokens to 3rd party backend servers.',
    ],
    faqs: [
      { question: 'Are JWT tokens decrypted by these tools?', answer: 'JWT tokens are Base64URL encoded, not encrypted. Anyone can decode and view the payload claims without a secret key.' },
      { question: 'What is the difference between URL encoding and HTML encoding?', answer: 'URL encoding replaces characters like spaces and & for query parameters. HTML encoding escapes characters like < and > to prevent XSS.' },
    ],
    examples: [
      { title: 'Base64 Encoding', desc: 'Convert ASCII strings into Base64 transport encoding.', code: 'Hello World ➔ SGVsbG8gV29ybGQ=' },
      { title: 'URL Component Encoding', desc: 'Percent-encode spaces and special characters.', code: 'user=John Doe&role=admin ➔ user%3DJohn%20Doe%26role%3Dadmin' },
    ],
  },
  generators: {
    intro: [
      'Generators automate tedious developer tasks including producing cryptographically random UUID v4 IDs, secure passwords, SHA hashes, Lorem Ipsum, API mock JSON, and QR codes.',
      'All random values leverage browser window.crypto APIs for entropy suitable for database keys, seed scripts, and QA test environments.',
    ],
    faqs: [
      { question: 'How random are the generated UUIDs and passwords?', answer: 'They use Web Cryptography API (crypto.getRandomValues) for cryptographically secure pseudo-random number generation.' },
      { question: 'Can I generate multiple UUIDs at once?', answer: 'Yes. You can generate bulk UUID v4 strings for database seeding.' },
    ],
    examples: [
      { title: 'UUID v4 Generation', desc: 'Random 128-bit RFC 4122 compliant UUIDs.', code: 'f47ac10b-58cc-4372-a567-0e02b2c3d479' },
      { title: 'SHA-256 Hash Computation', desc: 'Deterministic 256-bit cryptographic digest.', code: 'velomint ➔ 1a2b3c4d...' },
    ],
  },
  converters: {
    intro: [
      'Converters bridge the gap between data structures: transform JSON to CSV, CSV to JSON, JSON to XML, XML to JSON, JSON to YAML, and Markdown to HTML.',
      'Migrate database exports, spreadsheet records, Kubernetes configuration files, and documentation pipelines instantly in your browser.',
    ],
    faqs: [
      { question: 'Can I convert large CSV spreadsheet files to JSON?', answer: 'Yes. The converter handles thousands of rows in client-side memory.' },
      { question: 'Does converting JSON to CSV preserve nested objects?', answer: 'Nested objects are flattened or stringified so spreadsheet columns remain tabular.' },
    ],
    examples: [
      { title: 'JSON Array to CSV', desc: 'Map object arrays to spreadsheet rows.', code: '[{"name":"Ada"}] ➔ name\nAda' },
      { title: 'YAML to JSON', desc: 'Parse Kubernetes YAML into JSON objects.', code: 'apiVersion: v1 ➔ {"apiVersion":"v1"}' },
    ],
  },
};

export function CategoryPage() {
  const { id } = useParams<{ id: string }>();
  const normalizedId = (id ? id.replace(/-tools$/, '') : '') as CategoryId;
  const cat = getCategory(normalizedId);

  const tools = cat
    ? getToolsByCategory(cat.id).map((t) => {
        const { component, ...m } = t;
        void component;
        return m;
      })
    : [];

  if (!cat) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold text-foreground">Category Not Found</h1>
        <Link to="/categories" className="text-accent mt-4 inline-block font-mono">
          ← Browse all categories
        </Link>
      </div>
    );
  }

  const categoryDetails = CATEGORY_EXPANDED_DATA[cat.id] || {
    intro: [
      `${cat.name} tools help software developers inspect, transform, generate, and optimize code efficiently.`,
      cat.description,
      'All utilities run 100% locally in your browser memory for speed and privacy.',
    ],
    faqs: [
      { question: `Are ${cat.name} tools free?`, answer: 'Yes. All tools on Velomint are free with unlimited usage.' },
      { question: 'Is my data stored on Velomint servers?', answer: 'No. Tools execute client-side in JavaScript without remote uploads.' },
    ],
    examples: [],
  };

  const categoryBlogs = BLOG_POSTS.slice(0, 3);
  const otherCategories = CATEGORIES.filter((c) => c.id !== cat.id);

  return (
    <>
      <SeoHead
        title={`${cat.name} Tools & Utilities Hub | Velomint`}
        description={`${cat.description} Explore ${tools.length} free ${cat.name.toLowerCase()} developer tools online. Fast, private, and client-side.`}
        path={`/categories/${cat.id}`}
        keywords={[cat.name.toLowerCase(), 'developer tools', `${cat.name.toLowerCase()} tools`, 'free online tools', cat.id]}
        jsonLd={[
          webPageSchema({ name: `${cat.name} Tools Hub`, description: cat.description, path: `/categories/${cat.id}` }),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Categories', path: '/categories' },
            { name: `${cat.name} Tools`, path: `/categories/${cat.id}` },
          ]),
          collectionPageSchema({
            name: `${cat.name} Developer Tools Hub`,
            description: cat.description,
            path: `/categories/${cat.id}`,
            items: tools.map((t) => ({ name: t.name, url: `/tools/${t.slug}` })),
          }),
          faqSchema(categoryDetails.faqs),
        ]}
      />

      <nav aria-label="Breadcrumb" className="text-xs text-muted mb-4 font-mono">
        <ol className="flex flex-wrap items-center gap-2">
          <li><Link to="/" className="hover:text-foreground transition-colors">Home</Link></li>
          <li>/</li>
          <li><Link to="/categories" className="hover:text-foreground transition-colors">Categories</Link></li>
          <li>/</li>
          <li className="text-foreground font-semibold">{cat.name} Tools</li>
        </ol>
      </nav>

      {/* CATEGORY HERO */}
      <section className="pb-8 border-b border-border mb-8">
        <div className="max-w-3xl">
          <span className="text-2xl">{cat.icon}</span>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mt-2 tracking-tight">
            {cat.name} Tools
          </h1>
          <p className="text-muted mt-2 text-sm sm:text-base leading-relaxed">
            {cat.description}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="badge badge-neutral">
              {tools.length} Tools
            </span>
            <span className="badge badge-accent">
              100% Client-Side
            </span>
          </div>
        </div>
      </section>

      {/* TOOLS GRID */}
      <section className="pb-10 border-b border-border mb-10">
        <h2 className="text-lg font-bold text-foreground mb-4">
          Available {cat.name} Utilities ({tools.length})
        </h2>
        <ToolGrid tools={tools} />
      </section>

      {/* CATEGORY DEEP INTRO */}
      <section className="pb-10 border-b border-border mb-10">
        <h2 className="text-lg font-bold text-foreground mb-3">
          Overview of {cat.name} Development Tools
        </h2>
        <div className="space-y-3 text-muted text-xs sm:text-sm leading-relaxed">
          {categoryDetails.intro.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </section>

      {/* CATEGORY EXAMPLES */}
      {categoryDetails.examples.length > 0 && (
        <section className="pb-10 border-b border-border mb-10">
          <h2 className="text-lg font-bold text-foreground mb-4">
            Code & Workflow Examples
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {categoryDetails.examples.map((ex) => (
              <div key={ex.title} className="surface-card p-4">
                <h3 className="font-semibold text-foreground text-xs">{ex.title}</h3>
                <p className="text-[11px] text-muted mt-1">{ex.desc}</p>
                <pre className="mt-3 text-[11px] font-mono bg-midnight p-3 rounded-lg border border-border text-accent overflow-x-auto">
                  {ex.code}
                </pre>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CATEGORY FAQ */}
      <section className="pb-10 border-b border-border mb-10">
        <h2 className="text-lg font-bold text-foreground mb-4">
          Frequently Asked Questions ({cat.name})
        </h2>
        <div className="space-y-3">
          {categoryDetails.faqs.map((f) => (
            <div key={f.question} className="surface-card p-4">
              <h3 className="font-semibold text-xs text-foreground">{f.question}</h3>
              <p className="text-xs text-muted mt-1.5 leading-relaxed">{f.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* RELATED BLOGS */}
      <section className="pb-10 border-b border-border mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-foreground">
            Related Documentation
          </h2>
          <Link to="/blog" className="text-xs font-mono text-accent hover:underline">
            All guides →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {categoryBlogs.map((b) => (
            <article key={b.slug} className="surface-card surface-card-hover p-4 flex flex-col justify-between">
              <div>
                <span className="badge badge-neutral text-[10px] uppercase mb-2">{b.category}</span>
                <h3 className="font-semibold text-xs text-foreground mt-2 line-clamp-2">
                  <Link to={`/blog/${b.slug}`} className="hover:text-accent transition-colors">{b.title}</Link>
                </h3>
                <p className="text-[11px] text-muted mt-1 line-clamp-2">{b.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* RELATED CATEGORIES */}
      <section>
        <h2 className="text-lg font-bold text-foreground mb-4">
          Explore Other Categories
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {otherCategories.slice(0, 4).map((c) => (
            <Link
              key={c.id}
              to={`/categories/${c.id}`}
              className="surface-card surface-card-hover p-4 group"
            >
              <span className="text-xl">{c.icon}</span>
              <h3 className="font-semibold mt-2 group-hover:text-accent transition-colors text-foreground text-xs">
                {c.name}
              </h3>
              <p className="text-[11px] text-muted mt-1 line-clamp-2">{c.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
