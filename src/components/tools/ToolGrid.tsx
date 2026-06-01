import type { ToolMeta } from '@/data/tools/types';
import { ToolCard } from './ToolCard';

interface ToolGridProps {
  tools: ToolMeta[];
}

export function ToolGrid({ tools }: ToolGridProps) {
  if (!tools.length) {
    return <p className="text-muted text-center py-12">No tools found.</p>;
  }
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {tools.map((tool, i) => (
        <ToolCard key={tool.slug} tool={tool} index={i} />
      ))}
    </div>
  );
}
