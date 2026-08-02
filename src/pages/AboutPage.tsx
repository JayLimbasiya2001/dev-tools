import { SeoHead } from '@/features/seo/SeoHead';
import { organizationSchema } from '@/features/seo/schemas';
import { BRAND } from '@/config/brand';

export function AboutPage() {
  return (
    <>
      <SeoHead
        title="About Velomint Engineering"
        description={`Learn about ${BRAND.name} — fast, secure, browser-based developer tools.`}
        path="/about"
        jsonLd={organizationSchema()}
      />
      <article className="max-w-3xl py-6">
        <div className="badge badge-neutral mb-3">About {BRAND.name}</div>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
          Engineering Privacy-First Developer Tools
        </h1>
        <p className="text-muted text-sm sm:text-base mt-4 leading-relaxed">
          {BRAND.name} is a frontend-only developer tools platform built for software engineering teams who care about speed, privacy, and craft. Every utility runs in your browser memory — zero accounts, zero data uploads, zero network latency.
        </p>

        <div className="my-8 py-6 border-y border-border space-y-4">
          <h2 className="font-display text-lg font-bold text-foreground">Our Core Principles</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="surface-card p-4">
              <p className="text-xs font-semibold text-accent">1. Privacy by Default</p>
              <p className="text-xs text-muted mt-1 leading-relaxed">
                Your secrets, API keys, tokens, and payloads stay on your device. We do not store or transmit input data.
              </p>
            </div>
            <div className="surface-card p-4">
              <p className="text-xs font-semibold text-foreground">2. Handcrafted DX</p>
              <p className="text-xs text-muted mt-1 leading-relaxed">
                Clean high-contrast dark UI with keyboard shortcuts, command palette (`⌘K`), and 8px spacing rhythm.
              </p>
            </div>
          </div>
        </div>

        <h2 className="font-display text-lg font-bold text-foreground">What We Offer</h2>
        <ul className="text-xs sm:text-sm text-muted mt-3 space-y-2 list-disc pl-5 leading-relaxed">
          <li>200+ browser tools across formatting, encoding, conversion, API testing, and CSS generation</li>
          <li>WCAG AA compliant dark and light modes</li>
          <li>Raycast/Linear style command palette search with instant keyboard navigation</li>
          <li>Complete documentation, realistic code examples, and edge-case FAQs for every utility</li>
        </ul>
      </article>
    </>
  );
}
