import React from 'react';
import { AlertTriangle, Check, X } from 'lucide-react';
import { type VerdictLevel } from '../../lib/ukd';

export interface StatusMeta {
  level: VerdictLevel;
  symbol: string;
  word: string;
  label: string;
  leftBorderCls: string;
  tintBannerCls: string;
  tintCardCls: string;
  solidChipCls: string;
  tintChipCls: string;
  valueTextCls: string;
}

export function getStatusMeta(level: VerdictLevel): StatusMeta {
  if (level === 'ok') {
    return {
      level,
      symbol: '✓',
      word: 'Cukup',
      label: '✓ Cukup',
      leftBorderCls: 'border-l-4 border-l-[var(--ok-border)] [border-left-style:solid]',
      tintBannerCls:
        'bg-[var(--ok-tint)] border border-[var(--ok-border)]/45 text-[var(--ok-tint-fg)]',
      tintCardCls:
        'bg-[var(--surface)] border border-[var(--border-col)] border-l-4 border-l-[var(--ok-border)] [border-left-style:solid]',
      solidChipCls: 'bg-[var(--ok)] text-white border border-[var(--ok)]',
      tintChipCls:
        'bg-[var(--ok-tint)] text-[var(--ok-tint-fg)] border border-[var(--ok-border)]/45',
      valueTextCls: 'text-[var(--ok-tint-fg)]',
    };
  }

  if (level === 'warn') {
    return {
      level,
      symbol: '!',
      word: 'Waspada',
      label: '! Waspada',
      leftBorderCls: 'border-l-4 border-l-[var(--warn-border)] [border-left-style:dashed]',
      tintBannerCls:
        'bg-[var(--warn-tint)] border border-[var(--warn-border)]/55 text-[var(--warn-tint-fg)]',
      tintCardCls:
        'bg-[var(--surface)] border border-[var(--border-col)] border-l-4 border-l-[var(--warn-border)] [border-left-style:dashed]',
      solidChipCls: 'bg-[var(--warn)] text-[var(--ink)] border border-[var(--warn)]',
      tintChipCls:
        'bg-[var(--warn-tint)] text-[var(--warn-tint-fg)] border border-[var(--warn-border)]/50',
      valueTextCls: 'text-[var(--warn-tint-fg)]',
    };
  }

  return {
    level,
    symbol: '✕',
    word: 'Bahaya',
    label: '✕ Bahaya',
    leftBorderCls: 'border-l-[6px] border-l-[var(--bad-border)] [border-left-style:double]',
    tintBannerCls:
      'bg-[var(--bad-tint)] border border-[var(--bad-border)]/55 text-[var(--bad-tint-fg)]',
    tintCardCls:
      'bg-[var(--surface)] border border-[var(--border-col)] border-l-[6px] border-l-[var(--bad-border)] [border-left-style:double]',
    solidChipCls: 'bg-[var(--bad-solid)] text-white border border-[var(--bad-solid)]',
    tintChipCls:
      'bg-[var(--bad-tint)] text-[var(--bad-tint-fg)] border border-[var(--bad-border)]/50',
    valueTextCls: 'text-[var(--bad-text)]',
  };
}

export function StatusIcon({
  level,
  className = 'w-3.5 h-3.5 shrink-0',
}: {
  level: VerdictLevel;
  className?: string;
}) {
  if (level === 'ok') return <Check className={className} aria-hidden="true" />;
  if (level === 'warn') return <AlertTriangle className={className} aria-hidden="true" />;
  return <X className={className} aria-hidden="true" />;
}

export function StatusChip({
  level,
  suffix,
  variant = 'solid',
  className = '',
}: {
  level: VerdictLevel;
  suffix?: string;
  variant?: 'solid' | 'tint';
  className?: string;
}) {
  const meta = getStatusMeta(level);
  const baseCls = variant === 'solid' ? meta.solidChipCls : meta.tintChipCls;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold tabular-nums ${baseCls} ${meta.leftBorderCls} ${className}`}
    >
      <StatusIcon level={level} className="w-3.5 h-3.5 shrink-0" />
      <span>
        {meta.label}
        {suffix ? ` · ${suffix}` : ''}
      </span>
    </span>
  );
}
