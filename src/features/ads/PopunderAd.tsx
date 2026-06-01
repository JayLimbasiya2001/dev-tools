import { useEffect } from 'react';
import { ADS_ENABLED, HILLTOPS_ADS } from '@/config/ads';

const SESSION_KEY = 'velomint-popunder-loaded';

/**
 * Loads Hilltops popunder once per browser session (production / when ads enabled).
 */
export function PopunderAd() {
  useEffect(() => {
    if (!ADS_ENABLED) return;
    if (typeof window === 'undefined') return;
    if (sessionStorage.getItem(SESSION_KEY)) return;

    sessionStorage.setItem(SESSION_KEY, '1');

    const script = document.createElement('script');
    script.async = true;
    script.referrerPolicy = 'no-referrer-when-downgrade';
    script.src = HILLTOPS_ADS.popunder.src;
  (script as HTMLScriptElement & { settings?: Record<string, unknown> }).settings = {};
    script.setAttribute('data-ad-popunder', 'true');
    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  return null;
}
