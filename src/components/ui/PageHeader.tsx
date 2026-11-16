import React from 'react';
import { ABDI_COMPONENTS, type ComponentLetter } from '../../content/id';
import { Term } from './Term';

interface PageHeaderProps {
  componentKey: ComponentLetter;
  rightSlot?: React.ReactNode;
  titleSuffix?: React.ReactNode;
}

export function PageHeader({ componentKey, rightSlot, titleSuffix }: PageHeaderProps) {
  const meta = ABDI_COMPONENTS[componentKey];

  const chipStyle =
    meta.roleChip === 'Inti'
      ? 'bg-[var(--steel)] text-[var(--ink)] border-[var(--ink)]/25'
      : meta.roleChip === 'Fondasi'
      ? 'bg-[var(--warn-tint)] text-[var(--warn-tint-fg)] border-[var(--warn-border)]/40'
      : 'bg-[var(--ok-tint)] text-[var(--ok-tint-fg)] border-[var(--ok-border)]/40';

  return (
    <header className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-border">
      <div className="flex items-start sm:items-center gap-3 min-w-0">
        <span
          className={`w-9 h-9 rounded-lg border flex items-center justify-center font-headline text-lg font-bold shrink-0 ${
            meta.roleChip === 'Inti'
              ? 'bg-[var(--steel)] text-[var(--ink)] border-[var(--ink)]'
              : 'bg-[var(--surface)] text-ink border-border-strong'
          }`}
          aria-hidden="true"
        >
          {meta.letter}
        </span>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="font-headline text-xl sm:text-2xl font-semibold text-ink tracking-tight">
              {componentKey === 'A' ? (
                <>
                  Uji kecukupan dana (<Term term="UKD">UKD</Term>)
                </>
              ) : (
                meta.nameId
              )}
            </h1>
            {titleSuffix}
          </div>
          <div className="flex flex-wrap items-center gap-2 mt-0.5">
            <span className="text-xs font-medium text-ink-muted">{meta.nameEn}</span>
            <span
              className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${chipStyle}`}
            >
              {meta.roleChip}
            </span>
          </div>
        </div>
      </div>

      {rightSlot && <div className="shrink-0 self-start md:self-center">{rightSlot}</div>}
    </header>
  );
}
