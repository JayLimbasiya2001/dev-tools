import { useState, useMemo } from 'react';
import { ToolWorkbench, ToolPanel, ToolTextArea } from '../components/ToolWorkbench';
import { ToolActions } from '../components/ToolActions';
import { ToolError } from '../components/ToolError';

function CodecTool({
  encode,
  decode,
  sample = 'Hello, Velomint!',
}: {
  encode: (s: string) => string;
  decode: (s: string) => string;
  sample?: string;
}) {
  const [input, setInput] = useState(sample);
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [error, setError] = useState('');

  const output = useMemo(() => {
    try {
      setError('');
      return mode === 'encode' ? encode(input) : decode(input);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Operation failed');
      return '';
    }
  }, [input, mode, encode, decode]);

  return (
    <ToolWorkbench>
      <div className="flex gap-2">
        <button type="button" className={mode === 'encode' ? 'btn-primary text-xs' : 'btn-secondary text-xs'} onClick={() => setMode('encode')}>Encode</button>
        <button type="button" className={mode === 'decode' ? 'btn-primary text-xs' : 'btn-secondary text-xs'} onClick={() => setMode('decode')}>Decode</button>
      </div>
      <ToolPanel label="Input">
        <ToolTextArea value={input} onChange={setInput} />
      </ToolPanel>
      <ToolError message={error} />
      <ToolPanel label="Output" actions={<ToolActions output={output} />}>
        <ToolTextArea value={output} onChange={() => {}} readOnly />
      </ToolPanel>
    </ToolWorkbench>
  );
}

export const Base64Tool = () => (
  <CodecTool
    encode={(s) => btoa(unescape(encodeURIComponent(s)))}
    decode={(s) => decodeURIComponent(escape(atob(s)))}
  />
);

export const UrlCodecTool = () => (
  <CodecTool encode={encodeURIComponent} decode={decodeURIComponent} />
);

export const HtmlCodecTool = () => (
  <CodecTool
    encode={(s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')}
    decode={(s) => {
      const el = document.createElement('textarea');
      el.innerHTML = s;
      return el.value;
    }}
  />
);

export function JwtDecoderTool() {
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const parts = useMemo(() => {
    try {
      setError('');
      const [header, payload, signature] = token.split('.');
      if (!header || !payload) throw new Error('Invalid JWT structure');
      const decode = (p: string) => JSON.stringify(JSON.parse(atob(p.replace(/-/g, '+').replace(/_/g, '/'))), null, 2);
      return { header: decode(header), payload: decode(payload), signature: signature ?? '' };
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Invalid JWT');
      return null;
    }
  }, [token]);

  return (
    <ToolWorkbench>
      <ToolPanel label="JWT Token">
        <ToolTextArea value={token} onChange={setToken} placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." rows={4} />
      </ToolPanel>
      <ToolError message={error} />
      {parts && (
        <>
          <ToolPanel label="Header"><ToolTextArea value={parts.header} onChange={() => {}} readOnly rows={6} /></ToolPanel>
          <ToolPanel label="Payload"><ToolTextArea value={parts.payload} onChange={() => {}} readOnly rows={10} /></ToolPanel>
          <ToolPanel label="Signature"><ToolTextArea value={parts.signature} onChange={() => {}} readOnly rows={2} /></ToolPanel>
        </>
      )}
    </ToolWorkbench>
  );
}

export const JwtInspectorTool = JwtDecoderTool;

export function UnicodeConverterTool() {
  const [input, setInput] = useState('Hello');
  const [mode, setMode] = useState<'toUnicode' | 'fromUnicode'>('toUnicode');
  const output = useMemo(() => {
    if (mode === 'toUnicode') {
      return [...input].map((c) => `U+${c.codePointAt(0)!.toString(16).toUpperCase().padStart(4, '0')}`).join(' ');
    }
    return input.replace(/U\+([0-9A-Fa-f]+)/g, (_, hex) => String.fromCodePoint(parseInt(hex, 16)));
  }, [input, mode]);

  return (
    <ToolWorkbench>
      <div className="flex gap-2">
        <button type="button" className={mode === 'toUnicode' ? 'btn-primary text-xs' : 'btn-secondary text-xs'} onClick={() => setMode('toUnicode')}>To Unicode</button>
        <button type="button" className={mode === 'fromUnicode' ? 'btn-primary text-xs' : 'btn-secondary text-xs'} onClick={() => setMode('fromUnicode')}>From Unicode</button>
      </div>
      <ToolPanel label="Input"><ToolTextArea value={input} onChange={setInput} /></ToolPanel>
      <ToolPanel label="Output" actions={<ToolActions output={output} />}><ToolTextArea value={output} onChange={() => {}} readOnly /></ToolPanel>
    </ToolWorkbench>
  );
}

export function AsciiConverterTool() {
  const [input, setInput] = useState('ABC');
  const output = useMemo(
    () =>
      [...input]
        .map((c) => `${c} → ${c.charCodeAt(0)} (0x${c.charCodeAt(0).toString(16).toUpperCase()})`)
        .join('\n'),
    [input],
  );
  return (
    <ToolWorkbench>
      <ToolPanel label="Text"><ToolTextArea value={input} onChange={setInput} rows={4} /></ToolPanel>
      <ToolPanel label="ASCII Codes" actions={<ToolActions output={output} />}><ToolTextArea value={output} onChange={() => {}} readOnly /></ToolPanel>
    </ToolWorkbench>
  );
}
