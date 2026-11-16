import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle2,
  Gavel,
  RefreshCw,
  ShieldAlert,
  Users,
} from 'lucide-react';
import { BRIDGES, PAGE_INTROS, SIKLUS_COPY } from '../content/id';
import { Detail } from '../components/ui/Detail';
import { Bridge, Conclusion, PageIntro } from '../components/ui/PagePattern';
import { Term } from '../components/ui/Term';

export function SiklusPage() {
  const [activeRole, setActiveRole] = useState<string>(SIKLUS_COPY.roles[0].name);
  const selectedRole = SIKLUS_COPY.roles.find((r) => r.name === activeRole) ?? SIKLUS_COPY.roles[0];

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-8 py-6 lg:py-8 flex flex-col gap-7">
      {/* a) PageIntro */}
      <PageIntro
        question={PAGE_INTROS.siklus.question}
        howToRead={PAGE_INTROS.siklus.howToRead}
      />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border pb-4">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-ink">
            {SIKLUS_COPY.kicker}
          </span>
          <h1 className="font-headline text-3xl font-semibold text-ink tracking-tight">
            {SIKLUS_COPY.title}
          </h1>
        </div>
        <div className="inline-flex items-center gap-2 bg-surface-card px-3.5 py-1.5 rounded-full border border-border self-start md:self-auto">
          <RefreshCw className="w-3.5 h-3.5 text-[var(--ok-tint-fg)]" aria-hidden="true" />
          <span className="text-xs font-semibold text-ink">{SIKLUS_COPY.badge}</span>
        </div>
      </div>

      {/* b) Circular Diagram A -> B -> D -> I -> A (main panel 4px --ink top border) */}
      <section className="bg-surface-card border border-border border-t-4 border-t-[var(--panel-top-accent)] rounded-xl p-5 md:p-7 flex flex-col gap-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="font-headline text-xl font-semibold text-ink">
            {SIKLUS_COPY.diagramTitle}
          </h2>
          <span className="text-xs text-ink-muted">Klik simpul untuk membuka instrumen</span>
        </div>

        <div className="relative max-w-4xl mx-auto w-full py-2">
          <div aria-hidden="true" className="hidden lg:block absolute inset-0 pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 800 380" fill="none">
              <path
                d="M 320 85 L 475 85"
                stroke="var(--border-strong-col)"
                strokeDasharray="4 4"
                strokeWidth="1.5"
              />
              <polygon fill="var(--panel-top-accent)" points="480,85 470,80 470,90" />
              <path
                d="M 620 155 L 620 225"
                stroke="var(--border-strong-col)"
                strokeDasharray="4 4"
                strokeWidth="1.5"
              />
              <polygon fill="var(--ok-tint-fg)" points="620,230 615,220 625,220" />
              <path
                d="M 480 295 L 325 295"
                stroke="var(--border-strong-col)"
                strokeDasharray="4 4"
                strokeWidth="1.5"
              />
              <polygon fill="var(--panel-top-accent)" points="320,295 330,300 330,290" />
              <path
                d="M 180 225 L 180 155"
                stroke="var(--border-strong-col)"
                strokeDasharray="4 4"
                strokeWidth="1.5"
              />
              <polygon fill="var(--warn-tint-fg)" points="180,150 185,160 175,160" />
            </svg>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-x-32 lg:gap-y-12 relative z-10">
            {[
              SIKLUS_COPY.nodes[0],
              SIKLUS_COPY.nodes[1],
              SIKLUS_COPY.nodes[3],
              SIKLUS_COPY.nodes[2],
            ].map((node) => (
              <Link
                key={node.letter}
                to={node.path}
                className="group bg-surface-low border border-border hover:border-[var(--panel-top-accent)] rounded-xl p-4 flex flex-col justify-between transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--steel)]"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded bg-[var(--steel)] border border-[var(--ink)] font-headline text-base font-bold text-[var(--ink)] flex items-center justify-center">
                        {node.letter}
                      </span>
                      <span className="text-xs font-semibold uppercase text-ink">
                        {node.phase}
                      </span>
                    </div>
                    <ArrowRight
                      className="w-4 h-4 text-ink-subtle group-hover:text-ink transition-colors"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="font-headline text-lg font-semibold text-ink group-hover:underline">
                    {node.title}
                  </h3>
                  <p className="text-xs text-ink-muted mt-1">{node.summary}</p>
                </div>
                <div className="mt-3 pt-2 border-t border-border text-xs font-semibold text-ink">
                  {node.cta} →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Sebelum dan Sesudah */}
      <section className="flex flex-col gap-3">
        <h2 className="font-headline text-xl font-semibold text-ink">
          {SIKLUS_COPY.beforeAfterTitle}
        </h2>
        <div className="bg-surface-card border border-border border-t-4 border-t-[var(--panel-top-accent)] rounded-xl overflow-hidden">
          <div className="grid grid-cols-12 bg-surface-low px-4 py-2.5 border-b border-border text-[11px] font-semibold uppercase tracking-wider text-ink-muted">
            <div className="col-span-12 md:col-span-4">Aspek</div>
            <div className="col-span-6 md:col-span-4">Sebelum</div>
            <div className="col-span-6 md:col-span-4 text-ink">Sesudah (ABDI)</div>
          </div>
          <div className="divide-y divide-border/50">
            {SIKLUS_COPY.beforeAfterRows.map((row) => (
              <div
                key={row.aspect}
                className="grid grid-cols-12 px-4 py-3 items-center gap-2 text-xs"
              >
                <div className="col-span-12 md:col-span-4 font-semibold text-ink">
                  {row.aspect}
                </div>
                <div className="col-span-6 md:col-span-4 flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5 text-[var(--bad-text)] shrink-0" aria-hidden="true" />
                  <span className="px-2 py-0.5 rounded bg-[var(--bad-tint)] text-[var(--bad-tint-fg)] font-medium">
                    ✕ {row.before}
                  </span>
                </div>
                <div className="col-span-6 md:col-span-4 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[var(--ok-tint-fg)] shrink-0" aria-hidden="true" />
                  <span className="px-2 py-0.5 rounded bg-[var(--ok-tint)] text-[var(--ok-tint-fg)] font-semibold">
                    ✓ {row.after}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Siapa Memutuskan */}
      <section className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="font-headline text-xl font-semibold text-ink">
            {SIKLUS_COPY.rolesTitle}
          </h2>
          <span className="text-xs text-ink-subtle">{SIKLUS_COPY.rolesHint}</span>
        </div>

        <div className="flex flex-wrap gap-2" role="tablist" aria-label={SIKLUS_COPY.rolesTitle}>
          {SIKLUS_COPY.roles.map((r) => {
            const active = r.name === activeRole;
            return (
              <button
                key={r.name}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setActiveRole(r.name)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--steel)] ${
                  active
                    ? 'bg-[var(--btn-primary-bg)] text-[var(--btn-primary-fg)] border-[var(--btn-primary-bg)]'
                    : 'bg-surface-card text-ink border-border hover:border-[var(--panel-top-accent)]'
                }`}
              >
                <Users className="w-4 h-4" aria-hidden="true" />
                <span>{r.name}</span>
              </button>
            );
          })}
        </div>

        <div className="bg-surface-card border border-border rounded-xl p-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-ink">
            {selectedRole.role}
          </span>
          <p className="text-sm text-ink mt-0.5">{selectedRole.detail}</p>
        </div>
      </section>

      {/* Collapsed Dasar Hukum */}
      <Detail
        title={SIKLUS_COPY.legalTitle}
        badge={`${SIKLUS_COPY.legalItems.length} regulasi`}
        icon={<Gavel className="w-4 h-4" aria-hidden="true" />}
        defaultOpen={false}
      >
        <div className="flex flex-col gap-2.5">
          {SIKLUS_COPY.legalItems.map((item) => (
            <div
              key={item.code}
              className="p-3 rounded-lg bg-surface-low border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-2"
            >
              <div>
                <span className="text-sm font-semibold text-ink">{item.code}</span>
                <p className="text-xs text-ink-muted mt-0.5">{item.note}</p>
              </div>
              <span
                className={`px-2 py-0.5 rounded text-xs font-semibold self-start sm:self-center shrink-0 ${
                  item.status === 'Siap'
                    ? 'bg-[var(--ok-tint)] text-[var(--ok-tint-fg)]'
                    : 'bg-[var(--warn-tint)] text-[var(--warn-tint-fg)]'
                }`}
              >
                {item.status === 'Siap' ? `✓ ${item.status}` : `! ${item.status}`}
              </span>
            </div>
          ))}
        </div>
      </Detail>

      {/* c) Conclusion */}
      <Conclusion>
        Hasil laporan masuk ke <Term term="UKD">uji kecukupan</Term> tahun berikutnya, jadi siklusnya
        terus belajar.
      </Conclusion>

      {/* d) Bridge */}
      <Bridge
        sentence={BRIDGES.siklus.sentence}
        prevPath={BRIDGES.siklus.prevPath}
        prevLabel={BRIDGES.siklus.prevLabel}
        nextPath={BRIDGES.siklus.nextPath}
        nextLabel={BRIDGES.siklus.nextLabel}
      />
    </div>
  );
}
