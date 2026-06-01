import { useState, useCallback } from 'react';
import {
  ToolWorkbench,
  ToolPanel,
  ToolTextArea,
} from '../components/ToolWorkbench';
import { ToolActions } from '../components/ToolActions';
import { ToolError } from '../components/ToolError';
import {
  formatJson,
  validateJson,
  formatXml,
  formatWithPrettier,
  formatSqlQuery,
  formatYamlStr,
  formatMarkdown,
  minifyHtml,
  minifyCss,
} from '@/lib/engines/format';

function useIO(initial = '') {
  const [input, setInput] = useState(initial);
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const run = useCallback((fn: () => { output: string; error?: string }) => {
    const r = fn();
    setOutput(r.output);
    setError(r.error ?? '');
  }, []);
  return { input, setInput, output, setOutput, error, run };
}

function JsonTool({ minify = false }: { minify?: boolean }) {
  const { input, setInput, output, error, run } = useIO('{\n  "hello": "world"\n}');
  return (
    <ToolWorkbench>
      <ToolPanel label="Input" actions={<button type="button" className="btn-primary text-xs" onClick={() => run(() => formatJson(input, minify))}>{minify ? 'Minify' : 'Format'}</button>}>
        <ToolTextArea value={input} onChange={setInput} aria-label="JSON input" />
      </ToolPanel>
      <ToolError message={error} />
      <ToolPanel label="Output" actions={<ToolActions output={output} filename="output.json" onClear={() => setInput('')} />}>
        <ToolTextArea value={output} onChange={() => {}} readOnly aria-label="JSON output" />
      </ToolPanel>
    </ToolWorkbench>
  );
}

export function JsonFormatterTool() {
  return <JsonTool />;
}
export function JsonMinifierTool() {
  return <JsonTool minify />;
}
export function JsonValidatorTool() {
  const { input, setInput, error, run } = useIO('{}');
  const [valid, setValid] = useState<boolean | null>(null);
  return (
    <ToolWorkbench>
      <ToolPanel label="JSON" actions={<button type="button" className="btn-primary text-xs" onClick={() => { const r = validateJson(input); setValid(r.valid); run(() => ({ output: r.valid ? '✓ Valid JSON' : '', error: r.error })); }}>Validate</button>}>
        <ToolTextArea value={input} onChange={setInput} />
      </ToolPanel>
      {valid !== null && (
        <p className={`text-sm font-medium ${valid ? 'text-mint' : 'text-coral'}`}>
          {valid ? 'Valid JSON document' : 'Invalid JSON'}
        </p>
      )}
      <ToolError message={error} />
    </ToolWorkbench>
  );
}

function XmlTool({ minify = false }: { minify?: boolean }) {
  const { input, setInput, output, error, run } = useIO('<root><item>value</item></root>');
  return (
    <ToolWorkbench>
      <ToolPanel label="XML Input" actions={<button type="button" className="btn-primary text-xs" onClick={() => run(() => formatXml(input, minify))}>{minify ? 'Minify' : 'Format'}</button>}>
        <ToolTextArea value={input} onChange={setInput} />
      </ToolPanel>
      <ToolError message={error} />
      <ToolPanel label="Output" actions={<ToolActions output={output} filename="output.xml" />}>
        <ToolTextArea value={output} onChange={() => {}} readOnly />
      </ToolPanel>
    </ToolWorkbench>
  );
}

export function XmlFormatterTool() {
  return <XmlTool />;
}
export function XmlMinifierTool() {
  return <XmlTool minify />;
}
export function XmlValidatorTool() {
  const { input, setInput, error, run } = useIO('<root/>');
  return (
    <ToolWorkbench>
      <ToolPanel label="XML" actions={<button type="button" className="btn-primary text-xs" onClick={() => run(() => { const r = formatXml(input); return r.error ? r : { output: '✓ Valid XML' }; })}>Validate</button>}>
        <ToolTextArea value={input} onChange={setInput} />
      </ToolPanel>
      <ToolError message={error} />
    </ToolWorkbench>
  );
}

