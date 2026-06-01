import { useState, useMemo } from 'react';
import { ToolWorkbench, ToolPanel } from '../components/ToolWorkbench';
import { ToolActions } from '../components/ToolActions';

function CssOutput({ css, label = 'CSS' }: { css: string; label?: string }) {
  return (
    <ToolPanel label={label} actions={<ToolActions output={css} filename="styles.css" />}>
      <pre className="font-mono text-sm text-mint bg-midnight/40 rounded-xl p-4 overflow-auto">{css}</pre>
    </ToolPanel>
  );
}

export function FlexboxGeneratorTool() {
  const [direction, setDirection] = useState('row');
  const [justify, setJustify] = useState('center');
  const [align, setAlign] = useState('center');
  const [gap, setGap] = useState('1rem');
  const css = `.container {\n  display: flex;\n  flex-direction: ${direction};\n  justify-content: ${justify};\n  align-items: ${align};\n  gap: ${gap};\n}`;
  return (
    <ToolWorkbench>
      <div className="grid sm:grid-cols-2 gap-3 text-sm">
        <label>Direction <select value={direction} onChange={(e) => setDirection(e.target.value)} className="input-inline w-full">{['row', 'column', 'row-reverse', 'column-reverse'].map((v) => <option key={v}>{v}</option>)}</select></label>
        <label>Justify <select value={justify} onChange={(e) => setJustify(e.target.value)} className="input-inline w-full">{['flex-start', 'center', 'flex-end', 'space-between', 'space-around'].map((v) => <option key={v}>{v}</option>)}</select></label>
        <label>Align <select value={align} onChange={(e) => setAlign(e.target.value)} className="input-inline w-full">{['stretch', 'flex-start', 'center', 'flex-end'].map((v) => <option key={v}>{v}</option>)}</select></label>
        <label>Gap <input value={gap} onChange={(e) => setGap(e.target.value)} className="input-field" /></label>
      </div>
      <div className="rounded-xl border border-border p-4 min-h-[120px] flex" style={{ flexDirection: direction as React.CSSProperties['flexDirection'], justifyContent: justify as React.CSSProperties['justifyContent'], alignItems: align as React.CSSProperties['alignItems'], gap }}>
        {[1, 2, 3].map((i) => <div key={i} className="bg-mint/20 text-mint rounded-lg px-4 py-6 text-center flex-1">Item {i}</div>)}
      </div>
      <CssOutput css={css} />
    </ToolWorkbench>
  );
}

