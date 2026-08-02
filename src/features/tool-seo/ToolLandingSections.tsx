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
    <section id={id} className={cn('scroll-mt-28', className)}>
      <h2 className="font-display text-xl sm:text-2xl font-bold mb-4 text-foreground">
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
    <div className="flex flex-wrap items-center gap-3 py-3 border-y border-border/50 my-6">
      <span className="text-xs font-mono text-muted uppercase tracking-wider">Share:</span>
      <a
        href={twitterUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-secondary text-xs py-1.5 px-3 flex items-center gap-1.5 hover:text-mint"
        aria-label="Share on Twitter / X"
      >
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
        Twitter
      </a>
      <a
        href={linkedinUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-secondary text-xs py-1.5 px-3 flex items-center gap-1.5 hover:text-mint"
        aria-label="Share on LinkedIn"
      >
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
        </svg>
        LinkedIn
      </a>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-secondary text-xs py-1.5 px-3 flex items-center gap-1.5 hover:text-mint"
        aria-label="Share on WhatsApp"
      >
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm5.8 14.16c-.24.68-1.2 1.24-1.96 1.4-.52.11-1.2.2-3.49-.75-2.93-1.22-4.82-4.21-4.97-4.41-.14-.2-1.18-1.57-1.18-3 0-1.43.74-2.13 1.01-2.42.27-.29.6-.36.8-.36.2 0 .4 0 .57.01.19.01.44-.07.69.53.25.6.86 2.1.94 2.26.08.16.13.35.03.55-.1.2-.15.33-.3.51-.15.18-.32.4-.46.54-.15.15-.31.31-.13.62.18.31.8 1.32 1.72 2.14 1.18 1.05 2.18 1.38 2.49 1.53.31.15.5.13.68-.08.19-.2.79-.92 1-1.23.21-.31.42-.26.71-.15.29.11 1.84.87 2.15 1.02.31.15.52.23.59.36.08.14.08.8-.16 1.48z" />
        </svg>
        WhatsApp
      </a>
      <button
        type="button"
        onClick={handleCopy}
        className="btn-secondary text-xs py-1.5 px-3 flex items-center gap-1.5 hover:text-mint ml-auto"
      >
        <span className="text-mint font-mono">{copied ? '✓ Copied' : '🔗 Copy Link'}</span>
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
    <header className="glass rounded-3xl p-6 sm:p-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-mint/10 via-transparent to-violet/10 pointer-events-none" />
      <div className="relative">
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-violet/10 text-violet border border-violet/20">
            {category?.icon} {category?.name}
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-mono bg-mint/10 text-mint border border-mint/20">
            Free Online Tool
          </span>
        </div>

        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
          {tool.name}
        </h1>

        <p className="text-muted mt-3 max-w-3xl text-base sm:text-lg leading-relaxed">
          {tool.description}
        </p>

        <div className="mt-6 flex flex-wrap gap-2.5">{actions}</div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.slice(0, 4).map((h) => (
            <div key={h} className="rounded-2xl border border-border/60 bg-card/30 p-4">
              <p className="text-xs font-mono text-mint mb-1">⚡ Feature</p>
              <p className="text-sm font-medium text-foreground/90">{h}</p>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}

export function TrustBadges() {
  const items = [
    { title: '100% Browser Processing', desc: 'Runs client-side in WebAssembly/JS. Zero server uploads.', icon: '🛡️' },
    { title: 'No Server Upload', desc: 'Your tokens, logs, and sensitive data stay on your device.', icon: '🔒' },
    { title: 'Millions of Chars', desc: 'Optimized parser handles large production payloads smoothly.', icon: '⚡' },
    { title: 'Updated July 2026', desc: 'Version 2.4.0 — Maintained daily with modern web standards.', icon: '✨' },
  ];
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 my-6">
      {items.map((i) => (
        <div key={i.title} className="glass rounded-2xl p-5 border border-border/70 hover:border-mint/30 transition">
          <span className="text-xl">{i.icon}</span>
          <p className="text-sm font-semibold text-mint mt-2">{i.title}</p>
          <p className="text-xs text-muted mt-1 leading-relaxed">{i.desc}</p>
        </div>
      ))}
    </div>
  );
}

export function ToolFeaturesGrid() {
  const features = [
    { name: 'Fast', desc: 'Instant local execution without latency' },
    { name: 'Browser Based', desc: 'Zero installation or account sign-up needed' },
    { name: 'Privacy First', desc: 'Inputs never leave your local machine memory' },
    { name: 'Syntax Highlighting', desc: 'Color coded brackets, keys, and tokens' },
    { name: 'Error Detection', desc: 'Line-by-line syntax error notifications' },
    { name: 'Large File Support', desc: 'Stream processing for heavy payloads' },
    { name: 'Download File', desc: 'Export formatted output with one click' },
    { name: 'Copy to Clipboard', desc: 'Instant clipboard copy for codebases' },
    { name: 'Paste & Clear', desc: 'Quick actions to reset or import code' },
    { name: 'Drag & Drop', desc: 'Drop .json, .txt, or .xml files directly' },
    { name: 'Keyboard Shortcuts', desc: 'Press ⌘Enter to run, ⌘Shift+C to copy' },
    { name: 'Dark Mode', desc: 'High-contrast midnight theme built for dev eyes' },
  ];

  return (
    <Section id="features" title="Key Features & Capabilities">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => (
          <div key={f.name} className="glass rounded-2xl p-4 flex items-start gap-3 border border-border/60">
            <span className="text-mint font-bold text-sm">✓</span>
            <div>
              <p className="text-sm font-semibold text-foreground">{f.name}</p>
              <p className="text-xs text-muted mt-0.5">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

export function ToolToc() {
  const links = [
    ['tool', 'Tool Workspace'],
    ['features', 'Key Features'],
    ['what-is', 'What is this tool?'],
    ['how-to', 'How to use'],
    ['why-velomint', 'Why use Velomint'],
    ['examples', 'Realistic Examples'],
    ['use-cases', 'Use cases'],
    ['tips', 'Developer tips'],
    ['mistakes', 'Common mistakes'],
    ['benefits', 'Benefits'],
    ['faq', 'FAQ (10 Q&As)'],
    ['related', 'Related tools'],
    ['related-blogs', 'Related guides'],
  ] as const;
  return (
    <nav aria-label="On this page" className="glass rounded-2xl p-5 sticky top-24">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-3 flex items-center gap-1.5">
        <span className="text-mint">📍</span> Table of Contents
      </p>
      <ul className="space-y-2 text-xs font-medium">
        {links.map(([id, label]) => (
          <li key={id}>
            <a href={`#${id}`} className="text-muted hover:text-mint transition block py-0.5">
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
    <div className="space-y-12">
      <ToolFeaturesGrid />

      <Section id="what-is" title={`What is ${tool.name}?`}>
        <div className="prose prose-invert max-w-none text-muted leading-relaxed space-y-4 text-base">
          {content.whatIsParagraphs.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </Section>

      <Section id="how-to" title={`How to Use ${tool.name} (Step-by-Step)`}>
        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {content.howToSteps.map((s) => (
            <li key={s.step} className="glass rounded-2xl p-5 border border-border/60">
              <span className="inline-block text-xs font-mono text-violet bg-violet/10 px-2.5 py-1 rounded-full mb-2">
                Step 0{s.step}
              </span>
              <p className="font-semibold text-foreground text-sm">{s.title}</p>
              <p className="text-xs text-muted mt-1.5 leading-relaxed">{s.description}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="why-velomint" title={`Why Use Velomint ${tool.name}?`}>
        <div className="glass rounded-2xl p-6 border border-border/80">
          <p className="text-sm text-muted mb-4">
            Unlike traditional developer utilities that display intrusive ads or upload sensitive payloads to backend servers,
            Velomint is engineered specifically for privacy, speed, and reliability:
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border border-border/60 bg-card/40 p-4">
              <p className="text-sm font-semibold text-mint">⚡ Zero Latency</p>
              <p className="text-xs text-muted mt-1">Executes instantly in WebAssembly/JS without waiting for HTTP network round-trips.</p>
            </div>
            <div className="rounded-xl border border-border/60 bg-card/40 p-4">
              <p className="text-sm font-semibold text-violet">🔒 100% Privacy First</p>
              <p className="text-xs text-muted mt-1">Your code, credentials, and API responses never leave your browser memory.</p>
            </div>
            <div className="rounded-xl border border-border/60 bg-card/40 p-4">
              <p className="text-sm font-semibold text-amber">🚫 No Ads or Clutter</p>
              <p className="text-xs text-muted mt-1">Clean developer workspace designed for high-focus coding without distractions.</p>
            </div>
          </div>
        </div>
      </Section>

      <Section id="examples" title="Realistic Developer Code Examples">
        <div className="grid gap-4 lg:grid-cols-3">
          {content.examples.map((ex) => (
            <article key={ex.title} className="glass rounded-2xl p-5 border border-border/70 flex flex-col justify-between">
              <div>
                <h3 className="font-semibold text-foreground text-sm flex items-center justify-between">
                  <span>{ex.title}</span>
                  <span className="text-xs font-mono text-violet bg-violet/10 px-2 py-0.5 rounded">Sample</span>
                </h3>
                <p className="text-xs text-muted mt-2 leading-relaxed">{ex.explanation}</p>
              </div>

              {(ex.input || ex.output) && (
                <div className="mt-4">
                  {ex.input && (
                    <div className="mt-2">
                      <p className="text-[10px] font-mono text-muted uppercase">Input:</p>
                      <pre className="mt-1 text-[11px] font-mono overflow-x-auto rounded-xl bg-midnight/80 border border-border p-3 text-mint/90 max-h-32">
                        {ex.input}
                      </pre>
                    </div>
                  )}
                  {ex.output && (
                    <div className="mt-2">
                      <p className="text-[10px] font-mono text-muted uppercase">Output:</p>
                      <pre className="mt-1 text-[11px] font-mono overflow-x-auto rounded-xl bg-midnight/80 border border-border p-3 text-foreground/90 max-h-36">
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

      <Section id="use-cases" title="Common Industry Use Cases">
        <ul className="grid gap-3 sm:grid-cols-2">
          {content.useCases.map((u) => (
            <li key={u} className="glass rounded-2xl p-4 text-xs sm:text-sm text-muted flex items-center gap-2 border border-border/60">
              <span className="text-violet">✦</span>
              <span>{u}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="tips" title="Developer Best Practices & Tips">
        <div className="grid gap-3 sm:grid-cols-2">
          {content.developerTips.map((t) => (
            <div key={t} className="glass rounded-2xl p-4 border border-border/60">
              <p className="text-xs font-semibold text-mint mb-1">Pro Tip</p>
              <p className="text-xs sm:text-sm text-muted leading-relaxed">{t}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="mistakes" title="Common Mistakes (and How to Fix Them)">
        <div className="space-y-3">
          {content.commonMistakes.map((m) => (
            <div key={m.mistake} className="glass rounded-2xl p-5 border border-coral/20">
              <p className="text-xs sm:text-sm font-semibold text-coral flex items-center gap-1.5">
                <span>⚠️</span> Mistake: {m.mistake}
              </p>
              <p className="text-xs sm:text-sm text-muted mt-2 leading-relaxed">
                <span className="text-mint font-semibold">Solution:</span> {m.fix}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="benefits" title="Benefits for Engineering Teams">
        <ul className="grid gap-3 sm:grid-cols-2">
          {content.benefits.map((b) => (
            <li key={b} className="glass rounded-2xl p-5 text-xs sm:text-sm text-muted flex items-start gap-2.5 border border-border/60">
              <span className="text-mint font-bold">✓</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="faq" title="Frequently Asked Questions (FAQ)">
        <div className="space-y-3">
          {content.faqs.map((f) => (
            <details key={f.question} className="glass rounded-2xl p-5 border border-border/70 group">
              <summary className="cursor-pointer font-semibold text-foreground text-sm sm:text-base flex items-center justify-between">
                <span>{f.question}</span>
                <span className="text-mint group-open:rotate-180 transition-transform">↓</span>
              </summary>
              <p className="text-xs sm:text-sm text-muted mt-3 leading-relaxed pt-3 border-t border-border/40">
                {f.answer}
              </p>
            </details>
          ))}
        </div>
      </Section>

      {relatedSlugs.length > 0 && (
        <Section id="related" title={`People searching ${tool.name} also use`}>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {relatedSlugs.map((t) => (
              <Link
                key={t.slug}
                to={`/tools/${t.slug}`}
                className="glass rounded-2xl p-4 border border-border/60 hover:border-mint/40 transition group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-foreground group-hover:text-mint">
                    {t.name}
                  </span>
                  <span className="text-xs font-mono text-mint">Open →</span>
                </div>
              </Link>
            ))}
          </div>
        </Section>
      )}

      {relatedBlogs.length > 0 && (
        <Section id="related-blogs" title="Related Guides & Documentation">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relatedBlogs.map((b) => (
              <article key={b.slug} className="glass rounded-2xl p-5 border border-border/60 hover:border-violet/40 transition flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono text-violet uppercase tracking-wider">{b.category}</span>
                  <h3 className="font-semibold text-sm text-foreground mt-2 line-clamp-2">
                    <Link to={`/blog/${b.slug}`} className="hover:text-mint">{b.title}</Link>
                  </h3>
                  <p className="text-xs text-muted mt-2 line-clamp-2">{b.description}</p>
                </div>
                <Link to={`/blog/${b.slug}`} className="text-xs text-violet font-mono mt-4 hover:underline">
                  Read article →
                </Link>
              </article>
            ))}
          </div>
        </Section>
      )}

      <div className="glass rounded-3xl p-8 border border-mint/30 bg-gradient-to-br from-mint/10 via-transparent to-violet/10 text-center">
        <h2 className="font-display text-2xl font-bold text-foreground">Need More Developer Utilities?</h2>
        <p className="text-sm text-muted max-w-xl mx-auto mt-2">
          Explore all 200+ free online developer tools on Velomint — private, fast, and browser-based.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link to="/tools" className="btn-primary">Browse All Tools</Link>
          <Link to="/categories" className="btn-secondary">View Tool Categories</Link>
        </div>
      </div>
    </div>
  );
}
