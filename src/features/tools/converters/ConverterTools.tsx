import { useState } from 'react';
import { ToolWorkbench, ToolPanel, ToolTextArea } from '../components/ToolWorkbench';
import { ToolActions } from '../components/ToolActions';
import { ToolError } from '../components/ToolError';
import {
  jsonToCsv,
  csvToJson,
  jsonToXml,
  xmlToJson,
  jsonToYaml,
  yamlToJson,
} from '@/lib/engines/convert';
import { markdownToHtml } from '@/lib/engines/format';

function Converter({ run, sample, outFile }: { run: (i: string) => { output: string; error?: string }; sample: string; outFile: string }) {
  const [input, setInput] = useState(sample);
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const convert = () => {
    const r = run(input);
    setOutput(r.output);
    setError(r.error ?? '');
  };
  return (
    <ToolWorkbench>
      <ToolPanel label="Input" actions={<button type="button" className="btn-primary text-xs" onClick={convert}>Convert</button>}>
        <ToolTextArea value={input} onChange={setInput} />
      </ToolPanel>
      <ToolError message={error} />
      <ToolPanel label="Output" actions={<ToolActions output={output} filename={outFile} />}>
        <ToolTextArea value={output} onChange={() => {}} readOnly />
      </ToolPanel>
    </ToolWorkbench>
  );
}

export const JsonToCsvTool = () => <Converter run={jsonToCsv} sample='[{"name":"Ada","role":"eng"}]' outFile="out.csv" />;
export const CsvToJsonTool = () => <Converter run={csvToJson} sample={'name,role\nAda,eng'} outFile="out.json" />;
export const JsonToXmlTool = () => <Converter run={jsonToXml} sample='{"root":{"item":"value"}}' outFile="out.xml" />;
export const XmlToJsonTool = () => <Converter run={xmlToJson} sample="<root><item>value</item></root>" outFile="out.json" />;
export const JsonToYamlTool = () => <Converter run={jsonToYaml} sample='{"key":"value"}' outFile="out.yaml" />;
export const YamlToJsonTool = () => <Converter run={yamlToJson} sample="key: value" outFile="out.json" />;

export function MarkdownToHtmlTool() {
  const [input, setInput] = useState('# Hello\n\n**Velomint** tools.');
  const output = markdownToHtml(input);
  return (
    <ToolWorkbench>
      <ToolPanel label="Markdown"><ToolTextArea value={input} onChange={setInput} /></ToolPanel>
      <ToolPanel label="HTML" actions={<ToolActions output={output} filename="out.html" />}>
        <ToolTextArea value={output} onChange={() => {}} readOnly />
      </ToolPanel>
      <ToolPanel label="Preview">
        <div className="prose prose-invert max-w-none text-sm" dangerouslySetInnerHTML={{ __html: output }} />
      </ToolPanel>
    </ToolWorkbench>
  );
}

export function HtmlToMarkdownTool() {
  const [input, setInput] = useState('<h1>Title</h1><p>Paragraph</p>');
  const output = input
    .replace(/<h1[^>]*>(.*?)<\/h1>/gi, '# $1\n\n')
    .replace(/<h2[^>]*>(.*?)<\/h2>/gi, '## $1\n\n')
    .replace(/<p[^>]*>(.*?)<\/p>/gi, '$1\n\n')
    .replace(/<strong>(.*?)<\/strong>/gi, '**$1**')
    .replace(/<[^>]+>/g, '')
    .trim();
  return (
    <ToolWorkbench>
      <ToolPanel label="HTML"><ToolTextArea value={input} onChange={setInput} /></ToolPanel>
      <ToolPanel label="Markdown" actions={<ToolActions output={output} />}><ToolTextArea value={output} onChange={() => {}} readOnly /></ToolPanel>
    </ToolWorkbench>
  );
}
