import React, { useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  FileText,
  FlaskConical,
  History,
  MapPin,
  RotateCcw,
  ShieldCheck,
  Sprout,
  Timer,
  Trees,
  Wallet,
} from 'lucide-react';
import { BRIDGES, PAGE_INTROS, PEREMAJAAN_COPY } from '../content/id';
import { Detail } from '../components/ui/Detail';
import { Info } from '../components/ui/Info';
import { PageHeader } from '../components/ui/PageHeader';
import { Bridge, Conclusion, PageIntro } from '../components/ui/PagePattern';
import { Term } from '../components/ui/Term';
import { formatNumberId } from '../lib/ukd';
import { type PeremajaanStageCounts, useAbdi } from '../store/AbdiContext';

type CommodityKey = 'sawit' | 'kakao' | 'kelapa';

interface StageMeta {
  key: keyof PeremajaanStageCounts;
  title: string;
  medianChip: string;
  highlighted?: boolean;
}

const STAGES: StageMeta[] = [
  { key: 'usulan', title: '1. Usulan', medianChip: 'median 4 bln' },
  { key: 'cekLahan', title: '2. Cek lahan', medianChip: 'median 5 bln' },
  { key: 'siapTanam', title: '3. Siap tanam', medianChip: 'median 3 bln', highlighted: true },
  { key: 'danaTermin', title: '4. Dana termin', medianChip: 'median 2 bln' },
  { key: 'tanamanHidup', title: '5. Tanaman hidup', medianChip: 'median 14 bln' },
];

