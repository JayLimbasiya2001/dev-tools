import type { CategoryId } from '@/data/categories';
import type { ToolMeta } from '@/data/tools/types';
import { TOOL_CONTENT_OVERRIDES } from './overrides';
import type { ToolPageContent } from './types';

function p(tool: ToolMeta, ...paragraphs: string[]): string[] {
  return paragraphs.map((text) =>
    text
      .replace(/\{name\}/g, tool.name)
      .replace(/\{slug\}/g, tool.slug)
      .replace(/\{category\}/g, tool.category)
      .replace(/\{desc\}/g, tool.description),
  );
}

function baseFaqs(tool: ToolMeta): ToolPageContent['faqs'] {
  return [
    {
      question: `Is ${tool.name} free on Velomint?`,
      answer: `Yes. ${tool.name} is free with no account required. Use it as often as you need for personal and commercial projects.`,
    },
    {
      question: 'Does Velomint upload my data?',
      answer: `For most tools including ${tool.name}, processing happens entirely in your browser. Your input is not sent to Velomint servers unless the tool explicitly makes outbound requests (such as REST API Playground).`,
    },
    {
      question: `How accurate is ${tool.name}?`,
      answer: `The tool uses established libraries and browser APIs where applicable. Always verify critical output against your production requirements and add automated tests in your codebase.`,
    },
    {
      question: 'Can I use this on mobile?',
      answer: 'Yes. Velomint is responsive and works on modern mobile browsers, though large inputs may be easier to manage on desktop.',
    },
    {
      question: 'Is there an API for automation?',
      answer: 'Velomint is browser-based. For CI pipelines, use equivalent CLI tools or npm packages in your build scripts.',
    },
    {
      question: 'How do I report a bug?',
      answer: 'Use the Contact page on Velomint. Include your browser version and steps to reproduce.',
    },
    {
      question: 'Can I bookmark this tool?',
      answer: 'Yes. Click the star icon on the tool page to save favorites locally, or bookmark the URL in your browser.',
    },
    {
      question: 'Does this work offline?',
      answer: 'After the first load, many tools work offline thanks to client-side processing, but you need an initial network load of the app.',
    },
    {
      question: 'What browsers are supported?',
      answer: 'Recent Chrome, Firefox, Safari, and Edge releases. Enable JavaScript.',
    },
    {
      question: 'How does this compare to desktop apps?',
      answer: `${tool.name} requires no installation, updates automatically, and keeps data local — ideal for quick tasks during development.`,
    },
  ];
}

function formattingContent(tool: ToolMeta): ToolPageContent {
  const subject = tool.name.replace(/ (Formatter|Validator|Minifier)/i, '');
  return {
    heroHighlights: [
      'One-click processing',
      'Clear error messages',
      'Copy & download output',
      'Private browser-side execution',
    ],
    whatIsParagraphs: p(
      tool,
      `{name} helps developers work with ${subject} documents quickly and accurately. {desc}`,
      `When ${subject} arrives minified from an API or compressed for production, reading structure becomes difficult. Formatting restores human-readable indentation so you can spot missing keys, incorrect nesting, and type mismatches during debugging.`,
      `Validators catch syntax errors before deployment. A single trailing comma or unclosed bracket can break production parsers — validating in the browser saves failed deploys and rollback cycles.`,
      `Minifiers remove whitespace for smaller payloads. Use minification for CDN assets and API responses where bytes matter; use formatting for development, documentation, and code review.`,
      `Velomint processes ${subject} locally. Your configuration files, API secrets in payloads, and customer data never traverse our servers for standard format/validate/minify operations.`,
      `Pair ${tool.name} with related tools in the same category — format, validate, then minify as separate steps in your release checklist.`,
    ),
    howToSteps: [
      { step: 1, title: 'Paste input', description: `Copy your ${subject} source into the input panel from logs, APIs, or files.` },
      { step: 2, title: 'Run the tool', description: 'Click the primary action button to format, validate, or minify.' },
      { step: 3, title: 'Read errors carefully', description: 'Parser messages indicate line-level issues — fix syntax before retrying.' },
      { step: 4, title: 'Compare output', description: 'Verify structure matches expectations before copying to your project.' },
      { step: 5, title: 'Export result', description: 'Copy to clipboard or download for tickets, docs, or commits.' },
    ],
    examples: [
      { title: 'Clean formatting', explanation: `Paste messy ${subject} and receive consistently indented output for review.` },
      { title: 'Validation failure', explanation: 'Invalid syntax returns an error — correct the issue and re-run.' },
      { title: 'Production minify', explanation: 'Minified output reduces payload size for mobile clients and edge caches.' },
    ],
    useCases: [
      `Debugging ${subject} API responses`,
      'Documentation and README examples',
      'Pre-commit config validation',
      'Incident response log analysis',
      'Teaching structured data in courses',
      'Comparing staging vs production configs',
    ],
    faqs: baseFaqs(tool),
    developerTips: [
      'Format before git diff to focus reviews on logic not whitespace.',
      'Add schema validation in CI beyond syntax checks.',
      'Redact secrets before pasting into any browser tool.',
    ],
    commonMistakes: [
      { mistake: 'Confusing syntax with schema validity', fix: 'Valid syntax may still be wrong shape — validate against your API contract.' },
      { mistake: 'Mixing file formats', fix: 'Ensure you use the correct tool for JSON vs YAML vs XML.' },
    ],
    benefits: [
      'Faster debugging cycles',
      'No install or login',
      'Integrated Velomint tool ecosystem',
      'Privacy-first local processing',
    ],
  };
}

