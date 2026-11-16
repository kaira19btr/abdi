import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { ArrowRight, RefreshCw, Table2 } from 'lucide-react';
import { BRIDGES, LAPORAN_COPY, PAGE_INTROS } from '../content/id';
import { Detail } from '../components/ui/Detail';
import { Info } from '../components/ui/Info';
import { PageHeader } from '../components/ui/PageHeader';
import { Bridge, Conclusion, PageIntro } from '../components/ui/PagePattern';
import { StatusChip, getStatusMeta } from '../components/ui/StatusBadge';
import { Term } from '../components/ui/Term';
import laporanData from '../data/laporanData.json';
import {
  LAPORAN_THRESHOLDS,
  evaluateHigherBetter,
  evaluateLowerBetter,
  statusLabel,
} from '../data/laporanThresholds';
import { formatNumberId, formatTriliun } from '../lib/ukd';

type YearKey = keyof typeof laporanData;

export function LaporanPage() {
  const years = Object.keys(laporanData) as YearKey[];
  const [selectedYear, setSelectedYear] = useState<YearKey>('2026');

  const current = laporanData[selectedYear];
  const { metrics } = current;

  const fiskalStatus = evaluateLowerBetter(
    metrics.kesenjanganNeracaT,
    LAPORAN_THRESHOLDS.kesenjanganNeracaT
  );
  const pekebunStatus = evaluateLowerBetter(
    metrics.medianVerifikasiBln,
    LAPORAN_THRESHOLDS.medianVerifikasiBln
  );
  const kelolaStatus = evaluateHigherBetter(
    metrics.keputusanBerdasarUkdPct,
    LAPORAN_THRESHOLDS.keputusanBerdasarUkdPct
  );

  const fiskalMeta = getStatusMeta(fiskalStatus);
  const pekebunMeta = getStatusMeta(pekebunStatus);
  const kelolaMeta = getStatusMeta(kelolaStatus);

  const q4Proj = current.proyeksiVsRealisasi[3]?.proyeksi ?? 0;
  const q4Real = current.proyeksiVsRealisasi[3]?.realisasi ?? 0;
  const devPct = q4Proj > 0 ? ((q4Real - q4Proj) / q4Proj) * 100 : 0;

  return (
    <div className="w-full flex flex-col">
      {/* Sub-header Strip */}
      <div className="w-full bg-surface-card border-b border-border py-2">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8 flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-semibold text-ink">Komponen I · Evaluasi Dampak</span>
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-surface-container text-ink text-xs font-medium">
              <span>{LAPORAN_COPY.dataContohChip}</span>
              <Info text={LAPORAN_COPY.dataContohInfo} />
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-surface-low text-ink-muted text-xs font-medium border border-border">
              <span>{LAPORAN_COPY.assocChip}</span>
              <Info text={LAPORAN_COPY.assocInfo} />
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-8 py-6 w-full flex flex-col gap-6">
        {/* a) PageIntro */}
        <PageIntro
          question={PAGE_INTROS.laporan.question}
          howToRead={PAGE_INTROS.laporan.howToRead}
        />

        {/* Page Header & Year Selector */}
        <PageHeader
          componentKey="I"
          rightSlot={
            <div
              role="tablist"
              aria-label="Pilih tahun laporan"
              className="inline-flex p-1 bg-surface-container border border-border rounded-lg"
            >
              {years.map((yr) => {
                const active = selectedYear === yr;
                return (
                  <button
                    key={yr}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setSelectedYear(yr)}
                    className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-colors tabular-nums focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--steel)] ${
                      active
                        ? 'bg-[var(--btn-primary-bg)] text-[var(--btn-primary-fg)]'
                        : 'text-ink-muted hover:text-ink'
                    }`}
                  >
                    {yr}
                  </button>
                );
              })}
            </div>
          }
        />

        {/* b) 3 Traffic-Light Tiles: icon + word ("✓ Cukup", "! Waspada", "✕ Bahaya") + solid/dashed/double left border */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Fiskal */}
          <div
            className={`${fiskalMeta.tintCardCls} rounded-xl p-5 flex flex-col justify-between`}
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-sm font-semibold text-ink">Fiskal</span>
                <Info text="Keseimbangan kas BLU terhadap beban insentif dan peremajaan." />
              </div>
              <StatusChip level={fiskalStatus} variant="tint" />
            </div>
            <div className="my-2">
              <div
                className={`font-headline text-3xl font-semibold tabular-nums ${fiskalMeta.valueTextCls}`}
              >
                {formatTriliun(metrics.kesenjanganNeracaT, 1)}
              </div>
              <div className="text-sm text-ink-muted mt-1">Kesenjangan neraca akhir</div>
            </div>
            <div className="mt-3 pt-2 border-t border-border flex items-center justify-between text-xs text-ink-subtle">
              <span>Target batas: Rp0 T</span>
              <span className={`font-semibold ${fiskalMeta.valueTextCls}`}>
                {statusLabel(fiskalStatus, 'fiskal')}
              </span>
            </div>
          </div>

          {/* Pekebun */}
          <div
            className={`${pekebunMeta.tintCardCls} rounded-xl p-5 flex flex-col justify-between`}
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-sm font-semibold text-ink">Pekebun</span>
                <Info text="Median lama verifikasi teknis lahan sebelum pencairan termin." />
              </div>
              <StatusChip level={pekebunStatus} variant="tint" />
            </div>
            <div className="my-2">
              <div
                className={`font-headline text-3xl font-semibold tabular-nums ${pekebunMeta.valueTextCls}`}
              >
                {formatNumberId(metrics.medianVerifikasiBln, 0)} bln
              </div>
              <div className="text-sm text-ink-muted mt-1">Median verifikasi lahan</div>
            </div>
            <div className="mt-3 pt-2 border-t border-border flex items-center justify-between text-xs text-ink-subtle">
              <span>Batas wajar: ≤6 bulan</span>
              <span className={`font-semibold ${pekebunMeta.valueTextCls}`}>
                {statusLabel(pekebunStatus, 'pekebun')}
              </span>
            </div>
          </div>

          {/* Tata kelola */}
          <div
            className={`${kelolaMeta.tintCardCls} rounded-xl p-5 flex flex-col justify-between`}
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-sm font-semibold text-ink">Tata kelola</span>
                <Info text="Persentase keputusan alokasi dan tarif yang didahului UKD." />
              </div>
              <StatusChip level={kelolaStatus} variant="tint" />
            </div>
            <div className="my-2">
              <div
                className={`font-headline text-3xl font-semibold tabular-nums ${kelolaMeta.valueTextCls}`}
              >
                {formatNumberId(metrics.keputusanBerdasarUkdPct, 0)}%
              </div>
              <div className="text-sm text-ink-muted mt-1">
                Keputusan berdasar <Term term="UKD">UKD</Term>
              </div>
            </div>
            <div className="mt-3 pt-2 border-t border-border flex items-center justify-between text-xs text-ink-subtle">
              <span>Target minimal: 75%</span>
              <span className={`font-semibold ${kelolaMeta.valueTextCls}`}>
                {statusLabel(kelolaStatus, 'kelola')}
              </span>
            </div>
          </div>
        </div>

        {/* Two Recharts Side-by-Side (main panels with 4px --ink top border) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Proyeksi vs Realisasi */}
          <div className="bg-surface-card border border-border border-t-4 border-t-[var(--panel-top-accent)] rounded-xl p-5 flex flex-col justify-between">
            <div className="flex items-start justify-between gap-2 pb-3 border-b border-border">
              <div>
                <h2 className="font-headline text-lg font-semibold text-ink">
                  {LAPORAN_COPY.projTitle}
                </h2>
                <p className="text-xs text-ink-muted">{LAPORAN_COPY.projSub}</p>
              </div>
              <div className="flex items-center gap-3 text-xs shrink-0">
                <span className="inline-flex items-center gap-1.5 text-ink-muted">
                  <span className="w-4 border-t-2 border-dashed border-[var(--chart-line-proj)]" />
                  Proyeksi
                </span>
                <span className="inline-flex items-center gap-1.5 text-ink font-medium">
                  <span className="w-4 border-t-2 border-[var(--chart-line-real)]" />
                  Realisasi
                </span>
              </div>
            </div>

            <div className="h-56 py-3">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={current.proyeksiVsRealisasi}
                  margin={{ top: 20, right: 20, left: 0, bottom: 8 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-col)" opacity={0.65} />
                  <XAxis dataKey="kuartal" tick={{ fill: 'var(--text-main)', fontSize: 12 }} />
                  <YAxis
                    tick={{ fill: 'var(--text-subtle)', fontSize: 11 }}
                    tickFormatter={(v) => `${v}T`}
                  />
                  <Tooltip
                    formatter={(val, name) => [
                      formatTriliun(Number(val ?? 0), 1),
                      name === 'proyeksi' ? 'Proyeksi' : 'Realisasi',
                    ]}
                    contentStyle={{
                      backgroundColor: 'var(--surface)',
                      borderColor: 'var(--border-col)',
                      color: 'var(--text-main)',
                      borderRadius: '8px',
                      fontSize: '12px',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="proyeksi"
                    stroke="var(--chart-line-proj)"
                    strokeWidth={2.5}
                    strokeDasharray="6 4"
                    dot={{ r: 3.5, fill: 'var(--chart-line-proj)' }}
                  >
                    <LabelList
                      dataKey="proyeksi"
                      position="top"
                      formatter={(v) => `${formatNumberId(Number(v ?? 0), 1)}T`}
                      fill="var(--text-muted)"
                      fontSize={10}
                    />
                  </Line>
                  <Line
                    type="monotone"
                    dataKey="realisasi"
                    stroke="var(--chart-line-real)"
                    strokeWidth={2.5}
                    dot={{ r: 4, fill: 'var(--chart-line-real)' }}
                  >
                    <LabelList
                      dataKey="realisasi"
                      position="bottom"
                      formatter={(v) => `${formatNumberId(Number(v ?? 0), 1)}T`}
                      fill="var(--text-main)"
                      fontSize={10}
                      fontWeight={700}
                    />
                  </Line>
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-surface-low px-3 py-2 rounded border border-border text-xs text-ink-muted flex items-center justify-between">
              <span className="tabular-nums">
                Deviasi akhir tahun: {formatNumberId(devPct, 2)}%
              </span>
              <span className="text-[var(--ok-tint-fg)] font-semibold tabular-nums">
                {formatTriliun(q4Real, 1)} / {formatTriliun(q4Proj, 1)}
              </span>
            </div>
          </div>

          {/* Carry-over kas */}
          <div className="bg-surface-card border border-border border-t-4 border-t-[var(--panel-top-accent)] rounded-xl p-5 flex flex-col justify-between">
            <div className="flex items-start justify-between gap-2 pb-3 border-b border-border">
              <div>
                <h2 className="font-headline text-lg font-semibold text-ink">
                  <Term term="Carry-over" align="left">
                    Carry-over
                  </Term>{' '}
                  &amp; cadangan kuartalan
                </h2>
                <p className="text-xs text-ink-muted">{LAPORAN_COPY.carrySub}</p>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[var(--bad-text)] font-semibold shrink-0">
                <span className="w-3 border-t-2 border-dashed border-[var(--chart-gap)]" />
                <span>
                  {LAPORAN_COPY.carryLimitLabel} ({formatTriliun(current.carryLimitT, 1)})
                </span>
              </div>
            </div>

            <div className="h-56 py-3">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={current.carryOver}
                  margin={{ top: 20, right: 16, left: 0, bottom: 0 }}
                >
                  <defs>
                    <pattern
                      id="pattern-carry-bad"
                      width="8"
                      height="8"
                      patternUnits="userSpaceOnUse"
                      patternTransform="rotate(45)"
                    >
                      <rect width="8" height="8" fill="var(--chart-gap)" />
                      <line x1="0" y1="0" x2="0" y2="8" stroke="#FFFFFF" strokeOpacity="0.35" strokeWidth="2" />
                    </pattern>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-col)" opacity={0.65} />
                  <XAxis dataKey="kuartal" tick={{ fill: 'var(--text-main)', fontSize: 12 }} />
                  <YAxis
                    domain={[0, 6.5]}
                    tick={{ fill: 'var(--text-subtle)', fontSize: 11 }}
                    tickFormatter={(v) => `${v}T`}
                  />
                  <Tooltip
                    formatter={(val) => [formatTriliun(Number(val ?? 0), 1), 'Saldo bawaan']}
                    contentStyle={{
                      backgroundColor: 'var(--surface)',
                      borderColor: 'var(--border-col)',
                      color: 'var(--text-main)',
                      borderRadius: '8px',
                      fontSize: '12px',
                    }}
                  />
                  <ReferenceLine
                    y={current.carryLimitT}
                    stroke="var(--chart-gap)"
                    strokeWidth={2}
                    strokeDasharray="4 4"
                    label={{
                      value: LAPORAN_COPY.carryLimitLabel,
                      position: 'insideTopRight',
                      fill: 'var(--bad-text)',
                      fontSize: 11,
                      fontWeight: 600,
                    }}
                  />
                  <Bar dataKey="saldo" radius={[5, 5, 0, 0]} maxBarSize={56}>
                    {current.carryOver.map((entry, idx) => (
                      <Cell
                        key={idx}
                        fill={
                          entry.saldo > current.carryLimitT
                            ? 'url(#pattern-carry-bad)'
                            : idx === 3
                            ? 'var(--chart-rev)'
                            : 'var(--chart-b50)'
                        }
                      />
                    ))}
                    <LabelList
                      dataKey="saldo"
                      position="top"
                      formatter={(v) => `Rp${formatNumberId(Number(v ?? 0), 1)}T`}
                      fill="var(--text-main)"
                      fontSize={11}
                      fontWeight={700}
                    />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-surface-low px-3 py-2 rounded border border-border text-xs text-ink-muted flex items-center justify-between">
              <span>Posisi batas kuartalan</span>
              <span
                className={`font-semibold ${
                  current.carryOver.some((c) => c.saldo > current.carryLimitT)
                    ? 'text-[var(--bad-text)]'
                    : 'text-[var(--ok-tint-fg)]'
                }`}
              >
                {current.carryOver.some((c) => c.saldo > current.carryLimitT)
                  ? '✕ Melebihi batas 6 bulan'
                  : '✓ Di bawah batas'}
              </span>
            </div>
          </div>
        </div>

        {/* Feedback Loop */}
        <div className="bg-surface-card border border-border rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-ink" aria-hidden="true" />
              <h2 className="font-headline text-lg font-semibold text-ink">
                {LAPORAN_COPY.loopTitle}
              </h2>
            </div>
            <span className="text-xs text-ink-muted">Iterasi tahunan</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4 bg-surface-low p-4 rounded-lg border border-border">
            <div className="flex items-center gap-3 p-3 bg-surface-card border border-border rounded-lg">
              <div className="w-8 h-8 rounded bg-[var(--steel)] text-[var(--ink)] flex items-center justify-center font-headline text-base font-bold shrink-0">
                I
              </div>
              <div className="min-w-0">
                <div className="text-sm font-semibold text-ink truncate">
                  Evaluasi {selectedYear}
                </div>
                <div className="text-xs text-ink-subtle truncate">Realisasi &amp; deviasi</div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center text-ink text-xs font-semibold">
              <div className="inline-flex items-center gap-1">
                <span>Masuk ke UKD</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </div>
              <span className="text-ink-muted font-normal mt-0.5">Kalibrasi asumsi</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Link
                to="/simulator"
                className="flex items-center gap-2 p-2.5 bg-surface-card border border-border hover:border-[var(--panel-top-accent)] rounded-lg transition-colors"
              >
                <span className="w-6 h-6 rounded bg-surface-highest text-ink text-center font-headline text-xs leading-6 font-bold shrink-0">
                  A
                </span>
                <span className="text-xs font-semibold text-ink truncate">UKD</span>
              </Link>
              <Link
                to="/peremajaan"
                className="flex items-center gap-2 p-2.5 bg-surface-card border border-border hover:border-[var(--panel-top-accent)] rounded-lg transition-colors"
              >
                <span className="w-6 h-6 rounded bg-surface-highest text-ink text-center font-headline text-xs leading-6 font-bold shrink-0">
                  D
                </span>
                <span className="text-xs font-semibold text-ink truncate">Peremajaan</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Collapsed Decision Table */}
        <Detail
          title={LAPORAN_COPY.decisionsTitle}
          badge={`${current.keputusan.length} keputusan`}
          icon={<Table2 className="w-4 h-4" aria-hidden="true" />}
          defaultOpen={false}
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-border text-ink-muted font-semibold">
                  <th className="pb-2.5 pr-3">Keputusan</th>
                  <th className="pb-2.5 pr-3">Ber-UKD?</th>
                  <th className="pb-2.5 pr-3">Penutup celah</th>
                  <th className="pb-2.5 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {current.keputusan.map((row) => (
                  <tr key={row.kebijakan} className="hover:bg-surface-low/50">
                    <td className="py-2.5 pr-3 font-medium text-ink">{row.kebijakan}</td>
                    <td className="py-2.5 pr-3">
                      <span
                        className={`inline-flex px-2 py-0.5 rounded font-semibold ${
                          row.ukd.startsWith('Ya')
                            ? 'bg-[var(--ok-tint)] text-[var(--ok-tint-fg)]'
                            : 'bg-[var(--warn-tint)] text-[var(--warn-tint-fg)]'
                        }`}
                      >
                        {row.ukd.startsWith('Ya') ? `✓ ${row.ukd}` : `! ${row.ukd}`}
                      </span>
                    </td>
                    <td className="py-2.5 pr-3 text-ink-muted">{row.penutup}</td>
                    <td className="py-2.5 text-right font-semibold text-[var(--ok-tint-fg)]">
                      {row.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Detail>

        {/* c) Conclusion */}
        <Conclusion>{LAPORAN_COPY.conclusion}</Conclusion>

        {/* d) Bridge */}
        <Bridge
          sentence={BRIDGES.laporan.sentence}
          prevPath={BRIDGES.laporan.prevPath}
          prevLabel={BRIDGES.laporan.prevLabel}
          nextPath={BRIDGES.laporan.nextPath}
          nextLabel={BRIDGES.laporan.nextLabel}
        />
      </div>
    </div>
  );
}
