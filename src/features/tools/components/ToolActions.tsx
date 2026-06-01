import { copyToClipboard } from '@/lib/clipboard';
import { downloadText } from '@/lib/download';
import { cn } from '@/lib/utils';

interface ToolActionsProps {
  output: string;
  filename?: string;
  onClear?: () => void;
  extra?: React.ReactNode;
  className?: string;
}

export function ToolActions({
  output,
  filename = 'output.txt',
  onClear,
  extra,
  className,
}: ToolActionsProps) {
  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      <button
        type="button"
        onClick={() => copyToClipboard(output)}
        disabled={!output}
        className="btn-secondary text-xs"
      >
        Copy
      </button>
      <button
        type="button"
        onClick={() => downloadText(output, filename)}
        disabled={!output}
        className="btn-secondary text-xs"
      >
        Download
      </button>
      {onClear && (
        <button type="button" onClick={onClear} className="btn-ghost text-xs">
          Clear
        </button>
      )}
      {extra}
    </div>
  );
}
