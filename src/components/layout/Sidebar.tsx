import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  AlertTriangle,
  BookOpen,
  Check,
  Flag,
  Home,
  PanelLeftClose,
  PanelLeftOpen,
  RefreshCw,
  X,
} from 'lucide-react';
import {
  ABDI_COMPONENTS,
  ABDI_COMPONENT_ORDER,
  SHELL_COPY,
} from '../../content/id';
import { formatNumberId } from '../../lib/ukd';
import { useAbdi } from '../../store/AbdiContext';
import { getStatusMeta } from '../ui/StatusBadge';

interface SidebarProps {
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

function SidebarContent({
  collapsed,
  isMobile,
  onNavigate,
  onToggleCollapse,
  onCloseMobile,
}: {
  collapsed: boolean;
  isMobile: boolean;
  onNavigate: () => void;
  onToggleCollapse: () => void;
  onCloseMobile: () => void;
}) {
  const { pathname } = useLocation();
  const { isGuideMode, ukd, visitedPaths, openSources } = useAbdi();
  const [hoveredItem, setHoveredItem] = useState<{ key: string; top: number } | null>(null);

  const isVisited = (path: string) => visitedPaths.includes(path);
  const effectiveCollapsed = isMobile ? false : collapsed;

  const showTooltip = (key: string, el: HTMLElement | null) => {
    const top = el ? el.getBoundingClientRect().top : 0;
    setHoveredItem({ key, top });
  };
  const hideTooltip = () => setHoveredItem(null);

  const ukdStatus = getStatusMeta(ukd.verdict);
  const verdictBadgeClass =
    ukd.verdict === 'ok'
      ? 'bg-[var(--ok)] text-white border-white/25'
      : ukd.verdict === 'warn'
      ? 'bg-[var(--warn)] text-[var(--ink)] border-[var(--ink)]/30'
      : 'bg-[var(--bad-solid)] text-white border-white/25';

  return (
    <div className="flex flex-col h-full justify-between bg-[var(--sidebar-bg)] text-[var(--sidebar-text)] select-none">
      {/* Top Collapse / Close Bar */}
      <div
        className={`flex items-center ${
          effectiveCollapsed ? 'justify-center px-2' : 'justify-between px-4'
        } h-14 border-b border-[var(--sidebar-border)] shrink-0`}
      >
        {!effectiveCollapsed && (
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--sidebar-muted)]">
            Navigasi ABDI
          </span>
        )}

        {isMobile ? (
          <button
            type="button"
            onClick={onCloseMobile}
            aria-label="Tutup menu navigasi"
            className="p-2 rounded-lg text-[var(--sidebar-muted)] hover:text-[var(--sidebar-text)] hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--steel)]"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        ) : (
          <button
            type="button"
            onClick={onToggleCollapse}
            aria-label={effectiveCollapsed ? 'Perluas sidebar' : 'Ciutkan sidebar'}
            aria-expanded={!effectiveCollapsed}
            title={effectiveCollapsed ? 'Perluas sidebar' : 'Ciutkan sidebar'}
            className="p-2 rounded-lg text-[var(--sidebar-muted)] hover:text-[var(--sidebar-text)] hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--steel)]"
          >
            {effectiveCollapsed ? (
              <PanelLeftOpen className="w-4 h-4" aria-hidden="true" />
            ) : (
              <PanelLeftClose className="w-4 h-4" aria-hidden="true" />
            )}
          </button>
        )}
      </div>

