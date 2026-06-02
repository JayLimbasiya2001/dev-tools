import { CANONICAL_SITE_URL, isVercelPreviewHost } from './canonical-url';

/**
 * Canonical site URL for meta tags, JSON-LD, and share links.
 * Preview deployments still point SEO at the production domain.
 */
export function resolveSiteUrl(): string {
  const fromEnv = import.meta.env.VITE_SITE_URL as string | undefined;
  if (fromEnv?.trim()) return fromEnv.replace(/\/$/, '');

  if (typeof window !== 'undefined') {
    const { hostname, origin } = window.location;
    if (isVercelPreviewHost(hostname)) {
      return CANONICAL_SITE_URL;
    }
    return origin;
  }

  return CANONICAL_SITE_URL;
}
