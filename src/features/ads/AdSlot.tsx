import { cn } from '@/lib/utils';

export type AdPlacement =
  | 'top-banner'
  | 'sidebar'
  | 'in-content'
  | 'sticky-mobile'
  | 'footer';

interface AdSlotProps {
  placement: AdPlacement;
  className?: string;
}

const LABELS: Record<AdPlacement, string> = {
  'top-banner': 'Top Banner',
  sidebar: 'Sidebar',
  'in-content': 'In-Content',
  'sticky-mobile': 'Sticky Mobile',
  footer: 'Footer',
};

/**
 * AdSense-ready placeholder. Replace inner content with AdSense script:
 * <ins className="adsbygoogle" data-ad-client="ca-pub-XXXX" data-ad-slot="YYYY" />
 */
export function AdSlot({ placement, className }: AdSlotProps) {
  return (
    <aside
      data-ad-placement={placement}
      data-adsense-ready="true"
      aria-label={`Advertisement: ${LABELS[placement]}`}
      className={cn(
        'ad-slot flex items-center justify-center rounded-xl border border-dashed border-border/80 bg-card/30 text-center',
        placement === 'top-banner' && 'min-h-[90px] w-full',
        placement === 'sidebar' && 'min-h-[250px] w-full hidden xl:flex',
        placement === 'in-content' && 'min-h-[120px] w-full my-4',
        placement === 'sticky-mobile' && 'fixed bottom-0 left-0 right-0 z-40 min-h-[50px] xl:hidden border-t',
        placement === 'footer' && 'min-h-[90px] w-full mt-8',
        className,
      )}
    >
      <div className="px-4 py-3">
        <p className="text-[10px] uppercase tracking-widest text-muted/60 mb-1">Sponsored</p>
        <p className="text-xs text-muted">{LABELS[placement]} — AdSense slot</p>
      </div>
    </aside>
  );
}
