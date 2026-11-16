import assert from 'node:assert/strict';
import test from 'node:test';
import { calcNeed, calcUkd, DEFAULT_PARAMS, PRESETS, projectBuffer, DEFAULT_BUFFER_YEARS } from './ukd.ts';

function approxEqual(actual: number | null, expected: number, tol = 0.01, label = '') {
  assert.notEqual(actual, null, `${label}: expected ${expected}, got null`);
  const diff = Math.abs((actual as number) - expected);
  assert.ok(diff <= tol, `${label}: expected ${expected} ± ${tol}, got ${actual} (diff ${diff})`);
}

test('need(brent) piecewise linear anchors', () => {
  approxEqual(calcNeed(85), 41.3, 0.01, 'need(85)');
  approxEqual(calcNeed(100), 30.0, 0.01, 'need(100)');
  approxEqual(calcNeed(115), 25.0, 0.01, 'need(115)');
  assert.ok(calcNeed(250) >= 0, 'need clamped at >= 0');
});

test('Acceptance: K1 metrics', () => {
  const res = calcUkd({ ...DEFAULT_PARAMS, ...PRESETS.K1 });
  approxEqual(res.belanja, 28.63, 0.01, 'K1 belanja');
  approxEqual(res.net, 19.04, 0.01, 'K1 net');
  approxEqual(res.R, 10.21, 0.01, 'K1 R(beta=50)');
  assert.equal(res.verdict, 'ok');
  assert.equal(res.dayaTahan, null);
});

test('Acceptance: K2 metrics', () => {
  const res = calcUkd({ ...DEFAULT_PARAMS, ...PRESETS.K2 });
  approxEqual(res.belanja, 33.63, 0.01, 'K2 belanja');
  approxEqual(res.net, 7.59, 0.01, 'K2 net');
  approxEqual(res.R, 6.98, 0.01, 'K2 R(beta=50)');
  assert.equal(res.verdict, 'ok');
});

test('Acceptance: K3 metrics at saldo 9.2 and 18.45', () => {
  const res92 = calcUkd({ ...DEFAULT_PARAMS, ...PRESETS.K3, saldoAwal: 9.2 });
  approxEqual(res92.net, -3.71, 0.01, 'K3 net');
  approxEqual(res92.dayaTahan, 2.48, 0.01, 'K3 dayaTahan @ 9.2');
  approxEqual(res92.setaraTarifPoin, 1.1, 0.05, 'K3 setaraTarif');
  assert.equal(res92.verdict, 'warn');

  const res1845 = calcUkd({ ...DEFAULT_PARAMS, ...PRESETS.K3, saldoAwal: 18.45 });
  approxEqual(res1845.dayaTahan, 4.97, 0.01, 'K3 dayaTahan @ 18.45');
  assert.equal(res1845.verdict, 'warn');
});

test('Acceptance: K4 metrics at saldo 9.2 and 18.45', () => {
  const res92 = calcUkd({ ...DEFAULT_PARAMS, ...PRESETS.K4, saldoAwal: 9.2 });
  approxEqual(res92.net, -11.95, 0.01, 'K4 net');
  approxEqual(res92.dayaTahan, 0.77, 0.01, 'K4 dayaTahan @ 9.2');
  approxEqual(res92.setaraTarifPoin, 4.5, 0.05, 'K4 setaraTarif');
  assert.equal(res92.verdict, 'bad');

  const res1845 = calcUkd({ ...DEFAULT_PARAMS, ...PRESETS.K4, saldoAwal: 18.45 });
  approxEqual(res1845.dayaTahan, 1.54, 0.01, 'K4 dayaTahan @ 18.45');
  assert.equal(res1845.verdict, 'bad');
});

test('Acceptance: Break-even Brent for X = 0, 1, 2', () => {
  approxEqual(calcUkd({ ...DEFAULT_PARAMS, lainnya: 0 }).breakEvenBrent, 89.9, 0.05, 'BE Brent X=0');
  approxEqual(calcUkd({ ...DEFAULT_PARAMS, lainnya: 1 }).breakEvenBrent, 91.3, 0.05, 'BE Brent X=1');
  approxEqual(calcUkd({ ...DEFAULT_PARAMS, lainnya: 2 }).breakEvenBrent, 92.6, 0.05, 'BE Brent X=2');
});

test('Acceptance: Sensitivity R across beta 25/50/75', () => {
  // K1 avg 27.25 -> 5.11 / 10.21 / 15.32
  approxEqual(calcUkd({ ...DEFAULT_PARAMS, ...PRESETS.K1, rataRata: 27.25, beta: 25 }).R, 5.11, 0.01, 'K1 avg27.25 b25');
  approxEqual(calcUkd({ ...DEFAULT_PARAMS, ...PRESETS.K1, rataRata: 27.25, beta: 50 }).R, 10.21, 0.01, 'K1 avg27.25 b50');
  approxEqual(calcUkd({ ...DEFAULT_PARAMS, ...PRESETS.K1, rataRata: 27.25, beta: 75 }).R, 15.32, 0.01, 'K1 avg27.25 b75');

  // K2 avg 27.25 -> 3.49 / 6.98 / 7.59 (capped by surplus)
  approxEqual(calcUkd({ ...DEFAULT_PARAMS, ...PRESETS.K2, rataRata: 27.25, beta: 25 }).R, 3.49, 0.01, 'K2 avg27.25 b25');
  approxEqual(calcUkd({ ...DEFAULT_PARAMS, ...PRESETS.K2, rataRata: 27.25, beta: 50 }).R, 6.98, 0.01, 'K2 avg27.25 b50');
  approxEqual(calcUkd({ ...DEFAULT_PARAMS, ...PRESETS.K2, rataRata: 27.25, beta: 75 }).R, 7.59, 0.01, 'K2 avg27.25 b75');

  // K2 avg 31.91 -> 2.33 / 4.66 / 6.98
  approxEqual(calcUkd({ ...DEFAULT_PARAMS, ...PRESETS.K2, rataRata: 31.91, beta: 25 }).R, 2.33, 0.01, 'K2 avg31.91 b25');
  approxEqual(calcUkd({ ...DEFAULT_PARAMS, ...PRESETS.K2, rataRata: 31.91, beta: 50 }).R, 4.66, 0.01, 'K2 avg31.91 b50');
  approxEqual(calcUkd({ ...DEFAULT_PARAMS, ...PRESETS.K2, rataRata: 31.91, beta: 75 }).R, 6.98, 0.01, 'K2 avg31.91 b75');
});

test('Multi-year buffer projection accumulates and draws correctly', () => {
  const proj = projectBuffer(DEFAULT_BUFFER_YEARS, DEFAULT_PARAMS);
  assert.equal(proj.rows.length, 5);
  approxEqual(proj.rows[0].delta, 10.21, 0.01, '2027 Tinggi R');
  approxEqual(proj.rows[0].endBalance, 19.41, 0.01, '2027 end balance');
  assert.ok(proj.rows[2].delta < 0, '2029 Tertekan draws down');
});
