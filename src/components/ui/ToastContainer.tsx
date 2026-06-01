import { AnimatePresence, motion } from 'framer-motion';
import { useToastStore } from '@/stores/toastStore';
import { cn } from '@/lib/utils';

export function ToastContainer() {
  const { toasts, remove } = useToastStore();

  return (
    <div
      className="fixed bottom-20 right-4 z-[60] flex flex-col gap-2 max-w-sm xl:bottom-4"
      aria-live="polite"
    >
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 40 }}
            className={cn(
              'glass rounded-xl px-4 py-3 text-sm shadow-lg flex items-center justify-between gap-3',
              t.type === 'success' && 'border-mint/30',
              t.type === 'error' && 'border-coral/30',
            )}
          >
            <span>{t.message}</span>
            <button type="button" onClick={() => remove(t.id)} className="text-muted hover:text-foreground" aria-label="Dismiss">
              ×
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