      {/* Scrollable Nav Groups */}
      <nav
        aria-label="Navigasi komponen ABDI"
        className="flex-1 overflow-y-auto overflow-x-hidden py-3 flex flex-col gap-4"
      >
        {/* a) Group Mulai */}
        <div className={effectiveCollapsed ? 'px-2' : 'px-3'}>
          {!effectiveCollapsed && (
            <div className="px-2 mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-[var(--sidebar-muted)]">
              Mulai
            </div>
          )}
          <div className="relative">
            <Link
              to="/beranda"
              onClick={onNavigate}
              aria-current={pathname === '/beranda' ? 'page' : undefined}
              title={effectiveCollapsed ? 'Beranda' : undefined}
              onMouseEnter={(e) => effectiveCollapsed && showTooltip('beranda', e.currentTarget)}
              onMouseLeave={hideTooltip}
              onFocus={(e) => effectiveCollapsed && showTooltip('beranda', e.currentTarget)}
              onBlur={hideTooltip}
              className={`flex items-center ${
                effectiveCollapsed ? 'justify-center px-2 py-2.5' : 'justify-between px-3 py-2'
              } rounded-lg text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--steel)] ${
                pathname === '/beranda'
                  ? 'bg-[var(--steel)] font-bold text-[var(--ink)]'
                  : 'text-[var(--sidebar-text)] hover:bg-white/10 font-medium'
              }`}
            >
              <span className="flex items-center gap-2.5 min-w-0">
                <Home
                  className={`w-4 h-4 shrink-0 ${
                    pathname === '/beranda' ? 'text-[var(--ink)]' : 'text-[var(--sidebar-muted)]'
                  }`}
                  aria-hidden="true"
                />
                {!effectiveCollapsed && <span className="truncate">Beranda</span>}
              </span>
              {!effectiveCollapsed && isVisited('/beranda') && (
                <Check
                  className={`w-3.5 h-3.5 shrink-0 ${
                    pathname === '/beranda' ? 'text-[var(--ink)]' : 'text-[var(--sidebar-muted)]'
                  }`}
                  aria-label="Sudah dikunjungi"
                />
              )}
            </Link>
            {effectiveCollapsed && hoveredItem?.key === 'beranda' && (
              <div
                role="tooltip"
                style={{ top: hoveredItem.top }}
                className="fixed left-[78px] z-50 px-2.5 py-1.5 rounded-lg bg-[var(--tooltip-bg)] text-[var(--tooltip-fg)] text-xs font-medium whitespace-nowrap shadow-lg border border-[var(--sidebar-border)] pointer-events-none"
              >
                Beranda
              </div>
            )}
          </div>
        </div>

        {/* b) Group Komponen ABDI */}
        <div className={effectiveCollapsed ? 'px-2' : 'px-3'}>
          {!effectiveCollapsed && (
            <div className="px-2 mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-[var(--sidebar-muted)]">
              Komponen ABDI
            </div>
          )}

          <div className="relative">
            {/* Thin vertical cycle line on the left connecting A -> B -> D -> I */}
            {!effectiveCollapsed && (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-2 top-5 bottom-4 w-3 flex flex-col items-center"
              >
                <div className="w-[1.5px] flex-1 bg-[var(--steel)]/60" />
              </div>
            )}

