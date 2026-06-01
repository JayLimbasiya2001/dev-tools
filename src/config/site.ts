import { BRAND } from './brand';

export const SITE = {
  ...BRAND,
  defaultTitle: `${BRAND.name} — ${BRAND.tagline}`,
  defaultDescription:
    'Premium browser-based developer tools for formatting, encoding, converting, API testing, CSS generation, and more. 70+ free utilities — no signup required.',
  locale: 'en_US',
  language: 'en',
} as const;

export const NAV_LINKS = [
  { label: 'Tools', href: '/tools' },
  { label: 'Categories', href: '/categories' },
  { label: 'Blog', href: '/blog' },
  { label: 'Changelog', href: '/changelog' },
] as const;

export const FOOTER_LINKS = {
  product: [
    { label: 'All Tools', href: '/tools' },
    { label: 'Categories', href: '/categories' },
    { label: 'Changelog', href: '/changelog' },
  ],
  company: [
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Blog', href: '/blog' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
} as const;
