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
import { AlertTriangle, Gavel, Landmark, ShieldCheck, Table2 } from 'lucide-react';
import { BRIDGES, PAGE_INTROS, PENYANGGA_COPY } from '../content/id';
import { Detail } from '../components/ui/Detail';
import { Info } from '../components/ui/Info';
import { PageHeader } from '../components/ui/PageHeader';
import { Bridge, Conclusion, PageIntro } from '../components/ui/PagePattern';
import { StatusChip } from '../components/ui/StatusBadge';
import { Term } from '../components/ui/Term';
import {
  PRESETS,
  REGIME_INPUTS,
  type YearRegime,
  calcUkd,
  formatNumberId,
  formatTriliun,
} from '../lib/ukd';
import { useAbdi } from '../store/AbdiContext';

const REGIME_STYLES: Record<YearRegime, string> = {
  Tinggi: 'bg-[var(--ok)] text-white',
  Dasar: 'bg-surface-highest text-ink',
  Tertekan: 'bg-[var(--warn)] text-[var(--ink)]',
};

export function PenyanggaPage() {
  const { params, setParam, bufferYears, bufferProjection, cycleBufferYear } = useAbdi();

  const chartData = bufferProjection.rows.map((r) => ({
    year: String(r.year),
    endBalance: Number(r.endBalance.toFixed(2)),
    delta: Number(r.delta.toFixed(2)),
    regime: r.regime,
    labelTop: `Rp${formatNumberId(r.endBalance, 1)}T`,
    deltaLabel: formatTriliun(r.delta, 1, true),
  }));

  const maxChartY = Math.max(25, Math.ceil(Math.max(...chartData.map((d) => d.endBalance)) / 5) * 5);

  const totalSavedGoodYears = bufferProjection.rows.reduce(
    (sum, r) => sum + (r.delta > 0 ? r.delta : 0),
    0
  );

  const sensitivityRows = [
    {
      label: 'K1 (avg Rp27,25 T)',
      brent: PRESETS.K1.brent,
      penerimaan: PRESETS.K1.penerimaan,
      avg: 27.25,
      note: 'Penyisihan penuh',
    },
    {
      label: 'K2 (avg Rp27,25 T)',
      brent: PRESETS.K2.brent,
      penerimaan: PRESETS.K2.penerimaan,
      avg: 27.25,
      note: 'Dibatasi surplus pada β 75%',
    },
    {
      label: 'K2 (avg 3 thn Rp31,91 T)',
      brent: PRESETS.K2.brent,
      penerimaan: PRESETS.K2.penerimaan,
      avg: 31.91,
      note: 'Rata-rata 3 tahun terakhir',
    },
  ];

  const enduranceLevel =
    bufferProjection.dayaTahanTahun >= 2
      ? 'ok'
      : bufferProjection.dayaTahanTahun >= 1
      ? 'warn'
      : 'bad';

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-8 py-6 flex flex-col gap-6">
      {/* a) PageIntro */}
      <PageIntro
        question={PAGE_INTROS.penyangga.question}
        howToRead={PAGE_INTROS.penyangga.howToRead}
      />

      {/* Page Header */}
      <PageHeader
        componentKey="B"
        titleSuffix={
          <Info text={PENYANGGA_COPY.formulaInfo} label="Rumus penyangga" align="center" />
        }
        rightSlot={
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[var(--warn-tint)] text-[var(--warn-tint-fg)] rounded-lg border border-[var(--warn-border)]/45 border-l-4 [border-left-style:dashed]">
            <AlertTriangle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            <span className="text-xs font-semibold">{PENYANGGA_COPY.unverifiedChip}</span>
            <Info text={PENYANGGA_COPY.unverifiedInfo} label="Status verifikasi saldo" />
          </div>
        }
      />

      {/* b) Main 12-Col Grid (main panels 4px --ink top border) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-5 flex flex-col gap-4 bg-surface-card p-5 rounded-xl border border-border border-t-4 border-t-[var(--panel-top-accent)]">
          {/* Beta Segmented Control */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-ink">
                Porsi disisihkan (<Term term="β">β</Term>)
              </span>
              <span className="text-xs font-medium text-ink-muted tabular-nums">
                β = {formatNumberId(params.beta, 0)}%
              </span>
            </div>
            <div
              role="group"
              aria-label={PENYANGGA_COPY.betaLabel}
              className="grid grid-cols-3 gap-1 bg-surface-container p-1 rounded-lg"
            >
              {[25, 50, 75].map((b) => {
                const active = Math.round(params.beta) === b;
                return (
                  <button
                    key={b}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setParam('beta', b)}
                    className={`py-1.5 rounded text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--steel)] ${
                      active
                        ? 'bg-[var(--btn-primary-bg)] text-[var(--btn-primary-fg)]'
                        : 'text-ink-muted hover:text-ink'
                    }`}
                  >
                    {b}%
                  </button>
                );
              })}
            </div>
          </div>

          {/* Average Definition Toggle */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-ink flex items-center gap-1">
                {PENYANGGA_COPY.avgDefLabel}
                <Info text={PENYANGGA_COPY.avgInfo} align="left" />
              </span>
            </div>
            <div
              role="group"
              aria-label={PENYANGGA_COPY.avgDefLabel}
              className="grid grid-cols-2 gap-1 bg-surface-container p-1 rounded-lg"
            >
              <button
                type="button"
                aria-pressed={Math.abs(params.rataRata - 27.25) < 0.1}
                onClick={() => setParam('rataRata', 27.25)}
                className={`py-1.5 px-2 rounded text-xs font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--steel)] ${
                  Math.abs(params.rataRata - 27.25) < 0.1
                    ? 'bg-[var(--btn-primary-bg)] text-[var(--btn-primary-fg)]'
                    : 'text-ink-muted hover:text-ink'
                }`}
              >
                {PENYANGGA_COPY.avgBerjeda}
              </button>
              <button
                type="button"
                aria-pressed={Math.abs(params.rataRata - 31.91) < 0.1}
                onClick={() => setParam('rataRata', 31.91)}
                className={`py-1.5 px-2 rounded text-xs font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--steel)] ${
                  Math.abs(params.rataRata - 31.91) < 0.1
                    ? 'bg-[var(--btn-primary-bg)] text-[var(--btn-primary-fg)]'
                    : 'text-ink-muted hover:text-ink'
                }`}
              >
                {PENYANGGA_COPY.avgTigaTahun}
              </button>
            </div>
          </div>

          <div className="h-px w-full bg-border" />

          {/* 5-Year Scenario Matrix */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-ink">{PENYANGGA_COPY.yearsLabel}</span>
              <span className="text-xs text-ink-subtle">{PENYANGGA_COPY.yearsHint}</span>
            </div>

            <div className="flex flex-col gap-1.5">
              {bufferYears.map((item, idx) => {
                const macro = REGIME_INPUTS[item.regime];
                const projRow = bufferProjection.rows[idx];
                const deltaVal = projRow?.delta ?? 0;
                return (
                  <div
                    key={item.year}
                    className="flex items-center justify-between p-2 rounded-lg bg-surface-low border border-border"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-ink tabular-nums">
                        {item.year}
                      </span>
                      <span
                        className={`text-[11px] font-semibold tabular-nums ${
                          deltaVal < 0 ? 'text-[var(--bad-text)]' : 'text-[var(--ok-tint-fg)]'
                        }`}
                      >
                        ({formatTriliun(deltaVal, 1, true)})
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => cycleBufferYear(item.year)}
                      aria-label={`Ubah skenario tahun ${item.year}, saat ini ${item.regime}`}
                      title={`Brent US$${macro.brent} · Penerimaan ${formatTriliun(macro.penerimaan, 2)}`}
                      className={`px-3 py-1 rounded text-xs font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--steel)] ${REGIME_STYLES[item.regime]}`}
                    >
                      {item.regime}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Visual Output */}
        <div className="lg:col-span-7 flex flex-col gap-4 bg-surface-card p-5 rounded-xl border border-border border-t-4 border-t-[var(--panel-top-accent)] justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-[11px] font-semibold text-ink-subtle uppercase tracking-wider block">
                {PENYANGGA_COPY.chartEyebrow}
              </span>
              <h2 className="font-headline text-xl font-semibold text-ink">
                Saldo <Term term="Penyangga">penyangga</Term> dari tahun ke tahun (2027–2031)
              </h2>
            </div>
            <div className="inline-flex items-center gap-1.5 self-start sm:self-auto shrink-0">
              <StatusChip
                level={enduranceLevel}
                suffix={`Daya tahan ${formatNumberId(bufferProjection.dayaTahanTahun, 1)} tahun`}
                variant="tint"
              />
              <Info text={PENYANGGA_COPY.chartInfo} />
            </div>
          </div>

          <div className="w-full h-72 bg-surface-low rounded-lg p-3 border border-border">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 24, right: 16, left: 0, bottom: 8 }}>
                <defs>
                  <pattern
                    id="pattern-drawdown"
                    width="8"
                    height="8"
                    patternUnits="userSpaceOnUse"
                    patternTransform="rotate(45)"
                  >
                    <rect width="8" height="8" fill="var(--chart-psr)" />
                    <line x1="0" y1="0" x2="0" y2="8" stroke="#003049" strokeOpacity="0.3" strokeWidth="2.5" />
                  </pattern>
                  <pattern
                    id="pattern-critical"
                    width="8"
                    height="8"
                    patternUnits="userSpaceOnUse"
                    patternTransform="rotate(-45)"
                  >
                    <rect width="8" height="8" fill="var(--chart-gap)" />
                    <line x1="0" y1="0" x2="0" y2="8" stroke="#FFFFFF" strokeOpacity="0.35" strokeWidth="2" />
                  </pattern>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-col)" opacity={0.65} />
                <XAxis dataKey="year" tick={{ fill: 'var(--text-main)', fontSize: 12, fontWeight: 600 }} />
                <YAxis
                  domain={[0, maxChartY]}
                  tick={{ fill: 'var(--text-subtle)', fontSize: 11 }}
                  tickFormatter={(v) => `${v}T`}
                />
                <Tooltip
                  formatter={(value, _name, item) => [
                    `${formatTriliun(Number(value ?? 0), 2)} (${item?.payload?.deltaLabel ?? ''})`,
                    `Saldo ${item?.payload?.regime ?? ''}`,
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
                  y={5.5}
                  stroke="var(--chart-gap)"
                  strokeWidth={2}
                  strokeDasharray="5 4"
                  label={{
                    value: 'Batas kritis Rp5,5 T',
                    position: 'insideTopRight',
                    fill: 'var(--bad-text)',
                    fontSize: 11,
                    fontWeight: 600,
                  }}
                />
                <Bar dataKey="endBalance" radius={[6, 6, 0, 0]} maxBarSize={72}>
                  {chartData.map((entry, idx) => (
                    <Cell
                      key={idx}
                      fill={
                        entry.endBalance <= 5.5
                          ? 'url(#pattern-critical)'
                          : entry.delta >= 0
                          ? 'var(--chart-rev)'
                          : 'url(#pattern-drawdown)'
                      }
                    />
                  ))}
                  <LabelList
                    dataKey="labelTop"
                    position="top"
                    fill="var(--text-main)"
                    fontSize={12}
                    fontWeight={700}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs text-ink-muted">
            <div className="flex items-center gap-4 flex-wrap">
              <span className="inline-flex items-center gap-1.5">
                <span className="w-3 h-2.5 rounded-xs bg-[var(--chart-rev)]" />
                Akumulasi / terisi
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="w-3 h-2.5 rounded-xs bg-[var(--chart-psr)]" />
                Penarikan defisit
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="w-3 h-2.5 rounded-xs bg-[var(--chart-gap)]" />
                Di bawah batas Rp5,5 T
              </span>
            </div>
            <span className="text-ink-subtle tabular-nums">{PENYANGGA_COPY.chartUnit}</span>
          </div>
        </div>
      </div>

      {/* Legal Route Row */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-ink-muted">{PENYANGGA_COPY.legalTitle}</span>
          <span className="text-[11px] font-semibold text-[var(--warn-tint-fg)]">
            {PENYANGGA_COPY.legalHint}
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PENYANGGA_COPY.legalCards.map((card, i) => {
            const IconComp = i === 0 ? Gavel : i === 1 ? Landmark : ShieldCheck;
            return (
              <div
                key={card.title}
                className="bg-surface-card p-4 rounded-xl border border-border flex items-center justify-between gap-2"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center shrink-0">
                    <IconComp className="w-4 h-4 text-ink" aria-hidden="true" />
                  </div>
                  <span className="text-sm font-semibold text-ink truncate">{card.title}</span>
                </div>
                <Info text={card.info} label={`Info ${card.title}`} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Sensitivity Table */}
      <Detail
        title={PENYANGGA_COPY.sensitivityTitle}
        icon={<Table2 className="w-4 h-4" aria-hidden="true" />}
        defaultOpen={false}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-surface-container text-ink font-semibold text-xs border-b border-border">
                <th className="py-2.5 px-3">Skenario</th>
                <th className="py-2.5 px-3 text-right">β = 25%</th>
                <th className="py-2.5 px-3 text-right">β = 50%</th>
                <th className="py-2.5 px-3 text-right">β = 75%</th>
                <th className="py-2.5 px-3">Keterangan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50 text-xs">
              {sensitivityRows.map((row) => {
                const r25 = calcUkd({ ...params, brent: row.brent, penerimaan: row.penerimaan, beta: 25, rataRata: row.avg });
                const r50 = calcUkd({ ...params, brent: row.brent, penerimaan: row.penerimaan, beta: 50, rataRata: row.avg });
                const r75 = calcUkd({ ...params, brent: row.brent, penerimaan: row.penerimaan, beta: 75, rataRata: row.avg });
                return (
                  <tr key={row.label} className="hover:bg-surface-low/60">
                    <td className="py-3 px-3 font-medium text-ink">{row.label}</td>
                    <td className="py-3 px-3 text-right font-headline text-base tabular-nums text-ink">
                      {formatTriliun(r25.R, 2)}
                    </td>
                    <td className="py-3 px-3 text-right font-headline text-base font-semibold text-ink tabular-nums">
                      {formatTriliun(r50.R, 2)}
                    </td>
                    <td className="py-3 px-3 text-right font-headline text-base text-[var(--warn-tint-fg)] tabular-nums">
                      {formatTriliun(r75.R, 2)}
                    </td>
                    <td className="py-3 px-3 text-ink-muted">{row.note}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Detail>

      {/* c) Dynamic Conclusion */}
      <Conclusion>
        Dengan β {formatNumberId(params.beta, 0)}%, <Term term="Penyangga">bantalan</Term>{' '}
        menyisihkan Rp {formatNumberId(totalSavedGoodYears, 2)} T pada tahun baik dan bertahan{' '}
        {formatNumberId(bufferProjection.dayaTahanTahun, 1)} tahun pada kondisi tertekan.
      </Conclusion>

      {/* d) Bridge */}
      <Bridge
        sentence={BRIDGES.penyangga.sentence}
        prevPath={BRIDGES.penyangga.prevPath}
        prevLabel={BRIDGES.penyangga.prevLabel}
        nextPath={BRIDGES.penyangga.nextPath}
        nextLabel={BRIDGES.penyangga.nextLabel}
      />
    </div>
  );
}
