import { useState, useMemo } from 'react';
import * as Diff from 'diff';
import { ToolWorkbench, ToolPanel, ToolTextArea } from '../components/ToolWorkbench';
import { ToolActions } from '../components/ToolActions';

const HTTP_STATUSES: Record<number, string> = {
  200: 'OK', 201: 'Created', 204: 'No Content', 301: 'Moved Permanently', 302: 'Found',
  400: 'Bad Request', 401: 'Unauthorized', 403: 'Forbidden', 404: 'Not Found', 409: 'Conflict',
  422: 'Unprocessable Entity', 429: 'Too Many Requests', 500: 'Internal Server Error', 502: 'Bad Gateway', 503: 'Service Unavailable',
};

const MIME_TYPES: Record<string, string> = {
  'application/json': 'JSON data',
  'application/xml': 'XML data',
  'text/html': 'HTML document',
  'text/css': 'CSS stylesheet',
  'text/javascript': 'JavaScript',
  'image/png': 'PNG image',
  'image/jpeg': 'JPEG image',
  'image/svg+xml': 'SVG image',
};

export function RegexTesterTool() {
  const [pattern, setPattern] = useState('');
  const [flags, setFlags] = useState('g');
  const [text, setText] = useState('sample text 123');
  const result = useMemo(() => {
    try {
      const re = new RegExp(pattern, flags);
      const matches = [...text.matchAll(re)];
      return { error: '', matches: matches.map((m) => m[0]).join(', ') || 'No matches', count: matches.length };
    } catch (e) {
      return { error: e instanceof Error ? e.message : 'Invalid regex', matches: '', count: 0 };
    }
  }, [pattern, flags, text]);

  return (
    <ToolWorkbench>
      <div className="grid sm:grid-cols-2 gap-3">
        <input value={pattern} onChange={(e) => setPattern(e.target.value)} placeholder="Pattern" className="input-field font-mono" />
        <input value={flags} onChange={(e) => setFlags(e.target.value)} placeholder="Flags (gim)" className="input-field font-mono w-24" />
      </div>
      <ToolPanel label="Test String"><ToolTextArea value={text} onChange={setText} rows={6} /></ToolPanel>
      {result.error ? <p className="text-coral text-sm">{result.error}</p> : (
        <p className="text-sm"><span className="text-mint font-medium">{result.count}</span> matches: <code className="font-mono">{result.matches || '—'}</code></p>
      )}
    </ToolWorkbench>
  );
}

export function CronBuilderTool() {
  const [min, setMin] = useState('*');
  const [hour, setHour] = useState('*');
  const [dom, setDom] = useState('*');
  const [mon, setMon] = useState('*');
  const [dow, setDow] = useState('*');
  const expr = `${min} ${hour} ${dom} ${mon} ${dow}`;
  return (
    <ToolWorkbench>
      <div className="grid grid-cols-5 gap-2 text-xs font-mono">
        {(
          [
            { label: 'Minute', value: min, onChange: setMin },
            { label: 'Hour', value: hour, onChange: setHour },
            { label: 'Day', value: dom, onChange: setDom },
            { label: 'Month', value: mon, onChange: setMon },
            { label: 'Weekday', value: dow, onChange: setDow },
          ] as const
        ).map(({ label, value, onChange }) => (
          <label key={label} className="flex flex-col gap-1">
            <span className="text-muted">{label}</span>
            <input value={value} onChange={(e) => onChange(e.target.value)} className="input-field text-center" />
          </label>
        ))}
      </div>
      <ToolPanel label="Cron Expression" actions={<ToolActions output={expr} />}>
        <p className="font-mono text-2xl text-mint">{expr}</p>
        <p className="text-sm text-muted mt-2">Example: 0 9 * * 1-5 = 9:00 AM weekdays</p>
      </ToolPanel>
    </ToolWorkbench>
  );
}

export function TimestampConverterTool() {
  const [ts, setTs] = useState(String(Date.now()));
  const parsed = useMemo(() => {
    const n = Number(ts);
    if (Number.isNaN(n)) return null;
    const ms = ts.length <= 10 ? n * 1000 : n;
    return new Date(ms);
  }, [ts]);

  return (
    <ToolWorkbench>
      <ToolPanel label="Timestamp (ms or s)">
        <input value={ts} onChange={(e) => setTs(e.target.value)} className="input-field font-mono w-full" />
      </ToolPanel>
      {parsed && (
        <div className="glass rounded-2xl p-4 space-y-2 text-sm font-mono">
          <p>ISO: {parsed.toISOString()}</p>
          <p>UTC: {parsed.toUTCString()}</p>
          <p>Local: {parsed.toLocaleString()}</p>
        </div>
      )}
      <button type="button" className="btn-secondary text-xs" onClick={() => setTs(String(Date.now()))}>Now</button>
    </ToolWorkbench>
  );
}