export function PeremajaanPage() {
  const { peremajaanCounts, setPeremajaanCount, resetPeremajaanCounts } = useAbdi();
  const [commodity, setCommodity] = useState<CommodityKey>('sawit');

  const activeCom = PEREMAJAAN_COPY.commodities[commodity];

  const barsData =
    commodity === 'sawit'
      ? [
          {
            name: 'Realisasi saat ini',
            value: 47,
            pct: Math.round((47 / 180) * 100),
            barLabel: '47 rb ha (26%)',
          },
          {
            name: 'Target ABDI',
            value: Number(peremajaanCounts.siapTanam.toFixed(1)),
            pct: Math.round((peremajaanCounts.siapTanam / 180) * 100),
            barLabel: `${formatNumberId(peremajaanCounts.siapTanam, 1)} rb ha (${Math.round(
              (peremajaanCounts.siapTanam / 180) * 100
            )}%)`,
          },
        ]
      : activeCom.bars.map((b) => {
          const pct = Math.round((b.value / b.max) * 100);
          return {
            name: b.name,
            value: b.value,
            pct,
            barLabel: `${formatNumberId(b.value, 1)} ${b.unit} (${pct}%)`,
          };
        });

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-8 py-6 flex flex-col gap-6">
      {/* a) PageIntro */}
      <PageIntro
        question={PAGE_INTROS.peremajaan.question}
        howToRead={PAGE_INTROS.peremajaan.howToRead}
      />

      {/* Page Header */}
      <PageHeader
        componentKey="D"
        rightSlot={
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-card border border-border text-ink-muted">
            <span className="text-xs font-medium">{PEREMAJAAN_COPY.processChip}</span>
            <Info text={PEREMAJAAN_COPY.processInfo} />
          </div>
        }
      />

      {/* b) 3 Big-Number Tiles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-surface-card border border-border rounded-[10px] p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-ink-muted">
            <span className="text-xs uppercase tracking-wider font-semibold">
              {PEREMAJAAN_COPY.heroTiles[0].label}
            </span>
            <History className="w-4 h-4" aria-hidden="true" />
          </div>
          <div className="my-3 font-headline text-4xl sm:text-5xl font-semibold text-ink tabular-nums">
            {PEREMAJAAN_COPY.heroTiles[0].value}{' '}
            <span className="text-lg font-normal text-ink-muted">
              {PEREMAJAAN_COPY.heroTiles[0].unit}
            </span>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-border text-xs text-ink-muted">
            <span>
              <Term term="Peremajaan (PSR)" align="left">
                PSR
              </Term>{' '}
              {PEREMAJAAN_COPY.heroTiles[0].sub}
            </span>
            <Info text={PEREMAJAAN_COPY.heroTiles[0].info} />
          </div>
        </div>

        <div className="bg-surface-card border border-border rounded-[10px] p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-ink">
            <span className="text-xs uppercase tracking-wider font-semibold">
              {PEREMAJAAN_COPY.heroTiles[1].label}
            </span>
            <Sprout className="w-4 h-4" aria-hidden="true" />
          </div>
          <div className="my-3 font-headline text-4xl sm:text-5xl font-semibold text-[var(--ok-tint-fg)] tabular-nums">
            {formatNumberId(peremajaanCounts.siapTanam, 1)}{' '}
            <span className="text-lg font-normal text-ink-muted">
              {PEREMAJAAN_COPY.heroTiles[1].unit}
            </span>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-border text-xs text-ink">
            <span>{PEREMAJAAN_COPY.heroTiles[1].sub}</span>
            <Info text={PEREMAJAAN_COPY.heroTiles[1].info} />
          </div>
        </div>

        <div className="bg-surface-card border border-border rounded-[10px] p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[var(--warn-tint-fg)]">
            <span className="text-xs uppercase tracking-wider font-semibold">
              {PEREMAJAAN_COPY.heroTiles[2].label}
            </span>
            <Timer className="w-4 h-4" aria-hidden="true" />
          </div>
          <div className="my-3 font-headline text-4xl sm:text-5xl font-semibold text-[var(--warn-tint-fg)] tabular-nums">
            {PEREMAJAAN_COPY.heroTiles[2].value}{' '}
            <span className="text-lg font-normal text-ink-muted">
              {PEREMAJAAN_COPY.heroTiles[2].unit}
            </span>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-border text-xs text-ink-muted">
            <span>{PEREMAJAAN_COPY.heroTiles[2].sub}</span>
            <Info text={PEREMAJAAN_COPY.heroTiles[2].info} />
          </div>
        </div>
      </div>

      {/* Pipeline 5 Stages (main panel 4px --ink top border) */}
      <div className="bg-surface-card border border-border border-t-4 border-t-[var(--panel-top-accent)] rounded-[10px] p-5 md:p-6 flex flex-col gap-5">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3">
          <div className="flex items-center gap-2">
            <h2 className="font-headline text-xl font-semibold text-ink">
              {PEREMAJAAN_COPY.pipelineTitle}
            </h2>
            <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-surface-container text-ink-muted">
              {PEREMAJAAN_COPY.pipelineBadge}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-ink-subtle">{PEREMAJAAN_COPY.pipelineHint}</span>
            <button
              type="button"
              onClick={resetPeremajaanCounts}
              className="text-xs font-semibold text-ink hover:underline inline-flex items-center gap-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--steel)] rounded"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Atur ulang</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 pt-2">
          {STAGES.map((stage, idx) => {
            const val = peremajaanCounts[stage.key];
            const StageIcon =
              idx === 0
                ? FileText
                : idx === 1
                ? MapPin
                : idx === 2
                ? Sprout
                : idx === 3
                ? Wallet
                : Trees;
            return (
              <div
                key={stage.key}
                className={`flex flex-col items-center text-center p-4 rounded-xl relative ${
                  stage.highlighted
                    ? 'bg-surface-low border-2 border-[var(--panel-top-accent)]'
                    : 'bg-surface-card border border-border'
                }`}
              >
                {stage.highlighted && (
                  <div className="absolute -top-3 px-2.5 py-0.5 rounded-full bg-[var(--btn-primary-bg)] text-[var(--btn-primary-fg)] text-[10px] font-bold tracking-wide uppercase inline-flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" aria-hidden="true" />
                    Dana dilindungi
                  </div>
                )}

                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 mt-1 ${
                    stage.highlighted
                      ? 'bg-[var(--steel)] text-[var(--ink)]'
                      : 'bg-surface-container text-ink'
                  }`}
                >
                  <StageIcon className="w-5 h-5" aria-hidden="true" />
                </div>

                <label htmlFor={`stage-${stage.key}`} className="text-sm font-semibold text-ink">
                  {stage.title}
                </label>

                <div className="mt-2 flex items-center justify-center gap-1">
                  <input
                    id={`stage-${stage.key}`}
                    type="number"
                    min={0}
                    max={500}
                    step={0.1}
                    value={val}
                    onChange={(e) => setPeremajaanCount(stage.key, parseFloat(e.target.value))}
                    className="w-20 px-2 py-1 text-center font-headline text-lg font-bold text-ink bg-surface-low border border-border rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--steel)] tabular-nums"
                  />
                  <span className="text-xs text-ink-muted">rb ha</span>
                </div>

                <div className="mt-3 flex flex-col gap-1.5 w-full items-center">
                  <span className="inline-flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-surface-container text-ink-muted">
                    {PEREMAJAAN_COPY.dataContohLabel}
                    <Info text={PEREMAJAAN_COPY.dataContohInfo} align="center" />
                  </span>
                  <span
                    className={`text-[11px] font-medium px-2 py-0.5 rounded border ${
                      stage.highlighted
                        ? 'text-ink bg-[var(--steel)]/35 border-[var(--panel-top-accent)]/40 font-semibold'
                        : 'text-ink-muted bg-surface-low border-border'
                    }`}
                  >
                    {stage.medianChip}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Commodity Tabs Card (4px --ink top border) */}
      <div className="bg-surface-card border border-border border-t-4 border-t-[var(--panel-top-accent)] rounded-[10px] p-5 flex flex-col gap-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h2 className="font-headline text-xl font-semibold text-ink">
            {PEREMAJAAN_COPY.commoditiesTitle}
          </h2>

          <div
            role="tablist"
            aria-label={PEREMAJAAN_COPY.commoditiesTitle}
            className="inline-flex p-1 bg-surface-container rounded-lg border border-border self-start sm:self-auto"
          >
            {(['sawit', 'kakao', 'kelapa'] as CommodityKey[]).map((key) => {
              const active = commodity === key;
              return (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setCommodity(key)}
                  className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--steel)] ${
                    active
                      ? 'bg-[var(--btn-primary-bg)] text-[var(--btn-primary-fg)]'
                      : 'text-ink-muted hover:text-ink'
                  }`}
                >
                  {PEREMAJAAN_COPY.commodities[key].label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-surface-low border border-border">
              <span className="text-[11px] uppercase text-ink-muted font-semibold tracking-wider">
                Total area nasional
              </span>
              <div className="font-headline text-3xl font-semibold text-ink mt-1 tabular-nums">
                {activeCom.area}{' '}
                <span className="text-sm font-normal text-ink-muted">{activeCom.areaUnit}</span>
              </div>
              <div className="mt-2 text-xs text-[var(--ok-tint-fg)] font-semibold">
                {activeCom.areaNote}
              </div>
            </div>

            <div className="p-4 rounded-lg bg-surface-low border border-border">
              <span className="text-[11px] uppercase text-ink-muted font-semibold tracking-wider">
                Target peremajaan
              </span>
              <div className="font-headline text-3xl font-semibold text-ink mt-1 tabular-nums">
                {activeCom.target}{' '}
                <span className="text-sm font-normal text-ink-muted">{activeCom.targetUnit}</span>
              </div>
              <div className="mt-2 text-xs text-ink-muted font-medium">{activeCom.targetNote}</div>
            </div>
          </div>

          <div className="lg:col-span-7 h-44">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={barsData}
                layout="vertical"
                margin={{ top: 8, right: 110, left: 16, bottom: 8 }}
              >
                <defs>
                  <pattern
                    id="pattern-psr-target"
                    width="8"
                    height="8"
                    patternUnits="userSpaceOnUse"
                    patternTransform="rotate(45)"
                  >
                    <rect width="8" height="8" fill="var(--chart-b50)" />
                    <line x1="0" y1="0" x2="0" y2="8" stroke="#003049" strokeOpacity="0.28" strokeWidth="2.5" />
                  </pattern>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-col)" opacity={0.55} />
                <XAxis
                  type="number"
                  domain={[0, 100]}
                  tickFormatter={(v) => `${v}%`}
                  tick={{ fill: 'var(--text-subtle)', fontSize: 11 }}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={120}
                  tick={{ fill: 'var(--text-main)', fontSize: 12, fontWeight: 600 }}
                />
                <Tooltip
                  formatter={(value, _n, item) => [
                    `${formatNumberId(item?.payload?.value ?? 0, 1)} rb ha (${Number(value ?? 0)}%)`,
                    'Capaian',
                  ]}
                  contentStyle={{
                    backgroundColor: 'var(--surface)',
                    borderColor: 'var(--border-col)',
                    color: 'var(--text-main)',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="pct" radius={[0, 6, 6, 0]} maxBarSize={26}>
                  {barsData.map((_, i) => (
                    <Cell
                      key={i}
                      fill={i === 0 ? 'var(--chart-rev)' : 'url(#pattern-psr-target)'}
                    />
                  ))}
                  <LabelList
                    dataKey="barLabel"
                    position="right"
                    fill="var(--text-main)"
                    fontSize={11}
                    fontWeight={600}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Collapsed Pilot Table */}
      <Detail
        title={PEREMAJAAN_COPY.pilotTitle}
        badge={PEREMAJAAN_COPY.pilotBadge}
        icon={<FlaskConical className="w-4 h-4" aria-hidden="true" />}
        defaultOpen={false}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-border text-ink-muted uppercase font-semibold">
                <th className="py-2.5 px-3">Indikator</th>
                <th className="py-2.5 px-3 text-ink">Pilot ABDI</th>
                <th className="py-2.5 px-3">Pembanding</th>
                <th className="py-2.5 px-3 text-right">Selisih</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {PEREMAJAAN_COPY.pilotRows.map((row) => (
                <tr key={row.indikator} className="hover:bg-surface-low/60">
                  <td className="py-3 px-3 font-semibold text-ink">{row.indikator}</td>
                  <td className="py-3 px-3 font-bold text-[var(--ok-tint-fg)] tabular-nums">{row.pilot}</td>
                  <td className="py-3 px-3 text-ink-muted tabular-nums">{row.pembanding}</td>
                  <td className="py-3 px-3 text-right font-semibold text-[var(--ok-tint-fg)] tabular-nums">
                    {row.selisih}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Detail>

      {/* c) Conclusion */}
      <Conclusion>
        Dana hanya efektif jika usulan lolos verifikasi siap-tanam. Karena itu dana yang dilindungi
        sebesar usulan yang siap ({formatNumberId(peremajaanCounts.siapTanam, 1)} rb ha).
      </Conclusion>

      {/* d) Bridge */}
      <Bridge
        sentence={BRIDGES.peremajaan.sentence}
        prevPath={BRIDGES.peremajaan.prevPath}
        prevLabel={BRIDGES.peremajaan.prevLabel}
        nextPath={BRIDGES.peremajaan.nextPath}
        nextLabel={BRIDGES.peremajaan.nextLabel}
      />
    </div>
  );
}