function encodingContent(tool: ToolMeta): ToolPageContent {
  return {
    heroHighlights: ['Encode & decode modes', 'Instant conversion', 'Copy results', 'Local processing'],
    whatIsParagraphs: p(
      tool,
      `{name} converts data between representations developers use daily. {desc}`,
      'Encoding transforms data into a safe transport format — Base64 for binary-in-text, URL encoding for query strings, HTML entities for XSS prevention. Decoding reverses the process for inspection and debugging.',
      'JWT tokens use Base64URL encoding for header and payload segments — understanding encoding helps when debugging authentication without mistaking encoding for encryption.',
      'Character set issues cause subtle production bugs. URL encoding reserved characters, escaping HTML in templates, and normalizing Unicode prevent broken links and injection vulnerabilities.',
      'Velomint runs conversions in JavaScript without server round-trips. Tokens and payloads you paste stay on your device.',
      'Use encoding tools at the boundary of your system: before HTTP requests, after reading cookies, when embedding images in CSS, and when inspecting webhook signatures.',
    ),
    howToSteps: [
      { step: 1, title: 'Choose mode', description: 'Select encode or decode based on your task.' },
      { step: 2, title: 'Paste input', description: 'Enter text, tokens, or encoded strings.' },
      { step: 3, title: 'View output', description: 'Result appears instantly in the output panel.' },
      { step: 4, title: 'Verify', description: 'Round-trip encode then decode to confirm lossless conversion where applicable.' },
      { step: 5, title: 'Copy', description: 'Use the result in headers, HTML, or your codebase.' },
    ],
    examples: [
      { title: 'Base64 round-trip', explanation: 'Encode text and decode to verify identical output.' },
      { title: 'URL query parameter', explanation: 'Encode spaces and ampersands for safe query strings.' },
      { title: 'HTML entity escape', explanation: 'Prevent XSS by encoding < and > in user content.' },
    ],
    useCases: [
      'Debugging OAuth and JWT flows',
      'Building data URLs for images',
      'Sanitizing HTML templates',
      'API query string construction',
      'Internationalization character inspection',
    ],
    faqs: baseFaqs(tool),
    developerTips: [
      'Never treat Base64 as encryption — it is encoding only.',
      'Always verify JWT signatures server-side after decoding.',
      'Use encodeURIComponent for query values, not entire URLs.',
    ],
    commonMistakes: [
      { mistake: 'Double-encoding URLs', fix: 'Encode once at the parameter level, not the full URL twice.' },
      { mistake: 'Assuming JWT encryption', fix: 'Standard JWT payloads are readable — use JWE for confidentiality.' },
    ],
    benefits: ['Instant encode/decode', 'No data upload', 'Pairs with auth debugging tools'],
  };
}

