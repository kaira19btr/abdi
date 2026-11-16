export interface RgbColor {
  r: number;
  g: number;
  b: number;
}

export function hexToRgb(hex: string): RgbColor {
  const clean = hex.trim().replace(/^#/, '');
  const full =
    clean.length === 3
      ? clean
          .split('')
          .map((c) => c + c)
          .join('')
      : clean;
  if (!/^[0-9a-fA-F]{6}$/.test(full)) {
    throw new Error(`Invalid hex color: ${hex}`);
  }
  return {
    r: parseInt(full.slice(0, 2), 16),
    g: parseInt(full.slice(2, 4), 16),
    b: parseInt(full.slice(4, 6), 16),
  };
}

function linearizeChannel(value255: number): number {
  const srgb = value255 / 255;
  return srgb <= 0.03928 ? srgb / 12.92 : Math.pow((srgb + 0.055) / 1.055, 2.4);
}

export function relativeLuminance(hex: string): number {
  const { r, g, b } = hexToRgb(hex);
  const rl = linearizeChannel(r);
  const gl = linearizeChannel(g);
  const bl = linearizeChannel(b);
  return 0.2126 * rl + 0.7152 * gl + 0.0722 * bl;
}

export function contrastRatio(fgHex: string, bgHex: string): number {
  const l1 = relativeLuminance(fgHex);
  const l2 = relativeLuminance(bgHex);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

export function meetsWcagAa(fgHex: string, bgHex: string, largeText = false): boolean {
  const threshold = largeText ? 3.0 : 4.5;
  return contrastRatio(fgHex, bgHex) >= threshold;
}

export interface PalettePairCheck {
  label: string;
  fg: string;
  bg: string;
  largeText?: boolean;
}

export const ABDI_PALETTE_PAIRS: PalettePairCheck[] = [
  // Light mode
  { label: 'Light: ink on bg', fg: '#003049', bg: '#FDF0D5' },
  { label: 'Light: ink on surface', fg: '#003049', bg: '#FFFBF2' },
  { label: 'Light: muted on bg', fg: '#284B5C', bg: '#FDF0D5' },
  { label: 'Light: muted on surface', fg: '#284B5C', bg: '#FFFBF2' },
  { label: 'Light: subtle on bg', fg: '#3D5B6B', bg: '#FDF0D5' },
  { label: 'Light: subtle on surface', fg: '#3D5B6B', bg: '#FFFBF2' },
  { label: 'Light: bg text on ink (sidebar/hero)', fg: '#FDF0D5', bg: '#003049' },
  { label: 'Light: ink text on steel (active nav)', fg: '#003049', bg: '#669BBC' },
  { label: 'Light: ink text on warn badge', fg: '#003049', bg: '#E0A030' },
  { label: 'Light: white text on ok badge', fg: '#FFFFFF', bg: '#2F6F96' },
  { label: 'Light: white text on bad badge', fg: '#FFFFFF', bg: '#C1121F' },
  { label: 'Light: ok-tint-fg on ok tint', fg: '#1A4B69', bg: '#DCEAF3' },
  { label: 'Light: warn-tint-fg on warn tint', fg: '#5E3C02', bg: '#FBEBC8' },
  { label: 'Light: bad-deep on bad tint', fg: '#780000', bg: '#F7D9DB' },
  { label: 'Light: bad on surface (gap number)', fg: '#C1121F', bg: '#FFFBF2' },
  { label: 'Light: bad on bg', fg: '#C1121F', bg: '#FDF0D5' },
  { label: 'Light: primary button bg text on ink', fg: '#FDF0D5', bg: '#003049' },

  // Dark mode
  { label: 'Dark: text on bg', fg: '#FDF0D5', bg: '#001C2B' },
  { label: 'Dark: text on surface', fg: '#FDF0D5', bg: '#06293A' },
  { label: 'Dark: muted on surface', fg: '#CEDCE3', bg: '#06293A' },
  { label: 'Dark: subtle on surface', fg: '#9FB9C7', bg: '#06293A' },
  { label: 'Dark: sidebar text on sidebar bg', fg: '#FDF0D5', bg: '#001420' },
  { label: 'Dark: ink text on steel (active nav / button)', fg: '#003049', bg: '#669BBC' },
  { label: 'Dark: ink text on warn badge', fg: '#003049', bg: '#E0A030' },
  { label: 'Dark: ok-tint-fg on ok tint', fg: '#DCEAF3', bg: '#0E3B54' },
  { label: 'Dark: warn-tint-fg on warn tint', fg: '#FBEBC8', bg: '#3D2B08' },
  { label: 'Dark: bad-tint-fg on bad tint', fg: '#FFD6D8', bg: '#3D1116' },
  { label: 'Dark: lightened bad #E5484D large text on dark bg', fg: '#E5484D', bg: '#001C2B', largeText: true },
  { label: 'Dark: lightened bad #E5484D large text on dark surface', fg: '#E5484D', bg: '#06293A', largeText: true },
  { label: 'Dark: bad-deep normal text on dark surface', fg: '#FF9A9D', bg: '#06293A' },
];
