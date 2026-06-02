import type { ToolPageContent } from '../types';

export const regexTesterContent: ToolPageContent = {
  heroHighlights: [
    'Live pattern matching',
    'Custom flag support (g, i, m)',
    'Instant match count',
    'Test before deploying to production code',
  ],
  whatIsParagraphs: [
    'Regular expressions (regex) are patterns used to match, search, and manipulate text. They power validation in HTML forms, log parsing, syntax highlighting, data extraction, and refactoring tools across every major programming language.',
    'A regex combines literal characters with metacharacters: . for any character, * for repetition, [] for character classes, () for groups, ^ and $ for anchors, and \\d\\w\\s for digit, word, and whitespace shortcuts. Flags modify behavior — global (g), case-insensitive (i), and multiline (m).',
    'Testing regex interactively saves hours of deploy-and-pray cycles. A pattern that looks correct in your head may catastrophic-backtrack on large inputs or fail on edge cases like empty strings and Unicode combining characters.',
    'Velomint\'s Regex Tester compiles your pattern in real time using JavaScript\'s RegExp engine — the same engine used in Node.js and browsers. Results reflect what you will see in frontend code; for PCRE differences in PHP or Python, validate separately.',
    'Production regex should always be anchored when validating full strings (^pattern$). Partial matching accepts substrings — useful for search, dangerous for email or password validation if you forget anchors.',
    'Combine this tool with Password Generator and Slug Generator workflows: test validation rules before adding them to Zod schemas, React Hook Form, or API middleware.',
  ],
  howToSteps: [
    { step: 1, title: 'Enter your pattern', description: 'Type the regex in the pattern field. Escape backslashes for literal matches.' },
    { step: 2, title: 'Set flags', description: 'Add g, i, m as needed. Start without g when you want the first match only.' },
    { step: 3, title: 'Paste test string', description: 'Use representative samples including edge cases and failure cases.' },
    { step: 4, title: 'Review matches', description: 'Matched substrings appear below. Zero matches means refine the pattern.' },
    { step: 5, title: 'Iterate', description: 'Adjust quantifiers and character classes until all test cases pass.' },
    { step: 6, title: 'Copy to codebase', description: 'Transfer the tested pattern to your validator, ensuring escaping rules for your language.' },
  ],
  examples: [
    {
      title: 'Email-style validation (simplified)',
      input: 'Pattern: ^[\\w.-]+@[\\w.-]+\\.\\w+$ | Text: dev@velomint.dev',
      explanation: 'Anchored pattern validates full string. Real email regex is more complex — use libraries in production.',
    },
    {
      title: 'Extract URLs',
      input: 'Pattern: https?://[^\\s]+ | Flags: g',
      explanation: 'Global flag finds all HTTP(S) URLs in a block of text.',
    },
    {
      title: 'Slug validation',
      input: 'Pattern: ^[a-z0-9]+(?:-[a-z0-9]+)*$ | Text: json-formatter',
      explanation: 'Validates lowercase hyphenated slugs common in SEO-friendly URLs.',
    },
  ],
  useCases: [
    'Form field validation before shipping Zod or Yup schemas',
    'Log line parsing and grep-style extraction',
    'Refactoring legacy code with search-and-replace patterns',
    'Security input sanitization reviews',
    'Teaching regex in bootcamps with instant feedback',
    'Testing slug and username rules for SaaS signup',
  ],
  faqs: [
    { question: 'Which regex flavor does this use?', answer: 'JavaScript RegExp (ECMAScript). Slight differences exist vs PCRE or Python re.' },
    { question: 'Why does my pattern throw an error?', answer: 'Unclosed brackets, invalid escapes, or unsupported constructs cause compile errors displayed in the UI.' },
    { question: 'What does the g flag do?', answer: 'Global — finds all matches. Without g, only the first match is returned.' },
    { question: 'How do I match a literal dot?', answer: 'Escape it as \\. because . alone means any character.' },
    { question: 'Can regex parse HTML or JSON?', answer: 'Not reliably. Use proper parsers for structured data — regex is for text patterns only.' },
    { question: 'What is catastrophic backtracking?', answer: 'Nested quantifiers like (a+)+ can hang on long strings. Test with large inputs before production.' },
    { question: 'How do I match Unicode?', answer: 'Use \\p{Letter} with the u flag in modern JavaScript, or test Unicode samples explicitly.' },
    { question: 'Difference between \\w and [a-zA-Z0-9_]?', answer: '\\w includes underscore and may include more depending on Unicode mode.' },
    { question: 'Should I validate email with regex alone?', answer: 'Use validation libraries. Regex catches obvious typos but not all RFC edge cases.' },
    { question: 'Is my test string uploaded?', answer: 'No. Matching runs locally in your browser.' },
  ],
  developerTips: [
    'Prefer possessive or atomic groups in engines that support them for performance-critical paths.',
    'Document regex with comments in code (x flag where supported) or adjacent unit tests.',
    'Store complex patterns in named constants with test fixtures in your repo.',
    'Use non-capturing (?:) groups when you do not need backreferences.',
  ],
  commonMistakes: [
    { mistake: 'Forgetting anchors for full-string validation', fix: 'Use ^ and $ when the entire input must match.' },
    { mistake: 'Overly permissive .* in security contexts', fix: 'Use explicit character classes like [^\\n]+ instead.' },
    { mistake: 'Double-escaping when copying to JSON strings', fix: 'In JSON, \\\\ becomes \\ for the regex engine.' },
  ],
  benefits: [
    'Catch regex bugs before production deploys',
    'Same engine as your frontend JavaScript code',
    'Zero setup — instant feedback loop',
    'Integrated with Velomint validation and generator tools',
  ],
};