function PrettierTool({ parser, minify, ext }: { parser: 'babel' | 'html' | 'css' | 'yaml'; minify?: boolean; ext: string }) {
  const { input, setInput, output, error, run } = useIO('');
  const [loading, setLoading] = useState(false);
  const action = async () => {
    setLoading(true);
    const r = parser === 'html' && minify
      ? { output: minifyHtml(input) }
      : parser === 'css' && minify
        ? { output: minifyCss(input) }
        : await formatWithPrettier(input, parser, minify);
    setLoading(false);
    run(() => r);
  };
  return (
    <ToolWorkbench>
      <ToolPanel label="Input" actions={<button type="button" className="btn-primary text-xs" disabled={loading} onClick={() => void action()}>{loading ? '…' : minify ? 'Minify' : 'Format'}</button>}>
        <ToolTextArea value={input} onChange={setInput} />
      </ToolPanel>
      <ToolError message={error} />
      <ToolPanel label="Output" actions={<ToolActions output={output} filename={`output.${ext}`} />}>
        <ToolTextArea value={output} onChange={() => {}} readOnly />
      </ToolPanel>
    </ToolWorkbench>
  );
}

export const HtmlFormatterTool = () => <PrettierTool parser="html" ext="html" />;
export const HtmlMinifierTool = () => <PrettierTool parser="html" minify ext="html" />;
export const CssFormatterTool = () => <PrettierTool parser="css" ext="css" />;
export const CssMinifierTool = () => <PrettierTool parser="css" minify ext="css" />;
export const JavascriptFormatterTool = () => <PrettierTool parser="babel" ext="js" />;
export const JavascriptMinifierTool = () => <PrettierTool parser="babel" minify ext="js" />;

export function SqlFormatterTool() {
  const { input, setInput, output, error, run } = useIO('SELECT * FROM users WHERE id = 1');
  return (
    <ToolWorkbench>
      <ToolPanel label="SQL" actions={<button type="button" className="btn-primary text-xs" onClick={() => run(() => formatSqlQuery(input))}>Format</button>}>
        <ToolTextArea value={input} onChange={setInput} />
      </ToolPanel>
      <ToolError message={error} />
      <ToolPanel label="Output" actions={<ToolActions output={output} filename="query.sql" />}>
        <ToolTextArea value={output} onChange={() => {}} readOnly />
      </ToolPanel>
    </ToolWorkbench>
  );
}

export function YamlFormatterTool() {
  const { input, setInput, output, error, run } = useIO('key: value\nlist:\n  - one');
  return (
    <ToolWorkbench>
      <ToolPanel label="YAML" actions={<button type="button" className="btn-primary text-xs" onClick={() => run(() => formatYamlStr(input))}>Format</button>}>
        <ToolTextArea value={input} onChange={setInput} />
      </ToolPanel>
      <ToolError message={error} />
      <ToolPanel label="Output" actions={<ToolActions output={output} filename="output.yaml" />}>
        <ToolTextArea value={output} onChange={() => {}} readOnly />
      </ToolPanel>
    </ToolWorkbench>
  );
}

export function MarkdownFormatterTool() {
  const { input, setInput, output, error, run } = useIO('# Title\n\nParagraph with **bold**.');
  return (
    <ToolWorkbench>
      <ToolPanel label="Markdown" actions={<button type="button" className="btn-primary text-xs" onClick={() => run(() => formatMarkdown(input))}>Format</button>}>
        <ToolTextArea value={input} onChange={setInput} />
      </ToolPanel>
      <ToolError message={error} />
      <ToolPanel label="Output" actions={<ToolActions output={output} filename="output.md" />}>
        <ToolTextArea value={output} onChange={() => {}} readOnly />
      </ToolPanel>
    </ToolWorkbench>
  );
}
