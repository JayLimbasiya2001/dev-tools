import { cn } from '@/lib/utils';

export function ToolError({ message, className }: { message: string; className?: string }) {
  if (!message) return null;
  return (
    <p
      role="alert"
      className={cn(
        'rounded-xl border border-coral/30 bg-coral/10 px-4 py-3 text-sm text-coral',
        className,
      )}
    >
      {message}
    </p>
  );
}
