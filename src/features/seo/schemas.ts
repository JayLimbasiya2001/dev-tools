import { BRAND } from '@/config/brand';
import { SITE } from '@/config/site';
import { resolveSiteUrl } from '@/config/site-url';
import type { ToolMeta } from '@/data/tools/types';

function siteUrl() {
  return resolveSiteUrl();
}

export function organizationSchema() {
  const url = siteUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${url}/#organization`,
    name: BRAND.name,
    url,
    logo: {
      '@type': 'ImageObject',
      url: `${url}/logo.svg`,
      width: 200,
      height: 48,
    },
    description: SITE.defaultDescription,
    email: BRAND.email,
    foundingDate: BRAND.founded,
    sameAs: [],
  };
}

export function websiteSchema() {
  const url = siteUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${url}/#website`,
    name: BRAND.name,
    url,
    description: SITE.defaultDescription,
    publisher: { '@id': `${url}/#organization` },
    inLanguage: SITE.language,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${url}/tools?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function webPageSchema({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  const url = siteUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${url}${path}#webpage`,
    name,
    description,
    url: `${url}${path}`,
    isPartOf: { '@id': `${url}/#website` },
    inLanguage: SITE.language,
  };
}

export function toolSchema(tool: ToolMeta) {
  const url = siteUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': `${url}/tools/${tool.slug}#software`,
    name: tool.name,
    description: tool.description,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web Browser',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    softwareVersion: '1.0',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
    url: `${url}/tools/${tool.slug}`,
    keywords: [...tool.tags, ...tool.keywords].join(', '),
    isPartOf: { '@id': `${url}/#website` },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  const url = siteUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${url}${item.path}`,
    })),
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
}

export function itemListSchema(items: { name: string; url: string }[], listName: string) {
  const url = siteUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: listName,
    numberOfItems: items.length,
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      url: item.url.startsWith('http') ? item.url : `${url}${item.url}`,
    })),
  };
}

export function collectionPageSchema({
  name,
  description,
  path,
  items,
}: {
  name: string;
  description: string;
  path: string;
  items: { name: string; url: string }[];
}) {
  const url = siteUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${url}${path}#collection`,
    name,
    description,
    url: `${url}${path}`,
    isPartOf: { '@id': `${url}/#website` },
    mainEntity: itemListSchema(items, name),
  };
}

export function articleSchema(article: {
  title: string;
  description: string;
  slug: string;
  datePublished: string;
  author: string;
}) {
  const url = siteUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${url}/blog/${article.slug}#article`,
    headline: article.title,
    description: article.description,
    datePublished: article.datePublished,
    dateModified: article.datePublished,
    author: { '@type': 'Person', name: article.author },
    publisher: organizationSchema(),
    image: `${url}/og-image.svg`,
    mainEntityOfPage: `${url}/blog/${article.slug}`,
    url: `${url}/blog/${article.slug}`,
    inLanguage: SITE.language,
  };
}

/** SEO-optimized title for tool pages (50-60 characters, high conversion intent) */
export function toolSeoTitle(tool: ToolMeta): string {
  if (tool.slug === 'json-formatter') {
    return `Free JSON Formatter & Validator Online | Beautify & Minify JSON | ${BRAND.name}`;
  }
  if (tool.name.toLowerCase().includes('formatter')) {
    const subject = tool.name.replace(/ Formatter/i, '');
    return `Free ${tool.name} & Validator Online | Beautify & Minify ${subject} | ${BRAND.name}`;
  }
  if (tool.name.toLowerCase().includes('decoder') || tool.name.toLowerCase().includes('encoder')) {
    return `Free ${tool.name} Online | Fast & Secure Encoder Decoder | ${BRAND.name}`;
  }
  if (tool.name.toLowerCase().includes('generator')) {
    return `Free ${tool.name} Online | Instant Random Generator | ${BRAND.name}`;
  }
  if (tool.name.toLowerCase().includes('converter')) {
    return `Free ${tool.name} Online | Transform Data Instantly | ${BRAND.name}`;
  }
  return `Free ${tool.name} Online | Developer Utility & Playground | ${BRAND.name}`;
}

export function toolSeoDescription(tool: ToolMeta): string {
  if (tool.slug === 'json-formatter') {
    return 'Format, validate, beautify and minify JSON instantly. Secure browser-based JSON Formatter with syntax highlighting, file upload and error detection.';
  }
  return `${tool.description} Fast, secure, browser-based ${tool.name} with syntax highlighting, sample data, and instant clipboard export on ${BRAND.name}.`;
}

export function toolSeoKeywords(tool: ToolMeta): string[] {
  return [
    ...tool.keywords,
    ...tool.tags,
    tool.name.toLowerCase(),
    'free online tool',
    'developer tools',
    'browser tool',
    BRAND.name.toLowerCase(),
  ];
}

