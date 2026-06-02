import { useState, useMemo, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import QRCode from 'qrcode';
import { ToolWorkbench, ToolPanel, ToolTextArea } from '../components/ToolWorkbench';
import { ToolActions } from '../components/ToolActions';
import { slugify } from '@/lib/utils';

export function UuidGeneratorTool() {
  const [count, setCount] = useState(5);
  const [version, setVersion] = useState<'v4'>('v4');
  const output = useMemo(
    () => Array.from({ length: count }, () => uuidv4()).join('\n'),
    [count],
  );
  return (
    <ToolWorkbench>
      <div className="flex flex-wrap gap-4 items-center">
        <label className="text-sm text-muted">Count <input type="number" min={1} max={100} value={count} onChange={(e) => setCount(+e.target.value)} className="input-inline ml-2 w-20" /></label>
        <label className="text-sm text-muted">Version
          <select value={version} onChange={(e) => setVersion(e.target.value as 'v4')} className="input-inline ml-2">
            <option value="v4">UUID v4</option>
          </select>
        </label>
        <button type="button" className="btn-primary text-xs" onClick={() => {}}>Regenerate</button>
      </div>
      <ToolPanel label="UUIDs" actions={<ToolActions output={output} filename="uuids.txt" />}>
        <ToolTextArea value={output} onChange={() => {}} readOnly key={output} />
      </ToolPanel>
    </ToolWorkbench>
  );
}

export function PasswordGeneratorTool() {
  const [length, setLength] = useState(16);
  const [upper, setUpper] = useState(true);
  const [lower, setLower] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [password, setPassword] = useState('');

  const generate = useCallback(() => {
    let chars = '';
    if (upper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (lower) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (numbers) chars += '0123456789';
    if (symbols) chars += '!@#$%^&*()-_=+[]{}|;:,.<>?';
    if (!chars) return;
    const arr = new Uint32Array(length);
    crypto.getRandomValues(arr);
    setPassword(Array.from(arr, (n) => chars[n % chars.length]).join(''));
  }, [length, upper, lower, numbers, symbols]);

  return (
    <ToolWorkbench>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
        <label className="flex items-center gap-2"><input type="checkbox" checked={upper} onChange={(e) => setUpper(e.target.checked)} /> Uppercase</label>
        <label className="flex items-center gap-2"><input type="checkbox" checked={lower} onChange={(e) => setLower(e.target.checked)} /> Lowercase</label>
        <label className="flex items-center gap-2"><input type="checkbox" checked={numbers} onChange={(e) => setNumbers(e.target.checked)} /> Numbers</label>
        <label className="flex items-center gap-2"><input type="checkbox" checked={symbols} onChange={(e) => setSymbols(e.target.checked)} /> Symbols</label>
      </div>
      <label className="text-sm text-muted">Length <input type="range" min={8} max={128} value={length} onChange={(e) => setLength(+e.target.value)} className="w-full max-w-xs ml-2" /> {length}</label>
      <button type="button" className="btn-primary" onClick={generate}>Generate Password</button>
      <ToolPanel label="Password" actions={<ToolActions output={password} />}>
        <p className="font-mono text-lg break-all">{password || '—'}</p>
      </ToolPanel>
    </ToolWorkbench>
  );
}

export function HashGeneratorTool() {
  const [input, setInput] = useState('');
  const [algo, setAlgo] = useState('SHA-256');
  const [hash, setHash] = useState('');

  const compute = async () => {
    const data = new TextEncoder().encode(input);
    const buf = await crypto.subtle.digest(algo as AlgorithmIdentifier, data);
    setHash([...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join(''));
  };

  return (
    <ToolWorkbench>
      <div className="flex gap-2 items-center">
        <select value={algo} onChange={(e) => setAlgo(e.target.value)} className="input-inline">
          {['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512'].map((a) => <option key={a}>{a}</option>)}
        </select>
        <button type="button" className="btn-primary text-xs" onClick={() => void compute()}>Hash</button>
      </div>
      <ToolPanel label="Input"><ToolTextArea value={input} onChange={setInput} rows={4} /></ToolPanel>
      <ToolPanel label="Hash" actions={<ToolActions output={hash} />}><ToolTextArea value={hash} onChange={() => {}} readOnly rows={3} /></ToolPanel>
    </ToolWorkbench>
  );
}

export function LoremIpsumTool() {
  const [paragraphs, setParagraphs] = useState(3);
  const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
  const output = Array.from({ length: paragraphs }, () => lorem).join('\n\n');
  return (
    <ToolWorkbench>
      <label className="text-sm text-muted">Paragraphs <input type="number" min={1} max={20} value={paragraphs} onChange={(e) => setParagraphs(+e.target.value)} className="input-inline w-16 ml-2" /></label>
      <ToolPanel label="Lorem Ipsum" actions={<ToolActions output={output} />}><ToolTextArea value={output} onChange={() => {}} readOnly /></ToolPanel>
    </ToolWorkbench>
  );
}

export function ApiMockDataTool() {
  const [count, setCount] = useState(5);
  const output = useMemo(
    () =>
      JSON.stringify(
        Array.from({ length: count }, (_, i) => ({
          id: i + 1,
          name: `User ${i + 1}`,
          email: `user${i + 1}@example.com`,
          active: i % 2 === 0,
        })),
        null,
        2,
      ),
    [count],
  );
  return (
    <ToolWorkbench>
      <label className="text-sm text-muted">Records <input type="number" min={1} max={100} value={count} onChange={(e) => setCount(+e.target.value)} className="input-inline w-20 ml-2" /></label>
      <ToolPanel label="Mock JSON" actions={<ToolActions output={output} filename="mock.json" />}><ToolTextArea value={output} onChange={() => {}} readOnly /></ToolPanel>
    </ToolWorkbench>
  );
}

export function SlugGeneratorTool() {
  const [input, setInput] = useState('Hello World — Velomint Tools');
  const slug = slugify(input);
  return (
    <ToolWorkbench>
      <ToolPanel label="Text"><ToolTextArea value={input} onChange={setInput} rows={3} /></ToolPanel>
      <ToolPanel label="Slug" actions={<ToolActions output={slug} />}><p className="font-mono text-mint text-lg">{slug}</p></ToolPanel>
    </ToolWorkbench>
  );
}

export function ColorGeneratorTool() {
  const [color, setColor] = useState('#2EE6A6');
  const random = () => setColor(`#${Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0')}`);
  return (
    <ToolWorkbench>
      <button type="button" className="btn-primary" onClick={random}>Random Color</button>
      <div className="flex items-center gap-4">
        <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-20 h-20 rounded-xl cursor-pointer" />
        <div>
          <p className="font-mono text-lg">{color}</p>
          <p className="text-sm text-muted">RGB: {(() => { const n = parseInt(color.slice(1), 16); return `${(n>>16)&255}, ${(n>>8)&255}, ${n&255}`; })()}</p>
        </div>
      </div>
    </ToolWorkbench>
  );
}

export function QrGeneratorTool() {
  const [text, setText] = useState('https://velomint.dev');
  const [dataUrl, setDataUrl] = useState('');

  const generate = async () => {
    setDataUrl(await QRCode.toDataURL(text, { width: 280, margin: 2 }));
  };

  return (
    <ToolWorkbench>
      <ToolPanel label="Content"><ToolTextArea value={text} onChange={setText} rows={3} /></ToolPanel>
      <button type="button" className="btn-primary" onClick={() => void generate()}>Generate QR</button>
      {dataUrl && <img src={dataUrl} alt="QR Code" width={280} height={280} className="rounded-xl mx-auto" loading="lazy" />}
    </ToolWorkbench>
  );
}
