import type { VerdictLevel } from '../lib/ukd';

export interface ThresholdRule {
  okMax?: number;
  warnMax?: number;
  okMin?: number;
  warnMin?: number;
}

export const LAPORAN_THRESHOLDS = {
  kesenjanganNeracaT: {
    okMax: 0,
    warnMax: 4.0,
  } satisfies ThresholdRule,
  medianVerifikasiBln: {
    okMax: 6,
    warnMax: 10,
  } satisfies ThresholdRule,
  keputusanBerdasarUkdPct: {
    okMin: 75,
    warnMin: 50,
  } satisfies ThresholdRule,
};

export function evaluateLowerBetter(val: number, rule: { okMax: number; warnMax: number }): VerdictLevel {
  if (val <= rule.okMax) return 'ok';
  if (val <= rule.warnMax) return 'warn';
  return 'bad';
}

export function evaluateHigherBetter(val: number, rule: { okMin: number; warnMin: number }): VerdictLevel {
  if (val >= rule.okMin) return 'ok';
  if (val >= rule.warnMin) return 'warn';
  return 'bad';
}

export function statusLabel(level: VerdictLevel, kind: 'fiskal' | 'pekebun' | 'kelola'): string {
  if (kind === 'fiskal') {
    return level === 'ok' ? 'Sehat' : level === 'warn' ? 'Waspada' : 'Defisit';
  }
  if (kind === 'pekebun') {
    return level === 'ok' ? 'Tepat waktu' : level === 'warn' ? 'Perhatian' : 'Tertunda';
  }
  return level === 'ok' ? 'Kredibel' : level === 'warn' ? 'Parsial' : 'Rendah';
}
