/** Production canonical URL — used for SEO regardless of preview deployment host. */
export const CANONICAL_SITE_URL = 'https://velomint.vercel.app';

/** Preview deployment hosts contain this pattern (e.g. velomint-abc123-team.vercel.app). */
export function isVercelPreviewHost(hostname: string): boolean {
  return (
    hostname.endsWith('.vercel.app') &&
    hostname !== 'velomint.vercel.app' &&
    hostname.includes('-')
  );
}
