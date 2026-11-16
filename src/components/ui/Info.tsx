import React, { useEffect, useId, useRef, useState } from 'react';
import { Info as InfoIcon } from 'lucide-react';
import { useAbdi } from '../../store/AbdiContext';

interface InfoProps {
  text: string;
  label?: string;
  align?: 'left' | 'right' | 'center';
}

export function Info({ text, label = 'Penjelasan indikator', align = 'right' }: InfoProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);
  const tooltipId = useId();

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  const alignClass =
    align === 'left'
      ? 'left-0'
      : align === 'center'
      ? 'left-1/2 -translate-x-1/2'
      : 'right-0';

  return (
    <span
      ref={containerRef}
      className="relative inline-flex items-center align-middle"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-label={label}
        aria-expanded={open}
        aria-controls={tooltipId}
        onClick={(e) => {
          e.stopPropagation();
          setOpen((prev) => !prev);
        }}
        className="inline-flex items-center justify-center w-5 h-5 rounded-full text-ink-subtle hover:text-primary hover:bg-surface-container focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-container transition-colors"
      >
        <InfoIcon className="w-3.5 h-3.5" aria-hidden="true" />
      </button>

      {open && (
        <span
          id={tooltipId}
          role="tooltip"
          className={`absolute ${alignClass} top-full mt-1.5 z-40 w-64 max-w-[calc(100vw-2rem)] p-2.5 rounded-lg bg-[var(--tooltip-bg)] text-[var(--tooltip-fg)] text-xs leading-relaxed shadow-lg border border-border pointer-events-auto text-left font-normal`}
        >
          {text}
        </span>
      )}
    </span>
  );
}

export function InlineExplanation({ text }: { text: string }) {
  const { isGuideMode } = useAbdi();
  if (!isGuideMode) return null;

  return (
    <p className="mt-2 px-3 py-2 rounded-lg bg-surface-low/80 border border-border text-xs text-ink-muted leading-relaxed">
      {text}
    </p>
  );
}
