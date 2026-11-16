import React from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, Sparkles } from 'lucide-react';
import { useAbdi } from '../../store/AbdiContext';

export function PageIntro({
  question,
  howToRead,
}: {
  question: React.ReactNode;
  howToRead: React.ReactNode;
}) {
  const { isGuideMode } = useAbdi();
  if (!isGuideMode) return null;

  return (
    <section
      aria-label="Pengantar halaman"
      className="w-full bg-surface-low border border-border rounded-xl px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-6"
    >
      <div className="flex items-start gap-2 min-w-0">
        <HelpCircle className="w-4 h-4 text-primary-container shrink-0 mt-0.5" aria-hidden="true" />
        <div className="text-xs sm:text-sm text-ink">
          <span className="font-semibold text-primary mr-1.5">Pertanyaan:</span>
          <span>{question}</span>
        </div>
      </div>
      <div className="text-xs sm:text-sm text-ink-muted sm:text-right">
        <span className="font-semibold text-ink mr-1.5">Cara membaca:</span>
        <span>{howToRead}</span>
      </div>
    </section>
  );
}

export function Conclusion({ children }: { children: React.ReactNode }) {
  const { isGuideMode } = useAbdi();
  if (!isGuideMode) return null;

  return (
    <section
      aria-label="Kesimpulan"
      className="w-full bg-surface-card border border-border border-l-4 border-l-[var(--panel-top-accent)] rounded-xl px-5 py-3.5 flex items-start gap-3"
    >
      <Sparkles className="w-4 h-4 text-primary shrink-0 mt-0.5" aria-hidden="true" />
      <p className="text-sm text-ink font-medium leading-relaxed">{children}</p>
    </section>
  );
}

interface BridgeProps {
  sentence: string;
  nextLabel: string;
  nextPath: string;
  prevLabel?: string;
  prevPath?: string;
}

export function Bridge({ sentence, nextLabel, nextPath, prevLabel, prevPath }: BridgeProps) {
  const { isGuideMode } = useAbdi();
  if (!isGuideMode) return null;

  return (
    <section
      aria-label="Langkah berikutnya"
      className="w-full bg-surface-card border border-border rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
    >
      <p className="text-sm text-ink font-medium">{sentence}</p>
      <div className="flex flex-wrap items-center gap-2.5 shrink-0">
        {prevPath && prevLabel && (
          <Link
            to={prevPath}
            className="px-4 py-2 rounded-lg border border-border bg-surface-low text-sm font-semibold text-ink hover:bg-surface-container transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-container"
          >
            {prevLabel}
          </Link>
        )}
        <Link
          to={nextPath}
          className="px-4 py-2 rounded-lg bg-[var(--btn-primary-bg)] text-[var(--btn-primary-fg)] text-sm font-semibold hover:bg-[var(--btn-primary-hover)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--steel)]"
        >
          {nextLabel}
        </Link>
      </div>
    </section>
  );
}
