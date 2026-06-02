import type { ToolPageContent } from '../types';

export const jsonFormatterContent: ToolPageContent = {
  heroHighlights: [
    'Instant pretty-print with 2-space indent',
    'Validates structure while formatting',
    'Copy or download formatted output',
    '100% browser-side — data never uploaded',
  ],
  whatIsParagraphs: [
    'JSON (JavaScript Object Notation) is the lingua franca of modern APIs, configuration files, and NoSQL databases. It represents data as nested key-value pairs, arrays, strings, numbers, booleans, and null. Because JSON is consumed by both humans and machines, readability directly affects debugging velocity and incident response time.',
    'A JSON formatter takes minified or messy JSON and restructures it with consistent indentation, line breaks, and spacing. Without formatting, a single-line API response can be thousands of characters wide — nearly impossible to scan for a missing comma or mismatched bracket.',
    'Velomint\'s JSON Formatter uses native JSON.parse to validate structure before formatting. If your document is invalid, you receive an actionable error message pointing to the syntax problem rather than silent failure or corrupted output.',
    'Formatting is not merely cosmetic. Teams use formatted JSON in code reviews, Postman collections, OpenAPI examples, and log analysis. Consistent style reduces cognitive load and helps juniors spot structural issues faster.',
    'Unlike desktop editors that require pasting into files, a browser-based formatter fits into your existing workflow: copy from DevTools Network tab, format, inspect, copy back. No extensions, no sign-up, no latency from round-trips to a server.',
    'For production payloads you may still want minification to save bytes — pair this tool with our JSON Minifier when shipping to CDN or mobile clients. For development and documentation, formatted JSON remains the standard.',
  ],
  howToSteps: [
    { step: 1, title: 'Paste your JSON', description: 'Copy raw JSON from an API response, log file, config, or database export into the input panel.' },
    { step: 2, title: 'Click Format', description: 'The tool parses and re-serializes with readable 2-space indentation.' },
    { step: 3, title: 'Review structure', description: 'Scan nested objects and arrays. Collapse mentally by indentation level to find anomalies.' },
    { step: 4, title: 'Fix errors if shown', description: 'Syntax errors display with parser messages — common issues include trailing commas and unquoted keys.' },
    { step: 5, title: 'Copy or download', description: 'Use Copy for clipboard or Download to save as a .json file for tickets or documentation.' },
    { step: 6, title: 'Validate before deploy', description: 'Optionally run the same payload through JSON Validator before committing config changes.' },
  ],
  examples: [
    {
      title: 'API response formatting',
      input: '{"status":"ok","data":{"users":[{"id":1,"name":"Ada"}]}}',
      output: '{\n  "status": "ok",\n  "data": {\n    "users": [\n      { "id": 1, "name": "Ada" }\n    ]\n  }\n}',
      explanation: 'Nested API envelopes become scannable — you can verify status codes and array lengths at a glance.',
    },
    {
      title: 'package.json fragment',
      input: '{"name":"my-app","scripts":{"dev":"vite","build":"vite build"}}',
      output: '{\n  "name": "my-app",\n  "scripts": {\n    "dev": "vite",\n    "build": "vite build"\n  }\n}',
      explanation: 'Configuration files benefit from formatting during peer review even when minified in the repo.',
    },
    {
      title: 'Invalid JSON (trailing comma)',
      input: '{"valid": true,}',
      explanation: 'The formatter reports a parse error — remove the trailing comma after the last property.',
    },
  ],
  useCases: [
    'Debugging REST API responses in browser DevTools',
    'Preparing JSON samples for README and API documentation',
    'Reviewing webhook payloads from Stripe, GitHub, or Slack',
    'Cleaning exports from MongoDB or Firebase before analysis',
    'Teaching JSON structure in workshops and blog tutorials',
    'Comparing environment-specific config files side by side',
    'Preparing mock data for frontend development without a backend',
  ],
  faqs: [
    { question: 'Does formatting change my JSON data?', answer: 'No. Formatting only changes whitespace. Values, keys, and structure remain identical when the document is valid.' },
    { question: 'Is my JSON sent to a server?', answer: 'No. Parsing and formatting happen entirely in your browser using JavaScript.' },
    { question: 'What indentation does Velomint use?', answer: 'Two spaces per level, the most common convention in JavaScript ecosystems.' },
    { question: 'Can I format large JSON files?', answer: 'Very large documents may slow the browser. For multi-megabyte files, consider splitting or using streaming CLI tools.' },
    { question: 'Why does JSON.parse fail on my file?', answer: 'JSON does not allow trailing commas, comments, single quotes, or unquoted keys. Use JSON Validator for detailed errors.' },
    { question: 'Is JSON5 supported?', answer: 'No. This tool accepts strict RFC 8259 JSON only. Convert JSON5 to standard JSON first.' },
    { question: 'Can I minify after formatting?', answer: 'Yes. Use our JSON Minifier to produce a single-line production payload.' },
    { question: 'Does key order change?', answer: 'Modern JavaScript preserves insertion order for string keys. Re-serialization typically maintains key order from the parsed object.' },
    { question: 'How is this different from jq?', answer: 'jq is a CLI for querying and transforming JSON. This tool focuses on quick visual formatting in the browser.' },
    { question: 'Can I format JSON with BigInt values?', answer: 'Standard JSON.parse does not support BigInt. Such values must be stringified before formatting.' },
  ],
  developerTips: [
    'Pair with JSON Validator in CI to block invalid config merges.',
    'Format before diffing to avoid whitespace-only changes in reviews.',
    'Use browser bookmarks to this tool for one-click access during incidents.',
    'For secrets in JSON, redact tokens before pasting into any online tool.',
  ],
  commonMistakes: [
    { mistake: 'Pasting JavaScript object literals', fix: 'Wrap keys in double quotes and remove functions — use strict JSON syntax.' },
    { mistake: 'Leaving BOM characters at file start', fix: 'Save as UTF-8 without BOM in your editor before pasting.' },
    { mistake: 'Confusing JSON with YAML', fix: 'YAML allows tabs and unquoted strings — convert using our YAML to JSON tool first.' },
  ],
  benefits: [
    'Faster debugging of API and webhook payloads',
    'Zero installation — works on any device with a browser',
    'Privacy-first local processing',
    'Integrated with related JSON tools on Velomint',
  ],
};
