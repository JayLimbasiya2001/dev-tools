import yaml from 'js-yaml';

export function jsonToCsv(json: string): { output: string; error?: string } {
  try {
    const data = JSON.parse(json) as unknown;
    const rows = Array.isArray(data) ? data : [data];
    if (!rows.length || typeof rows[0] !== 'object' || rows[0] === null) {
      return { output: '', error: 'JSON must be an array of objects' };
    }
    const keys = [...new Set(rows.flatMap((r) => Object.keys(r as object)))];
    const escape = (v: unknown) => {
      const s = v === null || v === undefined ? '' : String(v);
      return s.includes(',') || s.includes('"') || s.includes('\n')
        ? `"${s.replace(/"/g, '""')}"`
        : s;
    };
    const lines = [
      keys.join(','),
      ...rows.map((row) => keys.map((k) => escape((row as Record<string, unknown>)[k])).join(',')),
    ];
    return { output: lines.join('\n') };
  } catch (e) {
    return { output: '', error: e instanceof Error ? e.message : 'Conversion failed' };
  }
}

export function csvToJson(csv: string): { output: string; error?: string } {
  try {
    const lines = csv.trim().split(/\r?\n/);
    if (lines.length < 2) return { output: '', error: 'CSV needs header and at least one row' };
    const parseRow = (line: string) => {
      const result: string[] = [];
      let cur = '';
      let inQuotes = false;
      for (let i = 0; i < line.length; i++) {
        const ch = line[i];
        if (inQuotes) {
          if (ch === '"' && line[i + 1] === '"') {
            cur += '"';
            i++;
          } else if (ch === '"') inQuotes = false;
          else cur += ch;
        } else if (ch === '"') inQuotes = true;
        else if (ch === ',') {
          result.push(cur);
          cur = '';
        } else cur += ch;
      }
      result.push(cur);
      return result;
    };
    const headers = parseRow(lines[0]);
    const rows = lines.slice(1).map((line) => {
      const vals = parseRow(line);
      return Object.fromEntries(headers.map((h, i) => [h, vals[i] ?? '']));
    });
    return { output: JSON.stringify(rows, null, 2) };
  } catch (e) {
    return { output: '', error: e instanceof Error ? e.message : 'Conversion failed' };
  }
}

function jsonToXmlValue(val: unknown, tag: string, indent: number): string {
  const pad = '  '.repeat(indent);
  if (val === null || val === undefined) return `${pad}<${tag}/>`;
  if (typeof val !== 'object') return `${pad}<${tag}>${String(val)}</${tag}>`;
  if (Array.isArray(val)) {
    return val.map((item) => jsonToXmlValue(item, tag.replace(/s$/, '') || 'item', indent)).join('\n');
  }
  const entries = Object.entries(val as Record<string, unknown>);
  const inner = entries
    .map(([k, v]) => jsonToXmlValue(v, k.replace(/[^a-zA-Z0-9_-]/g, '_'), indent + 1))
    .join('\n');
  return `${pad}<${tag}>\n${inner}\n${pad}</${tag}>`;
}

export function jsonToXml(json: string, rootTag = 'root'): { output: string; error?: string } {
  try {
    const data = JSON.parse(json);
    return { output: `<?xml version="1.0" encoding="UTF-8"?>\n${jsonToXmlValue(data, rootTag, 0)}` };
  } catch (e) {
    return { output: '', error: e instanceof Error ? e.message : 'Conversion failed' };
  }
}

export function xmlToJson(xml: string): { output: string; error?: string } {
  try {
    const doc = new DOMParser().parseFromString(xml, 'application/xml');
    if (doc.querySelector('parsererror')) return { output: '', error: 'Invalid XML' };

    const nodeToJson = (node: Element): unknown => {
      const obj: Record<string, unknown> = {};
      for (const attr of node.attributes) {
        obj[`@${attr.name}`] = attr.value;
      }
      const children = [...node.children];
      if (!children.length) {
        const text = node.textContent?.trim();
        return Object.keys(obj).length ? { ...obj, '#text': text } : text ?? '';
      }
      for (const child of children) {
        const val = nodeToJson(child);
        const key = child.tagName;
        if (key in obj) {
          if (!Array.isArray(obj[key])) obj[key] = [obj[key]];
          (obj[key] as unknown[]).push(val);
        } else obj[key] = val;
      }
      return obj;
    };

    const root = doc.documentElement;
    const result = { [root.tagName]: nodeToJson(root) };
    return { output: JSON.stringify(result, null, 2) };
  } catch (e) {
    return { output: '', error: e instanceof Error ? e.message : 'Conversion failed' };
  }
}

export function jsonToYaml(json: string): { output: string; error?: string } {
  try {
    return { output: yaml.dump(JSON.parse(json), { lineWidth: 120 }) };
  } catch (e) {
    return { output: '', error: e instanceof Error ? e.message : 'Conversion failed' };
  }
}

export function yamlToJson(yamlStr: string): { output: string; error?: string } {
  try {
    return { output: JSON.stringify(yaml.load(yamlStr), null, 2) };
  } catch (e) {
    return { output: '', error: e instanceof Error ? e.message : 'Conversion failed' };
  }
}
