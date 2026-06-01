export type CategoryId =
  | 'formatting'
  | 'encoding'
  | 'generators'
  | 'converters'
  | 'utilities'
  | 'advanced'
  | 'css'
  | 'frontend';

export interface Category {
  id: CategoryId;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export const CATEGORIES: Category[] = [
  {
    id: 'formatting',
    name: 'Formatting',
    description: 'Beautify, validate, and minify structured data and code.',
    icon: '✦',
    color: 'mint',
  },
  {
    id: 'encoding',
    name: 'Encoding',
    description: 'Encode, decode, and inspect tokens, text, and payloads.',
    icon: '◎',
    color: 'violet',
  },
  {
    id: 'generators',
    name: 'Generators',
    description: 'Generate UUIDs, passwords, hashes, mock data, and more.',
    icon: '⚡',
    color: 'amber',
  },
  {
    id: 'converters',
    name: 'Converters',
    description: 'Transform between JSON, CSV, XML, YAML, and Markdown.',
    icon: '⇄',
    color: 'mint',
  },
  {
    id: 'utilities',
    name: 'Developer Utilities',
    description: 'Regex, cron, timestamps, diffs, and HTTP helpers.',
    icon: '⬡',
    color: 'violet',
  },
  {
    id: 'advanced',
    name: 'Advanced Tools',
    description: 'API playgrounds, schema builders, and environment tools.',
    icon: '◈',
    color: 'coral',
  },
  {
    id: 'css',
    name: 'CSS Tools',
    description: 'Visual generators for layout, shadows, gradients, and motion.',
    icon: '◐',
    color: 'amber',
  },
  {
    id: 'frontend',
    name: 'Frontend Tools',
    description: 'SVG, images, contrast, and responsive design utilities.',
    icon: '◇',
    color: 'mint',
  },
];

export function getCategory(id: CategoryId) {
  return CATEGORIES.find((c) => c.id === id);
}