function generatorsContent(tool: ToolMeta): ToolPageContent {
  return {
    heroHighlights: ['Cryptographically secure where applicable', 'Customizable options', 'One-click generate', 'Copy instantly'],
    whatIsParagraphs: p(
      tool,
      `{name} produces values developers need during design, testing, and security workflows. {desc}`,
      'Generators eliminate boilerplate: UUIDs for database keys, passwords for test accounts, hashes for integrity checks, mock JSON for frontend sprints, and slugs for SEO-friendly URLs.',
      'Randomness quality matters. Velomint uses crypto.getRandomValues for passwords and UUIDs where applicable — superior to Math.random for security-sensitive values.',
      'Generated data should never ship to production users without review — mock emails, placeholder passwords, and sample API records are for development environments only.',
      'Integrate generator output with your seed scripts, Storybook fixtures, and Postman environments. Copy once, paste everywhere.',
      'Combine generators: create a UUID primary key, hash a password for storage tests, and generate mock users for load testing dashboards.',
    ),
    howToSteps: [
      { step: 1, title: 'Configure options', description: 'Set length, count, charset, or format options.' },
      { step: 2, title: 'Generate', description: 'Click generate for fresh random output.' },
      { step: 3, title: 'Review', description: 'Confirm format matches your schema requirements.' },
      { step: 4, title: 'Copy or download', description: 'Transfer to .env, SQL seed, or test fixtures.' },
      { step: 5, title: 'Regenerate if needed', description: 'Create new values — never reuse passwords across environments.' },
    ],
    examples: [
      { title: 'Batch UUIDs', explanation: 'Generate multiple IDs for database seed scripts.' },
      { title: 'Strong password', explanation: 'Mix character classes for entropy.' },
      { title: 'Mock API array', explanation: 'JSON records for UI development without a backend.' },
    ],
    useCases: [
      'Database seeding and fixtures',
      'QA test account creation',
      'Load test data preparation',
      'Prototype UI with realistic values',
      'Security entropy for development',
    ],
    faqs: baseFaqs(tool),
    developerTips: [
      'Store production secrets in vaults, not generated clipboard history.',
      'Use UUID v4 for distributed systems without coordination.',
      'Hash passwords with bcrypt/argon2 in apps — not raw SHA in isolation.',
    ],
    commonMistakes: [
      { mistake: 'Using weak passwords in production', fix: 'Generate per-user with proper KDF on the server.' },
      { mistake: 'Committing generated secrets to git', fix: 'Use .env and secret managers.' },
    ],
    benefits: ['Fast test data creation', 'Secure randomness', 'No signup required'],
  };
}

function convertersContent(tool: ToolMeta): ToolPageContent {
  return {
    heroHighlights: ['Accurate conversion', 'Structured output', 'Download results', 'Browser-based'],
    whatIsParagraphs: p(
      tool,
      `{name} transforms data between formats teams use across the stack. {desc}`,
      'Modern systems speak JSON, but legacy exports arrive as CSV, XML, or YAML. Converters bridge gaps without writing one-off scripts for every migration.',
      'Conversion preserves semantics where possible — array-of-objects CSV maps to JSON arrays, XML attributes become keys, YAML anchors flatten to JSON equivalents.',
      'Always inspect edge cases: empty cells, null representations, nested XML, and YAML multi-document files. Automated conversion handles 95% — human review handles the rest.',
      'Velomint converts locally for privacy during migrations involving customer or config data.',
      'Chain converters in pipelines: CSV to JSON, validate JSON, then push to your API importer.',
    ),
    howToSteps: [
      { step: 1, title: 'Paste source format', description: 'Input CSV, JSON, XML, YAML, or Markdown.' },
      { step: 2, title: 'Convert', description: 'Click convert to produce target format.' },
      { step: 3, title: 'Validate output', description: 'Check row counts, keys, and nesting.' },
      { step: 4, title: 'Fix source if needed', description: 'Correct source anomalies and re-convert.' },
      { step: 5, title: 'Export', description: 'Download or copy for the next system in your pipeline.' },
    ],
    examples: [
      { title: 'Spreadsheet to API', explanation: 'CSV rows become JSON array for POST import.' },
      { title: 'Config migration', explanation: 'JSON config becomes YAML for Kubernetes.' },
      { title: 'Docs pipeline', explanation: 'Markdown converts to HTML for static site generators.' },
    ],
    useCases: [
      'Data migration between platforms',
      'Importing spreadsheets into APIs',
      'Documentation build pipelines',
      'Legacy XML integration',
    ],
    faqs: baseFaqs(tool),
    developerTips: [
      'Validate converted JSON with JSON Validator before import.',
      'Watch for CSV commas inside quoted fields.',
      'Preserve UTF-8 encoding end-to-end.',
    ],
    commonMistakes: [
      { mistake: 'Assuming perfect round-trip', fix: 'XML and YAML may lose type information — test round-trips.' },
      { mistake: 'Huge files in browser', fix: 'Split large files or use streaming CLI for GB-scale data.' },
    ],
    benefits: ['No script writing for one-off migrations', 'Private local conversion', 'Related validators on Velomint'],
  };
}

