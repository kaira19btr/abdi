import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { NAV_ITEMS, SHELL_COPY } from '../../content/id';
import { useAbdi } from '../../store/AbdiContext';
import { AbdiLogo } from '../ui/AbdiLogo';
import { Info } from '../ui/Info';
import { SourcesDrawer } from '../ui/SourcesDrawer';
import { Sidebar } from './Sidebar';

export function Layout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const { mode, setMode, markVisited } = useAbdi();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    markVisited(pathname);
  }, [pathname, markVisited]);

  const currentStepIdx = NAV_ITEMS.findIndex((item) => item.path === pathname);
  const currentStepNum = currentStepIdx >= 0 ? NAV_ITEMS[currentStepIdx].stepNum : 1;

  return (
    <div className="min-h-screen flex bg-surface text-ink">
      <Sidebar mobileOpen={mobileMenuOpen} onCloseMobile={() => setMobileMenuOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 flex flex-col justify-between">
        {/* Top Bar: only ABDI wordmark, Mode switch, Langkah x dari 7, and mobile hamburger */}
        <header className="sticky top-0 z-30 w-full bg-surface-card border-b border-border">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-8 h-14 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <button
                type="button"
                aria-label="Buka menu navigasi"
                aria-expanded={mobileMenuOpen}
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 -ml-2 rounded-lg border border-border bg-surface-low text-ink hover:bg-surface-container focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-container"
              >
                <Menu className="w-5 h-5" aria-hidden="true" />
              </button>

              <Link
                to="/"
                title="Halaman Utama ABDI"
                aria-label="ABDI — Kembali ke halaman utama"
                className="flex items-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-container rounded shrink-0 hover:opacity-90 transition-opacity"
              >
                <AbdiLogo size={28} />
                <span className="font-headline text-lg font-semibold text-ink tracking-tight">
                  {SHELL_COPY.brandTitle}
                </span>
              </Link>
            </div>

            <div className="flex items-center gap-3 sm:gap-4 shrink-0">
              <span className="text-xs font-medium text-ink-muted tabular-nums whitespace-nowrap">
                Langkah {currentStepNum} dari 7
              </span>

              <div className="flex items-center gap-1.5 bg-surface-low p-1 rounded-lg border border-border">
                <span className="text-[11px] font-medium text-ink-muted pl-1.5 hidden sm:inline">
                  {SHELL_COPY.modeLabel}:
                </span>
                <div role="group" aria-label="Pilih mode tampilan" className="inline-flex gap-0.5">
                  <button
                    type="button"
                    aria-pressed={mode === 'pemandu'}
                    onClick={() => setMode('pemandu')}
                    className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--steel)] ${
                      mode === 'pemandu'
                        ? 'bg-[var(--btn-primary-bg)] text-[var(--btn-primary-fg)]'
                        : 'text-ink-muted hover:text-ink'
                    }`}
                  >
                    {SHELL_COPY.modePemandu}
                  </button>
                  <button
                    type="button"
                    aria-pressed={mode === 'ringkas'}
                    onClick={() => setMode('ringkas')}
                    className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--steel)] ${
                      mode === 'ringkas'
                        ? 'bg-[var(--btn-primary-bg)] text-[var(--btn-primary-fg)]'
                        : 'text-ink-muted hover:text-ink'
                    }`}
                  >
                    {SHELL_COPY.modeRingkas}
                  </button>
                </div>
                <Info text={SHELL_COPY.modeInfo} label="Info mode tampilan" />
              </div>
            </div>
          </div>
        </header>

        <main className="w-full flex-1">
          <div className="max-w-[1200px] mx-auto w-full">{children}</div>
        </main>

        <footer className="w-full bg-surface-card border-t border-border py-4">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-8 text-center text-sm text-ink-subtle">
            <span>{SHELL_COPY.footerText}</span>
          </div>
        </footer>
      </div>

      <SourcesDrawer />
    </div>
  );
}
