import { useEffect, useMemo } from 'react';
import { BRAND } from '@/config/brand';
import { SITE } from '@/config/site';
import { resolveSiteUrl } from '@/config/site-url';

interface SeoHeadProps {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  imageAlt?: string;
  type?: 'website' | 'article';
  keywords?: string[];
  noindex?: boolean;
  publishedTime?: string;
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

function upsertLink(rel: string, href: string, type?: string) {
  const selector = type ? `link[rel="${rel}"][type="${type}"]` : `link[rel="${rel}"]`;
  let el = document.querySelector(selector) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.rel = rel;
    if (type) el.type = type;
    document.head.appendChild(el);
  }
  el.href = href;
}

export function SeoHead({
  title,
  description = SITE.defaultDescription,
  path = '',
  image,
  imageAlt,
  type = 'website',
  keywords = [],
  noindex = false,
  publishedTime,
  jsonLd,
}: SeoHeadProps) {
  const siteUrl = resolveSiteUrl();
  const fullTitle = title ? (title.includes(BRAND.name) ? title : `${title} | ${BRAND.name}`) : SITE.defaultTitle;
  const url = `${siteUrl}${path}`;
  const ogImage = image ?? `${siteUrl}/og-image.svg`;
  const ogImageAlt = imageAlt ?? `${BRAND.name} — ${BRAND.tagline}`;
  const keywordStr = keywords.length ? keywords.join(', ') : undefined;

  const schemas = useMemo(
    () => (Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : []),
    [jsonLd],
  );
  const schemaKey = useMemo(() => JSON.stringify(schemas), [schemas]);

  useEffect(() => {
    document.title = fullTitle;
    document.documentElement.lang = SITE.language;

    upsertMeta('name', 'description', description);
    upsertMeta('name', 'author', BRAND.name);
    upsertMeta('name', 'application-name', BRAND.name);

    if (keywordStr) upsertMeta('name', 'keywords', keywordStr);
    else document.querySelector('meta[name="keywords"]')?.remove();

    upsertLink('canonical', url);
    upsertLink('sitemap', `${siteUrl}/sitemap.xml`, 'application/xml');

    if (noindex) {
      upsertMeta('name', 'robots', 'noindex,nofollow');
    } else {
      upsertMeta(
        'name',
        'robots',
        'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1',
      );
      upsertMeta('name', 'googlebot', 'index,follow');
    }

    upsertMeta('property', 'og:type', type);
    upsertMeta('property', 'og:title', fullTitle);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:url', url);
    upsertMeta('property', 'og:image', ogImage);
    upsertMeta('property', 'og:image:alt', ogImageAlt);
    upsertMeta('property', 'og:site_name', BRAND.name);
    upsertMeta('property', 'og:locale', SITE.locale);

    if (publishedTime && type === 'article') {
      upsertMeta('property', 'article:published_time', publishedTime);
    }

    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:site', BRAND.twitter);
    upsertMeta('name', 'twitter:title', fullTitle);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', ogImage);
    upsertMeta('name', 'twitter:image:alt', ogImageAlt);

    document.querySelectorAll('script[data-seo-ld]').forEach((n) => n.remove());
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
  }, [
    fullTitle,
    description,
    url,
    ogImage,
    ogImageAlt,
    type,
    noindex,
    keywordStr,
    publishedTime,
    siteUrl,
    schemaKey,
    schemas,
  ]);

  return null;
}
