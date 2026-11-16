import React, { useId, useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface DetailProps {
  title: string;
  badge?: string;
  icon?: React.ReactNode;
  defaultOpen?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function Detail({
  title,
  badge,
  icon,
  defaultOpen = false,
  children,
  className = '',
}: DetailProps) {
  const [open, setOpen] = useState(defaultOpen);
  const contentId = useId();

  return (
    <div
      className={`bg-surface-card border border-border rounded-xl overflow-hidden shadow-sm ${className}`}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={contentId}
        onClick={() => setOpen((prev) => !prev)}
        className="w-full px-5 py-3.5 flex items-center justify-between text-left hover:bg-surface-low transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-container"
      >
        <div className="flex items-center gap-2.5 min-w-0">
          {icon && <span className="text-primary-container shrink-0">{icon}</span>}
          <span className="font-headline text-base md:text-lg font-semibold text-ink truncate">
            {title}
          </span>
          {badge && (
            <span className="px-2 py-0.5 rounded text-xs font-medium bg-surface-container text-ink-muted shrink-0">
              {badge}
            </span>
          )}
        </div>
        <ChevronDown
          className={`w-5 h-5 text-ink-subtle shrink-0 transition-transform duration-150 ${
            open ? 'rotate-180' : ''
          }`}
          aria-hidden="true"
        />
      </button>

      {open && (
        <div id={contentId} className="border-t border-border p-4 md:p-5 bg-surface-card">
          {children}
        </div>
      )}
    </div>
  );
}
