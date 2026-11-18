import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BookOpen,
  Compass,
  Flag,
  RefreshCw,
  ShieldCheck,
} from 'lucide-react';
import {
  ABDI_COMPONENTS,
  ABDI_COMPONENT_ORDER,
  BERANDA_COPY,
  SHELL_COPY,
} from '../content/id';
import { AbdiLogo } from '../components/ui/AbdiLogo';
import { SourcesDrawer } from '../components/ui/SourcesDrawer';
import { StatusChip } from '../components/ui/StatusBadge';
import { formatTriliun } from '../lib/ukd';
import { useAbdi } from '../store/AbdiContext';

export function LandingPage() {
  const { ukd, openSources } = useAbdi();

  const statusSuffix =
    ukd.verdict === 'ok'
      ? `Pasca-PSR: +${formatTriliun(ukd.net, 2)}`
      : `Pasca-PSR: −${formatTriliun(ukd.gap, 2)}`;

  return (
    <div className="min-h-screen flex flex-col bg-surface text-ink">
      {/* Standalone Top Navbar (no glassmorphism, crisp border) */}
      <header className="sticky top-0 z-30 w-full bg-surface-card border-b border-border">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8 h-16 flex items-center justify-between gap-4">
          <Link
            to="/"
            className="flex items-center gap-3 min-w-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--steel)] rounded"
          >
            <AbdiLogo size={36} />
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-headline text-xl font-bold text-ink tracking-tight">
                  {SHELL_COPY.brandTitle}
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-[var(--steel)] text-[var(--ink)] text-[10px] font-bold uppercase tracking-wider">
                  PFPBC 2026
                </span>
              </div>
              <span className="hidden sm:block text-[11px] text-ink-muted truncate">
                {SHELL_COPY.brandSubtitle}
              </span>
            </div>
          </Link>

          <nav aria-label="Navigasi landing page" className="hidden lg:flex items-center gap-6">
            <a
              href="#fitur"
              className="text-sm font-medium text-ink-muted hover:text-primary transition-colors"
            >
              Ringkasan
            </a>
            <a
              href="#komponen"
              className="text-sm font-medium text-ink-muted hover:text-primary transition-colors"
            >
              Komponen ABDI
            </a>
            <a
              href="#alur-siklus"
              className="text-sm font-medium text-ink-muted hover:text-primary transition-colors"
            >
              Alur Siklus
            </a>
            <button
              type="button"
              onClick={openSources}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted hover:text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--steel)] rounded"
            >
              <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Sumber</span>
            </button>
          </nav>

          <div className="flex items-center gap-2.5 shrink-0">
            <Link
              to="/beranda"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border bg-surface-low text-sm font-semibold text-ink hover:bg-surface-container transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--steel)]"
            >
              <span>Masuk Beranda</span>
            </Link>
            <Link
              to="/simulator"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[var(--btn-primary-bg)] text-[var(--btn-primary-fg)] text-sm font-semibold hover:bg-[var(--btn-primary-hover)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--steel)]"
            >
              <span>Buka Simulator</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* Full-Width --ink Hero Band with --bg serif headline and thin 3px --bad accent line */}
        <section className="w-full bg-[var(--hero-bg)] text-[var(--hero-text)] border-b border-[var(--sidebar-border)]">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-8 pt-10 pb-12 lg:py-14">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              {/* Hero Left */}
              <div className="lg:col-span-7 flex flex-col items-start gap-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--steel)] text-[var(--ink)] text-xs font-bold">
                  <ShieldCheck className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  <span>Prototipe Kebijakan Dana Perkebunan • PFPBC 2026</span>
                </div>

                <div>
                  <h1 className="font-headline text-4xl sm:text-5xl lg:text-[52px] lg:leading-[1.1] font-semibold tracking-tight text-[var(--hero-text)]">
                    <span className="block">Uji Kecukupan</span>
                    <span className="block text-[var(--steel)]">Dana Perkebunan</span>
                    <span className="block">Sebelum Mandat B50</span>
                  </h1>
                  <div className="mt-4 h-[3px] w-28 bg-[var(--bad)]" aria-hidden="true" />
                </div>

                <p className="text-base sm:text-lg text-[var(--hero-muted)] leading-relaxed max-w-xl">
                  Mengukur kecukupan pungutan ekspor sawit untuk membiayai insentif biodiesel B50 dan
                  peremajaan kebun rakyat secara terbuka dalam satu siklus tahunan.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <Link
                    to="/simulator"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--steel)] text-[var(--ink)] text-sm font-bold hover:bg-[#7DB0CF] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    <span>Buka Simulator UKD</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                  <Link
                    to="/beranda"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-surface-card border border-border text-ink text-sm font-semibold hover:bg-surface-low transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--steel)]"
                  >
                    <Compass className="w-4 h-4 text-primary" aria-hidden="true" />
                    <span>Pelajari Alur Masalah</span>
                  </Link>
                </div>

                {/* 3 Key Numbers */}
                <div className="grid grid-cols-3 gap-3 sm:gap-4 w-full pt-3">
                  {BERANDA_COPY.tiles.map((tile) => (
                    <div
                      key={tile.value}
                      className="bg-surface-card border border-border rounded-xl p-3.5"
                    >
                      <div className="font-headline text-xl sm:text-2xl font-semibold tabular-nums text-ink">
                        {tile.value}
                      </div>
                      <div className="text-[11px] sm:text-xs text-ink-muted mt-1 leading-snug">
                        {tile.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hero Right: Showcase Card featuring the custom ABDI Logo & 4 Components */}
              <div className="lg:col-span-5">
                <div className="bg-surface-card border border-border border-t-4 border-t-[var(--steel)] rounded-2xl p-6 flex flex-col gap-5 text-ink">
                  {/* Featured ABDI Brand Block */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-border">
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-2xl bg-surface-low border border-border shrink-0">
                        <AbdiLogo size={72} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-headline text-2xl font-bold text-ink tracking-tight">
                            {SHELL_COPY.brandTitle}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-[var(--steel)] text-[var(--ink)] text-[10px] font-bold uppercase">
                            Model Fiskal
                          </span>
                        </div>
                        <p className="text-xs text-ink-muted mt-0.5">
                          Adequacy · Buffer · Deliver · Impact
                        </p>
                      </div>
                    </div>

                    <StatusChip level={ukd.verdict} suffix={statusSuffix} variant="tint" />
                  </div>

                  {/* 4 Component Rows */}
                  <div className="flex flex-col gap-2.5">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-ink-subtle">
                      Empat Komponen Utama (A → B → D → I)
                    </span>

                    {ABDI_COMPONENT_ORDER.map((letter) => {
                      const comp = ABDI_COMPONENTS[letter];
                      const chipCls =
                        comp.roleChip === 'Inti'
                          ? 'bg-[var(--steel)] text-[var(--ink)]'
                          : comp.roleChip === 'Fondasi'
                          ? 'bg-[var(--warn-tint)] text-[var(--warn-tint-fg)]'
                          : 'bg-[var(--ok-tint)] text-[var(--ok-tint-fg)]';

                      return (
                        <Link
                          key={comp.letter}
                          to={comp.path}
                          className="group flex items-center justify-between gap-3 p-3 rounded-xl bg-surface-low border border-border hover:border-[var(--panel-top-accent)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--steel)]"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <span
                              className={`w-8 h-8 rounded-lg border flex items-center justify-center font-headline text-base font-bold shrink-0 ${
                                comp.roleChip === 'Inti'
                                  ? 'bg-[var(--steel)] text-[var(--ink)] border-[var(--ink)]'
                                  : 'bg-surface-card text-ink border-border-strong'
                              }`}
                            >
                              {comp.letter}
                            </span>
                            <div className="min-w-0">
                              <div className="text-sm font-semibold text-ink group-hover:underline truncate">
                                {comp.nameId}
                              </div>
                              <div className="text-[11px] text-ink-muted truncate">
                                {comp.nameEn} · {comp.tooltip}
                              </div>
                            </div>
                          </div>

                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-semibold shrink-0 ${chipCls}`}
                          >
                            {comp.roleChip}
                          </span>
                        </Link>
                      );
                    })}
                  </div>

                  {/* Full-Width CTA to Enter App Workspace */}
                  <Link
                    to="/beranda"
                    className="w-full py-3 px-4 rounded-xl bg-[var(--btn-primary-bg)] text-[var(--btn-primary-fg)] text-sm font-semibold hover:bg-[var(--btn-primary-hover)] transition-colors flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--steel)]"
                  >
                    <span>Masuk ke Ruang Kerja ABDI</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Ringkasan Masalah, Usulan, Hasil */}
        <section id="fitur" className="max-w-[1200px] mx-auto px-4 sm:px-8 py-8 scroll-mt-20">
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="font-headline text-2xl font-semibold text-ink">
                {BERANDA_COPY.summary30s.title}
              </h2>
              <span className="text-xs text-ink-muted">
                Mengapa uji kecukupan dana penting sebelum mandatori dijalankan
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {BERANDA_COPY.summary30s.cards.map((card, i) => (
                <div
                  key={card.label}
                  className="bg-surface-card border border-border border-t-4 border-t-[var(--panel-top-accent)] rounded-xl p-5 flex flex-col gap-2"
                >
                  <span
                    className={`text-xs font-semibold uppercase tracking-wider ${
                      i === 0
                        ? 'text-[var(--warn-tint-fg)]'
                        : i === 1
                        ? 'text-ink'
                        : 'text-[var(--ok-tint-fg)]'
                    }`}
                  >
                    {card.label}
                  </span>
                  <p className="text-sm text-ink leading-relaxed">{card.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4 Komponen Detail Grid */}
        <section id="komponen" className="max-w-[1200px] mx-auto px-4 sm:px-8 py-6 scroll-mt-20">
          <div className="bg-surface-card border border-border border-t-4 border-t-[var(--panel-top-accent)] rounded-2xl p-6 flex flex-col gap-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h2 className="font-headline text-2xl font-semibold text-ink">
                  Arsitektur Kebijakan ABDI
                </h2>
                <p className="text-xs text-ink-muted mt-0.5">
                  Klik komponen untuk langsung menguji skenario atau membuka lembar kerja.
                </p>
              </div>
              <Link
                to="/simulator"
                className="text-xs font-semibold text-ink hover:underline inline-flex items-center gap-1"
              >
                <span>Langsung ke Uji Kecukupan</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {ABDI_COMPONENT_ORDER.map((letter) => {
                const comp = ABDI_COMPONENTS[letter];
                const isCore = comp.roleChip === 'Inti';
                const chipCls =
                  comp.roleChip === 'Inti'
                    ? 'bg-[var(--steel)] text-[var(--ink)]'
                    : comp.roleChip === 'Fondasi'
                    ? 'bg-[var(--warn-tint)] text-[var(--warn-tint-fg)]'
                    : 'bg-[var(--ok-tint)] text-[var(--ok-tint-fg)]';

                return (
                  <Link
                    key={comp.letter}
                    to={comp.path}
                    className="group bg-surface-low border border-border hover:border-[var(--panel-top-accent)] rounded-xl p-4 flex flex-col justify-between gap-3 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--steel)]"
                  >
                    <div className="flex flex-col gap-2.5">
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`w-8 h-8 rounded-lg border flex items-center justify-center font-headline text-base font-bold shrink-0 ${
                            isCore
                              ? 'border-[var(--ink)] bg-[var(--steel)] text-[var(--ink)]'
                              : 'border-border-strong bg-surface-card text-ink'
                          }`}
                        >
                          {comp.letter}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${chipCls}`}>
                          {comp.roleChip}
                        </span>
                      </div>
                      <div>
                        <div className="font-headline text-base font-semibold text-ink group-hover:underline leading-snug">
                          {comp.nameId}
                        </div>
                        <div className="text-[11px] text-ink-subtle mt-0.5">{comp.nameEn}</div>
                      </div>
                    </div>
                    <p className="text-xs text-ink-muted leading-relaxed">{comp.tooltip}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Siklus & Rekomendasi */}
        <section
          id="alur-siklus"
          className="max-w-[1200px] mx-auto px-4 sm:px-8 pt-2 pb-12 scroll-mt-20"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Link
              to="/siklus"
              className="group bg-surface-card border border-border border-t-4 border-t-[var(--panel-top-accent)] hover:border-[var(--panel-top-accent)] rounded-xl p-5 flex items-center justify-between gap-4 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--steel)]"
            >
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-surface-low border border-border flex items-center justify-center shrink-0">
                  <RefreshCw className="w-5 h-5 text-ink" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-headline text-lg font-semibold text-ink group-hover:underline">
                    Siklus pengambilan keputusan
                  </h3>
                  <p className="text-xs text-ink-muted mt-1">
                    Bagaimana hasil laporan tahunan kembali mengkalibrasi UKD tahun berikutnya.
                  </p>
                </div>
              </div>
              <ArrowRight
                className="w-4 h-4 text-ink-subtle group-hover:text-ink shrink-0"
                aria-hidden="true"
              />
            </Link>

            <Link
              to="/rekomendasi"
              className="group bg-surface-card border border-border border-t-4 border-t-[var(--panel-top-accent)] hover:border-[var(--panel-top-accent)] rounded-xl p-5 flex items-center justify-between gap-4 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--steel)]"
            >
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-surface-low border border-border flex items-center justify-center shrink-0">
                  <Flag className="w-5 h-5 text-[var(--ok-tint-fg)]" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-headline text-lg font-semibold text-ink group-hover:underline">
                    Rekomendasi Komite Pengarah
                  </h3>
                  <p className="text-xs text-ink-muted mt-1">
                    Tiga keputusan konkret sebelum alokasi anggaran dan penerapan mandatori 2026.
                  </p>
                </div>
              </div>
              <ArrowRight
                className="w-4 h-4 text-ink-subtle group-hover:text-ink shrink-0"
                aria-hidden="true"
              />
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full bg-surface-card border-t border-border py-5">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-ink-subtle">
          <span>{SHELL_COPY.footerText}</span>
          <button
            type="button"
            onClick={openSources}
            className="text-xs font-semibold text-ink hover:underline underline-offset-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--steel)] rounded"
          >
            {SHELL_COPY.footerSourcesLink}
          </button>
        </div>
      </footer>

      <SourcesDrawer />
    </div>
  );
}
