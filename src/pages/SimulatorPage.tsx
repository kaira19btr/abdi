import React from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  Flag,
  Landmark,
  RotateCcw,
  Shield,
  SlidersHorizontal,
  Table2,
  TrendingUp,
} from 'lucide-react';
import { BRIDGES, PAGE_INTROS, SIMULATOR_COPY } from '../content/id';
import { Detail } from '../components/ui/Detail';
import { Info } from '../components/ui/Info';
import { PageHeader } from '../components/ui/PageHeader';
import { Bridge, Conclusion, PageIntro } from '../components/ui/PagePattern';
import { StatusChip, StatusIcon, getStatusMeta } from '../components/ui/StatusBadge';
import { Term } from '../components/ui/Term';
import {
  PRESETS,
  type PresetKey,
  calcUkd,
  detectActivePreset,
  formatNumberId,
  formatTriliun,
} from '../lib/ukd';
import { useAbdi } from '../store/AbdiContext';

export function SimulatorPage() {
  const { params, ukd, setParam, applyPreset, resetParams } = useAbdi();
  const activePreset = detectActivePreset(params);
  const statusMeta = getStatusMeta(ukd.verdict);

  const bannerMeta =
    ukd.verdict === 'ok'
      ? {
          headline: `Dana cukup ${formatTriliun(ukd.net, 2, true)}`,
          chip: `Sisihkan ${formatTriliun(ukd.R, 2)}`,
          info: 'Penerimaan menutup kebutuhan B50, peremajaan, dan belanja lainnya.',
        }
      : ukd.verdict === 'warn'
      ? {
          headline: `Kesenjangan ${formatTriliun(ukd.gap, 2)}`,
          chip: `Daya tahan ${formatNumberId(ukd.dayaTahan ?? 0, 1)} tahun`,
          info: 'Defisit masih tertutup penyangga minimal 2 tahun, perlu langkah mitigasi.',
        }
      : {
          headline: `Kesenjangan ${formatTriliun(ukd.gap, 2)}`,
          chip: 'Tinjauan tarif wajib',
          info: 'Daya tahan di bawah 2 tahun memicu aturan comply-or-explain dan tinjauan tarif.',
        };

  const chartData = [
    {
      name: SIMULATOR_COPY.chart.revLabel,
      penerimaan: Number(params.penerimaan.toFixed(2)),
      b50: 0,
      psr: 0,
      lainnya: 0,
      revLabel: `Rp${formatNumberId(params.penerimaan, 1)}T`,
      b50Label: '',
      totalSpendLabel: '',
    },
    {
      name: SIMULATOR_COPY.chart.spendLabel,
      penerimaan: 0,
      b50: Number(ukd.need.toFixed(2)),
      psr: Number(params.peremajaan.toFixed(2)),
      lainnya: Number(params.lainnya.toFixed(2)),
      revLabel: '',
      b50Label: `B50 Rp${formatNumberId(ukd.need, 1)}T`,
      totalSpendLabel: `Total Rp${formatNumberId(ukd.belanja, 1)}T`,
    },
  ];

  const maxY = Math.ceil(Math.max(params.penerimaan, ukd.belanja, 50) / 10) * 10 + 5;

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-8 py-5 flex flex-col gap-5">
      {/* a) PageIntro */}
      <PageIntro
        question={
          <>
            Apakah dana cukup untuk membayar <Term term="B50">B50</Term> dan{' '}
            <Term term="Peremajaan (PSR)">peremajaan</Term>?
          </>
        }
        howToRead={PAGE_INTROS.simulator.howToRead}
      />

      {/* Page Header */}
      <PageHeader
        componentKey="A"
        titleSuffix={
          <span className="text-xs px-2 py-0.5 rounded bg-[var(--steel)] text-[var(--ink)] font-semibold">
            {SIMULATOR_COPY.badge}
          </span>
        }
        rightSlot={
          <div className="inline-flex rounded-lg p-0.5 bg-surface-container border border-border">
            {(['K1', 'K2', 'K3', 'K4'] as PresetKey[]).map((k) => {
              const active = activePreset === k;
              return (
                <button
                  key={k}
                  type="button"
                  onClick={() => applyPreset(k)}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--steel)] ${
                    active
                      ? 'bg-[var(--btn-primary-bg)] text-[var(--btn-primary-fg)]'
                      : 'text-ink-muted hover:text-ink'
                  }`}
                >
                  {PRESETS[k].shortLabel}
                </button>
              );
            })}
          </div>
        }
      />

      {/* b) Main Two-Column Analytical Workspace */}
      <div className="flex flex-col xl:flex-row gap-5 items-start">
        {/* LEFT PANEL (main panel 4px --ink top border) */}
        <section
          aria-label={SIMULATOR_COPY.assumptionsTitle}
          className="w-full xl:w-[300px] shrink-0 bg-surface-card border border-border border-t-4 border-t-[var(--panel-top-accent)] rounded-[10px] p-4 flex flex-col gap-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <SlidersHorizontal className="w-4 h-4 text-ink" aria-hidden="true" />
              <span className="text-xs font-semibold uppercase tracking-wider text-ink">
                {SIMULATOR_COPY.assumptionsTitle}
              </span>
            </div>
            <button
              type="button"
              onClick={resetParams}
              className="text-xs font-semibold text-ink hover:underline flex items-center gap-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--steel)] rounded"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Atur ulang</span>
            </button>
          </div>

          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-ink-muted">
              {SIMULATOR_COPY.scenarioTitle}
            </span>
            <div className="grid grid-cols-4 gap-1 p-1 bg-surface-low rounded-lg border border-border">
              {(['K1', 'K2', 'K3', 'K4'] as PresetKey[]).map((k) => {
                const active = activePreset === k;
                return (
                  <button
                    key={k}
                    type="button"
                    onClick={() => applyPreset(k)}
                    className={`py-1 text-center text-xs rounded font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--steel)] ${
                      active
                        ? 'bg-[var(--btn-primary-bg)] text-[var(--btn-primary-fg)]'
                        : 'text-ink-muted hover:text-ink'
                    }`}
                  >
                    {k}
                  </button>
                );
              })}
            </div>
            <div className="text-xs text-ink-muted italic truncate">
              {activePreset ? PRESETS[activePreset].label : 'Kustom (manual)'}
            </div>
          </div>

          <div className="w-full h-px bg-border" />

          <div className="flex flex-col gap-4">
            {/* Brent */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="slider-brent"
                  className="text-xs font-medium text-ink flex items-center gap-1"
                >
                  <span>
                    Minyak <Term term="Brent" align="left">Brent</Term>
                  </span>
                  <Info text={SIMULATOR_COPY.sliders.brent.info} align="left" />
                </label>
                <span className="font-headline text-lg font-semibold text-ink tabular-nums">
                  US${formatNumberId(params.brent, 0)}
                </span>
              </div>
              <input
                id="slider-brent"
                type="range"
                min={70}
                max={120}
                step={1}
                value={params.brent}
                onChange={(e) => setParam('brent', Number(e.target.value))}
                className="w-full h-1.5 bg-border rounded-lg cursor-pointer accent-[var(--btn-primary-bg)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--steel)]"
              />
              <div className="flex justify-between text-[10px] text-ink-subtle tabular-nums">
                <span>US$70</span>
                <span>US$120</span>
              </div>
            </div>

            {/* Penerimaan */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="slider-penerimaan"
                  className="text-xs font-medium text-ink flex items-center gap-1"
                >
                  {SIMULATOR_COPY.sliders.penerimaan.label}
                  <Info text={SIMULATOR_COPY.sliders.penerimaan.info} align="left" />
                </label>
                <span className="font-headline text-lg font-semibold text-ink tabular-nums">
                  {formatTriliun(params.penerimaan, 2)}
                </span>
              </div>
              <input
                id="slider-penerimaan"
                type="range"
                min={25}
                max={55}
                step={0.01}
                value={params.penerimaan}
                onChange={(e) => setParam('penerimaan', Number(e.target.value))}
                className="w-full h-1.5 bg-border rounded-lg cursor-pointer accent-[var(--btn-primary-bg)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--steel)]"
              />
              <div className="flex justify-between text-[10px] text-ink-subtle tabular-nums">
                <span>Rp25 T</span>
                <span>Rp55 T</span>
              </div>
            </div>

            {/* Peremajaan */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="slider-peremajaan"
                  className="text-xs font-medium text-ink flex items-center gap-1"
                >
                  {SIMULATOR_COPY.sliders.peremajaan.label}
                  <Info text={SIMULATOR_COPY.sliders.peremajaan.info} align="left" />
                </label>
                <span className="font-headline text-lg font-semibold text-ink tabular-nums">
                  {formatTriliun(params.peremajaan, 2)}
                </span>
              </div>
              <input
                id="slider-peremajaan"
                type="range"
                min={0}
                max={10}
                step={0.01}
                value={params.peremajaan}
                onChange={(e) => setParam('peremajaan', Number(e.target.value))}
                className="w-full h-1.5 bg-border rounded-lg cursor-pointer accent-[var(--btn-primary-bg)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--steel)]"
              />
              <div className="flex justify-between text-[10px] text-ink-subtle tabular-nums">
                <span>Rp0 T</span>
                <span>Rp10 T</span>
              </div>
            </div>

            {/* Saldo Awal */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="slider-saldo"
                  className="text-xs font-medium text-ink flex items-center gap-1"
                >
                  <span>
                    Saldo <Term term="Penyangga" align="left">penyangga</Term>
                  </span>
                  <Info text={SIMULATOR_COPY.sliders.saldo.info} align="left" />
                </label>
                <span className="font-headline text-lg font-semibold text-ink tabular-nums">
                  {formatTriliun(params.saldoAwal, 2)}
                </span>
              </div>
              <input
                id="slider-saldo"
                type="range"
                min={0}
                max={18.45}
                step={0.05}
                value={params.saldoAwal}
                onChange={(e) => setParam('saldoAwal', Number(e.target.value))}
                className="w-full h-1.5 bg-border rounded-lg cursor-pointer accent-[var(--btn-primary-bg)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--steel)]"
              />
              <div className="flex justify-between text-[10px] text-ink-subtle tabular-nums">
                <span>Rp0 T</span>
                <span>Rp18,45 T</span>
              </div>
            </div>
          </div>

          <Detail title={SIMULATOR_COPY.advancedTitle} defaultOpen={false} className="rounded-lg">
            <div className="flex flex-col gap-3.5">
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <label htmlFor="slider-lainnya" className="text-[11px] font-medium text-ink flex items-center gap-1">
                    {SIMULATOR_COPY.sliders.lainnya.label}
                    <Info text={SIMULATOR_COPY.sliders.lainnya.info} align="left" />
                  </label>
                  <span className="text-[11px] font-semibold text-ink tabular-nums">
                    {formatTriliun(params.lainnya, 2)}
                  </span>
                </div>
                <input
                  id="slider-lainnya"
                  type="range"
                  min={0}
                  max={3}
                  step={0.1}
                  value={params.lainnya}
                  onChange={(e) => setParam('lainnya', Number(e.target.value))}
                  className="w-full h-1 bg-border rounded cursor-pointer accent-[var(--btn-primary-bg)]"
                />
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <label htmlFor="slider-beta" className="text-[11px] font-medium text-ink flex items-center gap-1">
                    {SIMULATOR_COPY.sliders.beta.label}
                    <Info text={SIMULATOR_COPY.sliders.beta.info} align="left" />
                  </label>
                  <span className="text-[11px] font-semibold text-ink tabular-nums">
                    {formatNumberId(params.beta, 0)}%
                  </span>
                </div>
                <input
                  id="slider-beta"
                  type="range"
                  min={25}
                  max={75}
                  step={5}
                  value={params.beta}
                  onChange={(e) => setParam('beta', Number(e.target.value))}
                  className="w-full h-1 bg-border rounded cursor-pointer accent-[var(--btn-primary-bg)]"
                />
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <label htmlFor="slider-ratarata" className="text-[11px] font-medium text-ink flex items-center gap-1">
                    {SIMULATOR_COPY.sliders.rataRata.label}
                    <Info text={SIMULATOR_COPY.sliders.rataRata.info} align="left" />
                  </label>
                  <span className="text-[11px] font-semibold text-ink tabular-nums">
                    {formatTriliun(params.rataRata, 2)}
                  </span>
                </div>
                <input
                  id="slider-ratarata"
                  type="range"
                  min={20}
                  max={40}
                  step={0.05}
                  value={params.rataRata}
                  onChange={(e) => setParam('rataRata', Number(e.target.value))}
                  className="w-full h-1 bg-border rounded cursor-pointer accent-[var(--btn-primary-bg)]"
                />
              </div>

              <button
                type="button"
                onClick={resetParams}
                className="mt-1 w-full py-1.5 rounded-lg border border-border bg-surface-low text-xs font-semibold text-ink hover:bg-surface-container transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--steel)]"
              >
                {SIMULATOR_COPY.resetLabel}
              </button>
            </div>
          </Detail>
        </section>

        {/* RIGHT WORKSPACE */}
        <section className="flex-1 w-full flex flex-col gap-4">
          {/* Status Banner: icon + word ("✓ Cukup", "! Waspada", "✕ Bahaya") + solid/dashed/double left border */}
          <div
            role="status"
            className={`w-full rounded-[10px] p-4 ${statusMeta.tintBannerCls} ${statusMeta.leftBorderCls} flex flex-col sm:flex-row sm:items-center justify-between gap-3`}
          >
            <div className="flex items-center gap-3 min-w-0">
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-bold shrink-0 ${statusMeta.solidChipCls}`}
              >
                <StatusIcon level={ukd.verdict} className="w-3.5 h-3.5" />
                <span>{statusMeta.label}</span>
              </span>
              <div className="font-headline text-2xl sm:text-3xl font-semibold tracking-tight tabular-nums">
                {bannerMeta.headline}
              </div>
            </div>
            <div className="flex items-center gap-1.5 self-start sm:self-center shrink-0">
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold bg-surface-card border border-border text-ink tabular-nums`}
              >
                {bannerMeta.chip}
              </span>
              <Info text={bannerMeta.info} label="Detail status kecukupan" />
            </div>
          </div>

          {/* Three KPI Tiles */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-surface-card border border-border rounded-[10px] p-4 flex flex-col justify-between">
              <div className="flex items-center justify-between text-ink-muted">
                <span className="text-xs font-medium">{SIMULATOR_COPY.kpis.need.label}</span>
                <Info text={SIMULATOR_COPY.kpis.need.info} />
              </div>
              <div className="mt-2 font-headline text-3xl font-semibold text-ink tracking-tight tabular-nums">
                {formatTriliun(ukd.need, 2)}
              </div>
              <div className="mt-2 text-[11px] text-ink-muted">{SIMULATOR_COPY.kpis.need.sub}</div>
            </div>

            <div className="bg-surface-card border border-border rounded-[10px] p-4 flex flex-col justify-between">
              <div className="flex items-center justify-between text-ink-muted">
                <span className="text-xs font-medium">{SIMULATOR_COPY.kpis.belanja.label}</span>
                <Info text={SIMULATOR_COPY.kpis.belanja.info} />
              </div>
              <div className="mt-2 font-headline text-3xl font-semibold text-ink tracking-tight tabular-nums">
                {formatTriliun(ukd.belanja, 2)}
              </div>
              <div className="mt-2 text-[11px] text-ink-muted">
                {SIMULATOR_COPY.kpis.belanja.sub}
              </div>
            </div>

            <div className="bg-surface-card border border-border rounded-[10px] p-4 flex flex-col justify-between">
              <div className="flex items-center justify-between text-ink-muted">
                <span className="text-xs font-medium">{SIMULATOR_COPY.kpis.net.label}</span>
                <Info text={SIMULATOR_COPY.kpis.net.info} />
              </div>
              <div
                className={`mt-2 font-headline text-3xl font-semibold tracking-tight tabular-nums ${
                  ukd.net >= 0 ? 'text-[var(--ok-tint-fg)]' : 'text-[var(--bad-text)]'
                }`}
              >
                {formatTriliun(ukd.net, 2, true)}
              </div>
              <div className="mt-2 text-[11px] text-ink-muted">
                {ukd.net >= 0 ? 'Surplus tahunan' : 'Defisit tahunan'}
              </div>
            </div>
          </div>

          {/* Chart (main visual panel with 4px --ink top border, direct labels, and distinct bar patterns) */}
          <div className="bg-surface-card border border-border border-t-4 border-t-[var(--panel-top-accent)] rounded-[10px] p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h2 className="font-headline text-lg font-semibold text-ink">
                {SIMULATOR_COPY.chart.title}
              </h2>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-surface-container text-ink text-xs font-medium border border-border">
                <Flag className="w-3.5 h-3.5 text-ink" aria-hidden="true" />
                <span className="tabular-nums">
                  Titik impas Brent ≈ US${formatNumberId(ukd.breakEvenBrent, 1)}
                </span>
                <Info text={SIMULATOR_COPY.chart.breakEvenInfo} />
              </div>
            </div>

            <div className="w-full h-60">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 24, right: 28, left: 0, bottom: 4 }}>
                  <defs>
                    <pattern
                      id="pattern-b50"
                      width="8"
                      height="8"
                      patternUnits="userSpaceOnUse"
                      patternTransform="rotate(45)"
                    >
                      <rect width="8" height="8" fill="var(--chart-b50)" />
                      <line x1="0" y1="0" x2="0" y2="8" stroke="#003049" strokeOpacity="0.28" strokeWidth="2.5" />
                    </pattern>
                    <pattern
                      id="pattern-psr"
                      width="6"
                      height="6"
                      patternUnits="userSpaceOnUse"
                    >
                      <rect width="6" height="6" fill="var(--chart-psr)" />
                      <circle cx="3" cy="3" r="1" fill="#003049" fillOpacity="0.32" />
                    </pattern>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-col)" opacity={0.65} />
                  <XAxis dataKey="name" tick={{ fill: 'var(--text-main)', fontSize: 12, fontWeight: 600 }} />
                  <YAxis
                    domain={[0, maxY]}
                    tick={{ fill: 'var(--text-subtle)', fontSize: 11 }}
                    tickFormatter={(v) => `Rp${v}T`}
                  />
                  <Tooltip
                    formatter={(value, name) => [
                      formatTriliun(Number(value ?? 0), 2),
                      name === 'penerimaan'
                        ? 'Penerimaan'
                        : name === 'b50'
                        ? 'Insentif B50'
                        : name === 'psr'
                        ? 'Peremajaan (PSR)'
                        : 'Lainnya (X)',
                    ]}
                    contentStyle={{
                      backgroundColor: 'var(--surface)',
                      borderColor: 'var(--border-col)',
                      color: 'var(--text-main)',
                      borderRadius: '8px',
                      fontSize: '12px',
                    }}
                  />
                  <ReferenceLine
                    y={params.penerimaan}
                    stroke={ukd.gap > 0 ? 'var(--chart-gap)' : 'var(--chart-rev)'}
                    strokeWidth={2}
                    strokeDasharray="5 4"
                    label={{
                      value:
                        ukd.gap > 0
                          ? `Batas dana · Gap ${formatTriliun(ukd.gap, 1)}`
                          : `Batas ${formatTriliun(params.penerimaan, 1)}`,
                      position: 'insideTopRight',
                      fill: ukd.gap > 0 ? 'var(--bad-text)' : 'var(--text-main)',
                      fontSize: 11,
                      fontWeight: 600,
                    }}
                  />
                  <Bar dataKey="penerimaan" stackId="a" radius={[4, 4, 0, 0]} maxBarSize={100}>
                    {chartData.map((_, idx) => (
                      <Cell key={idx} fill="var(--chart-rev)" />
                    ))}
                    <LabelList
                      dataKey="revLabel"
                      position="top"
                      fill="var(--text-main)"
                      fontSize={12}
                      fontWeight={700}
                    />
                  </Bar>
                  <Bar dataKey="b50" stackId="a" maxBarSize={100} fill="url(#pattern-b50)">
                    <LabelList
                      dataKey="b50Label"
                      position="center"
                      fill="#003049"
                      fontSize={11}
                      fontWeight={700}
                    />
                  </Bar>
                  <Bar dataKey="psr" stackId="a" maxBarSize={100} fill="url(#pattern-psr)">
                    {params.lainnya === 0 && (
                      <LabelList
                        dataKey="totalSpendLabel"
                        position="top"
                        fill={ukd.gap > 0 ? 'var(--bad-text)' : 'var(--text-main)'}
                        fontSize={12}
                        fontWeight={700}
                      />
                    )}
                  </Bar>
                  <Bar
                    dataKey="lainnya"
                    stackId="a"
                    radius={[4, 4, 0, 0]}
                    maxBarSize={100}
                    fill="var(--chart-other)"
                  >
                    {params.lainnya > 0 && (
                      <LabelList
                        dataKey="totalSpendLabel"
                        position="top"
                        fill={ukd.gap > 0 ? 'var(--bad-text)' : 'var(--text-main)'}
                        fontSize={12}
                        fontWeight={700}
                      />
                    )}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-ink-muted pt-1 border-t border-border">
              <div className="flex items-center gap-4 flex-wrap">
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-3 h-2.5 rounded-xs bg-[var(--chart-rev)]" />
                  Penerimaan
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-3 h-2.5 rounded-xs bg-[var(--chart-b50)] border border-[#003049]/40" />
                  Insentif B50
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-3 h-2.5 rounded-xs bg-[var(--chart-psr)]" />
                  Peremajaan
                </span>
                {params.lainnya > 0 && (
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-3 h-2.5 rounded-xs bg-[var(--chart-other)]" />
                    Lainnya
                  </span>
                )}
              </div>
              <span className="tabular-nums font-medium text-ink">
                Belanja {formatTriliun(ukd.belanja, 2)} vs Penerimaan{' '}
                {formatTriliun(params.penerimaan, 2)}
              </span>
            </div>
          </div>

          {/* Tiga cara menutup kesenjangan */}
          <div className="bg-surface-card border border-border rounded-[10px] p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h2 className="font-headline text-base font-semibold text-ink">
                Tiga cara menutup <Term term="Kesenjangan">kesenjangan</Term>
              </h2>
              <span className="text-xs text-ink-subtle">{SIMULATOR_COPY.levers.subtitle}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-surface-low border border-border">
                <div className="flex items-center gap-2.5 min-w-0">
                  <TrendingUp className="w-4 h-4 text-ink shrink-0" aria-hidden="true" />
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-ink tabular-nums">
                      {ukd.gap > 0
                        ? `Naikkan tarif sekitar ${formatNumberId(ukd.setaraTarifPoin, 1)} poin`
                        : 'Tarif tidak perlu naik'}
                    </div>
                    <div className="text-[11px] text-ink-muted truncate">
                      {SIMULATOR_COPY.levers.tarifSub}
                    </div>
                  </div>
                </div>
                <Info text={SIMULATOR_COPY.levers.tarifInfo} />
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-surface-low border border-border">
                <div className="flex items-center gap-2.5 min-w-0">
                  <Landmark className="w-4 h-4 text-ink shrink-0" aria-hidden="true" />
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-ink tabular-nums">
                      {ukd.gap > 0
                        ? `Usulkan dana APBN ${formatTriliun(ukd.gap, 2)}`
                        : 'Tidak perlu dana APBN'}
                    </div>
                    <div className="text-[11px] text-ink-muted truncate">
                      {SIMULATOR_COPY.levers.apbnSub}
                    </div>
                  </div>
                </div>
                <Info text={SIMULATOR_COPY.levers.apbnInfo} />
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-surface-low border border-border">
                <div className="flex items-center gap-2.5 min-w-0">
                  <Shield className="w-4 h-4 text-ink shrink-0" aria-hidden="true" />
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-ink tabular-nums">
                      {ukd.dayaTahan !== null
                        ? `Tarik penyangga, cukup ${formatNumberId(ukd.dayaTahan, 1)} tahun`
                        : 'Penyangga tidak ditarik'}
                    </div>
                    <div className="text-[11px] text-ink-muted truncate">
                      {SIMULATOR_COPY.levers.bufferSub}
                    </div>
                  </div>
                </div>
                <Info text={SIMULATOR_COPY.levers.bufferInfo} />
              </div>
            </div>
          </div>

          {/* Collapsed K1-K4 Table */}
          <Detail
            title={SIMULATOR_COPY.matrixTitle}
            icon={<Table2 className="w-4 h-4" aria-hidden="true" />}
            defaultOpen={false}
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-surface-container text-ink font-semibold border-b border-border">
                    <th className="py-2.5 px-3">Skenario</th>
                    <th className="py-2.5 px-3">Brent</th>
                    <th className="py-2.5 px-3">Penerimaan</th>
                    <th className="py-2.5 px-3">B50</th>
                    <th className="py-2.5 px-3">Saldo</th>
                    <th className="py-2.5 px-3 text-right">Status & Daya tahan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {(['K1', 'K2', 'K3', 'K4'] as PresetKey[]).map((key) => {
                    const p = PRESETS[key];
                    const rowRes = calcUkd({
                      ...params,
                      brent: p.brent,
                      penerimaan: p.penerimaan,
                    });
                    const isActive = activePreset === key;
                    return (
                      <tr
                        key={key}
                        className={`transition-colors ${
                          isActive ? 'bg-surface-low font-semibold' : 'hover:bg-surface-low/60'
                        }`}
                      >
                        <td className="py-2.5 px-3">
                          <button
                            type="button"
                            onClick={() => applyPreset(key)}
                            className="text-left text-ink hover:underline font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--steel)] rounded"
                          >
                            {p.label}
                          </button>
                        </td>
                        <td className="py-2.5 px-3 tabular-nums">US${p.brent}</td>
                        <td className="py-2.5 px-3 tabular-nums">{formatTriliun(p.penerimaan, 2)}</td>
                        <td className="py-2.5 px-3 tabular-nums">{formatTriliun(rowRes.need, 2)}</td>
                        <td
                          className={`py-2.5 px-3 font-semibold tabular-nums ${
                            rowRes.net >= 0 ? 'text-[var(--ok-tint-fg)]' : 'text-[var(--bad-text)]'
                          }`}
                        >
                          {formatTriliun(rowRes.net, 2, true)}
                        </td>
                        <td className="py-2.5 px-3 text-right tabular-nums">
                          <StatusChip
                            level={rowRes.verdict}
                            suffix={
                              rowRes.dayaTahan !== null
                                ? `${formatNumberId(rowRes.dayaTahan, 2)} thn`
                                : 'Surplus'
                            }
                            variant="tint"
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Detail>
        </section>
      </div>

      {/* c) Dynamic Conclusion */}
      <Conclusion>
        {ukd.net >= 0 ? (
          <>
            Pada Brent US${formatNumberId(params.brent, 0)}, dana cukup dan masih ada ruang Rp{' '}
            {formatNumberId(ukd.net, 2)} T.
          </>
        ) : (
          <>
            Pada Brent US${formatNumberId(params.brent, 0)}, ada{' '}
            <Term term="Kesenjangan">kesenjangan</Term> Rp {formatNumberId(ukd.gap, 2)} T.{' '}
            <Term term="Penyangga">Penyangga</Term> bertahan{' '}
            <Term term="Daya tahan">
              {formatNumberId(ukd.dayaTahan ?? 0, 1)} tahun
            </Term>
            , jadi sumber penutup harus diputuskan terbuka.
            {ukd.dayaTahan !== null && ukd.dayaTahan < 2 && (
              <>
                {' '}
                Karena kurang dari dua tahun, tinjauan tarif wajib diputuskan atau dijelaskan (
                <Term term="Comply-or-explain">comply-or-explain</Term>).
              </>
            )}
          </>
        )}
      </Conclusion>

      {/* d) Bridge */}
      <Bridge
        sentence={BRIDGES.simulator.sentence}
        prevPath={BRIDGES.simulator.prevPath}
        prevLabel={BRIDGES.simulator.prevLabel}
        nextPath={BRIDGES.simulator.nextPath}
        nextLabel={BRIDGES.simulator.nextLabel}
      />
    </div>
  );
}
