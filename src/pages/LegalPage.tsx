import { SeoHead } from '@/features/seo/SeoHead';
import { BRAND } from '@/config/brand';

export function PrivacyPage() {
  return (
    <>
      <SeoHead title="Privacy Policy" path="/privacy" noindex />
      <LegalDoc title="Privacy Policy">
        <p>{BRAND.name} operates entirely in your browser. We do not collect, store, or transmit tool input data to our servers.</p>
        <h2>Local storage</h2>
        <p>We use local storage for theme preferences, bookmarks, and usage analytics (counts only, on your device).</p>
        <h2>Cookies & advertising</h2>
        <p>Third-party ad partners (e.g. Google AdSense) may set cookies when enabled. Review their policies before enabling ads in production.</p>
        <h2>Contact</h2>
        <p>Questions? Email {BRAND.email}</p>
      </LegalDoc>
    </>
  );
}

export function TermsPage() {
  return (
    <>
      <SeoHead title="Terms of Service" path="/terms" noindex />
      <LegalDoc title="Terms of Service">
        <p>By using {BRAND.name}, you agree to use tools responsibly and at your own risk.</p>
        <h2>No warranty</h2>
        <p>Tools are provided &quot;as is&quot; without warranties. Verify critical output before production use.</p>
        <h2>Limitation of liability</h2>
        <p>{BRAND.name} is not liable for damages arising from use of the platform.</p>
      </LegalDoc>
    </>
  );
}

function LegalDoc({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <article className="max-w-3xl">
      <h1 className="font-display text-3xl font-bold mb-6">{title}</h1>
      <div className="prose prose-invert text-muted space-y-4">{children}</div>
    </article>
  );
}