export function GridGeneratorTool() {
  const [cols, setCols] = useState('3');
  const rows = 'auto';
  const [gap, setGap] = useState('1rem');
  const css = `.grid {\n  display: grid;\n  grid-template-columns: repeat(${cols}, 1fr);\n  grid-template-rows: ${rows};\n  gap: ${gap};\n}`;
  return (
    <ToolWorkbench>
      <div className="flex gap-3 flex-wrap">
        <label className="text-sm">Columns <input type="number" min={1} max={12} value={cols} onChange={(e) => setCols(e.target.value)} className="input-inline w-16 ml-1" /></label>
        <label className="text-sm">Gap <input value={gap} onChange={(e) => setGap(e.target.value)} className="input-inline w-24 ml-1" /></label>
      </div>
      <div className="grid gap-2 rounded-xl p-2" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)`, gap }}>
        {Array.from({ length: +cols * 2 }, (_, i) => <div key={i} className="bg-violet/20 rounded-lg h-16 flex items-center justify-center text-sm">{i + 1}</div>)}
      </div>
      <CssOutput css={css} />
    </ToolWorkbench>
  );
}

export function BoxShadowGeneratorTool() {
  const [x, setX] = useState(0);
  const [y, setY] = useState(8);
  const [blur, setBlur] = useState(24);
  const [spread, setSpread] = useState(0);
  const [color] = useState('rgba(46, 230, 166, 0.25)');
  const css = `box-shadow: ${x}px ${y}px ${blur}px ${spread}px ${color};`;
  return (
    <ToolWorkbench>
      <div className="grid grid-cols-2 gap-3 text-sm">
        {([['X', x, setX], ['Y', y, setY], ['Blur', blur, setBlur], ['Spread', spread, setSpread]] as const).map(([l, v, s]) => (
          <label key={l}>{l} <input type="range" min={0} max={48} value={v} onChange={(e) => s(+e.target.value)} className="w-full" /></label>
        ))}
      </div>
      <div className="h-32 rounded-2xl bg-snow flex items-center justify-center" style={{ boxShadow: `${x}px ${y}px ${blur}px ${spread}px ${color}` }}>
        <span className="text-midnight text-sm font-medium">Preview</span>
      </div>
      <CssOutput css={`.element {\n  ${css}\n}`} />
    </ToolWorkbench>
  );
}

export function BorderRadiusGeneratorTool() {
  const [r, setR] = useState(16);
  const css = `border-radius: ${r}px;`;
  return (
    <ToolWorkbench>
      <input type="range" min={0} max={64} value={r} onChange={(e) => setR(+e.target.value)} className="w-full" />
      <div className="h-32 bg-gradient-to-br from-mint to-violet" style={{ borderRadius: r }} />
      <CssOutput css={`.element {\n  ${css}\n}`} />
    </ToolWorkbench>
  );
}

export function GradientGeneratorTool() {
  const [c1, setC1] = useState('#2EE6A6');
  const [c2, setC2] = useState('#7C5CFF');
  const [angle, setAngle] = useState(135);
  const css = `background: linear-gradient(${angle}deg, ${c1}, ${c2});`;
  return (
    <ToolWorkbench>
      <div className="flex gap-4"><input type="color" value={c1} onChange={(e) => setC1(e.target.value)} /><input type="color" value={c2} onChange={(e) => setC2(e.target.value)} /><input type="range" min={0} max={360} value={angle} onChange={(e) => setAngle(+e.target.value)} className="flex-1" /></div>
      <div className="h-32 rounded-2xl" style={{ background: `linear-gradient(${angle}deg, ${c1}, ${c2})` }} />
      <CssOutput css={`.element {\n  ${css}\n}`} />
    </ToolWorkbench>
  );
}

export function AnimationGeneratorTool() {
  const [duration, setDuration] = useState(0.6);
  const [name, setName] = useState('fadeIn');
  const css = `@keyframes ${name} {\n  from { opacity: 0; transform: translateY(8px); }\n  to { opacity: 1; transform: translateY(0); }\n}\n.element {\n  animation: ${name} ${duration}s ease-out;\n}`;
  return (
    <ToolWorkbench>
      <input value={name} onChange={(e) => setName(e.target.value)} className="input-field" placeholder="Animation name" />
      <label className="text-sm">Duration: {duration}s <input type="range" min={0.1} max={3} step={0.1} value={duration} onChange={(e) => setDuration(+e.target.value)} className="w-full" /></label>
      <CssOutput css={css} />
    </ToolWorkbench>
  );
}

export function CssClampGeneratorTool() {
  const [min, setMin] = useState('1rem');
  const [pref, setPref] = useState('4vw');
  const [max, setMax] = useState('2.5rem');
  const css = `font-size: clamp(${min}, ${pref}, ${max});`;
  return (
    <ToolWorkbench>
      <div className="grid grid-cols-3 gap-2">
        <input value={min} onChange={(e) => setMin(e.target.value)} placeholder="Min" className="input-field" />
        <input value={pref} onChange={(e) => setPref(e.target.value)} placeholder="Preferred" className="input-field" />
        <input value={max} onChange={(e) => setMax(e.target.value)} placeholder="Max" className="input-field" />
      </div>
      <p style={{ fontSize: `clamp(${min}, ${pref}, ${max})` }} className="font-display font-bold">Responsive clamp preview</p>
      <CssOutput css={css} />
    </ToolWorkbench>
  );
}

export function CssShapeGeneratorTool() {
  const [shape, setShape] = useState('circle');
  const css = useMemo(() => {
    if (shape === 'circle') return 'clip-path: circle(50% at 50% 50%);';
    if (shape === 'triangle') return 'clip-path: polygon(50% 0%, 0% 100%, 100% 100%);';
    return 'clip-path: polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%);';
  }, [shape]);
  return (
    <ToolWorkbench>
      <select value={shape} onChange={(e) => setShape(e.target.value)} className="input-inline">
        <option value="circle">Circle</option>
        <option value="triangle">Triangle</option>
        <option value="pentagon">Pentagon</option>
      </select>
      <div className="h-40 bg-gradient-to-br from-mint to-violet" style={{ clipPath: css.replace('clip-path: ', '').replace(';', '') }} />
      <CssOutput css={`.shape {\n  ${css}\n}`} />
    </ToolWorkbench>
  );
}
