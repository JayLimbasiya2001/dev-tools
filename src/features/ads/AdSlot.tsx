import { cn } from '@/lib/utils';
import { ADS_ENABLED, BANNER_SIZE, HILLTOPS_ADS } from '@/config/ads';
import { useAdScript } from './useAdScript';

export type AdPlacement =
  | 'top-banner'
  | 'sidebar-primary'
  | 'sidebar-secondary'
  | 'in-content'
  | 'sticky-mobile'
  | 'footer';

interface AdSlotProps {
  placement: AdPlacement;
  className?: string;
}

const LABELS: Record<AdPlacement, string> = {
  'top-banner': 'Advertisement',
  'sidebar-primary': 'Advertisement',
  'sidebar-secondary': 'Advertisement',
  'in-content': 'Advertisement',
  'sticky-mobile': 'Advertisement',
  footer: 'Advertisement',
};

function getScriptSrc(placement: AdPlacement): string | null {
  switch (placement) {
    case 'top-banner':
      return HILLTOPS_ADS.topBanner.src;
    case 'sidebar-primary':
      return HILLTOPS_ADS.sidebarPrimary.src;
    case 'sidebar-secondary':
      return HILLTOPS_ADS.sidebarSecondary.src;
    default:
      return null;
  }
}

function HilltopsAdUnit({
  placement,
  src,
  className,
}: {
  placement: AdPlacement;
  src: string;
  className?: string;
}) {
  const containerRef = useAdScript({ src, enabled: ADS_ENABLED });

  const isBanner = placement === 'top-banner';
  const isSidebar =
    placement === 'sidebar-primary' || placement === 'sidebar-secondary';

  return (
    <aside
      ref={containerRef}
      data-ad-placement={placement}
      data-ad-network="hilltops"
      aria-label={LABELS[placement]}
      className={cn(
        'ad-slot overflow-hidden rounded-xl border border-border/50 bg-card/20',
        isBanner && 'flex w-full justify-center py-2',
        isSidebar && 'w-full min-h-[250px]',
        className,
      )}
    >
      <div
        className={cn(
          'relative flex items-center justify-center',
          isBanner && 'w-[300px] h-[250px] max-w-full',
          isSidebar && 'min-h-[250px] w-full',
        )}
        style={
          isBanner
            ? { width: BANNER_SIZE.width, height: BANNER_SIZE.height, maxWidth: '100%' }
            : undefined
        }
      >
        {!ADS_ENABLED && (
          <p className="text-[10px] uppercase tracking-widest text-muted/50 px-2 text-center">
            Ad slot ({placement}) — enable with VITE_ADS_ENABLED=true
          </p>
        )}
      </div>
    </aside>
  );
}

export function AdSlot({ placement, className }: AdSlotProps) {
  const src = getScriptSrc(placement);
  if (!src) return null;

  return <HilltopsAdUnit placement={placement} src={src} className={className} />;
}
