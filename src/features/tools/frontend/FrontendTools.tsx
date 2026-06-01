import { useState, useEffect } from 'react';
import { ToolWorkbench, ToolPanel, ToolTextArea } from '../components/ToolWorkbench';
import { ToolActions } from '../components/ToolActions';

export function SvgOptimizerTool() {
  const [svg, setSvg] = useState('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#2EE6A6"/></svg>');
  const optimized = svg.replace(/\s+/g, ' ').replace(/>\s+</g, '><').trim();
  return (
    <ToolWorkbench>
      <ToolPanel label="SVG Input"><ToolTextArea value={svg} onChange={setSvg} /></ToolPanel>
      <ToolPanel label="Optimized" actions={<ToolActions output={optimized} filename="icon.svg" />}><ToolTextArea value={optimized} onChange={() => {}} readOnly /></ToolPanel>
    </ToolWorkbench>
  );
}

export function SvgViewerTool() {
  const [svg, setSvg] = useState('<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120"><rect width="120" height="120" rx="24" fill="#7C5CFF"/><text x="60" y="68" text-anchor="middle" fill="white" font-size="20" font-family="sans-serif">VM</text></svg>');
  return (
    <ToolWorkbench>
      <ToolPanel label="SVG"><ToolTextArea value={svg} onChange={setSvg} rows={8} /></ToolPanel>
      <div className="glass rounded-2xl p-8 flex items-center justify-center min-h-[200px]" dangerouslySetInnerHTML={{ __html: svg }} />
    </ToolWorkbench>
  );
}

export function SvgToJsxTool() {
  const [svg, setSvg] = useState('<svg viewBox="0 0 24 24"><path d="M12 2L2 22h20z"/></svg>');
  const jsx = svg
    .replace(/class=/g, 'className=')
    .replace(/stroke-width=/g, 'strokeWidth=')
    .replace(/fill-rule=/g, 'fillRule=')
    .replace(/clip-path=/g, 'clipPath=')
    .replace(/xmlns="[^"]*"/g, '')
    .trim();
  const component = `export function Icon(props: React.SVGProps<SVGSVGElement>) {\n  return (\n    ${jsx.replace('<svg', '<svg {...props}')}\n  );\n}`;
  return (
    <ToolWorkbench>
      <ToolPanel label="SVG"><ToolTextArea value={svg} onChange={setSvg} rows={6} /></ToolPanel>
      <ToolPanel label="React Component" actions={<ToolActions output={component} filename="Icon.tsx" />}><ToolTextArea value={component} onChange={() => {}} readOnly /></ToolPanel>
    </ToolWorkbench>
  );
}

export function ImageToBase64Tool() {
  const [preview, setPreview] = useState('');
  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  };
  return (
    <ToolWorkbench>
      <input type="file" accept="image/*" onChange={onFile} className="text-sm" />
      {preview && (
        <>
          <img src={preview} alt="Preview" className="max-h-40 rounded-xl" loading="lazy" />
          <ToolPanel label="Base64" actions={<ToolActions output={preview} />}>
            <ToolTextArea value={preview} onChange={() => {}} readOnly rows={6} />
          </ToolPanel>
        </>
      )}
    </ToolWorkbench>
  );
}

function luminance(r: number, g: number, b: number) {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function contrast(l1: number, l2: number) {
  const [a, b] = l1 > l2 ? [l1, l2] : [l2, l1];
  return (a + 0.05) / (b + 0.05);
}

export function ColorContrastCheckerTool() {
  const [fg, setFg] = useState('#0B1221');
  const [bg, setBg] = useState('#2EE6A6');
  const parse = (hex: string) => {
    const n = parseInt(hex.slice(1), 16);
    return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
  };
  const ratio = contrast(luminance(...Object.values(parse(fg)) as [number, number, number]), luminance(...Object.values(parse(bg)) as [number, number, number]));
  const pass = ratio >= 4.5;
  return (
    <ToolWorkbench>
      <div className="flex gap-4"><label>Foreground <input type="color" value={fg} onChange={(e) => setFg(e.target.value)} /></label><label>Background <input type="color" value={bg} onChange={(e) => setBg(e.target.value)} /></label></div>
      <div className="rounded-2xl p-8 text-2xl font-bold" style={{ color: fg, background: bg }}>Sample Text Aa</div>
      <p className="text-lg">Contrast ratio: <span className={pass ? 'text-mint' : 'text-coral'}>{ratio.toFixed(2)}:1</span> — WCAG AA {pass ? 'PASS' : 'FAIL'} (normal text)</p>
    </ToolWorkbench>
  );
}

const BREAKPOINTS = [
  { name: 'sm', width: 640 },
  { name: 'md', width: 768 },
  { name: 'lg', width: 1024 },
  { name: 'xl', width: 1280 },
  { name: '2xl', width: 1536 },
];

export function ResponsiveBreakpointTesterTool() {
  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const active = BREAKPOINTS.filter((b) => width >= b.width).pop()?.name ?? 'default';
  return (
    <ToolWorkbench>
      <input type="range" min={320} max={1920} value={width} onChange={(e) => setWidth(+e.target.value)} className="w-full" />
      <p className="font-mono text-mint text-xl">{width}px — Tailwind: <strong>{active}</strong></p>
      <ul className="text-sm space-y-1">{BREAKPOINTS.map((b) => <li key={b.name} className={width >= b.width ? 'text-mint' : 'text-muted'}>{b.name}: ≥{b.width}px</li>)}</ul>
    </ToolWorkbench>
  );
}

export function ScreenSizeCheckerTool() {
  const [size, setSize] = useState({ w: 0, h: 0, dpr: 1 });
  useEffect(() => {
    const update = () => setSize({ w: window.innerWidth, h: window.innerHeight, dpr: window.devicePixelRatio });
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  return (
    <ToolWorkbench>
      <div className="grid grid-cols-2 gap-4 text-center">
        <div className="glass rounded-2xl p-6"><p className="text-3xl font-bold text-mint">{size.w}</p><p className="text-muted text-sm">Viewport Width</p></div>
        <div className="glass rounded-2xl p-6"><p className="text-3xl font-bold text-violet">{size.h}</p><p className="text-muted text-sm">Viewport Height</p></div>
        <div className="glass rounded-2xl p-6 col-span-2"><p className="text-2xl font-bold">{size.dpr}x</p><p className="text-muted text-sm">Device Pixel Ratio</p></div>
      </div>
    </ToolWorkbench>
  );
}
