import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  type BufferProjection,
  type BufferYearInput,
  DEFAULT_BUFFER_YEARS,
  DEFAULT_PARAMS,
  PRESETS,
  type PresetKey,
  type UkdParams,
  type UkdResult,
  type YearRegime,
  calcUkd,
  projectBuffer,
} from '../lib/ukd';

export type AppMode = 'pemandu' | 'ringkas';

export interface PeremajaanStageCounts {
  usulan: number;
  cekLahan: number;
  siapTanam: number;
  danaTermin: number;
  tanamanHidup: number;
}

export const DEFAULT_PEREMAJAAN_COUNTS: PeremajaanStageCounts = {
  usulan: 142,
  cekLahan: 98,
  siapTanam: 60.7,
  danaTermin: 47.2,
  tanamanHidup: 38.5,
};

const STORAGE_KEYS = {
  params: 'abdi_ukd_params_v1',
  mode: 'abdi_mode_v1',
  sidebarCollapsed: 'abdi_sidebar_collapsed_v1',
  bufferYears: 'abdi_buffer_years_v1',
  peremajaanCounts: 'abdi_peremajaan_counts_v1',
};

function readStorage<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return { ...fallback, ...JSON.parse(raw) };
  } catch {
    return fallback;
  }
}

function readStorageArray<T>(key: string, fallback: T[]): T[] {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length === fallback.length ? parsed : fallback;
  } catch {
    return fallback;
  }
}

function readStorageMode(key: string, fallback: AppMode): AppMode {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (raw === 'pemandu' || raw === 'ringkas') return raw;
    return fallback;
  } catch {
    return fallback;
  }
}

function readStorageBool(key: string, fallback: boolean): boolean {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (raw === 'true') return true;
    if (raw === 'false') return false;
    return fallback;
  } catch {
    return fallback;
  }
}

interface AbdiContextValue {
  params: UkdParams;
  ukd: UkdResult;
  setParam: <K extends keyof UkdParams>(key: K, value: UkdParams[K]) => void;
  applyPreset: (preset: PresetKey) => void;
  resetParams: () => void;
  mode: AppMode;
  isGuideMode: boolean;
  setMode: (mode: AppMode) => void;
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  visitedPaths: string[];
  markVisited: (path: string) => void;
  bufferYears: BufferYearInput[];
  bufferProjection: BufferProjection;
  cycleBufferYear: (year: number) => void;
  peremajaanCounts: PeremajaanStageCounts;
  setPeremajaanCount: (key: keyof PeremajaanStageCounts, value: number) => void;
  resetPeremajaanCounts: () => void;
  sourcesOpen: boolean;
  openSources: () => void;
  closeSources: () => void;
}

const AbdiContext = createContext<AbdiContextValue | null>(null);

const REGIME_ORDER: YearRegime[] = ['Tinggi', 'Dasar', 'Tertekan'];

export function AbdiProvider({ children }: { children: React.ReactNode }) {
  const [params, setParams] = useState<UkdParams>(() => readStorage(STORAGE_KEYS.params, DEFAULT_PARAMS));
  const [mode, setMode] = useState<AppMode>(() => readStorageMode(STORAGE_KEYS.mode, 'pemandu'));
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(() =>
    readStorageBool(STORAGE_KEYS.sidebarCollapsed, false)
  );
  const [visitedPaths, setVisitedPaths] = useState<string[]>(() => {
    if (typeof window === 'undefined') return ['/'];
    return [window.location.pathname || '/'];
  });
  const [bufferYears, setBufferYears] = useState<BufferYearInput[]>(() =>
    readStorageArray(STORAGE_KEYS.bufferYears, DEFAULT_BUFFER_YEARS)
  );
  const [peremajaanCounts, setPeremajaanCounts] = useState<PeremajaanStageCounts>(() =>
    readStorage(STORAGE_KEYS.peremajaanCounts, DEFAULT_PEREMAJAAN_COUNTS)
  );
  const [sourcesOpen, setSourcesOpen] = useState(false);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEYS.params, JSON.stringify(params));
    } catch {
      // ignore storage errors
    }
  }, [params]);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEYS.mode, mode);
    } catch {
      // ignore
    }
  }, [mode]);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEYS.sidebarCollapsed, String(sidebarCollapsed));
    } catch {
      // ignore
    }
  }, [sidebarCollapsed]);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEYS.bufferYears, JSON.stringify(bufferYears));
    } catch {
      // ignore
    }
  }, [bufferYears]);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEYS.peremajaanCounts, JSON.stringify(peremajaanCounts));
    } catch {
      // ignore
    }
  }, [peremajaanCounts]);

  const ukd = useMemo(() => calcUkd(params), [params]);

  const bufferProjection = useMemo(
    () =>
      projectBuffer(bufferYears, {
        peremajaan: params.peremajaan,
        lainnya: params.lainnya,
        saldoAwal: params.saldoAwal,
        beta: params.beta,
        rataRata: params.rataRata,
      }),
    [bufferYears, params.peremajaan, params.lainnya, params.saldoAwal, params.beta, params.rataRata]
  );

  const setParam = <K extends keyof UkdParams>(key: K, value: UkdParams[K]) => {
    setParams((prev) => ({ ...prev, [key]: value }));
  };

  const applyPreset = (presetKey: PresetKey) => {
    const preset = PRESETS[presetKey];
    setParams((prev) => ({
      ...prev,
      brent: preset.brent,
      penerimaan: preset.penerimaan,
    }));
  };

  const resetParams = () => {
    setParams(DEFAULT_PARAMS);
  };

  const toggleSidebar = useCallback(() => {
    setSidebarCollapsed((prev) => !prev);
  }, []);

  const markVisited = useCallback((path: string) => {
    setVisitedPaths((prev) => (prev.includes(path) ? prev : [...prev, path]));
  }, []);

  const cycleBufferYear = (year: number) => {
    setBufferYears((prev) =>
      prev.map((item) => {
        if (item.year !== year) return item;
        const idx = REGIME_ORDER.indexOf(item.regime);
        const nextRegime = REGIME_ORDER[(idx + 1) % REGIME_ORDER.length];
        return { ...item, regime: nextRegime };
      })
    );
  };

  const setPeremajaanCount = (key: keyof PeremajaanStageCounts, value: number) => {
    const clamped = Math.max(0, Math.min(500, Number.isFinite(value) ? value : 0));
    setPeremajaanCounts((prev) => ({ ...prev, [key]: clamped }));
  };

  const resetPeremajaanCounts = () => {
    setPeremajaanCounts(DEFAULT_PEREMAJAAN_COUNTS);
  };

  return (
    <AbdiContext.Provider
      value={{
        params,
        ukd,
        setParam,
        applyPreset,
        resetParams,
        mode,
        isGuideMode: mode === 'pemandu',
        setMode,
        sidebarCollapsed,
        toggleSidebar,
        visitedPaths,
        markVisited,
        bufferYears,
        bufferProjection,
        cycleBufferYear,
        peremajaanCounts,
        setPeremajaanCount,
        resetPeremajaanCounts,
        sourcesOpen,
        openSources: () => setSourcesOpen(true),
        closeSources: () => setSourcesOpen(false),
      }}
    >
      {children}
    </AbdiContext.Provider>
  );
}

export function useAbdi() {
  const ctx = useContext(AbdiContext);
  if (!ctx) throw new Error('useAbdi must be used within AbdiProvider');
  return ctx;
}