function utilitiesContent(tool: ToolMeta): ToolPageContent {
  return {
    heroHighlights: ['Built for daily dev workflows', 'Instant feedback', 'Keyboard-friendly', 'Private & free'],
    whatIsParagraphs: p(
      tool,
      `{name} solves recurring developer tasks that do not fit a single format or generator. {desc}`,
      'Utility tools — regex testing, cron building, timestamp math, diff comparison, HTTP helpers — appear in every sprint. Browser access removes context switching to disparate desktop apps.',
      'Time and text utilities prevent subtle bugs: timezone mistakes in scheduled jobs, off-by-one cron expressions, and undetected string regressions in refactors.',
      'API utilities help construct requests before moving to Postman or automated tests. Understanding status codes and MIME types speeds integration debugging.',
      'Velomint utilities run client-side except when you explicitly send HTTP requests in API tools.',
      'Bookmark your most-used utilities and combine with Velomint formatters for complete debugging sessions.',
    ),
    howToSteps: [
      { step: 1, title: 'Identify your input', description: 'Gather text, timestamps, patterns, or URLs.' },
      { step: 2, title: 'Configure the tool', description: 'Set flags, time zones, or comparison panes.' },
      { step: 3, title: 'Execute', description: 'Run test, diff, or conversion.' },
      { step: 4, title: 'Interpret results', description: 'Use match lists, diffs, or converted values.' },
      { step: 5, title: 'Apply in project', description: 'Transfer patterns and fixes to your codebase.' },
    ],
    examples: [
      { title: 'Regex validation', explanation: 'Test pattern against sample strings before deploy.' },
      { title: 'Cron schedule', explanation: 'Build expression for 9 AM weekdays.' },
      { title: 'Unix timestamp', explanation: 'Convert epoch to human-readable for log correlation.' },
    ],
    useCases: [
      'Daily development debugging',
      'Code review preparation',
      'Incident response log analysis',
      'API integration testing',
      'DevOps schedule configuration',
    ],
    faqs: baseFaqs(tool),
    developerTips: [
      'Store tested regex patterns in unit tests.',
      'Use UTC internally, local time only for display.',
      'Keep cron expressions in version control with comments.',
    ],
    commonMistakes: [
      { mistake: 'Regex without anchors for validation', fix: 'Use ^$ for full-string matching.' },
      { mistake: 'Ignoring DST in timestamps', fix: 'Prefer UTC for server-side storage.' },
    ],
    benefits: ['All-in-one developer toolkit', 'Zero install', 'Fast iteration loop'],
  };
}

