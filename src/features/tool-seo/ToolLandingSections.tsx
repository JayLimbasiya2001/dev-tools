import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { ToolMeta } from '@/data/tools/types';
import type { Category } from '@/data/categories';
import type { ToolPageContent } from './types';
import { getBlogsForTool, type BlogPost } from '@/data/blog/posts';
import { copyToClipboard } from '@/lib/clipboard';
import { cn } from '@/lib/utils';

function Section({
  id,
  title,
  children,
  className,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn('scroll-mt-24 py-8 border-b border-border', className)}>
      <h2 className="font-display text-lg sm:text-xl font-bold mb-4 text-foreground">
        {title}
      </h2>
      {children}
    </section>
  );
}

export function SocialShareBar({ title, url }: { title: string; url: string }) {
  const [copied, setCopied] = useState(false);
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`;

  const handleCopy = async () => {
    await copyToClipboard(url, 'Page link copied to clipboard!');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-wrap items-center gap-3 py-3 border-y border-border my-6 text-xs">
      <span className="font-mono text-muted uppercase">Share:</span>
      <a
        href={twitterUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-secondary py-1 px-3 text-xs flex items-center gap-1.5"
      >
        Twitter
      </a>
      <a
        href={linkedinUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-secondary py-1 px-3 text-xs flex items-center gap-1.5"
      >
        LinkedIn
      </a>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-secondary py-1 px-3 text-xs flex items-center gap-1.5"
      >
        WhatsApp
      </a>
      <button
        type="button"
        onClick={handleCopy}
        className="btn-secondary py-1 px-3 text-xs ml-auto font-mono text-accent"
      >
        {copied ? '✓ Copied' : '🔗 Copy Link'}
      </button>
    </div>
  );
}

export function ToolHero({
  tool,
  category,
  highlights,
  actions,
}: {
  tool: ToolMeta;
  category?: Category;
  highlights: string[];
  actions: React.ReactNode;
}) {
  return (
    <header className="pb-8 border-b border-border">
      <div className="flex items-center gap-2 mb-3">
        <span className="badge badge-neutral">
          {category?.icon} {category?.name}
        </span>
        <span className="badge badge-accent">
          Free Utility
        </span>
      </div>

      <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
        {tool.name}
      </h1>

      <p className="text-muted mt-2 max-w-3xl text-sm sm:text-base leading-relaxed">
        {tool.description}
      </p>

      <div className="mt-6 flex flex-wrap gap-2.5">{actions}</div>

      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {highlights.slice(0, 4).map((h) => (
          <div key={h} className="surface-card p-3.5">
            <p className="text-[11px] font-mono text-accent mb-0.5">● Highlight</p>
            <p className="text-xs font-medium text-foreground">{h}</p>
          </div>
        ))}
      </div>
    </header>
  );
}

export function TrustBadges() {
  const items = [
    { title: '100% Browser Processing', desc: 'Runs client-side in WebAssembly/JS.' },
    { title: 'Zero Server Upload', desc: 'Payloads and tokens never leave memory.' },
    { title: 'Multi-Megabyte Payload Support', desc: 'Stream parser handles large data files.' },
    { title: 'Updated Daily', desc: 'Maintained for modern HTML5 browsers.' },
  ];
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 my-6">
      {items.map((i) => (
        <div key={i.title} className="surface-card p-4">
          <p className="text-xs font-semibold text-accent">{i.title}</p>
          <p className="text-[11px] text-muted mt-1 leading-relaxed">{i.desc}</p>
        </div>
      ))}
    </div>
  );
}

export function ToolFeaturesGrid() {
  const features = [
    { name: 'Fast Local Execution', desc: 'Zero latency network round-trips' },
    { name: 'Browser Based', desc: 'No signup or CLI installation required' },
    { name: 'Privacy First', desc: 'Inputs never traverse backend servers' },
    { name: 'Syntax Highlighting', desc: 'Color coded syntax for readable structures' },
    { name: 'Error Detection', desc: 'Line-level parser error notices' },
    { name: 'Large File Support', desc: 'Processes heavy payloads in browser' },
    { name: 'File Download', desc: 'One-click export to .json or .txt' },
    { name: 'Clipboard Export', desc: 'Instant copy to system clipboard' },
    { name: 'Keyboard Shortcuts', desc: 'Full keyboard navigation support' },
    { name: 'High Contrast Mode', desc: 'Built for long engineering sessions' },
  ];

  return (
    <Section id="features" title="Key Features & Technical Specs">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => (
          <div key={f.name} className="surface-card p-3.5 flex items-start gap-2.5">
            <span className="text-accent font-bold text-xs">✓</span>
            <div>
              <p className="text-xs font-semibold text-foreground">{f.name}</p>
              <p className="text-[11px] text-muted mt-0.5">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

export function ToolToc() {
  const links = [
    ['tool', 'Workspace'],
    ['features', 'Key Features'],
    ['what-is', 'What is this tool?'],
    ['how-to', 'How to use'],
    ['why-velomint', 'Why use Velomint'],
    ['examples', 'Realistic Examples'],
    ['use-cases', 'Use cases'],
    ['tips', 'Developer tips'],
    ['mistakes', 'Common mistakes'],
    ['benefits', 'Benefits'],
    ['faq', 'FAQ'],
    ['related', 'Related tools'],
    ['related-blogs', 'Documentation'],
  ] as const;
  return (
    <nav aria-label="On this page" className="surface-card p-4 sticky top-20">
      <p className="text-[11px] font-mono uppercase tracking-wider text-muted mb-3 flex items-center gap-1.5">
        <span>📍</span> Table of Contents
      </p>
      <ul className="space-y-1.5 text-xs font-medium">
        {links.map(([id, label]) => (
          <li key={id}>
            <a href={`#${id}`} className="text-muted hover:text-foreground transition-colors block py-0.5">
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function ToolContentSections({
  tool,
  content,
  relatedSlugs,
}: {
  tool: ToolMeta;
  content: ToolPageContent;
  relatedSlugs: { slug: string; name: string }[];
}) {
  const relatedBlogs: BlogPost[] = getBlogsForTool(tool.slug);

  return (
    <div className="space-y-4">
      <ToolFeaturesGrid />

      <Section id="what-is" title={`What is ${tool.name}?`}>
        <div className="prose prose-invert max-w-none text-muted leading-relaxed space-y-3 text-xs sm:text-sm">
          {content.whatIsParagraphs.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </Section>

      <Section id="how-to" title={`How to Use ${tool.name}`}>
        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {content.howToSteps.map((s) => (
            <li key={s.step} className="surface-card p-4">
              <span className="badge badge-neutral text-[10px] mb-2">Step 0{s.step}</span>
              <p className="font-semibold text-foreground text-xs">{s.title}</p>
              <p className="text-[11px] text-muted mt-1 leading-relaxed">{s.description}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="why-velomint" title={`Why Use Velomint ${tool.name}?`}>
        <div className="surface-card p-5">
          <p className="text-xs sm:text-sm text-muted mb-4">
            Unlike legacy utility portals that load ad frames or track user input telemetry, Velomint is built for privacy and performance:
          </p>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="p-3 bg-dark-elevated rounded-lg border border-border">
              <p className="text-xs font-semibold text-accent">Zero Latency</p>
              <p className="text-[11px] text-muted mt-1">Executes in client-side memory without HTTP network overhead.</p>
            </div>
            <div className="p-3 bg-dark-elevated rounded-lg border border-border">
              <p className="text-xs font-semibold text-foreground">100% Privacy First</p>
              <p className="text-[11px] text-muted mt-1">Your code and payloads stay in your local browser instance.</p>
            </div>
            <div className="p-3 bg-dark-elevated rounded-lg border border-border">
              <p className="text-xs font-semibold text-foreground">Ad-Free Workspace</p>
              <p className="text-[11px] text-muted mt-1">High-contrast workspace designed for focused engineering work.</p>
            </div>
          </div>
        </div>
      </Section>

      <Section id="examples" title="Realistic Code Examples">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {content.examples.map((ex) => (
            <article key={ex.title} className="surface-card p-4 flex flex-col justify-between">
              <div>
                <h3 className="font-semibold text-foreground text-xs flex items-center justify-between">
                  <span>{ex.title}</span>
                  <span className="badge badge-neutral text-[10px]">Sample</span>
                </h3>
                <p className="text-[11px] text-muted mt-1.5 leading-relaxed">{ex.explanation}</p>
              </div>

              {(ex.input || ex.output) && (
                <div className="mt-3">
                  {ex.input && (
                    <div className="mt-2">
                      <p className="text-[10px] font-mono text-muted uppercase">Input:</p>
                      <pre className="mt-1 text-[11px] font-mono overflow-x-auto rounded-lg bg-midnight p-2.5 text-accent/90 max-h-28 border border-border">
                        {ex.input}
                      </pre>
                    </div>
                  )}
                  {ex.output && (
                    <div className="mt-2">
                      <p className="text-[10px] font-mono text-muted uppercase">Output:</p>
                      <pre className="mt-1 text-[11px] font-mono overflow-x-auto rounded-lg bg-midnight p-2.5 text-foreground/90 max-h-32 border border-border">
                        {ex.output}
                      </pre>
                    </div>
                  )}
                </div>
              )}
            </article>
          ))}
        </div>
      </Section>

      <Section id="use-cases" title="Common Use Cases">
        <ul className="grid gap-2.5 sm:grid-cols-2">
          {content.useCases.map((u) => (
            <li key={u} className="surface-card p-3 text-xs text-muted flex items-center gap-2">
              <span className="text-accent">•</span>
              <span>{u}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="tips" title="Developer Tips">
        <div className="grid gap-3 sm:grid-cols-2">
          {content.developerTips.map((t) => (
            <div key={t} className="surface-card p-3.5">
              <p className="text-[11px] font-semibold text-accent mb-0.5">Tip</p>
              <p className="text-xs text-muted leading-relaxed">{t}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="mistakes" title="Common Mistakes & Fixes">
        <div className="space-y-2.5">
          {content.commonMistakes.map((m) => (
            <div key={m.mistake} className="surface-card p-4">
              <p className="text-xs font-semibold text-coral-400">Mistake: {m.mistake}</p>
              <p className="text-xs text-muted mt-1 leading-relaxed">
                <span className="text-accent font-semibold">Fix:</span> {m.fix}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="benefits" title="Benefits for Engineering Teams">
        <ul className="grid gap-2.5 sm:grid-cols-2">
          {content.benefits.map((b) => (
            <li key={b} className="surface-card p-3 text-xs text-muted flex items-start gap-2">
              <span className="text-accent font-bold">✓</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="faq" title="Frequently Asked Questions (FAQ)">
        <div className="space-y-2.5">
          {content.faqs.map((f) => (
            <details key={f.question} className="surface-card p-4 group">
              <summary className="cursor-pointer font-semibold text-foreground text-xs sm:text-sm flex items-center justify-between">
                <span>{f.question}</span>
                <span className="text-muted group-open:rotate-180 transition-transform">↓</span>
              </summary>
              <p className="text-xs text-muted mt-2 leading-relaxed pt-2 border-t border-border">
                {f.answer}
              </p>
            </details>
          ))}
        </div>
      </Section>

      {relatedSlugs.length > 0 && (
        <Section id="related" title={`People searching ${tool.name} also use`}>
          <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
            {relatedSlugs.map((t) => (
              <Link
                key={t.slug}
                to={`/tools/${t.slug}`}
                className="surface-card surface-card-hover p-3.5 flex items-center justify-between text-xs"
              >
                <span className="font-medium text-foreground">{t.name}</span>
                <span className="font-mono text-accent">Open →</span>
              </Link>
            ))}
          </div>
        </Section>
      )}

      {relatedBlogs.length > 0 && (
        <Section id="related-blogs" title="Related Guides & Documentation">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {relatedBlogs.map((b) => (
              <article key={b.slug} className="surface-card surface-card-hover p-4 flex flex-col justify-between">
                <div>
                  <span className="badge badge-neutral text-[10px] uppercase mb-2">{b.category}</span>
                  <h3 className="font-semibold text-xs text-foreground hover:text-accent transition-colors line-clamp-2">
                    <Link to={`/blog/${b.slug}`}>{b.title}</Link>
                  </h3>
                  <p className="text-[11px] text-muted mt-1 line-clamp-2 leading-relaxed">{b.description}</p>
                </div>
                <Link to={`/blog/${b.slug}`} className="text-xs text-accent font-mono mt-3 hover:underline">
                  Read guide →
                </Link>
              </article>
            ))}
          </div>
        </Section>
      )}
    </div>
  );
}
