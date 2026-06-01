import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ToolWorkbenchProps {
  children: ReactNode;
  className?: string;
}

export function ToolWorkbench({ children, className }: ToolWorkbenchProps) {
  return (
    <div className={cn('flex flex-col gap-4 lg:gap-6', className)}>{children}</div>
  );
}

interface PanelProps {
  label: string;
  children: ReactNode;
  actions?: ReactNode;
  className?: string;
}

export function ToolPanel({ label, children, actions, className }: PanelProps) {
  return (
    <section className={cn('glass rounded-2xl overflow-hidden', className)}>
      <header className="flex items-center justify-between gap-2 px-4 py-3 border-b border-border">
        <h2 className="text-sm font-medium text-muted">{label}</h2>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </header>
      <div className="p-4">{children}</div>
    </section>
  );
}

interface TextAreaProps {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
  readOnly?: boolean;
  'aria-label'?: string;
}

export function ToolTextArea({
  value,
  onChange,
  placeholder,
  rows = 14,
  readOnly,
  'aria-label': ariaLabel,
}: TextAreaProps) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      readOnly={readOnly}
      aria-label={ariaLabel}
      spellCheck={false}
      className={cn(
        'w-full resize-y rounded-xl bg-midnight/40 border border-border px-4 py-3',
        'font-mono text-sm leading-relaxed text-foreground placeholder:text-muted/60',
        'focus:outline-none focus:ring-2 focus:ring-violet/50',
        'light:bg-snow light:border-midnight/10',
        readOnly && 'opacity-90',
      )}
    />
  );
}