function advancedContent(tool: ToolMeta): ToolPageContent {
  return {
    heroHighlights: ['API-first workflows', 'Request building', 'Schema tools', 'Developer-grade UX'],
    whatIsParagraphs: p(
      tool,
      `{name} supports advanced integration and backend workflows. {desc}`,
      'Senior developers spend significant time on API design, environment configuration, schema definition, and response inspection. These tools centralize that work in the browser.',
      'REST and GraphQL playgrounds accelerate contract negotiation between frontend and backend teams. Mock responses unblock parallel development when services are not ready.',
      'Schema builders document contracts — OpenAPI, JSON Schema, and SQL DDL — that become the source of truth for generators and validators.',
      'Environment variable managers help compare .env files across staging and production without accidental secret commits.',
      'Use outbound request features only with non-production credentials. Velomint cannot prevent you from calling real APIs — exercise caution.',
      'Pair advanced tools with Velomint encoders and formatters for complete API debugging stacks.',
    ),
    howToSteps: [
      { step: 1, title: 'Define your goal', description: 'Request, schema, mock, or env audit.' },
      { step: 2, title: 'Enter configuration', description: 'URLs, headers, bodies, or variable files.' },
      { step: 3, title: 'Execute or generate', description: 'Send request or produce artifact.' },
      { step: 4, title: 'Review response', description: 'Status, headers, body — format JSON if needed.' },
      { step: 5, title: 'Iterate', description: 'Adjust and repeat until contract is stable.' },
    ],
    examples: [
      { title: 'REST probe', explanation: 'GET health endpoint and inspect JSON status.' },
      { title: 'GraphQL query', explanation: 'Compose query and variables payload.' },
      { title: 'Mock 200 response', explanation: 'Define sample body for frontend mocks.' },
    ],
    useCases: [
      'API design and prototyping',
      'Frontend/backend parallel development',
      'Schema documentation',
      'Environment config audits',
      'Integration debugging',
    ],
    faqs: baseFaqs(tool),
    developerTips: [
      'Never paste production API keys into shared machines.',
      'Version OpenAPI specs in git.',
      'Use separate env files per environment with clear naming.',
    ],
    commonMistakes: [
      { mistake: 'Testing against production', fix: 'Use staging tenants and synthetic data.' },
      { mistake: 'Skipping schema validation', fix: 'Validate requests and responses against JSON Schema.' },
    ],
    benefits: ['Faster API delivery', 'Integrated toolkit', 'No Postman required for quick tests'],
  };
}

function cssContent(tool: ToolMeta): ToolPageContent {
  return {
    heroHighlights: ['Visual preview', 'Copy-paste CSS', 'Live updates', 'No design tool required'],
    whatIsParagraphs: p(
      tool,
      `{name} helps front-end developers produce modern CSS faster. {desc}`,
      'Layout systems — Flexbox and Grid — replace float hacks of the past. Visual generators teach correct property combinations while outputting production-ready declarations.',
      'Visual effect generators for shadows, gradients, radius, and animation reduce MDN tab switching. See changes instantly before committing to your design system.',
      'clamp() and shape generators support responsive typography and creative layouts that are tedious to hand-write.',
      'Generated CSS should be reviewed against your design tokens — map hex values to CSS variables for maintainability.',
      'Combine CSS tools with Velomint HTML formatter and SVG tools for complete UI polish workflows.',
    ),
    howToSteps: [
      { step: 1, title: 'Adjust controls', description: 'Sliders, color pickers, and inputs update preview.' },
      { step: 2, title: 'Preview', description: 'See live element with applied styles.' },
      { step: 3, title: 'Copy CSS', description: 'Grab declaration block for your stylesheet.' },
      { step: 4, title: 'Tokenize', description: 'Replace hardcoded values with design system variables.' },
      { step: 5, title: 'Test responsive', description: 'Verify across breakpoints in your app.' },
    ],
    examples: [
      { title: 'Card shadow', explanation: 'Layered box-shadow for elevation.' },
      { title: 'Hero gradient', explanation: 'Linear gradient with brand colors.' },
      { title: 'Fluid type', explanation: 'clamp() for responsive heading size.' },
    ],
    useCases: [
      'Prototyping component styles',
      'Design system documentation',
      'Learning CSS layout',
      'Quick client mockups',
    ],
    faqs: baseFaqs(tool),
    developerTips: [
      'Prefer rem over px for accessibility.',
      'Test focus states alongside visual polish.',
      'Use @media (prefers-reduced-motion) with animations.',
    ],
    commonMistakes: [
      { mistake: 'Hardcoding colors everywhere', fix: 'Use CSS custom properties from your theme.' },
      { mistake: 'Ignoring browser support', fix: 'Check caniuse for newer features.' },
    ],
    benefits: ['Faster UI iteration', 'Educational previews', 'Copy-ready output'],
  };
}

