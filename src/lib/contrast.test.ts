import assert from 'node:assert/strict';
import test from 'node:test';
import { ABDI_PALETTE_PAIRS, contrastRatio, meetsWcagAa } from './contrast';

test('All ABDI light & dark palette text/background pairs meet WCAG AA', () => {
  for (const pair of ABDI_PALETTE_PAIRS) {
    const ratio = contrastRatio(pair.fg, pair.bg);
    const min = pair.largeText ? 3.0 : 4.5;
    assert.ok(
      meetsWcagAa(pair.fg, pair.bg, pair.largeText),
      `${pair.label} (${pair.fg} on ${pair.bg}) ratio ${ratio.toFixed(2)} < ${min}`
    );
  }
});

test('Forbidden low-contrast pairs fail normal WCAG AA check', () => {
  assert.equal(meetsWcagAa('#FFFFFF', '#669BBC'), false);
  assert.equal(meetsWcagAa('#FFFFFF', '#E0A030'), false);
});
