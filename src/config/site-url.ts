/**
 * Canonical site URL — used for sitemap, robots, canonical tags, and JSON-LD.
 * Override with VITE_SITE_URL in Vercel env when you add a custom domain.
 */
const DEFAULT_SITE_URL = 'https://velomint.vercel.app';

export function resolveSiteUrl(): string {
  const fromEnv = import.meta.env.VITE_SITE_URL as string | undefined;
  if (fromEnv?.trim()) return fromEnv.replace(/\/$/, '');
  if (typeof window !== 'undefined' && window.location.origin) {
    return window.location.origin;
  }
  return DEFAULT_SITE_URL;
}

export const SITE_URL = resolveSiteUrl();
