import { format as formatSql } from 'sql-formatter';
import yaml from 'js-yaml';
import { marked } from 'marked';
import type { Plugin as PrettierPlugin } from 'prettier';

type PrettierStandalone = typeof import('prettier/standalone');

let prettierCache:
  | { prettier: PrettierStandalone; plugins: PrettierPlugin[] }
  | undefined;

async function loadPrettier() {
  if (prettierCache) return prettierCache;

  const [prettier, prettierBabel, prettierEstree, prettierHtml, prettierPostcss, prettierYaml] =
    await Promise.all([
      import('prettier/standalone'),
      import('prettier/plugins/babel'),
      import('prettier/plugins/estree'),
      import('prettier/plugins/html'),
      import('prettier/plugins/postcss'),
      import('prettier/plugins/yaml'),
    ]);

  prettierCache = {
    prettier,
    plugins: [
      prettierBabel.default as PrettierPlugin,
      prettierEstree.default as PrettierPlugin,
      prettierHtml.default as PrettierPlugin,
      prettierPostcss.default as PrettierPlugin,
      prettierYaml.default as PrettierPlugin,
    ],
  };
  return prettierCache;
}

export function formatJson(input: string, minify = false): { output: string; error?: string } {
  try {
    const parsed = JSON.parse(input) as unknown;
    return { output: JSON.stringify(parsed, null, minify ? 0 : 2) };
  } catch (e) {
    return { output: '', error: e instanceof Error ? e.message : 'Invalid JSON' };
  }
}

export function validateJson(input: string): { valid: boolean; error?: string } {
  try {
    JSON.parse(input);
    return { valid: true };
  } catch (e) {
    return { valid: false, error: e instanceof Error ? e.message : 'Invalid JSON' };
  }
}

export function formatXml(input: string, minify = false): { output: string; error?: string } {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(input, 'application/xml');
    const parseError = doc.querySelector('parsererror');
    if (parseError) return { output: '', error: 'Invalid XML' };

    const serializer = new XMLSerializer();
    let xml = serializer.serializeToString(doc);
    if (!minify) {
      xml = xml.replace(/></g, '>\n<');
      const lines = xml.split('\n');
      let indent = 0;
      xml = lines
        .map((line) => {
          const trimmed = line.trim();
          if (!trimmed) return '';
          if (trimmed.startsWith('</')) indent = Math.max(0, indent - 1);
          const padded = '  '.repeat(indent) + trimmed;
          if (trimmed.startsWith('<') && !trimmed.startsWith('</') && !trimmed.endsWith('/>')) {
            if (!trimmed.includes('</')) indent++;
          }
          return padded;
        })
        .filter(Boolean)
        .join('\n');
    } else {
      xml = xml.replace(/>\s+</g, '><').replace(/\s+/g, ' ').trim();
    }
    return { output: xml };
  } catch (e) {
    return { output: '', error: e instanceof Error ? e.message : 'Invalid XML' };
  }
}

export async function formatWithPrettier(
  input: string,
  parser: 'babel' | 'html' | 'css' | 'yaml',
  minify = false,
): Promise<{ output: string; error?: string }> {
  try {
    const { prettier, plugins } = await loadPrettier();
    const output = await prettier.format(input, {
      parser,
      plugins,
      ...(minify ? { printWidth: 1_000_000 } : {}),
    });
    return { output: minify ? output.replace(/\n\s*/g, ' ').trim() : output };
  } catch (e) {
    return { output: '', error: e instanceof Error ? e.message : 'Format failed' };
  }
}

export function formatSqlQuery(input: string): { output: string; error?: string } {
  try {
    return { output: formatSql(input, { language: 'sql' }) };
  } catch (e) {
    return { output: '', error: e instanceof Error ? e.message : 'SQL format failed' };
  }
}

export function formatYamlStr(input: string): { output: string; error?: string } {
  try {
    const parsed = yaml.load(input);
    return { output: yaml.dump(parsed, { lineWidth: 120, noRefs: true }) };
  } catch (e) {
    return { output: '', error: e instanceof Error ? e.message : 'Invalid YAML' };
  }
}

export function formatMarkdown(input: string): { output: string; error?: string } {
  try {
    return { output: input.replace(/\n{3,}/g, '\n\n').trim() };
  } catch (e) {
    return { output: '', error: e instanceof Error ? e.message : 'Format failed' };
  }
}

export function markdownToHtml(md: string): string {
  return marked.parse(md, { async: false }) as string;
}

export function minifyHtml(input: string): string {
  return input
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/\s+/g, ' ')
    .replace(/>\s+</g, '><')
    .trim();
}

export function minifyCss(input: string): string {
  return input.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s+/g, ' ').replace(/\s*([{}:;,])\s*/g, '$1').trim();
}