export const UnixTimeConverterTool = TimestampConverterTool;

export function DiffCheckerTool() {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const diff = useMemo(() => Diff.diffLines(a, b), [a, b]);
  return (
    <ToolWorkbench>
      <div className="grid lg:grid-cols-2 gap-4">
        <ToolPanel label="Original"><ToolTextArea value={a} onChange={setA} /></ToolPanel>
        <ToolPanel label="Modified"><ToolTextArea value={b} onChange={setB} /></ToolPanel>
      </div>
      <ToolPanel label="Diff">
        <pre className="font-mono text-xs overflow-auto max-h-96">
          {diff.map((part, i) => (
            <span key={i} className={part.added ? 'text-mint bg-mint/10' : part.removed ? 'text-coral bg-coral/10 line-through' : ''}>
              {part.value}
            </span>
          ))}
        </pre>
      </ToolPanel>
    </ToolWorkbench>
  );
}

export const TextCompareTool = DiffCheckerTool;

export function ApiRequestBuilderTool() {
  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('https://api.example.com/v1/users');
  const [headers, setHeaders] = useState('Content-Type: application/json');
  const [body, setBody] = useState('');
  const curl = `curl -X ${method} "${url}" \\\n${headers.split('\n').filter(Boolean).map((h) => `  -H "${h.trim()}"`).join(' \\\n')}${body ? ` \\\n  -d '${body.replace(/'/g, "'\\''")}'` : ''}`;

  return (
    <ToolWorkbench>
      <div className="flex gap-2 flex-wrap">
        <select value={method} onChange={(e) => setMethod(e.target.value)} className="input-inline">
          {['GET', 'POST', 'PUT', 'PATCH', 'DELETE'].map((m) => <option key={m}>{m}</option>)}
        </select>
        <input value={url} onChange={(e) => setUrl(e.target.value)} className="input-field flex-1 font-mono text-sm" />
      </div>
      <ToolPanel label="Headers"><ToolTextArea value={headers} onChange={setHeaders} rows={4} /></ToolPanel>
      <ToolPanel label="Body"><ToolTextArea value={body} onChange={setBody} rows={6} /></ToolPanel>
      <ToolPanel label="cURL" actions={<ToolActions output={curl} filename="request.sh" />}><ToolTextArea value={curl} onChange={() => {}} readOnly /></ToolPanel>
    </ToolWorkbench>
  );
}

export const CurlBuilderTool = ApiRequestBuilderTool;

export function HttpStatusExplorerTool() {
  const [code, setCode] = useState('404');
  const n = parseInt(code, 10);
  const meaning = HTTP_STATUSES[n];
  return (
    <ToolWorkbench>
      <input type="number" value={code} onChange={(e) => setCode(e.target.value)} className="input-field w-32 font-mono" />
      <p className="text-2xl font-display font-bold">{meaning ?? 'Unknown status code'}</p>
      <div className="grid sm:grid-cols-2 gap-2 mt-4 max-h-64 overflow-auto text-sm">
        {Object.entries(HTTP_STATUSES).map(([c, m]) => (
          <button key={c} type="button" className="text-left px-3 py-2 rounded-lg hover:bg-violet/10" onClick={() => setCode(c)}>
            <span className="text-mint font-mono">{c}</span> — {m}
          </button>
        ))}
      </div>
    </ToolWorkbench>
  );
}

export function MimeTypeFinderTool() {
  const [q, setQ] = useState('json');
  const filtered = Object.entries(MIME_TYPES).filter(([k, v]) => k.includes(q) || v.toLowerCase().includes(q.toLowerCase()));
  return (
    <ToolWorkbench>
      <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search MIME types..." className="input-field" />
      <ul className="space-y-2 text-sm font-mono max-h-80 overflow-auto">
        {filtered.map(([k, v]) => (
          <li key={k} className="glass rounded-lg px-3 py-2"><span className="text-mint">{k}</span> — {v}</li>
        ))}
      </ul>
    </ToolWorkbench>
  );
}
