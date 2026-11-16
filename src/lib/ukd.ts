export type VerdictLevel = 'ok' | 'warn' | 'bad';

export type PresetKey = 'K1' | 'K2' | 'K3' | 'K4';

export type YearRegime = 'Tinggi' | 'Dasar' | 'Tertekan';

export interface UkdParams {
  brent: number;       // 70 - 120, default 85
  penerimaan: number;  // 25 - 55, default 41.22
  peremajaan: number;  // 0 - 10, default 3.63
  lainnya: number;     // X: 0 - 3, default 0
  saldoAwal: number;   // 0 - 18.45, default 9.2
  beta: number;        // 25 - 75, default 50
  rataRata: number;    // 20 - 40, default 27.25
}

export interface UkdResult {
  need: number;
  belanja: number;
  net: number;
  gap: number;
  R: number;
  dayaTahan: number | null;
  setaraTarifPoin: number;
  breakEvenNeed: number;
  breakEvenBrent: number;
  verdict: VerdictLevel;
}

export const DEFAULT_PARAMS: UkdParams = {
  brent: 85,
  penerimaan: 41.22,
  peremajaan: 3.63,
  lainnya: 0,
  saldoAwal: 9.2,
  beta: 50,
  rataRata: 27.25,
};

export interface PresetConfig {
  key: PresetKey;
  label: string;
  shortLabel: string;
  brent: number;
  penerimaan: number;
}

export const PRESETS: Record<PresetKey, PresetConfig> = {
  K1: {
    key: 'K1',
    label: 'K1: Minyak tinggi (surplus)',
    shortLabel: 'K1 (Tinggi)',
    brent: 115,
    penerimaan: 47.67,
  },
  K2: {
    key: 'K2',
    label: 'K2: Brent US$100 (surplus moderat)',
    shortLabel: 'K2 (Moderat)',
    brent: 100,
    penerimaan: 41.22,
  },
  K3: {
    key: 'K3',
    label: 'K3: Dasar RAPBN (defisit ringan)',
    shortLabel: 'K3 (Dasar)',
    brent: 85,
    penerimaan: 41.22,
  },
  K4: {
    key: 'K4',
    label: 'K4: Tertekan (penerimaan -20%)',
    shortLabel: 'K4 (Tertekan)',
    brent: 85,
    penerimaan: 32.98,
  },
};

export const REGIME_INPUTS: Record<YearRegime, { brent: number; penerimaan: number }> = {
  Tinggi: { brent: 115, penerimaan: 47.67 },
  Dasar: { brent: 100, penerimaan: 41.22 },
  Tertekan: { brent: 85, penerimaan: 32.98 },
};

/**
 * Piecewise linear B50 incentive need (Triliun Rupiah) vs Brent (USD/bbl):
 * Through (85, 41.3), (100, 30), (115, 25).
 * Clamped at >= 0.
 */
export function calcNeed(brent: number): number {
  const raw =
    brent <= 100
      ? 41.3 + (brent - 85) * (-11.3 / 15)
      : 30 + (brent - 100) * (-5 / 15);
  return Math.max(0, raw);
}

/**
 * Compute full UKD metrics from parameters.
 */
export function calcUkd(params: UkdParams): UkdResult {
  const need = calcNeed(params.brent);
  const belanja = need + params.peremajaan + params.lainnya;
  const net = params.penerimaan - belanja;
  const gap = Math.max(0, -net);

  const R =
    net > 0
      ? Math.max(0, Math.min((params.beta / 100) * (params.penerimaan - params.rataRata), net))
      : 0;

  const dayaTahan =
    net < 0 ? (params.saldoAwal > 0 ? params.saldoAwal / -net : 0) : null;

  const setaraTarifPoin =
    params.penerimaan > 0 ? gap / (params.penerimaan / 12.5) : 0;

  const breakEvenNeed = params.penerimaan - params.peremajaan - params.lainnya;
  const breakEvenBrent =
    breakEvenNeed >= 30
      ? 85 + (41.3 - breakEvenNeed) / (11.3 / 15)
      : 100 + (30 - breakEvenNeed) * 3;

  let verdict: VerdictLevel = 'ok';
  if (net < 0) {
    verdict = dayaTahan !== null && dayaTahan >= 2 ? 'warn' : 'bad';
  }

  return {
    need,
    belanja,
    net,
    gap,
    R,
    dayaTahan,
    setaraTarifPoin,
    breakEvenNeed,
    breakEvenBrent,
    verdict,
  };
}

