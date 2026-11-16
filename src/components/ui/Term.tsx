import React, { useEffect, useId, useRef, useState } from 'react';
import { GLOSSARY_TERMS, type GlossaryKey } from '../../content/id';

interface TermProps {
  term: GlossaryKey;
  children?: React.ReactNode;
  align?: 'left' | 'right' | 'center';
}

export function Term({ term, children, align = 'center' }: TermProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);
  const tooltipId = useId();
  const definition = GLOSSARY_TERMS[term];

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
      : align === 'right'
      ? 'right-0'
      : 'left-1/2 -translate-x-1/2';

  return (
    <span
      ref={containerRef}
      className="relative inline-block"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={tooltipId}
        onClick={(e) => {
          e.stopPropagation();
          setOpen((prev) => !prev);
        }}
        className="inline text-inherit font-inherit border-b border-dotted border-current/75 hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--steel)] rounded-xs cursor-help"
      >
        {children ?? term}
      </button>

      {open && (
        <span
          id={tooltipId}
          role="tooltip"
          className={`absolute ${alignClass} top-full mt-1.5 z-50 w-64 max-w-[calc(100vw-2rem)] p-2.5 rounded-lg bg-[var(--tooltip-bg)] text-[var(--tooltip-fg)] text-xs leading-relaxed shadow-lg border border-border pointer-events-auto text-left font-normal`}
        >
          <span className="font-semibold block mb-0.5">{term}</span>
          <span>{definition}</span>
        </span>
      )}
    </span>
  );
}
