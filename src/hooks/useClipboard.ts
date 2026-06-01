import { useCallback, useState } from 'react';
import { copyToClipboard } from '@/lib/clipboard';

export function useClipboard() {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async (text: string, label?: string) => {
    const ok = await copyToClipboard(text, label);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
    return ok;
  }, []);

  return { copy, copied };
}
