import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { CommandPalette, useCommandPalette } from '@/features/command-palette/CommandPalette';
import { ToastContainer } from '@/components/ui/ToastContainer';
import { AdSlot } from '@/features/ads/AdSlot';
import { PopunderAd } from '@/features/ads/PopunderAd';

export function MainLayout() {
  const { open, setOpen } = useCommandPalette();

  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-mint focus:text-midnight">
        Skip to content
      </a>
      <Header onOpenCommand={() => setOpen(true)} />
      <AdSlot placement="top-banner" className="mx-auto max-w-7xl px-4 sm:px-6 mt-2 mb-1" />
      <PopunderAd />
      <main id="main-content" className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 py-8">
        <Outlet />
      </main>
      <AdSlot placement="footer" className="mx-auto max-w-7xl px-4 sm:px-6" />
      <Footer />
      <AdSlot placement="sticky-mobile" />
      <CommandPalette open={open} onClose={() => setOpen(false)} />
      <ToastContainer />
    </div>
  );
}
