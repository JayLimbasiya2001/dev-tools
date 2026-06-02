import { Link } from 'react-router-dom';
import type { ToolMeta } from '@/data/tools/types';
import type { Category } from '@/data/categories';
import type { ToolPageContent } from './types';
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
      <h2 className="font-display text-xl sm:text-2xl font-bold mb-4">
        {title}
      </h2>
      {children}
    </section>
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
        <p className="text-xs font-mono text-violet mb-2">
          {category?.icon} {category?.name} · Free online tool
        </p>
        <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
          {tool.name}
        </h1>
        <p className="text-muted mt-3 max-w-3xl">{tool.description}</p>

        <div className="mt-6 flex flex-wrap gap-2">{actions}</div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.slice(0, 4).map((h) => (
            <div key={h} className="rounded-2xl border border-border/60 bg-card/30 p-4">
              <p className="text-sm font-medium">{h}</p>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}

export function TrustBadges() {
  const items = [
    { title: 'Privacy-first', desc: 'Most tools run locally in your browser.' },
    { title: 'No uploads', desc: 'No file upload required for standard tools.' },
    { title: 'Fast', desc: 'Instant results with copy/download actions.' },
    { title: 'Bookmarkable', desc: 'Save favorites and share tool URLs.' },
  ];
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((i) => (
        <div key={i.title} className="glass rounded-2xl p-5">
          <p className="text-sm font-semibold text-mint">{i.title}</p>
          <p className="text-sm text-muted mt-1">{i.desc}</p>
        </div>
      ))}
    </div>
  );
}

export function ToolToc() {
  const links = [
    ['tool', 'Tool'],
    ['what-is', 'What is this tool?'],
    ['how-to', 'How to use'],
    ['examples', 'Real examples'],
    ['use-cases', 'Common use cases'],
    ['tips', 'Developer tips'],
    ['mistakes', 'Common mistakes'],
    ['benefits', 'Benefits'],
    ['faq', 'FAQ'],
    ['related', 'Related tools'],
  ] as const;
  return (
    <nav aria-label="On this page" className="glass rounded-2xl p-4">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">
        On this page
      </p>
      <ul className="space-y-2 text-sm">
        {links.map(([id, label]) => (
          <li key={id}>
            <a href={`#${id}`} className="text-muted hover:text-mint">
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
  return (
    <div className="space-y-12">
      <Section id="what-is" title={`What is ${tool.name}?`}>
        <div className="prose prose-invert max-w-none prose-a:text-mint">
          {content.whatIsParagraphs.map((para, i) => (
            <p key={i} className="text-muted leading-relaxed">
              {para}
            </p>
          ))}
        </div>
      </Section>

      <Section id="how-to" title="How to use (step-by-step)">
        <ol className="space-y-3">
          {content.howToSteps.map((s) => (
            <li key={s.step} className="glass rounded-2xl p-5">
              <p className="text-xs font-mono text-violet mb-1">Step {s.step}</p>
              <p className="font-semibold">{s.title}</p>
              <p className="text-sm text-muted mt-1">{s.description}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="examples" title="Real examples">
        <div className="grid gap-4 lg:grid-cols-3">
          {content.examples.map((ex) => (
            <article key={ex.title} className="glass rounded-2xl p-5">
              <h3 className="font-semibold">{ex.title}</h3>
              <p className="text-sm text-muted mt-2">{ex.explanation}</p>
              {ex.input && (
                <details className="mt-3">
                  <summary className="text-xs text-mint cursor-pointer">
                    Show input / output
                  </summary>
                  <pre className="mt-3 text-xs overflow-auto rounded-xl bg-midnight/40 border border-border p-3">
                    {ex.input}
                    {ex.output ? `\n\n---\n\n${ex.output}` : ''}
                  </pre>
                </details>
              )}
            </article>
          ))}
        </div>
      </Section>

      <Section id="use-cases" title="Common use cases">
        <ul className="grid gap-3 sm:grid-cols-2">
          {content.useCases.map((u) => (
            <li key={u} className="glass rounded-2xl p-5 text-sm text-muted">
              {u}
            </li>
          ))}
        </ul>
      </Section>

      <Section id="tips" title="Developer tips">
        <ul className="space-y-2">
          {content.developerTips.map((t) => (
            <li key={t} className="text-sm text-muted">
              <span className="text-mint font-medium">Tip:</span> {t}
            </li>
          ))}
        </ul>
      </Section>

      <Section id="mistakes" title="Common mistakes (and how to fix them)">
        <div className="space-y-3">
          {content.commonMistakes.map((m) => (
            <div key={m.mistake} className="glass rounded-2xl p-5">
              <p className="text-sm font-semibold text-coral">Mistake: {m.mistake}</p>
              <p className="text-sm text-muted mt-2">
                <span className="text-mint font-medium">Fix:</span> {m.fix}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="benefits" title="Benefits">
        <ul className="grid gap-3 sm:grid-cols-2">
          {content.benefits.map((b) => (
            <li key={b} className="glass rounded-2xl p-5 text-sm text-muted">
              {b}
            </li>
          ))}
        </ul>
      </Section>

      <Section id="faq" title="Frequently asked questions">
        <div className="space-y-3">
          {content.faqs.map((f) => (
            <details key={f.question} className="glass rounded-2xl p-5">
              <summary className="cursor-pointer font-semibold">
                {f.question}
              </summary>
              <p className="text-sm text-muted mt-2 leading-relaxed">{f.answer}</p>
            </details>
          ))}
        </div>
      </Section>

      {relatedSlugs.length > 0 && (
        <Section id="related" title="Explore related tools">
          <div className="flex flex-wrap gap-2">
            {relatedSlugs.slice(0, 10).map((t) => (
              <Link
                key={t.slug}
                to={`/tools/${t.slug}`}
                className="btn-secondary text-xs"
              >
                {t.name}
              </Link>
            ))}
          </div>
        </Section>
      )}
    </div>
  );
}

