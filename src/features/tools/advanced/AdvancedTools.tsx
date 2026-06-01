import { useState } from 'react';
import { ToolWorkbench, ToolPanel, ToolTextArea } from '../components/ToolWorkbench';
import { ToolActions } from '../components/ToolActions';
import { ToolError } from '../components/ToolError';

export function RestApiPlaygroundTool() {
  const [url, setUrl] = useState('https://jsonplaceholder.typicode.com/posts/1');
  const [method, setMethod] = useState('GET');
  const [response, setResponse] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const send = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(url, { method });
      setStatus(`${res.status} ${res.statusText}`);
      const text = await res.text();
      try {
        setResponse(JSON.stringify(JSON.parse(text), null, 2));
      } catch {
        setResponse(text);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Request failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ToolWorkbench>
      <div className="flex gap-2">
        <select value={method} onChange={(e) => setMethod(e.target.value)} className="input-inline">
          {['GET', 'POST', 'PUT', 'DELETE'].map((m) => <option key={m}>{m}</option>)}
        </select>
        <input value={url} onChange={(e) => setUrl(e.target.value)} className="input-field flex-1 font-mono text-sm" />
        <button type="button" className="btn-primary text-xs" disabled={loading} onClick={() => void send()}>{loading ? 'Sending…' : 'Send'}</button>
      </div>
      <ToolError message={error} />
      {status && <p className="text-sm text-mint font-mono">{status}</p>}
      <ToolPanel label="Response" actions={<ToolActions output={response} />}>
        <ToolTextArea value={response} onChange={() => {}} readOnly />
      </ToolPanel>
    </ToolWorkbench>
  );
}

export function GraphqlQueryBuilderTool() {
  const [query, setQuery] = useState(`query GetUser($id: ID!) {\n  user(id: $id) {\n    id\n    name\n    email\n  }\n}`);
  const [variables, setVariables] = useState('{"id": "1"}');
  return (
    <ToolWorkbench>
      <ToolPanel label="Query"><ToolTextArea value={query} onChange={setQuery} /></ToolPanel>
      <ToolPanel label="Variables"><ToolTextArea value={variables} onChange={setVariables} rows={4} /></ToolPanel>
      <ToolPanel label="Payload" actions={<ToolActions output={JSON.stringify({ query, variables: JSON.parse(variables || '{}') }, null, 2)} />}>
        <ToolTextArea value={JSON.stringify({ query, variables: JSON.parse(variables || '{}') }, null, 2)} onChange={() => {}} readOnly rows={8} />
      </ToolPanel>
    </ToolWorkbench>
  );
}

export function ApiDocGeneratorTool() {
  const [spec, setSpec] = useState('{"openapi":"3.0.0","info":{"title":"API","version":"1.0.0"},"paths":{}}');
  const html = `<!DOCTYPE html><html><head><title>API Docs</title></head><body><pre>${spec}</pre></body></html>`;
  return (
    <ToolWorkbench>
      <ToolPanel label="OpenAPI Spec"><ToolTextArea value={spec} onChange={setSpec} /></ToolPanel>
      <ToolPanel label="Generated HTML" actions={<ToolActions output={html} filename="api-docs.html" />}><ToolTextArea value={html} onChange={() => {}} readOnly rows={6} /></ToolPanel>
    </ToolWorkbench>
  );
}

export const OpenApiViewerTool = ApiDocGeneratorTool;

export function MockApiResponseTool() {
  const [status, setStatus] = useState('200');
  const [body, setBody] = useState('{"success":true}');
  const mock = { status: +status, headers: { 'Content-Type': 'application/json' }, body: JSON.parse(body || '{}') };
  const output = JSON.stringify(mock, null, 2);
  return (
    <ToolWorkbench>
      <input type="number" value={status} onChange={(e) => setStatus(e.target.value)} className="input-field w-24" />
      <ToolPanel label="Response Body"><ToolTextArea value={body} onChange={setBody} /></ToolPanel>
      <ToolPanel label="Mock Response" actions={<ToolActions output={output} />}><ToolTextArea value={output} onChange={() => {}} readOnly /></ToolPanel>
    </ToolWorkbench>
  );
}