function frontendContent(tool: ToolMeta): ToolPageContent {
  return {
    heroHighlights: ['SVG & image utilities', 'Accessibility checks', 'Responsive helpers', 'Browser-based'],
    whatIsParagraphs: p(
      tool,
      `{name} supports front-of-frontend tasks: SVG optimization, JSX conversion, contrast checking, and viewport testing. {desc}`,
      'SVG assets power icons and illustrations but bloat easily with editor metadata. Optimizers strip cruft while preserving appearance.',
      'Accessibility is legal and ethical requirement — contrast checkers verify WCAG thresholds before launch.',
      'Responsive tools clarify which Tailwind or CSS breakpoints apply at current viewport sizes, reducing layout bugs.',
      'Image-to-Base64 enables inline assets for emails and critical CSS paths.',
      'Process assets locally — design files and brand assets stay on your machine.',
    ),
    howToSteps: [
      { step: 1, title: 'Input asset or values', description: 'Paste SVG, upload image, or pick colors.' },
      { step: 2, title: 'Process', description: 'Optimize, convert, or analyze.' },
      { step: 3, title: 'Review', description: 'Check preview and metrics.' },
      { step: 4, title: 'Export', description: 'Copy optimized markup or data URLs.' },
      { step: 5, title: 'Integrate', description: 'Add to React components or CSS.' },
    ],
    examples: [
      { title: 'Icon SVG', explanation: 'Minify for sprite sheets.' },
      { title: 'WCAG contrast', explanation: 'Verify text meets AA ratio.' },
      { title: 'SVG to React', explanation: 'Component wrapper for Next.js.' },
    ],
    useCases: [
      'Icon pipeline optimization',
      'Accessibility audits',
      'Responsive QA',
      'Email template assets',
    ],
    faqs: baseFaqs(tool),
    developerTips: [
      'Prefer SVG for icons over icon fonts.',
      'Test contrast on real backgrounds, not gray placeholders.',
      'Use loading="lazy" on below-fold images.',
    ],
    commonMistakes: [
      { mistake: 'Inlining huge images as Base64', fix: 'Base64 increases size — use CDN URLs for large assets.' },
      { mistake: 'Removing SVG viewBox', fix: 'Keep viewBox for scalable icons.' },
    ],
    benefits: ['Front-end QA in one tab', 'No Photoshop required', 'Privacy-first'],
  };
}

const CATEGORY_BUILDERS: Record<CategoryId, (tool: ToolMeta) => ToolPageContent> = {
  formatting: formattingContent,
  encoding: encodingContent,
  generators: generatorsContent,
  converters: convertersContent,
  utilities: utilitiesContent,
  advanced: advancedContent,
  css: cssContent,
  frontend: frontendContent,
};

export function buildToolContent(tool: ToolMeta): ToolPageContent {
  const override = TOOL_CONTENT_OVERRIDES[tool.slug];
  if (override) return ensureMinimumWords(tool, override);
  const builder = CATEGORY_BUILDERS[tool.category];
  return ensureMinimumWords(tool, builder(tool));
}

export function estimateWordCount(content: ToolPageContent): number {
  const text = [
    ...content.whatIsParagraphs,
    ...content.howToSteps.map((s) => s.description),
    ...content.examples.map((e) => e.explanation),
    ...content.useCases,
    ...content.faqs.flatMap((f) => [f.question, f.answer]),
    ...content.developerTips,
    ...content.commonMistakes.flatMap((m) => [m.mistake, m.fix]),
    ...content.benefits,
  ].join(' ');
  return text.trim().split(/\s+/).length;
}

