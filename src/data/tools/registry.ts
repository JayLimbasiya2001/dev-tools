import { lazy, type ComponentType } from 'react';
import type { ToolDefinition } from './types';

const fmt = () => import('@/features/tools/formatting/FormattingTools');
const enc = () => import('@/features/tools/encoding/EncodingTools');
const gen = () => import('@/features/tools/generators/GeneratorTools');
const conv = () => import('@/features/tools/converters/ConverterTools');
const util = () => import('@/features/tools/utilities/UtilityTools');
const adv = () => import('@/features/tools/advanced/AdvancedTools');
const css = () => import('@/features/tools/css/CssTools');
const fe = () => import('@/features/tools/frontend/FrontendTools');

function tool(
  partial: Omit<ToolDefinition, 'component'> & {
    component: () => Promise<{ default: ComponentType } | Record<string, ComponentType>>;
    exportName: string;
  },
): ToolDefinition {
  const { exportName, component: loader, ...meta } = partial;
  return {
    ...meta,
    component: lazy(async () => {
      const mod = await loader();
      const Comp =
        'default' in mod && mod.default
          ? mod.default
          : (mod as Record<string, ComponentType>)[exportName];
      return { default: Comp };
    }),
  };
}

export const TOOLS: ToolDefinition[] = [
  // Formatting
  tool({ slug: 'json-formatter', name: 'JSON Formatter', shortDescription: 'Beautify JSON with proper indentation', description: 'Format and prettify JSON data with syntax-aware indentation. Paste messy API responses and get readable output instantly.', category: 'formatting', tags: ['json', 'format'], keywords: ['json formatter', 'prettify json'], trending: true, component: fmt, exportName: 'JsonFormatterTool' }),
  tool({ slug: 'json-validator', name: 'JSON Validator', shortDescription: 'Validate JSON syntax', description: 'Check whether your JSON is syntactically valid and get precise error messages.', category: 'formatting', tags: ['json', 'validate'], keywords: ['json validator'], component: fmt, exportName: 'JsonValidatorTool' }),
  tool({ slug: 'json-minifier', name: 'JSON Minifier', shortDescription: 'Compress JSON to a single line', description: 'Minify JSON by removing whitespace for production payloads.', category: 'formatting', tags: ['json', 'minify'], keywords: ['json minifier'], component: fmt, exportName: 'JsonMinifierTool' }),
  tool({ slug: 'xml-formatter', name: 'XML Formatter', shortDescription: 'Beautify XML documents', description: 'Format XML with readable indentation for configs, feeds, and SOAP payloads.', category: 'formatting', tags: ['xml', 'format'], keywords: ['xml formatter'], component: fmt, exportName: 'XmlFormatterTool' }),
  tool({ slug: 'xml-validator', name: 'XML Validator', shortDescription: 'Validate XML structure', description: 'Parse and validate XML to catch malformed documents early.', category: 'formatting', tags: ['xml', 'validate'], keywords: ['xml validator'], component: fmt, exportName: 'XmlValidatorTool' }),
  tool({ slug: 'xml-minifier', name: 'XML Minifier', shortDescription: 'Compress XML', description: 'Minify XML by stripping unnecessary whitespace.', category: 'formatting', tags: ['xml', 'minify'], keywords: ['xml minifier'], component: fmt, exportName: 'XmlMinifierTool' }),
  tool({ slug: 'html-formatter', name: 'HTML Formatter', shortDescription: 'Beautify HTML markup', description: 'Format HTML with consistent indentation using Prettier.', category: 'formatting', tags: ['html', 'format'], keywords: ['html formatter'], component: fmt, exportName: 'HtmlFormatterTool' }),
  tool({ slug: 'html-minifier', name: 'HTML Minifier', shortDescription: 'Minify HTML', description: 'Remove whitespace and comments from HTML for smaller payloads.', category: 'formatting', tags: ['html', 'minify'], keywords: ['html minifier'], component: fmt, exportName: 'HtmlMinifierTool' }),
  tool({ slug: 'css-formatter', name: 'CSS Formatter', shortDescription: 'Beautify CSS stylesheets', description: 'Format CSS with Prettier for readable stylesheets.', category: 'formatting', tags: ['css', 'format'], keywords: ['css formatter'], component: fmt, exportName: 'CssFormatterTool' }),
  tool({ slug: 'css-minifier', name: 'CSS Minifier', shortDescription: 'Minify CSS', description: 'Compress CSS by removing whitespace and comments.', category: 'formatting', tags: ['css', 'minify'], keywords: ['css minifier'], component: fmt, exportName: 'CssMinifierTool' }),
  tool({ slug: 'javascript-formatter', name: 'JavaScript Formatter', shortDescription: 'Beautify JavaScript code', description: 'Format JavaScript and JSX using Prettier.', category: 'formatting', tags: ['javascript', 'format'], keywords: ['js formatter'], trending: true, component: fmt, exportName: 'JavascriptFormatterTool' }),
  tool({ slug: 'javascript-minifier', name: 'JavaScript Minifier', shortDescription: 'Minify JavaScript', description: 'Compress JavaScript by removing line breaks and extra spaces.', category: 'formatting', tags: ['javascript', 'minify'], keywords: ['js minifier'], component: fmt, exportName: 'JavascriptMinifierTool' }),
  tool({ slug: 'sql-formatter', name: 'SQL Formatter', shortDescription: 'Beautify SQL queries', description: 'Format SQL with proper indentation for readability.', category: 'formatting', tags: ['sql', 'format'], keywords: ['sql formatter'], component: fmt, exportName: 'SqlFormatterTool' }),
  tool({ slug: 'yaml-formatter', name: 'YAML Formatter', shortDescription: 'Beautify YAML files', description: 'Format YAML configuration files with consistent structure.', category: 'formatting', tags: ['yaml', 'format'], keywords: ['yaml formatter'], component: fmt, exportName: 'YamlFormatterTool' }),
  tool({ slug: 'markdown-formatter', name: 'Markdown Formatter', shortDescription: 'Clean up Markdown', description: 'Normalize spacing and structure in Markdown documents.', category: 'formatting', tags: ['markdown', 'format'], keywords: ['markdown formatter'], component: fmt, exportName: 'MarkdownFormatterTool' }),

  // Encoding
  tool({ slug: 'base64-encoder-decoder', name: 'Base64 Encoder Decoder', shortDescription: 'Encode and decode Base64', description: 'Convert text to Base64 and back — entirely in your browser.', category: 'encoding', tags: ['base64', 'encode'], keywords: ['base64'], trending: true, component: enc, exportName: 'Base64Tool' }),
  tool({ slug: 'url-encoder-decoder', name: 'URL Encoder Decoder', shortDescription: 'Encode and decode URLs', description: 'Percent-encode and decode URL components safely.', category: 'encoding', tags: ['url', 'encode'], keywords: ['url encode'], component: enc, exportName: 'UrlCodecTool' }),
  tool({ slug: 'html-encoder-decoder', name: 'HTML Encoder Decoder', shortDescription: 'Escape HTML entities', description: 'Encode and decode HTML entities for safe rendering.', category: 'encoding', tags: ['html', 'encode'], keywords: ['html encode'], component: enc, exportName: 'HtmlCodecTool' }),
  tool({ slug: 'jwt-decoder', name: 'JWT Decoder', shortDescription: 'Decode JWT tokens', description: 'Inspect JWT header and payload without sending data to a server.', category: 'encoding', tags: ['jwt', 'auth'], keywords: ['jwt decoder'], trending: true, component: enc, exportName: 'JwtDecoderTool' }),
  tool({ slug: 'unicode-converter', name: 'Unicode Converter', shortDescription: 'Convert to Unicode code points', description: 'View and convert Unicode code point notation.', category: 'encoding', tags: ['unicode', 'text'], keywords: ['unicode'], component: enc, exportName: 'UnicodeConverterTool' }),
  tool({ slug: 'ascii-converter', name: 'ASCII Converter', shortDescription: 'View ASCII character codes', description: 'See decimal and hexadecimal ASCII values for each character.', category: 'encoding', tags: ['ascii', 'text'], keywords: ['ascii'], component: enc, exportName: 'AsciiConverterTool' }),

  // Generators
  tool({ slug: 'uuid-generator', name: 'UUID Generator', shortDescription: 'Generate UUID v4 identifiers', description: 'Create cryptographically random UUIDs for databases and APIs.', category: 'generators', tags: ['uuid', 'generate'], keywords: ['uuid generator'], trending: true, component: gen, exportName: 'UuidGeneratorTool' }),
  tool({ slug: 'password-generator', name: 'Password Generator', shortDescription: 'Generate secure passwords', description: 'Create strong random passwords with customizable character sets.', category: 'generators', tags: ['password', 'security'], keywords: ['password generator'], trending: true, component: gen, exportName: 'PasswordGeneratorTool' }),
  tool({ slug: 'hash-generator', name: 'Hash Generator', shortDescription: 'Generate SHA hashes', description: 'Compute SHA-1, SHA-256, SHA-384, and SHA-512 hashes in the browser.', category: 'generators', tags: ['hash', 'crypto'], keywords: ['hash generator'], component: gen, exportName: 'HashGeneratorTool' }),
  tool({ slug: 'lorem-ipsum-generator', name: 'Lorem Ipsum Generator', shortDescription: 'Generate placeholder text', description: 'Create Lorem Ipsum paragraphs for mockups and prototypes.', category: 'generators', tags: ['lorem', 'text'], keywords: ['lorem ipsum'], component: gen, exportName: 'LoremIpsumTool' }),
  tool({ slug: 'api-mock-data-generator', name: 'API Mock Data Generator', shortDescription: 'Generate mock JSON records', description: 'Produce sample JSON arrays for API prototyping and tests.', category: 'generators', tags: ['mock', 'api'], keywords: ['mock data'], component: gen, exportName: 'ApiMockDataTool' }),
  tool({ slug: 'slug-generator', name: 'Slug Generator', shortDescription: 'Create URL-friendly slugs', description: 'Convert titles into SEO-friendly URL slugs.', category: 'generators', tags: ['slug', 'seo'], keywords: ['slug generator'], component: gen, exportName: 'SlugGeneratorTool' }),
  tool({ slug: 'color-generator', name: 'Color Generator', shortDescription: 'Pick random colors', description: 'Generate random hex colors with RGB breakdown.', category: 'generators', tags: ['color', 'design'], keywords: ['color generator'], component: gen, exportName: 'ColorGeneratorTool' }),
  tool({ slug: 'qr-generator', name: 'QR Code Generator', shortDescription: 'Generate QR codes', description: 'Create QR codes from text or URLs as PNG images.', category: 'generators', tags: ['qr', 'generate'], keywords: ['qr code'], component: gen, exportName: 'QrGeneratorTool' }),

  // Converters
  tool({ slug: 'json-to-csv', name: 'JSON To CSV', shortDescription: 'Convert JSON arrays to CSV', description: 'Transform JSON object arrays into CSV spreadsheets.', category: 'converters', tags: ['json', 'csv'], keywords: ['json to csv'], component: conv, exportName: 'JsonToCsvTool' }),
  tool({ slug: 'csv-to-json', name: 'CSV To JSON', shortDescription: 'Convert CSV to JSON', description: 'Parse CSV files into JSON arrays.', category: 'converters', tags: ['csv', 'json'], keywords: ['csv to json'], component: conv, exportName: 'CsvToJsonTool' }),
  tool({ slug: 'json-to-xml', name: 'JSON To XML', shortDescription: 'Convert JSON to XML', description: 'Transform JSON documents into XML structure.', category: 'converters', tags: ['json', 'xml'], keywords: ['json to xml'], component: conv, exportName: 'JsonToXmlTool' }),
  tool({ slug: 'xml-to-json', name: 'XML To JSON', shortDescription: 'Convert XML to JSON', description: 'Parse XML documents into JSON for modern APIs.', category: 'converters', tags: ['xml', 'json'], keywords: ['xml to json'], component: conv, exportName: 'XmlToJsonTool' }),
  tool({ slug: 'json-to-yaml', name: 'JSON To YAML', shortDescription: 'Convert JSON to YAML', description: 'Transform JSON configs into YAML format.', category: 'converters', tags: ['json', 'yaml'], keywords: ['json to yaml'], component: conv, exportName: 'JsonToYamlTool' }),
  tool({ slug: 'yaml-to-json', name: 'YAML To JSON', shortDescription: 'Convert YAML to JSON', description: 'Parse YAML files into JSON objects.', category: 'converters', tags: ['yaml', 'json'], keywords: ['yaml to json'], component: conv, exportName: 'YamlToJsonTool' }),
  tool({ slug: 'markdown-to-html', name: 'Markdown To HTML', shortDescription: 'Convert Markdown to HTML', description: 'Render Markdown as HTML with live preview.', category: 'converters', tags: ['markdown', 'html'], keywords: ['markdown to html'], component: conv, exportName: 'MarkdownToHtmlTool' }),
  tool({ slug: 'html-to-markdown', name: 'HTML To Markdown', shortDescription: 'Convert HTML to Markdown', description: 'Transform simple HTML into Markdown syntax.', category: 'converters', tags: ['html', 'markdown'], keywords: ['html to markdown'], component: conv, exportName: 'HtmlToMarkdownTool' }),

  // Utilities
  tool({ slug: 'regex-tester', name: 'Regex Tester', shortDescription: 'Test regular expressions', description: 'Test regex patterns with live match highlighting.', category: 'utilities', tags: ['regex', 'test'], keywords: ['regex tester'], trending: true, component: util, exportName: 'RegexTesterTool' }),
  tool({ slug: 'cron-expression-builder', name: 'Cron Expression Builder', shortDescription: 'Build cron schedules', description: 'Visually compose cron expressions for job schedulers.', category: 'utilities', tags: ['cron', 'schedule'], keywords: ['cron builder'], component: util, exportName: 'CronBuilderTool' }),
  tool({ slug: 'timestamp-converter', name: 'Timestamp Converter', shortDescription: 'Convert Unix timestamps', description: 'Convert between Unix timestamps and human-readable dates.', category: 'utilities', tags: ['timestamp', 'time'], keywords: ['timestamp converter'], trending: true, component: util, exportName: 'TimestampConverterTool' }),
  tool({ slug: 'unix-time-converter', name: 'Unix Time Converter', shortDescription: 'Convert Unix epoch time', description: 'Translate Unix epoch seconds and milliseconds to local time.', category: 'utilities', tags: ['unix', 'time'], keywords: ['unix time'], component: util, exportName: 'UnixTimeConverterTool' }),
  tool({ slug: 'diff-checker', name: 'Diff Checker', shortDescription: 'Compare text diffs', description: 'Side-by-side diff comparison for code and documents.', category: 'utilities', tags: ['diff', 'compare'], keywords: ['diff checker'], component: util, exportName: 'DiffCheckerTool' }),
  tool({ slug: 'text-compare', name: 'Text Compare', shortDescription: 'Compare two texts', description: 'Highlight differences between two text inputs.', category: 'utilities', tags: ['text', 'compare'], keywords: ['text compare'], component: util, exportName: 'TextCompareTool' }),
  tool({ slug: 'api-request-builder', name: 'API Request Builder', shortDescription: 'Build HTTP requests', description: 'Compose HTTP requests and export as cURL commands.', category: 'utilities', tags: ['api', 'http'], keywords: ['api builder'], component: util, exportName: 'ApiRequestBuilderTool' }),
  tool({ slug: 'http-status-explorer', name: 'HTTP Status Explorer', shortDescription: 'Browse HTTP status codes', description: 'Look up meanings of HTTP response status codes.', category: 'utilities', tags: ['http', 'status'], keywords: ['http status'], component: util, exportName: 'HttpStatusExplorerTool' }),
  tool({ slug: 'mime-type-finder', name: 'MIME Type Finder', shortDescription: 'Find MIME types', description: 'Search common MIME types for APIs and file uploads.', category: 'utilities', tags: ['mime', 'http'], keywords: ['mime type'], component: util, exportName: 'MimeTypeFinderTool' }),
  tool({ slug: 'jwt-inspector', name: 'JWT Inspector', shortDescription: 'Inspect JWT claims', description: 'Deep-inspect JWT headers, payloads, and signatures.', category: 'utilities', tags: ['jwt', 'auth'], keywords: ['jwt inspector'], component: util, exportName: 'JwtInspectorTool' }),

  // Advanced
  tool({ slug: 'rest-api-playground', name: 'REST API Playground', shortDescription: 'Send HTTP requests', description: 'Test REST endpoints directly from your browser.', category: 'advanced', tags: ['rest', 'api'], keywords: ['api playground'], trending: true, component: adv, exportName: 'RestApiPlaygroundTool' }),
  tool({ slug: 'graphql-query-builder', name: 'GraphQL Query Builder', shortDescription: 'Compose GraphQL queries', description: 'Build GraphQL queries and variables payloads.', category: 'advanced', tags: ['graphql', 'api'], keywords: ['graphql builder'], component: adv, exportName: 'GraphqlQueryBuilderTool' }),
  tool({ slug: 'api-documentation-generator', name: 'API Documentation Generator', shortDescription: 'Generate API docs HTML', description: 'Turn OpenAPI specs into basic documentation HTML.', category: 'advanced', tags: ['openapi', 'docs'], keywords: ['api docs'], component: adv, exportName: 'ApiDocGeneratorTool' }),
  tool({ slug: 'openapi-viewer', name: 'OpenAPI Viewer', shortDescription: 'View OpenAPI specs', description: 'Inspect and preview OpenAPI specification files.', category: 'advanced', tags: ['openapi'], keywords: ['openapi viewer'], component: adv, exportName: 'OpenApiViewerTool' }),
  tool({ slug: 'mock-api-response-builder', name: 'Mock API Response Builder', shortDescription: 'Build mock responses', description: 'Design mock HTTP response objects for testing.', category: 'advanced', tags: ['mock', 'api'], keywords: ['mock api'], component: adv, exportName: 'MockApiResponseTool' }),
  tool({ slug: 'environment-variable-manager', name: 'Environment Variable Manager', shortDescription: 'Parse .env files', description: 'View and edit environment variables in KEY=VALUE format.', category: 'advanced', tags: ['env', 'config'], keywords: ['env manager'], component: adv, exportName: 'EnvVarManagerTool' }),
  tool({ slug: 'json-schema-builder', name: 'JSON Schema Builder', shortDescription: 'Edit JSON Schema', description: 'Author and validate JSON Schema documents.', category: 'advanced', tags: ['json', 'schema'], keywords: ['json schema'], component: adv, exportName: 'JsonSchemaBuilderTool' }),
  tool({ slug: 'database-schema-designer', name: 'Database Schema Designer', shortDescription: 'Write SQL DDL', description: 'Draft database table definitions with SQL DDL.', category: 'advanced', tags: ['database', 'sql'], keywords: ['schema designer'], component: adv, exportName: 'DatabaseSchemaDesignerTool' }),
  tool({ slug: 'query-builder', name: 'Query Builder', shortDescription: 'Build SQL SELECT queries', description: 'Visually compose SQL SELECT statements.', category: 'advanced', tags: ['sql', 'query'], keywords: ['query builder'], component: adv, exportName: 'QueryBuilderTool' }),
  tool({ slug: 'curl-builder', name: 'cURL Builder', shortDescription: 'Generate cURL commands', description: 'Build cURL commands from HTTP request parameters.', category: 'advanced', tags: ['curl', 'http'], keywords: ['curl builder'], component: adv, exportName: 'CurlBuilderTool' }),
  tool({ slug: 'request-header-generator', name: 'Request Header Generator', shortDescription: 'Generate HTTP headers', description: 'Create common HTTP request header sets.', category: 'advanced', tags: ['http', 'headers'], keywords: ['header generator'], component: adv, exportName: 'RequestHeaderGeneratorTool' }),
  tool({ slug: 'response-viewer', name: 'Response Viewer', shortDescription: 'Format API responses', description: 'Pretty-print JSON API responses for debugging.', category: 'advanced', tags: ['api', 'response'], keywords: ['response viewer'], component: adv, exportName: 'ResponseViewerTool' }),

  // CSS
  tool({ slug: 'flexbox-generator', name: 'Flexbox Generator', shortDescription: 'Generate flexbox CSS', description: 'Visual flexbox layout builder with live preview.', category: 'css', tags: ['flexbox', 'css'], keywords: ['flexbox generator'], component: css, exportName: 'FlexboxGeneratorTool' }),
  tool({ slug: 'grid-generator', name: 'Grid Generator', shortDescription: 'Generate CSS Grid', description: 'Build CSS Grid layouts with customizable columns.', category: 'css', tags: ['grid', 'css'], keywords: ['grid generator'], component: css, exportName: 'GridGeneratorTool' }),
  tool({ slug: 'box-shadow-generator', name: 'Box Shadow Generator', shortDescription: 'Create box shadows', description: 'Design box-shadow values with interactive preview.', category: 'css', tags: ['shadow', 'css'], keywords: ['box shadow'], component: css, exportName: 'BoxShadowGeneratorTool' }),
  tool({ slug: 'border-radius-generator', name: 'Border Radius Generator', shortDescription: 'Create border radius', description: 'Adjust border-radius with live element preview.', category: 'css', tags: ['border', 'css'], keywords: ['border radius'], component: css, exportName: 'BorderRadiusGeneratorTool' }),
  tool({ slug: 'gradient-generator', name: 'Gradient Generator', shortDescription: 'Create CSS gradients', description: 'Build linear gradients with angle and color stops.', category: 'css', tags: ['gradient', 'css'], keywords: ['gradient generator'], component: css, exportName: 'GradientGeneratorTool' }),
  tool({ slug: 'animation-generator', name: 'Animation Generator', shortDescription: 'Create CSS animations', description: 'Generate @keyframes and animation CSS.', category: 'css', tags: ['animation', 'css'], keywords: ['css animation'], component: css, exportName: 'AnimationGeneratorTool' }),
  tool({ slug: 'css-clamp-generator', name: 'CSS Clamp Generator', shortDescription: 'Generate clamp() values', description: 'Create fluid typography with CSS clamp().', category: 'css', tags: ['clamp', 'css'], keywords: ['css clamp'], component: css, exportName: 'CssClampGeneratorTool' }),
  tool({ slug: 'css-shape-generator', name: 'CSS Shape Generator', shortDescription: 'Create clip-path shapes', description: 'Generate clip-path shapes for creative layouts.', category: 'css', tags: ['shape', 'css'], keywords: ['clip path'], component: css, exportName: 'CssShapeGeneratorTool' }),

  // Frontend
  tool({ slug: 'svg-optimizer', name: 'SVG Optimizer', shortDescription: 'Optimize SVG markup', description: 'Minify SVG files by removing excess whitespace.', category: 'frontend', tags: ['svg', 'optimize'], keywords: ['svg optimizer'], component: fe, exportName: 'SvgOptimizerTool' }),
  tool({ slug: 'svg-viewer', name: 'SVG Viewer', shortDescription: 'Preview SVG code', description: 'Render SVG markup with live preview.', category: 'frontend', tags: ['svg', 'view'], keywords: ['svg viewer'], component: fe, exportName: 'SvgViewerTool' }),
  tool({ slug: 'svg-to-jsx', name: 'SVG To JSX', shortDescription: 'Convert SVG to React', description: 'Transform SVG into React JSX components.', category: 'frontend', tags: ['svg', 'react'], keywords: ['svg to jsx'], component: fe, exportName: 'SvgToJsxTool' }),
  tool({ slug: 'image-to-base64', name: 'Image To Base64', shortDescription: 'Encode images as Base64', description: 'Convert images to data URLs for inline embedding.', category: 'frontend', tags: ['image', 'base64'], keywords: ['image base64'], component: fe, exportName: 'ImageToBase64Tool' }),
  tool({ slug: 'color-contrast-checker', name: 'Color Contrast Checker', shortDescription: 'Check WCAG contrast', description: 'Verify color contrast ratios for accessibility compliance.', category: 'frontend', tags: ['a11y', 'color'], keywords: ['contrast checker'], component: fe, exportName: 'ColorContrastCheckerTool' }),
  tool({ slug: 'responsive-breakpoint-tester', name: 'Responsive Breakpoint Tester', shortDescription: 'Test Tailwind breakpoints', description: 'Simulate viewport widths and active Tailwind breakpoints.', category: 'frontend', tags: ['responsive', 'tailwind'], keywords: ['breakpoint tester'], component: fe, exportName: 'ResponsiveBreakpointTesterTool' }),
  tool({ slug: 'screen-size-checker', name: 'Screen Size Checker', shortDescription: 'View viewport dimensions', description: 'Display current viewport size and device pixel ratio.', category: 'frontend', tags: ['screen', 'viewport'], keywords: ['screen size'], component: fe, exportName: 'ScreenSizeCheckerTool' }),
];

export const TOOL_MAP = Object.fromEntries(TOOLS.map((t) => [t.slug, t])) as Record<string, ToolDefinition>;

export function getTool(slug: string) {
  return TOOL_MAP[slug];
}

export function getToolsMeta() {
  return TOOLS.map((t) => {
    const { component, ...meta } = t;
    void component;
    return meta;
  });
}

export function getToolsByCategory(category: string) {
  return TOOLS.filter((t) => t.category === category);
}

export function searchTools(query: string) {
  const q = query.toLowerCase().trim();
  if (!q) return TOOLS;
  return TOOLS.filter(
    (t) =>
      t.name.toLowerCase().includes(q) ||
      t.shortDescription.toLowerCase().includes(q) ||
      t.tags.some((tag) => tag.includes(q)) ||
      t.keywords.some((k) => k.includes(q)),
  );
}
