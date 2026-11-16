/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { BerandaPage } from './pages/BerandaPage';
import { LandingPage } from './pages/LandingPage';
import { LaporanPage } from './pages/LaporanPage';
import { PenyanggaPage } from './pages/PenyanggaPage';
import { PeremajaanPage } from './pages/PeremajaanPage';
import { RekomendasiPage } from './pages/RekomendasiPage';
import { SiklusPage } from './pages/SiklusPage';
import { SimulatorPage } from './pages/SimulatorPage';
import { AbdiProvider } from './store/AbdiContext';

export default function App() {
  return (
    <AbdiProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/*"
            element={
              <Layout>
                <Routes>
                  <Route path="/beranda" element={<BerandaPage />} />
                  <Route path="/simulator" element={<SimulatorPage />} />
                  <Route path="/penyangga" element={<PenyanggaPage />} />
                  <Route path="/peremajaan" element={<PeremajaanPage />} />
                  <Route path="/laporan" element={<LaporanPage />} />
                  <Route path="/siklus" element={<SiklusPage />} />
                  <Route path="/rekomendasi" element={<RekomendasiPage />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </AbdiProvider>
  );
}
