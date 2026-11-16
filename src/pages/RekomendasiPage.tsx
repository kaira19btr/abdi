import React from 'react';
import { Play } from 'lucide-react';
import { BRIDGES, PAGE_INTROS, REKOMENDASI_COPY } from '../content/id';
import { Info } from '../components/ui/Info';
import { Bridge, Conclusion, PageIntro } from '../components/ui/PagePattern';
import { Term } from '../components/ui/Term';

export function RekomendasiPage() {
  return (
    <div className="flex flex-col gap-7 pb-6">
      {/* Full-width --ink header band with --bg serif headline and thin 3px --bad accent line */}
      <header className="w-full bg-[var(--hero-bg)] text-[var(--hero-text)] border-b border-[var(--sidebar-border)]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8 py-6 lg:py-8">
          <h1 className="font-headline text-3xl sm:text-4xl font-semibold text-[var(--hero-text)] tracking-tight">
            Tiga keputusan untuk <Term term="Komite Pengarah">Komite Pengarah</Term>.
          </h1>
          <div className="mt-3 h-[3px] w-24 bg-[var(--bad)]" aria-hidden="true" />
        </div>
      </header>

      <div className="max-w-[1200px] mx-auto w-full px-4 sm:px-8 flex flex-col gap-7">
        {/* a) PageIntro */}
        <PageIntro
          question={PAGE_INTROS.rekomendasi.question}
          howToRead={PAGE_INTROS.rekomendasi.howToRead}
        />

        {/* b) Three numbered cards with <Info> (main panel top border 4px --ink) */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {REKOMENDASI_COPY.cards.map((card) => (
            <div
              key={card.num}
              className="bg-surface-card border border-border border-t-4 border-t-[var(--panel-top-accent)] rounded-xl p-5 flex flex-col justify-between gap-4"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="w-8 h-8 rounded-full bg-[var(--btn-primary-bg)] text-[var(--btn-primary-fg)] text-xs font-semibold flex items-center justify-center tabular-nums shrink-0">
                  {card.num}
                </span>
                <Info text={card.info} label={`Info ${card.title}`} />
              </div>
              <div>
                <h2 className="font-headline text-xl font-semibold text-ink">
                  {card.num === '01' ? (
                    <>
                      Tetapkan pedoman <Term term="UKD">UKD</Term>
                    </>
                  ) : (
                    card.title
                  )}
                </h2>
                <p className="text-sm text-ink-muted mt-1">{card.summary}</p>
              </div>
            </div>
          ))}
        </section>

        {/* Four-dot timeline */}
        <section className="flex flex-col gap-3">
          <h2 className="font-headline text-xl font-semibold text-ink">
            {REKOMENDASI_COPY.timelineTitle}
          </h2>
          <div className="bg-surface-card border border-border border-t-4 border-t-[var(--panel-top-accent)] rounded-xl p-6">
            <div className="relative w-full">
              <div
                aria-hidden="true"
                className="hidden md:block absolute top-[22px] left-[8%] right-[8%] h-[2px] bg-border"
              />
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
                {REKOMENDASI_COPY.timeline.map((step, index) => (
                  <div
                    key={step.period}
                    className="flex flex-col items-start md:items-center text-left md:text-center gap-2"
                  >
                    <div
                      className={`flex items-center justify-center w-11 h-11 rounded-full ring-4 ring-surface-card ${
                        step.active
                          ? 'bg-[var(--btn-primary-bg)] text-[var(--btn-primary-fg)]'
                          : 'bg-surface-high text-ink border border-border-strong'
                      }`}
                    >
                      {step.active ? (
                        <Play className="w-4 h-4" aria-hidden="true" />
                      ) : (
                        <span className="text-sm font-semibold tabular-nums">{index + 1}</span>
                      )}
                    </div>
                    <div className="flex flex-col items-start md:items-center">
                      <span
                        className={`px-2.5 py-0.5 rounded text-xs font-semibold mb-1 ${
                          step.active
                            ? 'bg-[var(--steel)] text-[var(--ink)]'
                            : 'bg-surface-container text-ink-muted'
                        }`}
                      >
                        {step.period}
                      </span>
                      <div className="flex items-center gap-1">
                        <h3 className="font-headline text-lg font-semibold text-ink">
                          {step.label}
                        </h3>
                        <Info text={step.info} align="center" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Four outcome tiles with SDG chips */}
        <section className="flex flex-col gap-3">
          <h2 className="font-headline text-xl font-semibold text-ink">
            {REKOMENDASI_COPY.outcomesTitle}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {REKOMENDASI_COPY.outcomes.map((out) => (
              <div
                key={out.title}
                className="bg-surface-card border border-border rounded-xl p-4 flex flex-col justify-between gap-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2 py-0.5 rounded bg-[var(--ok-tint)] text-[var(--ok-tint-fg)] text-xs font-semibold tabular-nums">
                    {out.sdg}
                  </span>
                  <Info text={out.info} label={`Info ${out.sdg}`} />
                </div>
                <div className="font-headline text-lg font-semibold text-ink">{out.title}</div>
              </div>
            ))}
          </div>
        </section>

        {/* c) Conclusion */}
        <Conclusion>{REKOMENDASI_COPY.conclusion}</Conclusion>

        {/* d) Bridge */}
        <Bridge
          sentence={BRIDGES.rekomendasi.sentence}
          prevPath={BRIDGES.rekomendasi.prevPath}
          prevLabel={BRIDGES.rekomendasi.prevLabel}
          nextPath={BRIDGES.rekomendasi.nextPath}
          nextLabel={BRIDGES.rekomendasi.nextLabel}
        />
      </div>
    </div>
  );
}