export interface BufferYearInput {
  year: number;
  regime: YearRegime;
}

export interface BufferYearRow {
  year: number;
  regime: YearRegime;
  startBalance: number;
  net: number;
  delta: number;
  endBalance: number;
}

export interface BufferProjection {
  rows: BufferYearRow[];
  endBalance: number;
  dayaTahanTahun: number;
}

export const DEFAULT_BUFFER_YEARS: BufferYearInput[] = [
  { year: 2027, regime: 'Tinggi' },
  { year: 2028, regime: 'Dasar' },
  { year: 2029, regime: 'Tertekan' },
  { year: 2030, regime: 'Tertekan' },
  { year: 2031, regime: 'Dasar' },
];

export function projectBuffer(
  years: BufferYearInput[],
  baseParams: Pick<UkdParams, 'peremajaan' | 'lainnya' | 'saldoAwal' | 'beta' | 'rataRata'>
): BufferProjection {
  let balance = baseParams.saldoAwal;
  const rows: BufferYearRow[] = [];
  let depletedAt: number | null = null;

  years.forEach((item, index) => {
    const macro = REGIME_INPUTS[item.regime];
    const ukd = calcUkd({
      ...baseParams,
      brent: macro.brent,
      penerimaan: macro.penerimaan,
    });

    const startBalance = balance;
    let delta = 0;
    if (ukd.net > 0) {
      delta = ukd.R;
      balance = startBalance + delta;
    } else if (ukd.net < 0) {
      const needed = -ukd.net;
      if (depletedAt === null && startBalance < needed) {
        depletedAt = index + (startBalance > 0 ? startBalance / needed : 0);
      }
      const drawn = Math.min(startBalance, needed);
      delta = -drawn;
      balance = Math.max(0, startBalance - drawn);
    }

    rows.push({
      year: item.year,
      regime: item.regime,
      startBalance,
      net: ukd.net,
      delta,
      endBalance: balance,
    });
  });

  // Reference deficit under K3 stress (-3.71 T) when ending balance > 0
  const k3Ref = calcUkd({
    ...baseParams,
    brent: PRESETS.K3.brent,
    penerimaan: PRESETS.K3.penerimaan,
  });
  const stressDeficit = k3Ref.net < 0 ? -k3Ref.net : 3.71;

  const dayaTahanTahun =
    depletedAt !== null
      ? depletedAt
      : balance > 0
      ? balance / stressDeficit
      : 0;

  return {
    rows,
    endBalance: balance,
    dayaTahanTahun,
  };
}

export function detectActivePreset(params: UkdParams): PresetKey | null {
  for (const key of Object.keys(PRESETS) as PresetKey[]) {
    const p = PRESETS[key];
    if (
      Math.abs(params.brent - p.brent) < 0.01 &&
      Math.abs(params.penerimaan - p.penerimaan) < 0.01
    ) {
      return key;
    }
  }
  return null;
}

const fmt1 = new Intl.NumberFormat('id-ID', {
  minimumFractionDigits: 0,
  maximumFractionDigits: 1,
});

const fmt2 = new Intl.NumberFormat('id-ID', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const fmtInt = new Intl.NumberFormat('id-ID', {
  maximumFractionDigits: 0,
});

export function formatTriliun(value: number, decimals: 1 | 2 = 2, signed = false): string {
  const abs = Math.abs(value);
  const num = decimals === 1 ? fmt1.format(abs) : fmt2.format(abs);
  if (signed) {
    const sign = value > 0.004 ? '+' : value < -0.004 ? '-' : '';
    return `${sign}Rp${num} T`;
  }
  return `${value < -0.004 ? '-' : ''}Rp${num} T`;
}

export function formatNumberId(value: number, decimals: 0 | 1 | 2 = 1): string {
  if (decimals === 0) return fmtInt.format(value);
  if (decimals === 1) return fmt1.format(value);
  return fmt2.format(value);
}
