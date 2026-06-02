/** Curated internal link clusters for SEO topical authority */
export const TOOL_LINK_CLUSTERS: Record<string, string[]> = {
  'json-formatter': ['json-validator', 'json-minifier', 'json-to-csv', 'json-to-yaml', 'yaml-to-json', 'api-mock-data-generator'],
  'json-validator': ['json-formatter', 'json-minifier', 'json-to-xml', 'xml-to-json'],
  'json-minifier': ['json-formatter', 'json-validator', 'javascript-minifier', 'html-minifier'],
  'jwt-decoder': ['jwt-inspector', 'base64-encoder-decoder', 'hash-generator', 'api-request-builder'],
  'jwt-inspector': ['jwt-decoder', 'hash-generator', 'rest-api-playground'],
  'base64-encoder-decoder': ['url-encoder-decoder', 'html-encoder-decoder', 'image-to-base64', 'jwt-decoder'],
  'regex-tester': ['password-generator', 'slug-generator', 'json-validator', 'text-compare'],
  'password-generator': ['hash-generator', 'uuid-generator', 'regex-tester'],
  'uuid-generator': ['password-generator', 'slug-generator', 'api-mock-data-generator'],
  'rest-api-playground': ['api-request-builder', 'curl-builder', 'response-viewer', 'http-status-explorer', 'mock-api-response-builder'],
  'markdown-to-html': ['html-to-markdown', 'markdown-formatter', 'html-formatter'],
  'flexbox-generator': ['grid-generator', 'box-shadow-generator', 'gradient-generator', 'css-formatter'],
  'timestamp-converter': ['unix-time-converter', 'cron-expression-builder'],
  'diff-checker': ['text-compare', 'json-formatter'],
};

export function getClusterLinks(slug: string): string[] {
  return TOOL_LINK_CLUSTERS[slug] ?? [];
}