            <div className={`flex flex-col gap-1 ${effectiveCollapsed ? '' : 'pl-3.5'}`}>
              {ABDI_COMPONENT_ORDER.map((letter) => {
                const comp = ABDI_COMPONENTS[letter];
                const active = pathname === comp.path;
                const visited = isVisited(comp.path);
                const roleChipCls = active
                  ? 'bg-[var(--ink)] text-[var(--sidebar-text)]'
                  : 'bg-[#0B4362] text-[#FDF0D5] border border-[var(--steel)]/55';

                return (
                  <div
                    key={comp.letter}
                    className="relative"
                    onMouseEnter={(e) => showTooltip(comp.letter, e.currentTarget)}
                    onMouseLeave={hideTooltip}
                  >
                    <Link
                      to={comp.path}
                      onClick={onNavigate}
                      aria-current={active ? 'page' : undefined}
                      onFocus={(e) => showTooltip(comp.letter, e.currentTarget)}
                      onBlur={hideTooltip}
                      className={`group flex ${
                        effectiveCollapsed
                          ? 'flex-col items-center justify-center py-2 px-1'
                          : 'items-start justify-between gap-2 px-2.5 py-2'
                      } rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--steel)] ${
                        active
                          ? 'bg-[var(--steel)] text-[var(--ink)]'
                          : 'text-[var(--sidebar-text)] hover:bg-white/10'
                      }`}
                    >
                      <div
                        className={`flex ${
                          effectiveCollapsed ? 'flex-col items-center gap-1' : 'items-start gap-2.5'
                        } min-w-0`}
                      >
                        <span
                          className={`w-7 h-7 rounded-md border flex items-center justify-center font-headline text-sm font-bold shrink-0 ${
                            active
                              ? 'bg-[var(--steel)] text-[var(--ink)] border-[var(--ink)]'
                              : 'bg-transparent text-[var(--sidebar-text)] border-[var(--sidebar-text)]'
                          }`}
                        >
                          {comp.letter}
                        </span>

                        {effectiveCollapsed && isGuideMode && comp.letter === 'A' && (
                          <span
                            className={`px-1 py-0.5 rounded border text-[9px] font-bold leading-none ${verdictBadgeClass}`}
                            title={`Status UKD: ${ukdStatus.label}`}
                            aria-label={`Status UKD: ${ukdStatus.label}`}
                          >
                            {ukdStatus.symbol}
                          </span>
                        )}

                        {!effectiveCollapsed && (
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5">
                              <span
                                className={`text-xs leading-snug ${
                                  active
                                    ? 'font-bold text-[var(--ink)]'
                                    : 'font-semibold text-[var(--sidebar-text)]'
                                }`}
                              >
                                {comp.nameId}
                              </span>
                            </div>

                            <div className="flex flex-wrap items-center gap-1.5 mt-0.5">
                              <span
                                className={`text-[11px] ${
                                  active ? 'text-[var(--ink)] font-medium' : 'text-[var(--sidebar-muted)]'
                                }`}
                              >
                                {comp.nameEn}
                              </span>
                              <span
                                className={`px-1.5 py-0.2 rounded text-[10px] font-semibold ${roleChipCls}`}
                              >
                                {comp.roleChip}
                              </span>
                              {isGuideMode && comp.letter === 'A' && (
                                <span
                                  className={`inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded border text-[10px] font-bold shrink-0 ${verdictBadgeClass}`}
                                  title={`Status UKD: ${ukdStatus.label}`}
                                  aria-label={`Status UKD: ${ukdStatus.label}`}
                                >
                                  <span>{ukdStatus.symbol}</span>
                                  <span>{ukdStatus.word}</span>
                                </span>
                              )}
                            </div>

                            {isGuideMode &&
                              comp.letter === 'B' &&
                              ukd.net < 0 &&
                              ukd.dayaTahan !== null && (
                                <div className="mt-1">
                                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-[var(--warn)] text-[var(--ink)] text-[10px] font-bold tabular-nums">
                                    <AlertTriangle className="w-2.5 h-2.5 shrink-0" aria-hidden="true" />
                                    Daya tahan {formatNumberId(ukd.dayaTahan, 1)} tahun
                                  </span>
                                </div>
                              )}
                          </div>
                        )}
                      </div>

                      {!effectiveCollapsed && visited && (
                        <Check
                          className={`w-3.5 h-3.5 shrink-0 mt-1 ${
                            active ? 'text-[var(--ink)]' : 'text-[var(--sidebar-muted)]'
                          }`}
                          aria-label="Sudah dikunjungi"
                        />
                      )}
                    </Link>

                    {/* Accessible Hover/Focus Tooltip (non-shifting floating overlay) */}
                    {hoveredItem?.key === comp.letter && (
                      <div
                        role="tooltip"
                        style={
                          !isMobile
                            ? { top: Math.max(12, hoveredItem.top) }
                            : undefined
                        }
                        className={`z-50 pointer-events-none p-2.5 rounded-lg bg-[var(--tooltip-bg)] text-[var(--tooltip-fg)] text-xs leading-snug shadow-lg border border-[var(--sidebar-border)] ${
                          isMobile
                            ? 'absolute left-2 right-2 top-full mt-1'
                            : effectiveCollapsed
                            ? 'fixed left-[78px] w-56'
                            : 'fixed left-[266px] w-60'
                        }`}
                      >
                        {effectiveCollapsed && (
                          <div className="font-semibold mb-0.5">{comp.nameId}</div>
                        )}
                        <div>{comp.tooltip}</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Small loop arrow returning from I to A at the bottom of the group */}
            {!effectiveCollapsed && (
              <div
                aria-hidden="true"
                className="flex items-center gap-1.5 pl-1.5 pt-1.5 text-[10px] text-[var(--sidebar-muted)]"
              >
                <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
                  <path
                    d="M 16 2 V 9 H 5 V 3"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <polyline
                    points="2.5,5.5 5,2.5 7.5,5.5"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>Siklus tahunan (I → A)</span>
              </div>
            )}
          </div>
        </div>

        {/* c) Group Penutup */}
        <div className={effectiveCollapsed ? 'px-2' : 'px-3'}>
          {!effectiveCollapsed && (
            <div className="px-2 mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-[var(--sidebar-muted)]">
              Penutup
            </div>
          )}
          <div className="flex flex-col gap-1">
            {[
              { path: '/siklus', label: 'Siklus', Icon: RefreshCw },
              { path: '/rekomendasi', label: 'Rekomendasi', Icon: Flag },
            ].map(({ path, label, Icon }) => {
              const active = pathname === path;
              const visited = isVisited(path);
              return (
                <div
                  key={path}
                  className="relative"
                  onMouseEnter={(e) => effectiveCollapsed && showTooltip(path, e.currentTarget)}
                  onMouseLeave={hideTooltip}
                >
                  <Link
                    to={path}
                    onClick={onNavigate}
                    aria-current={active ? 'page' : undefined}
                    title={effectiveCollapsed ? label : undefined}
                    onFocus={(e) => effectiveCollapsed && showTooltip(path, e.currentTarget)}
                    onBlur={hideTooltip}
                    className={`flex items-center ${
                      effectiveCollapsed ? 'justify-center px-2 py-2.5' : 'justify-between px-3 py-2'
                    } rounded-lg text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--steel)] ${
                      active
                        ? 'bg-[var(--steel)] font-bold text-[var(--ink)]'
                        : 'text-[var(--sidebar-text)] hover:bg-white/10 font-medium'
                    }`}
                  >
                    <span className="flex items-center gap-2.5 min-w-0">
                      <Icon
                        className={`w-4 h-4 shrink-0 ${
                          active ? 'text-[var(--ink)]' : 'text-[var(--sidebar-muted)]'
                        }`}
                        aria-hidden="true"
                      />
                      {!effectiveCollapsed && <span className="truncate">{label}</span>}
                    </span>
                    {!effectiveCollapsed && visited && (
                      <Check
                        className={`w-3.5 h-3.5 shrink-0 ${
                          active ? 'text-[var(--ink)]' : 'text-[var(--sidebar-muted)]'
                        }`}
                        aria-label="Sudah dikunjungi"
                      />
                    )}
                  </Link>
                  {effectiveCollapsed && hoveredItem?.key === path && (
                    <div
                      role="tooltip"
                      style={{ top: hoveredItem.top }}
                      className="fixed left-[78px] z-50 px-2.5 py-1.5 rounded-lg bg-[var(--tooltip-bg)] text-[var(--tooltip-fg)] text-xs font-medium whitespace-nowrap shadow-lg border border-[var(--sidebar-border)] pointer-events-none"
                    >
                      {label}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Sidebar Footer */}
      <div className="p-3 border-t border-[var(--sidebar-border)] shrink-0">
        <button
          type="button"
          onClick={() => {
            openSources();
            if (isMobile) onCloseMobile();
          }}
          title={effectiveCollapsed ? SHELL_COPY.footerSourcesLink : undefined}
          className={`w-full flex items-center ${
            effectiveCollapsed ? 'justify-center p-2' : 'gap-2 px-3 py-2'
          } rounded-lg text-xs font-medium text-[var(--sidebar-text)] hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--steel)]`}
        >
          <BookOpen className="w-4 h-4 shrink-0 text-[var(--steel)]" aria-hidden="true" />
          {!effectiveCollapsed && (
            <span className="underline underline-offset-4 truncate">
              {SHELL_COPY.footerSourcesLink}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}

export function Sidebar({ mobileOpen, onCloseMobile }: SidebarProps) {
  const { sidebarCollapsed, toggleSidebar } = useAbdi();

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCloseMobile();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [mobileOpen, onCloseMobile]);

  return (
    <>
      {/* Desktop Sticky Sidebar: 260px expanded / 72px collapsed */}
      <aside
        aria-label="Sidebar desktop"
        className={`hidden lg:block shrink-0 sticky top-0 h-screen border-r border-[var(--sidebar-border)] transition-[width] duration-200 ${
          sidebarCollapsed ? 'w-[72px]' : 'w-[260px]'
        }`}
      >
        <SidebarContent
          collapsed={sidebarCollapsed}
          isMobile={false}
          onNavigate={() => {}}
          onToggleCollapse={toggleSidebar}
          onCloseMobile={onCloseMobile}
        />
      </aside>

      {/* Mobile Slide-in Drawer (< 1024px) */}
      <div
        className={`lg:hidden fixed inset-0 z-50 ${
          mobileOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
        aria-hidden={!mobileOpen}
      >
        <div
          onClick={onCloseMobile}
          className={`fixed inset-0 bg-black/50 transition-opacity duration-200 ${
            mobileOpen ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <aside
          aria-label="Menu navigasi seluler"
          className={`fixed inset-y-0 left-0 w-[260px] max-w-[85vw] border-r border-[var(--sidebar-border)] shadow-2xl transition-transform duration-200 ${
            mobileOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <SidebarContent
            collapsed={false}
            isMobile={true}
            onNavigate={onCloseMobile}
            onToggleCollapse={toggleSidebar}
            onCloseMobile={onCloseMobile}
          />
        </aside>
      </div>
    </>
  );
}