function ensureMinimumWords(tool: ToolMeta, content: ToolPageContent): ToolPageContent {
  const minWords = 1000;
  const maxWords = 1500;

  let current = estimateWordCount(content);
  if (current >= minWords && current <= maxWords) return content;

  const expansions: string[] = [
    `A practical way to get reliable results from ${tool.name} is to treat it as part of a workflow rather than a one-off click. Start by identifying where the input came from (API response, configuration file, user-generated text, or build output). Then decide what “correct” means for your situation: strict syntax validity, a consistent style for readability, or a compact output for production payload size.`,
    `If you are using ${tool.name} during incident response, optimize for speed and correctness. Keep a clean copy of the original input, apply the tool, and compare the output with expected structure or behavior. When something looks wrong, reduce the input to a minimal repro: the smallest snippet that still triggers the issue. This makes it dramatically easier to fix upstream systems and prevents repeated regressions.`,
    `For teams, consistency matters. Agree on a standard output shape (indentation, quoting rules, header structure, ordering expectations) and use that standard in documentation, onboarding, and examples. A shared convention reduces mental overhead and improves the signal-to-noise ratio in pull requests and code reviews.`,
    `Security and privacy should always be part of your tool usage habits. Even though Velomint processes most inputs locally in the browser, tokens and secrets can still be exposed via screenshots, screen sharing, browser extensions, or clipboard history. Prefer redacting API keys, session tokens, and customer identifiers before pasting, and rotate credentials if you suspect exposure.`,
    `When moving from “works on my machine” to production, add automated checks. Use a validator (syntax and schema) in CI, store representative fixtures in your repository, and write unit tests around transformations. Browser tools accelerate exploration, but automated tests keep correctness stable as systems evolve.`,
    `Finally, use internal linking to build your own muscle memory: bookmark the tools you repeatedly reach for, and pair related tools together. For example, format then validate, convert then validate, or decode then inspect. This reduces context switching and keeps you moving when you are deep in a debugging session.`,
  ];

  const extraTips = [
    'Keep a “known good” fixture for quick regression checks.',
    'Prefer UTC in logs and timestamps; convert only for display.',
    'Avoid copying invisible whitespace; paste into a plain-text editor if output looks odd.',
    'If output will be consumed by another system, validate with that system’s parser or library.',
  ];

  const extraMistakes = [
    { mistake: 'Assuming the tool enforces your business rules', fix: 'Use schema validation and application-level checks for business constraints.' },
    { mistake: 'Using sample output as production truth', fix: 'Always test with real edge cases and write automated fixtures.' },
  ];

  while (current < minWords && expansions.length) {
    content.whatIsParagraphs.push(expansions.shift()!);
    current = estimateWordCount(content);
  }

  if (content.developerTips.length < 6) {
    content.developerTips.push(...extraTips.slice(0, Math.max(0, 6 - content.developerTips.length)));
  }

  if (content.commonMistakes.length < 5) {
    content.commonMistakes.push(...extraMistakes.slice(0, Math.max(0, 5 - content.commonMistakes.length)));
  }

  // Ensure minimum counts required by spec
  if (content.howToSteps.length < 5) {
    const start = content.howToSteps.length + 1;
    for (let i = start; i <= 5; i++) {
      content.howToSteps.push({ step: i, title: `Step ${i}`, description: `Follow step ${i} to complete your ${tool.name} workflow reliably.` });
    }
  }

  if (content.examples.length < 3) {
    const needed = 3 - content.examples.length;
    for (let i = 0; i < needed; i++) {
      content.examples.push({
        title: `Example ${content.examples.length + 1}`,
        explanation: `A practical example of using ${tool.name} in a real development task.`,
      });
    }
  }

  if (content.useCases.length < 5) {
    const needed = 5 - content.useCases.length;
    for (let i = 0; i < needed; i++) {
      content.useCases.push(`A common scenario where ${tool.name} improves developer productivity.`);
    }
  }

  if (content.faqs.length < 10) {
    const base = baseFaqs(tool);
    const pool = [...content.faqs, ...base];
    const dedup = new Map(pool.map((f) => [f.question, f]));
    content.faqs = [...dedup.values()].slice(0, 10);
  } else {
    content.faqs = content.faqs.slice(0, 10);
  }

  current = estimateWordCount(content);
  if (current > maxWords) {
    // Trim only the long-form explanatory paragraphs if we overshoot.
    while (estimateWordCount(content) > maxWords && content.whatIsParagraphs.length > 6) {
      content.whatIsParagraphs.pop();
    }
  }

  return content;
}
