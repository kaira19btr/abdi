import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Building2,
  Coins,
  Fuel,
  RotateCcw,
  Ship,
} from 'lucide-react';
import { BERANDA_COPY, BRIDGES } from '../content/id';
import { Info } from '../components/ui/Info';
import { Bridge } from '../components/ui/PagePattern';
import { StatusChip } from '../components/ui/StatusBadge';
import { Term } from '../components/ui/Term';
import {
  DEFAULT_PARAMS,
  calcUkd,
  formatNumberId,
  formatTriliun,
} from '../lib/ukd';

export function BerandaPage() {
  const [demoBrent, setDemoBrent] = useState<number>(85);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = window.requestAnimationFrame(() => setMounted(true));
    return () => window.cancelAnimationFrame(id);
  }, []);

  const demoRes = calcUkd({ ...DEFAULT_PARAMS, brent: demoBrent });
  const b50OnlyNet = DEFAULT_PARAMS.penerimaan - demoRes.need;
  const maxBar = Math.max(DEFAULT_PARAMS.penerimaan, demoRes.belanja, 48);
  const revPct = mounted ? Math.min(100, (DEFAULT_PARAMS.penerimaan / maxBar) * 100) : 0;
  const needPct = mounted ? Math.min(100, (demoRes.need / maxBar) * 100) : 0;
  const totalPct = mounted ? Math.min(100, (demoRes.belanja / maxBar) * 100) : 0;

  const chipSuffix =
    demoRes.verdict === 'ok'
      ? `Pasca-PSR: +${formatTriliun(demoRes.net, 2)}`
      : demoRes.verdict === 'warn'
      ? `Pasca-PSR: −${formatTriliun(demoRes.gap, 2)} · Tahan ${formatNumberId(demoRes.dayaTahan ?? 0, 1)} thn`
      : `Pasca-PSR: −${formatTriliun(demoRes.gap, 2)} · Tinjau tarif`;

  const scrollToProblem = () => {
    const el = document.getElementById('masalah-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col gap-7 pb-6">
      {/* a) Full-width --ink Hero Band with --bg serif headline & thin 3px --bad accent line */}
      <section className="w-full bg-[var(--hero-bg)] text-[var(--hero-text)] border-b border-[var(--sidebar-border)]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8 py-6 lg:py-8 grid grid-cols-1 lg:grid-cols-12 gap-7 items-center">
          <div className="lg:col-span-7 flex flex-col items-start gap-4">
            <div>
              <h1 className="font-headline text-3xl sm:text-4xl lg:text-[42px] lg:leading-[50px] text-[var(--hero-text)] font-semibold tracking-tight">
                {BERANDA_COPY.headline}
              </h1>
              <div className="mt-3 h-[3px] w-24 bg-[var(--bad)]" aria-hidden="true" />
            </div>

            <p className="text-base text-[var(--hero-muted)] leading-relaxed max-w-xl">
              <Term term="Pungutan ekspor" align="left">
                Pungutan ekspor
              </Term>{' '}
              sawit membiayai biodiesel <Term term="B50">B50</Term> dan peremajaan kebun rakyat. ABDI
              menguji apakah uangnya cukup sebelum keputusan diambil.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="button"
                onClick={scrollToProblem}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[var(--steel)] text-[var(--ink)] text-sm font-bold hover:bg-[#7DB0CF] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <span>{BERANDA_COPY.ctaPrimary}</span>
              </button>
              <Link
                to="/simulator"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-surface-card border border-border text-ink text-sm font-semibold hover:bg-surface-low transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--steel)]"
              >
                <span>{BERANDA_COPY.ctaSecondary}</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* b) Live Mini-Demo */}
          <div className="lg:col-span-5 bg-surface-card text-ink rounded-xl p-5 border border-border border-t-4 border-t-[var(--steel)] flex flex-col gap-3.5">
            <div className="flex items-center justify-between gap-2">
              <h2 className="font-headline text-lg font-semibold text-ink">
                {BERANDA_COPY.miniDemo.title}
              </h2>
              <span className="text-sm font-bold text-ink tabular-nums">
                <Term term="Brent">Brent</Term> US${formatNumberId(demoBrent, 0)}
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="beranda-demo-brent" className="sr-only">
                Geser harga minyak Brent (US$70 sampai US$120)
              </label>
              <input
                id="beranda-demo-brent"
                type="range"
                min={70}
                max={120}
                step={1}
                value={demoBrent}
                onChange={(e) => setDemoBrent(Number(e.target.value))}
                className="w-full h-1.5 bg-border rounded-lg cursor-pointer accent-[var(--btn-primary-bg)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--steel)]"
              />
              <div className="flex justify-between text-[11px] text-ink-subtle tabular-nums">
                <span>US$70</span>
                <span>US$100</span>
                <span>US$120</span>
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-ink font-medium">{BERANDA_COPY.miniDemo.revLabel}</span>
                  <span className="font-semibold text-ink tabular-nums">
                    {BERANDA_COPY.miniDemo.revValue}
                  </span>
                </div>
                <div className="h-3 w-full bg-surface-container rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[var(--chart-rev)] rounded-full transition-[width] duration-300 motion-reduce:transition-none"
                    style={{ width: `${revPct}%` }}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-ink font-medium">Kebutuhan B50 saja</span>
                  <span className="font-semibold text-ink tabular-nums">
                    {formatTriliun(demoRes.need, 2)}
                  </span>
                </div>
                <div className="h-3 w-full bg-surface-container rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[var(--chart-b50)] rounded-full transition-[width] duration-300 motion-reduce:transition-none"
                    style={{ width: `${needPct}%` }}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-ink font-medium">
                    Total (+ Peremajaan {formatTriliun(DEFAULT_PARAMS.peremajaan, 2)})
                  </span>
                  <span className="font-semibold text-ink tabular-nums">
                    {formatTriliun(demoRes.belanja, 2)}
                  </span>
                </div>
                <div className="h-3 w-full bg-surface-container rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[var(--chart-psr)] rounded-full transition-[width] duration-300 motion-reduce:transition-none"
                    style={{ width: `${totalPct}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-border flex flex-col gap-2">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-semibold tabular-nums">
                <span className="text-ink-muted">
                  B50 saja:{' '}
                  <span
                    className={
                      b50OnlyNet >= 0 ? 'text-[var(--ok-tint-fg)]' : 'text-[var(--bad-text)]'
                    }
                  >
                    {formatTriliun(b50OnlyNet, 2, true)}
                  </span>
                </span>
                <span className="text-ink-muted">
                  Setelah peremajaan:{' '}
                  <span
                    className={
                      demoRes.net >= 0 ? 'text-[var(--ok-tint-fg)]' : 'text-[var(--bad-text)]'
                    }
                  >
                    {formatTriliun(demoRes.net, 2, true)}
                  </span>
                </span>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <StatusChip level={demoRes.verdict} suffix={chipSuffix} variant="tint" />
              </div>
            </div>
            <p className="text-xs text-ink-muted">{BERANDA_COPY.miniDemo.caption}</p>
          </div>
        </div>
      </section>

      <div className="max-w-[1200px] mx-auto w-full px-4 sm:px-8 flex flex-col gap-7">
        {/* c) Alur Uang Diagram (main panel with 4px --ink top border) */}
        <section
          id="masalah-section"
          className="bg-surface-card border border-border border-t-4 border-t-[var(--panel-top-accent)] rounded-xl p-5 md:p-6 flex flex-col gap-4 scroll-mt-28"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="font-headline text-xl font-semibold text-ink">
              {BERANDA_COPY.moneyFlow.title}
            </h2>
            <span className="text-xs font-medium text-ink-muted">
              {BERANDA_COPY.moneyFlow.caption}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-7 items-center gap-3">
            {/* Node 1 */}
            <div className="md:col-span-1 bg-surface-low border border-border rounded-lg p-3.5 flex flex-col items-center text-center gap-2">
              <div className="w-9 h-9 rounded-full bg-surface-container text-ink flex items-center justify-center">
                <Ship className="w-4 h-4" aria-hidden="true" />
              </div>
              <span className="text-xs font-semibold text-ink">Ekspor sawit</span>
            </div>

            <div className="hidden md:flex justify-center text-ink-subtle" aria-hidden="true">
              <ArrowRight className="w-5 h-5" />
            </div>

            {/* Node 2 */}
            <div className="md:col-span-1 bg-surface-low border border-border rounded-lg p-3.5 flex flex-col items-center text-center gap-2">
              <div className="w-9 h-9 rounded-full bg-surface-container text-ink flex items-center justify-center">
                <Building2 className="w-4 h-4" aria-hidden="true" />
              </div>
              <span className="text-xs font-semibold text-ink">
                Pungutan dikumpulkan <Term term="BPDP">BPDP</Term>
              </span>
            </div>

            <div className="hidden md:flex justify-center text-ink-subtle" aria-hidden="true">
              <ArrowRight className="w-5 h-5" />
            </div>

            {/* Node 3 */}
            <div className="md:col-span-1 bg-surface-low border border-[var(--panel-top-accent)] rounded-lg p-3.5 flex flex-col items-center text-center gap-2">
              <div className="w-9 h-9 rounded-full bg-[var(--steel)] text-[var(--ink)] flex items-center justify-center">
                <Coins className="w-4 h-4" aria-hidden="true" />
              </div>
              <span className="text-xs font-semibold text-ink">
                <Term term="Dana Perkebunan">Dana Perkebunan</Term>
              </span>
            </div>

            <div className="hidden md:flex justify-center text-ink-subtle" aria-hidden="true">
              <ArrowRight className="w-5 h-5" />
            </div>

            {/* Node 4 */}
            <div className="md:col-span-1 bg-surface-low border border-border rounded-lg p-3.5 flex flex-col items-center text-center gap-2">
              <div className="w-9 h-9 rounded-full bg-surface-container text-ink flex items-center justify-center">
                <Fuel className="w-4 h-4" aria-hidden="true" />
              </div>
              <span className="text-xs font-semibold text-ink">
                Biodiesel B50 dan peremajaan kebun
              </span>
            </div>
          </div>
        </section>

        {/* d) Ringkasan 30 detik */}
        <section className="flex flex-col gap-3">
          <h2 className="font-headline text-xl font-semibold text-ink">
            {BERANDA_COPY.summary30s.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {BERANDA_COPY.summary30s.cards.map((card, i) => (
              <div
                key={card.label}
                className="bg-surface-card border border-border rounded-xl p-5 flex flex-col gap-2"
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
        </section>

        {/* e) Three Big-Number Tiles */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {BERANDA_COPY.tiles.map((tile) => {
            const valColor =
              tile.tone === 'primary'
                ? 'text-ink'
                : tile.tone === 'tertiary'
                ? 'text-[var(--warn-tint-fg)]'
                : 'text-ink';
            return (
              <div
                key={tile.value}
                className="bg-surface-card border border-border rounded-[10px] p-5 flex flex-col justify-between"
              >
                <div className="flex items-start justify-between gap-2">
                  <div
                    className={`font-headline text-3xl lg:text-4xl leading-tight tracking-tight font-semibold tabular-nums ${valColor}`}
                  >
                    {tile.value}
                  </div>
                  <Info text={tile.info} label={`Info ${tile.label}`} />
                </div>
                <div className="text-sm text-ink-muted font-medium pt-2">{tile.label}</div>
              </div>
            );
          })}
        </section>

        {/* f) Peta Perjalanan: 4 ABDI cards */}
        <section className="bg-surface-card border border-border border-t-4 border-t-[var(--panel-top-accent)] rounded-xl p-5 md:p-6 flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="font-headline text-xl font-semibold text-ink">
              {BERANDA_COPY.journeyTitle}
            </h2>
            <span className="inline-flex items-center gap-1.5 text-xs text-ink-muted">
              <RotateCcw className="w-3.5 h-3.5 text-ink" aria-hidden="true" />
              <span>Siklus A → B → D → I kembali ke A</span>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {BERANDA_COPY.pillars.map((pillar, idx) => {
              const isCore = pillar.badge === 'Inti';
              const roleChipCls =
                pillar.badge === 'Inti'
                  ? 'bg-[var(--steel)] text-[var(--ink)]'
                  : pillar.badge === 'Fondasi'
                  ? 'bg-[var(--warn-tint)] text-[var(--warn-tint-fg)]'
                  : 'bg-[var(--ok-tint)] text-[var(--ok-tint-fg)]';
              return (
                <div key={pillar.letter} className="flex items-stretch gap-2">
                  <Link
                    to={pillar.path}
                    className="flex-1 bg-surface-low border border-border hover:border-[var(--panel-top-accent)] rounded-xl p-4 flex flex-col justify-between gap-3 transition-colors group focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--steel)]"
                  >
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`w-8 h-8 rounded-lg border flex items-center justify-center font-headline text-base font-bold shrink-0 ${
                            isCore
                              ? 'border-[var(--ink)] bg-[var(--steel)] text-[var(--ink)]'
                              : 'border-border-strong bg-surface-card text-ink'
                          }`}
                        >
                          {pillar.letter}
                        </span>
                        <span
                          className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${roleChipCls}`}
                        >
                          {pillar.badge}
                        </span>
                      </div>
                      <div>
                        <div className="font-headline text-base font-semibold text-ink group-hover:underline leading-snug">
                          {pillar.title}
                        </div>
                        <div className="text-[11px] text-ink-subtle mt-0.5">{pillar.english}</div>
                      </div>
                    </div>
                    <p className="text-xs text-ink-muted leading-relaxed">{pillar.sentence}</p>
                  </Link>

                  {idx < BERANDA_COPY.pillars.length - 1 && (
                    <div
                      aria-hidden="true"
                      className="hidden lg:flex items-center text-ink-subtle shrink-0"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div aria-hidden="true" className="hidden lg:flex items-center px-12 pt-1 text-ink-subtle">
            <svg className="w-full h-6" viewBox="0 0 800 24" fill="none" preserveAspectRatio="none">
              <path
                d="M 760 2 V 14 H 40 V 4"
                stroke="var(--border-strong-col)"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />
              <polygon fill="var(--panel-top-accent)" points="40,0 35,8 45,8" />
            </svg>
          </div>
        </section>

        {/* g) Bridge */}
        <Bridge
          sentence={BRIDGES.beranda.sentence}
          nextLabel={BRIDGES.beranda.nextLabel}
          nextPath={BRIDGES.beranda.nextPath}
        />
      </div>
    </div>
  );
}
