import { useEffect, useRef } from 'react';

interface UseAdScriptOptions {
  src: string;
  enabled?: boolean;
  settings?: Record<string, unknown>;
}

/**
 * Injects a third-party ad loader script into a container (Hilltops pattern).
 */
export function useAdScript({ src, enabled = true, settings = {} }: UseAdScriptOptions) {
  const containerRef = useRef<HTMLDivElement>(null);
  const injectedRef = useRef(false);

  useEffect(() => {
    if (!enabled || !src || injectedRef.current) return;
    const container = containerRef.current;
    if (!container) return;

    injectedRef.current = true;

    const script = document.createElement('script');
    script.async = true;
    script.referrerPolicy = 'no-referrer-when-downgrade';
    script.src = src;
    (script as HTMLScriptElement & { settings?: Record<string, unknown> }).settings = settings;
    script.setAttribute('data-ad-script', src);

    container.appendChild(script);

    return () => {
      script.remove();
      injectedRef.current = false;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps -- settings object is static per placement
  }, [src, enabled]);

  return containerRef;
}
