import { toast } from '@/stores/toastStore';

export async function copyToClipboard(text: string, label = 'Copied to clipboard') {
  try {
    await navigator.clipboard.writeText(text);
    toast.success(label);
    return true;
  } catch {
    toast.error('Failed to copy to clipboard');
    return false;
  }
}
