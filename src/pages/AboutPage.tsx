import { SeoHead } from '@/features/seo/SeoHead';
import { organizationSchema } from '@/features/seo/schemas';
import { BRAND } from '@/config/brand';

export function AboutPage() {
  return (
    <>
      <SeoHead title="About" description={`Learn about ${BRAND.name} — premium browser-based developer tools.`} path="/about" jsonLd={organizationSchema()} />
      <article className="prose prose-invert max-w-3xl">
        <h1 className="font-display text-3xl font-bold text-gradient">About {BRAND.name}</h1>
        <p className="text-muted text-lg mt-4">
          {BRAND.name} is a frontend-only developer tools platform built for teams who care about speed, privacy, and craft. Every utility runs in your browser — no accounts, no uploads, no waiting.
        </p>
        <h2 className="font-display text-xl font-semibold mt-8">Our mission</h2>
        <p className="text-muted">
          We believe developer tools should feel like premium SaaS products: fast, beautiful, accessible, and respectful of your data. {BRAND.tagline}
        </p>
        <h2 className="font-display text-xl font-semibold mt-8">What we offer</h2>
        <ul className="text-muted space-y-2 list-disc pl-5">
          <li>70+ tools across formatting, encoding, conversion, API testing, and CSS</li>
          <li>Dark and light modes with system preference support</li>
          <li>Bookmarks, recent tools, and global search</li>
          <li>SEO-optimized pages for every tool</li>
        </ul>
      </article>
    </>
  );
}