export function EnvVarManagerTool() {
  const [env, setEnv] = useState('NODE_ENV=development\nPORT=3000\nAPI_URL=https://api.example.com');
  const parsed = env.split('\n').filter(Boolean).map((line) => {
    const i = line.indexOf('=');
    return i === -1 ? { key: line, value: '' } : { key: line.slice(0, i), value: line.slice(i + 1) };
  });
  return (
    <ToolWorkbench>
      <ToolPanel label=".env"><ToolTextArea value={env} onChange={setEnv} /></ToolPanel>
      <div className="overflow-auto">
        <table className="w-full text-sm">
          <thead><tr className="text-muted border-b border-border"><th className="text-left py-2">Key</th><th className="text-left py-2">Value</th></tr></thead>
          <tbody>{parsed.map((r) => <tr key={r.key} className="border-b border-border/50 font-mono"><td className="py-2 text-mint">{r.key}</td><td className="py-2">{r.value}</td></tr>)}</tbody>
        </table>
      </div>
    </ToolWorkbench>
  );
}

export function JsonSchemaBuilderTool() {
  const [schema, setSchema] = useState('{"type":"object","properties":{"name":{"type":"string"}},"required":["name"]}');
  return (
    <ToolWorkbench>
      <ToolPanel label="JSON Schema" actions={<ToolActions output={schema} filename="schema.json" />}><ToolTextArea value={schema} onChange={setSchema} /></ToolPanel>
    </ToolWorkbench>
  );
}

export function DatabaseSchemaDesignerTool() {
  const [ddl, setDdl] = useState('CREATE TABLE users (\n  id SERIAL PRIMARY KEY,\n  email VARCHAR(255) UNIQUE NOT NULL,\n  created_at TIMESTAMPTZ DEFAULT NOW()\n);');
  return (
    <ToolWorkbench>
      <ToolPanel label="DDL" actions={<ToolActions output={ddl} filename="schema.sql" />}><ToolTextArea value={ddl} onChange={setDdl} /></ToolPanel>
    </ToolWorkbench>
  );
}

export function QueryBuilderTool() {
  const [table, setTable] = useState('users');
  const [cols, setCols] = useState('*');
  const [where, setWhere] = useState('id = 1');
  const sql = `SELECT ${cols} FROM ${table}${where ? ` WHERE ${where}` : ''};`;
  return (
    <ToolWorkbench>
      <input value={table} onChange={(e) => setTable(e.target.value)} placeholder="Table" className="input-field" />
      <input value={cols} onChange={(e) => setCols(e.target.value)} placeholder="Columns" className="input-field" />
      <input value={where} onChange={(e) => setWhere(e.target.value)} placeholder="WHERE" className="input-field" />
      <ToolPanel label="SQL" actions={<ToolActions output={sql} />}><p className="font-mono text-mint">{sql}</p></ToolPanel>
    </ToolWorkbench>
  );
}

export function RequestHeaderGeneratorTool() {
  const [type, setType] = useState('json');
  const headers =
    type === 'json'
      ? 'Content-Type: application/json\nAccept: application/json'
      : 'Content-Type: application/x-www-form-urlencoded\nAccept: */*';
  return (
    <ToolWorkbench>
      <select value={type} onChange={(e) => setType(e.target.value)} className="input-inline">
        <option value="json">JSON API</option>
        <option value="form">Form</option>
      </select>
      <ToolPanel label="Headers" actions={<ToolActions output={headers} />}><ToolTextArea value={headers} onChange={() => {}} readOnly /></ToolPanel>
    </ToolWorkbench>
  );
}

export function ResponseViewerTool() {
  const [raw, setRaw] = useState('');
  let formatted = raw;
  try {
    formatted = JSON.stringify(JSON.parse(raw), null, 2);
  } catch {
    /* keep raw */
  }
  return (
    <ToolWorkbench>
      <ToolPanel label="Raw Response"><ToolTextArea value={raw} onChange={setRaw} /></ToolPanel>
      <ToolPanel label="Formatted" actions={<ToolActions output={formatted} />}><ToolTextArea value={formatted} onChange={() => {}} readOnly /></ToolPanel>
    </ToolWorkbench>
  );
}
