import { useEffect } from 'react';
import { BRAND } from '@/config/brand';
import { SITE } from '@/config/site';

interface SeoHeadProps {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  type?: 'website' | 'article';
  noindex?: boolean;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = content;
}

function upsertLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
}

export function SeoHead({
  title,
  description = SITE.defaultDescription,
  path = '',
  image = `${BRAND.domain}/og-default.png`,
  type = 'website',
  noindex = false,
  jsonLd,
}: SeoHeadProps) {
  const fullTitle = title ? `${title} | ${BRAND.name}` : SITE.defaultTitle;
  const url = `${BRAND.domain}${path}`;
  const schemas = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];

  useEffect(() => {
    document.title = fullTitle;
    upsertMeta('name', 'description', description);
    upsertLink('canonical', url);

    if (noindex) {
      upsertMeta('name', 'robots', 'noindex,nofollow');
    } else {
      const robots = document.querySelector('meta[name="robots"]');
      robots?.remove();
    }

    upsertMeta('property', 'og:type', type);
    upsertMeta('property', 'og:title', fullTitle);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:url', url);
    upsertMeta('property', 'og:image', image);
    upsertMeta('property', 'og:site_name', BRAND.name);

    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', fullTitle);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', image);

    const existing = document.querySelectorAll('script[data-seo-ld]');
    existing.forEach((n) => n.remove());

    schemas.forEach((schema, i) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-seo-ld', String(i));
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    });

    return () => {
      document.querySelectorAll('script[data-seo-ld]').forEach((n) => n.remove());
    };
  }, [fullTitle, description, url, image, type, noindex, schemas.length]);

  return null;
}
