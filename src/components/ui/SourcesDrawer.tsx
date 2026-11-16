import React, { useEffect, useRef } from 'react';
import { BookOpen, FileText, SlidersHorizontal, X } from 'lucide-react';
import { SOURCES_DRAWER_COPY } from '../../content/id';
import { useAbdi } from '../../store/AbdiContext';
import { Detail } from './Detail';

export function SourcesDrawer() {
  const { sourcesOpen, closeSources } = useAbdi();
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!sourcesOpen) return;
    closeBtnRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeSources();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [sourcesOpen, closeSources]);

  if (!sourcesOpen) return null;

  const { sections } = SOURCES_DRAWER_COPY;

  return (
    <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true" aria-labelledby="sources-drawer-title">
      <div
        className="fixed inset-0 bg-black/50"
        onClick={closeSources}
        aria-hidden="true"
      />
      <aside className="relative z-10 w-full max-w-[540px] h-full bg-surface-card border-l border-border shadow-2xl flex flex-col justify-between overflow-hidden">
        <div className="px-6 py-4 bg-surface-low border-b border-border flex items-center justify-between shrink-0">
          <div>
            <span className="text-xs font-medium text-ink-subtle block">
              {SOURCES_DRAWER_COPY.subtitle}
            </span>
            <h2 id="sources-drawer-title" className="font-headline text-xl font-semibold text-ink">
              {SOURCES_DRAWER_COPY.title}
            </h2>
          </div>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={closeSources}
            aria-label={SOURCES_DRAWER_COPY.closeLabel}
            className="w-9 h-9 rounded-full hover:bg-surface-container flex items-center justify-center text-ink-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-container transition-colors"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        <div className="p-5 overflow-y-auto flex-1 flex flex-col gap-3">
          <Detail
            title={sections.asumsi.title}
            badge={sections.asumsi.badge}
            icon={<SlidersHorizontal className="w-4 h-4" aria-hidden="true" />}
          >
            <ul className="flex flex-col gap-2">
              {sections.asumsi.items.map((item, idx) => (
                <li
                  key={idx}
                  className="p-2.5 rounded-lg bg-surface-low text-sm text-ink leading-snug"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Detail>

          <Detail
            title={sections.sumber.title}
            badge={sections.sumber.badge}
            icon={<BookOpen className="w-4 h-4" aria-hidden="true" />}
          >
            <ul className="flex flex-col gap-2">
              {sections.sumber.items.map((source, idx) => (
                <li
                  key={idx}
                  className="p-2.5 rounded-lg bg-surface-low flex items-center justify-between gap-3"
                >
                  <span className="text-sm text-ink truncate">{source.title}</span>
                  <span
                    className={`px-2 py-0.5 rounded text-xs font-medium shrink-0 whitespace-nowrap ${
                      source.tag === 'dokumen resmi'
                        ? 'bg-[var(--ok-tint)] text-[var(--ok-tint-fg)]'
                        : 'bg-surface-highest text-ink-muted'
                    }`}
                  >
                    {source.tag}
                  </span>
                </li>
              ))}
            </ul>
          </Detail>

          <Detail
            title={sections.caraBaca.title}
            badge={sections.caraBaca.badge}
            icon={<FileText className="w-4 h-4" aria-hidden="true" />}
          >
            <ul className="flex flex-col gap-2">
              {sections.caraBaca.items.map((item, idx) => (
                <li
                  key={idx}
                  className="p-2.5 rounded-lg bg-surface-low text-sm text-ink leading-snug"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Detail>
        </div>

        <div className="px-6 py-3.5 bg-surface-low border-t border-border flex items-center justify-between shrink-0">
          <span className="text-xs text-ink-subtle">PFPBC 2026</span>
          <button
            type="button"
            onClick={closeSources}
            className="px-4 py-1.5 rounded-lg bg-[var(--btn-primary-bg)] text-[var(--btn-primary-fg)] text-sm font-semibold hover:bg-[var(--btn-primary-hover)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--steel)] transition-colors"
          >
            {SOURCES_DRAWER_COPY.closeLabel}
          </button>
        </div>
      </aside>
    </div>
  );
}
