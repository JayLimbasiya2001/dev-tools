import { BRAND } from '@/config/brand';
import { SITE } from '@/config/site';
import type { ToolMeta } from '@/data/tools/types';

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: BRAND.name,
    url: BRAND.domain,
    logo: `${BRAND.domain}/logo.svg`,
    description: SITE.defaultDescription,
    email: BRAND.email,
    sameAs: [],
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: BRAND.name,
    url: BRAND.domain,
    description: SITE.defaultDescription,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${BRAND.domain}/tools?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

export function toolSchema(tool: ToolMeta) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    description: tool.description,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web Browser',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    url: `${BRAND.domain}/tools/${tool.slug}`,
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${BRAND.domain}${item.path}`,
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

export function articleSchema(article: {
  title: string;
  description: string;
  slug: string;
  datePublished: string;
  author: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    datePublished: article.datePublished,
    author: { '@type': 'Person', name: article.author },
    publisher: organizationSchema(),
    url: `${BRAND.domain}/blog/${article.slug}`,
  };
}
