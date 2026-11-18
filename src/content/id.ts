export interface NavItem {
  path: string;
  label: string;
  stepNum: number;
  stepLabel: string;
}

export const NAV_ITEMS: NavItem[] = [
  { path: '/beranda', label: 'Beranda', stepNum: 1, stepLabel: 'Masalah' },
  { path: '/simulator', label: 'UKD', stepNum: 2, stepLabel: 'Uji' },
  { path: '/penyangga', label: 'Penyangga', stepNum: 3, stepLabel: 'Penyangga' },
  { path: '/peremajaan', label: 'Peremajaan', stepNum: 4, stepLabel: 'Peremajaan' },
  { path: '/laporan', label: 'Laporan', stepNum: 5, stepLabel: 'Laporan' },
  { path: '/siklus', label: 'Siklus', stepNum: 6, stepLabel: 'Siklus' },
  { path: '/rekomendasi', label: 'Rekomendasi', stepNum: 7, stepLabel: 'Rekomendasi' },
];

export type ComponentLetter = 'A' | 'B' | 'D' | 'I';

export interface AbdiComponentMeta {
  letter: ComponentLetter;
  nameId: string;
  nameEn: string;
  roleChip: 'Inti' | 'Pendukung' | 'Fondasi';
  path: string;
  tooltip: string;
}

export const ABDI_COMPONENTS: Record<ComponentLetter, AbdiComponentMeta> = {
  A: {
    letter: 'A',
    nameId: 'Uji kecukupan dana (UKD)',
    nameEn: 'Adequacy',
    roleChip: 'Inti',
    path: '/simulator',
    tooltip: 'Hitung dulu apakah dananya cukup.',
  },
  B: {
    letter: 'B',
    nameId: 'Aturan penyangga',
    nameEn: 'Buffer',
    roleChip: 'Pendukung',
    path: '/penyangga',
    tooltip: 'Saat penerimaan tinggi, sisihkan sebagian.',
  },
  D: {
    letter: 'D',
    nameId: 'Peremajaan berbasis kesiapan',
    nameEn: 'Deliver',
    roleChip: 'Pendukung',
    path: '/peremajaan',
    tooltip: 'Pastikan dana sampai ke kebun yang siap.',
  },
  I: {
    letter: 'I',
    nameId: 'Laporan kinerja, dampak, dan risiko fiskal',
    nameEn: 'Impact',
    roleChip: 'Fondasi',
    path: '/laporan',
    tooltip: 'Nilai hasilnya dan laporkan bersama risikonya.',
  },
};

export const ABDI_COMPONENT_ORDER: ComponentLetter[] = ['A', 'B', 'D', 'I'];

export type GlossaryKey =
  | 'B50'
  | 'BPDP'
  | 'Dana Perkebunan'
  | 'Pungutan ekspor'
  | 'Brent'
  | 'UKD'
  | 'Kesenjangan'
  | 'Penyangga'
  | 'β'
  | 'Daya tahan'
  | 'Carry-over'
  | 'Comply-or-explain'
  | 'Peremajaan (PSR)'
  | 'Komite Pengarah';

export const GLOSSARY_TERMS: Record<GlossaryKey, string> = {
  B50: 'Campuran biodiesel 50% dalam solar. Berlaku sejak 1 Juli 2026.',
  BPDP: 'Badan Pengelola Dana Perkebunan, pengelola dana dari pungutan ekspor.',
  'Dana Perkebunan':
    'Dana dari pungutan ekspor sawit, kakao, dan kelapa untuk biodiesel, peremajaan, dan program lain.',
  'Pungutan ekspor': 'Pungutan pada ekspor CPO. Tarif saat ini 12,5%.',
  Brent: 'Patokan harga minyak mentah dunia. Makin murah, selisih harga biodiesel makin besar.',
  UKD: 'Uji Kecukupan Dana: hitung dulu apakah dana cukup sebelum mandat atau alokasi diputuskan.',
  Kesenjangan: 'Selisih ketika belanja lebih besar daripada penerimaan.',
  Penyangga: 'Cadangan yang disisihkan dari surplus nyata untuk tahun penerimaan rendah.',
  β: 'Porsi surplus yang disisihkan.',
  'Daya tahan': 'Berapa tahun saldo penyangga mampu menutup kesenjangan.',
  'Carry-over':
    'Kekurangan bayar yang dicatat dan dibawa ke periode berikutnya, dengan batas waktu.',
  'Comply-or-explain': 'Wajib mengambil tindakan atau menjelaskan secara terbuka mengapa tidak.',
  'Peremajaan (PSR)': 'Penanaman ulang kebun sawit rakyat yang sudah tua.',
  'Komite Pengarah': 'Pemutus kebijakan pengelolaan Dana Perkebunan.',
};

export const SHELL_COPY = {
  brandTitle: 'ABDI',
  brandSubtitle: 'Prototipe Kebijakan Fiskal',
  modeLabel: 'Mode',
  modePemandu: 'Pemandu',
  modeRingkas: 'Ringkas',
  modeInfo: 'Pemandu menampilkan pertanyaan, kesimpulan, dan penghubung antarhalaman. Ringkas menyembunyikannya untuk demo cepat.',
  footerText: 'Prototipe ilustratif PFPBC 2026. Bukan sistem resmi BPDP.',
  footerSourcesLink: 'Sumber dan asumsi',
};

export interface SourceItem {
  title: string;
  tag: 'dokumen resmi' | 'via media';
}

export const SOURCES_DRAWER_COPY = {
  title: 'Sumber dan asumsi',
  subtitle: 'Ringkasan parameter simulasi dan rujukan terbuka',
  closeLabel: 'Tutup',
  sections: {
    asumsi: {
      title: 'Asumsi',
      badge: '8 parameter',
      items: [
        'Insentif B50: Rp41,3 T (Brent US$85), Rp30 T (US$100), dan Rp25 T (US$115), interpolasi linear per segmen.',
        'Penerimaan dasar pungutan ekspor: Rp41,22 T (skenario tertekan −20% menjadi Rp32,98 T; tinggi Rp47,67 T).',
        'Alokasi peremajaan (PSR): Rp3,63 T per tahun sebagai batas minimum.',
        'Pos belanja lainnya (X): bawaan Rp0 T (rentang uji Rp0–3 T).',
        'Saldo awal penyangga: Rp9,20 T (batas atas saldo tercatat Rp18,45 T sebelum konfirmasi kas bebas).',
        'Porsi penyisihan saat surplus (β): bawaan 50% (opsi 25%–75%).',
        'Rata-rata penerimaan pembanding: Rp27,25 T berjeda (opsi rata-rata 3 tahun Rp31,91 T).',
        'Kesetaraan tarif: 1 poin tarif ≈ penerimaan ÷ 12,5.',
      ],
    },
    sumber: {
      title: 'Sumber',
      badge: '10 rujukan',
      items: [
        { title: 'Laporan Kinerja & Keuangan BPDPKS 2021–2024', tag: 'dokumen resmi' },
        { title: 'Perpres No. 132/2024 tentang Pengelolaan Dana Perkebunan', tag: 'dokumen resmi' },
        { title: 'PP No. 74/2012 tentang Pengelolaan Keuangan BLU', tag: 'dokumen resmi' },
        { title: 'PMK No. 9/2026 tentang Kenaikan Tarif Pungutan Ekspor CPO Menjadi 12,5%', tag: 'dokumen resmi' },
        { title: 'Usulan PMK Baru tentang Tata Kelola Kas Penyangga BLU', tag: 'via media' },
        { title: 'Nota Keuangan & RAPBN 2026 (Kementerian Keuangan)', tag: 'dokumen resmi' },
        { title: 'Statistik Perkebunan Indonesia (Ditjenbun 2024)', tag: 'dokumen resmi' },
        { title: 'Indeks Harga Pasar Biodiesel & Solar (Kementerian ESDM 2026)', tag: 'dokumen resmi' },
        { title: 'Target Mandatori B50 1 Juli 2026 & Kebutuhan Insentif', tag: 'via media' },
        { title: 'Audit Kepatuhan Saldo Kas BLU Perkebunan (BPK RI)', tag: 'via media' },
        { title: 'Laporan Perkembangan PSR Serikat Petani Kelapa Sawit', tag: 'via media' },
      ] as SourceItem[],
    },
    caraBaca: {
      title: 'Cara membaca angka',
      badge: '3 prinsip',
      items: [
        'Angka simulasi bersifat ilustratif.',
        'Angka bertanda Data contoh diganti data BPDP bila tersedia.',
        'Hasil dibaca sebagai asosiasi, bukan sebab-akibat.',
      ],
    },
  },
};

export const PAGE_INTROS = {
  simulator: {
    question: 'Apakah dana cukup untuk membayar B50 dan peremajaan?',
    howToRead: 'Geser asumsi di kiri. Banner berubah hijau, kuning, atau merah.',
  },
  penyangga: {
    question: 'Bagaimana menyiapkan bantalan untuk tahun yang sulit?',
    howToRead: 'Pilih kondisi tiap tahun. Grafik menunjukkan saldo bantalan.',
  },
  peremajaan: {
    question: 'Mengapa dana peremajaan lambat sampai ke kebun?',
    howToRead:
      "Ikuti tahapan dari usulan sampai tanaman hidup. Bagian 'Dana dilindungi' adalah usulan ABDI.",
  },
  laporan: {
    question: 'Bagaimana hasilnya diukur dan dilaporkan?',
    howToRead:
      'Semua angka merupakan contoh ilustrasi (bukan data resmi BPDP). Tiga lampu menunjukkan kondisi fiskal, pekebun, dan tata kelola.',
  },
  siklus: {
    question: 'Bagaimana keempat komponen bekerja bersama?',
    howToRead: 'Ikuti panah searah jarum jam, lalu lihat siapa yang memutuskan.',
  },
  rekomendasi: {
    question: 'Apa yang perlu diputuskan sekarang?',
    howToRead: 'Tiga keputusan, urut dari yang paling dekat.',
  },
};

export const BRIDGES = {
  beranda: {
    sentence: 'Sekarang coba sendiri: ubah asumsi dan lihat kapan dana tidak cukup.',
    nextLabel: 'Berikutnya: Uji kecukupan →',
    nextPath: '/simulator',
  },
  simulator: {
    sentence:
      'Jika ada kesenjangan, dari mana sumbernya? Salah satu jawabannya: menabung saat surplus.',
    prevPath: '/beranda',
    prevLabel: '← Kembali',
    nextLabel: 'Berikutnya: Penyangga →',
    nextPath: '/penyangga',
  },
  penyangga: {
    sentence: 'Dana yang cukup belum tentu sampai ke kebun. Bagaimana memastikannya?',
    prevPath: '/simulator',
    prevLabel: '← Kembali',
    nextLabel: 'Berikutnya: Peremajaan →',
    nextPath: '/peremajaan',
  },
  peremajaan: {
    sentence: 'Bagaimana kita tahu semuanya berjalan? Lewat laporan yang bisa diperiksa.',
    prevPath: '/penyangga',
    prevLabel: '← Kembali',
    nextLabel: 'Berikutnya: Laporan →',
    nextPath: '/laporan',
  },
  laporan: {
    sentence: 'Keempat komponen tadi bekerja sebagai satu siklus tahunan.',
    prevPath: '/peremajaan',
    prevLabel: '← Kembali',
    nextLabel: 'Berikutnya: Siklus →',
    nextPath: '/siklus',
  },
  siklus: {
    sentence: 'Apa yang perlu diputuskan sekarang?',
    prevPath: '/laporan',
    prevLabel: '← Kembali',
    nextLabel: 'Berikutnya: Rekomendasi →',
    nextPath: '/rekomendasi',
  },
  rekomendasi: {
    sentence: 'Pilih langkah lanjutan untuk meninjau simulasi atau memulai alur dari awal.',
    prevPath: '/simulator',
    prevLabel: 'Kembali ke simulator',
    nextLabel: 'Ulangi dari awal',
    nextPath: '/beranda',
  },
};

export const BERANDA_COPY = {
  headline: 'Cukupkah dana sebelum B50 diputuskan?',
  sublineBeforeBpdp: 'Pungutan ekspor sawit membiayai biodiesel ',
  sublineMid: ' dan peremajaan kebun rakyat. ABDI menguji apakah uangnya cukup sebelum keputusan diambil.',
  ctaPrimary: 'Mulai dari masalah ↓',
  ctaSecondary: 'Langsung ke simulator',
  miniDemo: {
    title: 'Coba: geser harga minyak',
    revLabel: 'Penerimaan',
    revValue: 'Rp41,22 T',
    needLabel: 'Kebutuhan B50',
    caption: 'Makin murah minyak, makin besar subsidi biodiesel yang dibutuhkan.',
  },
  moneyFlow: {
    title: 'Alur uang',
    caption: 'Satu dana, dua tugas besar.',
    nodes: [
      { id: 'ekspor', label: 'Ekspor sawit' },
      { id: 'bpdp', label: 'Pungutan dikumpulkan BPDP' },
      { id: 'dana', label: 'Dana Perkebunan' },
      { id: 'belanja', label: 'Biodiesel B50 dan peremajaan kebun' },
    ],
  },
  summary30s: {
    title: 'Ringkasan 30 detik',
    cards: [
      {
        label: 'Masalah',
        text: 'Mandat B50 bisa menyerap hampir seluruh penerimaan dana, dan belum ada kewajiban menguji kecukupannya.',
      },
      {
        label: 'Usulan',
        text: 'ABDI: uji kecukupan dana, sisihkan surplus, lindungi dana peremajaan, dan laporkan dampaknya tiap tahun.',
      },
      {
        label: 'Hasil',
        text: 'Kesenjangan terlihat lebih awal dan sumber penutup diputuskan secara terbuka.',
      },
    ],
  },
  tiles: [
    {
      value: '±90%',
      label: 'dana ke biodiesel (2021–2023)',
      info: 'Sebagian besar dana perkebunan periode 2021–2023 terserap untuk insentif biodiesel.',
      tone: 'primary' as const,
    },
    {
      value: '47 rb ha',
      label: 'peremajaan per tahun, target 180 rb',
      info: 'Rata-rata realisasi tahunan Peremajaan Sawit Rakyat (2020–2024) di bawah target 180 ribu ha.',
      tone: 'tertiary' as const,
    },
    {
      value: '1 Juli 2026',
      label: 'B50 berlaku',
      info: 'Jadwal penerapan mandatori B50 yang diuji kecukupan dananya sebelum ditetapkan.',
      tone: 'neutral' as const,
    },
  ],
  journeyTitle: 'Peta perjalanan',
  pillars: [
    {
      letter: 'A' as ComponentLetter,
      title: 'Uji kecukupan dana (UKD)',
      english: 'Adequacy',
      badge: 'Inti',
      sentence: 'Hitung dulu apakah dananya cukup.',
      path: '/simulator',
    },
    {
      letter: 'B' as ComponentLetter,
      title: 'Aturan penyangga',
      english: 'Buffer',
      badge: 'Pendukung',
      sentence: 'Saat penerimaan tinggi, sisihkan sebagian.',
      path: '/penyangga',
    },
    {
      letter: 'D' as ComponentLetter,
      title: 'Peremajaan berbasis kesiapan',
      english: 'Deliver',
      badge: 'Pendukung',
      sentence: 'Pastikan dana sampai ke kebun yang siap.',
      path: '/peremajaan',
    },
    {
      letter: 'I' as ComponentLetter,
      title: 'Laporan kinerja, dampak, dan risiko fiskal',
      english: 'Impact',
      badge: 'Fondasi',
      sentence: 'Nilai hasilnya dan laporkan bersama risikonya.',
      path: '/laporan',
    },
  ],
};

export const SIMULATOR_COPY = {
  letter: 'A',
  title: 'Uji Kecukupan Dana (UKD)',
  badge: 'Model Fiskal 2026',
  assumptionsTitle: 'Asumsi kebijakan',
  resetLabel: 'Setel ulang asumsi',
  scenarioTitle: 'Skenario makro',
  advancedTitle: 'Asumsi lanjutan',
  sliders: {
    brent: {
      label: 'Minyak Brent',
      info: 'Patokan harga minyak dunia; makin tinggi Brent, selisih harga biodiesel makin kecil.',
    },
    penerimaan: {
      label: 'Penerimaan',
      info: 'Proyeksi pungutan ekspor sawit dalam satu tahun anggaran.',
    },
    peremajaan: {
      label: 'Peremajaan (PSR)',
      info: 'Alokasi wajib Peremajaan Sawit Rakyat agar tidak terdesak subsidi energi.',
    },
    saldo: {
      label: 'Saldo penyangga',
      info: 'Saldo cadangan kas yang dapat dipakai menutup defisit sementara.',
    },
    lainnya: {
      label: 'Belanja lainnya (X)',
      info: 'Alokasi riset, SDM, dan sarana prasarana di luar B50 dan peremajaan.',
    },
    beta: {
      label: 'Porsi disisihkan (β)',
      info: 'Persentase kelebihan penerimaan di atas rata-rata yang disisihkan saat surplus.',
    },
    rataRata: {
      label: 'Rata-rata pembanding',
      info: 'Ambang penerimaan berjeda (Rp27,25 T) atau rata-rata 3 tahun (Rp31,91 T).',
    },
  },
  kpis: {
    need: {
      label: 'Kebutuhan B50',
      sub: 'Insentif selisih harga biodiesel',
      info: 'Dihitung linear per segmen pada Brent US$85 / 100 / 115.',
    },
    belanja: {
      label: 'Total belanja',
      sub: 'B50 + PSR + Lainnya',
      info: 'Total kewajiban penyaluran tahunan Dana Perkebunan.',
    },
    net: {
      label: 'Saldo tahunan',
      info: 'Penerimaan dikurangi total belanja tahunan.',
    },
  },
  chart: {
    title: 'Penerimaan dibanding belanja tahun ini',
    breakEvenInfo: 'Harga Brent minimum agar penerimaan menutup total belanja.',
    revLabel: 'Penerimaan',
    spendLabel: 'Alokasi belanja',
  },
  levers: {
    title: 'Tiga cara menutup kesenjangan',
    subtitle: 'Pilihan kebijakan terbuka',
    tarifSub: 'Penyesuaian pungutan ekspor',
    tarifInfo: 'Perkiraan kenaikan poin tarif pungutan setara untuk menutup kesenjangan.',
    apbnSub: 'Dukungan anggaran negara',
    apbnInfo: 'Tambahan belanja APBN bila tarif dan penyangga tidak mencukupi.',
    bufferSub: 'Serap cadangan kas internal',
    bufferInfo: 'Lama waktu saldo penyangga mampu menutup defisit tahunan berjalan.',
  },
  matrixTitle: 'Bandingkan skenario (K1–K4)',
  matrixInfo: 'Klik baris skenario untuk memuat angka ke simulator.',
};

export const PENYANGGA_COPY = {
  letter: 'B',
  title: 'Sisihkan saat surplus',
  formulaInfo: 'R = maks(0, min[β × (Penerimaan − Rata-rata), Surplus])',
  unverifiedChip: 'Saldo Rp18,45 T belum dikonfirmasi',
  unverifiedInfo: 'Saldo tercatat perlu rekonsiliasi antara komitmen berjalan dan kas bebas BLU.',
  betaLabel: 'Porsi disisihkan (β)',
  avgDefLabel: 'Definisi rata-rata',
  avgBerjeda: 'Berjeda (Rp27,25 T)',
  avgTigaTahun: '3 tahun (Rp31,91 T)',
  avgInfo: 'Menentukan ambang penerimaan sebelum porsi β disisihkan ke penyangga.',
  yearsLabel: 'Skenario tahunan (2027–2031)',
  yearsHint: 'Tekan untuk ubah',
  chartEyebrow: 'Proyeksi penyangga',
  chartTitle: 'Saldo penyangga dari tahun ke tahun (2027–2031)',
  chartUnit: 'Satuan: Triliun Rupiah (T)',
  chartInfo: 'Tahun surplus menambah cadangan sebesar R; tahun defisit menarik maksimal sebesar saldo tersedia.',
  legalTitle: 'Jalur regulasi',
  legalHint: 'Perlu konfirmasi regulasi',
  legalCards: [
    { title: 'Keputusan Komite', info: 'Komite Pengarah menetapkan besaran β tahunan dalam RKAP.' },
    { title: 'Usulan PMK baru kas BLU', info: 'PMK baru yang diusulkan untuk pencadangan dan penarikan saldo kas penyangga BLU (belum terbit).' },
    { title: 'Revisi Perpres', info: 'Harmonisasi tata kelola penyangga lintas siklus harga komoditas.' },
  ],
  sensitivityTitle: 'Tabel sensitivitas',
};

export const PEREMAJAAN_COPY = {
  letter: 'D',
  title: 'Dana sampai ke kebun siap',
  processChip: 'Proses dan hasil antara, bukan dampak',
  processInfo: 'Mengukur kelancaran antrean lahan dan serapan termin, bukan dampak jangka panjang.',
  dataContohLabel: 'Data contoh',
  dataContohInfo: 'Angka simulasi per tahap untuk menguji alur; diganti data BPDP bila tersedia.',
  heroTiles: [
    {
      label: 'Realisasi historis',
      value: '47',
      unit: 'rb ha',
      sub: 'rata-rata 2020–2024 (2025: 37,5 rb)',
      info: 'Rata-rata realisasi tahunan PSR periode 2020–2024 sebesar 47 rb ha; realisasi tahun 2025 tercatat 37,5 rb ha.',
    },
    {
      label: 'Laju siap tanam',
      unit: 'rb ha',
      sub: 'laju Jan–Agu 2026 disetahunkan',
      info: 'Ekstrapolasi laju tahunan berdasarkan capaian Jan–Agu 2026 (bukan target). Target paper: 120–180 rb ha/tahun.',
    },
    {
      label: 'Durasi backlog',
      value: '±40',
      unit: 'tahun',
      sub: '2,4 juta ha kebun tua',
      info: 'Estimasi durasi penuntasan 2,4 juta ha kebun sawit rakyat yang perlu peremajaan pada laju historis.',
    },
  ],
  pipelineTitle: 'Rantai kesiapan penyaluran',
  pipelineBadge: '5 tahap',
  pipelineHint: 'Ubah angka contoh untuk simulasi antrean',
  commoditiesTitle: 'Capaian saat ini dibanding target tahunan',
  commodities: {
    sawit: {
      label: 'Sawit',
      area: '2,4',
      areaUnit: 'juta ha',
      areaNote: 'Backlog kebun rakyat tua (paper)',
      target: '120–180 rb',
      targetUnit: 'ha/thn',
      targetNote: 'Kebutuhan Rp7,2–10,8 T (@Rp60 jt/ha)',
      bars: [
        { name: 'Realisasi 2025', value: 37.5, max: 180, unit: 'rb ha' },
        { name: 'Rata-rata 2020–2024', value: 47, max: 180, unit: 'rb ha' },
        { name: 'Laju Jan–Agu 2026', value: 60.7, max: 180, unit: 'rb ha' },
      ],
    },
    kakao: {
      label: 'Kakao',
      area: '1,37',
      areaUnit: 'juta ha',
      areaNote: 'Contoh ilustrasi (non-sawit)',
      target: '5.000',
      targetUnit: 'ha/thn',
      targetNote: 'Sambung pucuk & rehabilitasi (contoh)',
      bars: [
        { name: 'Realisasi saat ini', value: 1.2, max: 5, unit: 'rb ha' },
        { name: 'Target hipotetis', value: 4.1, max: 5, unit: 'rb ha' },
      ],
    },
    kelapa: {
      label: 'Kelapa',
      area: '3,36',
      areaUnit: 'juta ha',
      areaNote: 'Contoh ilustrasi (non-sawit)',
      target: '8.000',
      targetUnit: 'ha/thn',
      targetNote: 'Varietas genjah unggul (contoh)',
      bars: [
        { name: 'Realisasi saat ini', value: 1.85, max: 8, unit: 'rb ha' },
        { name: 'Target hipotetis', value: 6.8, max: 8, unit: 'rb ha' },
      ],
    },
  },
  pilotTitle: 'Rencana pilot 2–3 kabupaten (target hipotetis)',
  pilotBadge: 'Target hipotetis',
  pilotNote:
    'Target hipotetis untuk bukti proses; target resmi baru ditetapkan setelah baseline 2027 tersedia (bukan hasil pilot yang sudah berjalan).',
  pilotRows: [
    { indikator: 'Waktu verifikasi', pilot: '6 bulan', pembanding: '18 bulan', selisih: '−66% durasi' },
    { indikator: 'Hektar tertanam', pilot: '85% target', pembanding: '34% target', selisih: '+51 poin' },
    { indikator: 'Tanaman hidup (12 bln)', pilot: '92%', pembanding: '68%', selisih: '+24 poin' },
  ],
};

export const LAPORAN_COPY = {
  letter: 'I',
  title: 'Laporan tahunan',
  dataContohChip: 'Contoh ilustrasi',
  dataContohInfo:
    'Seluruh angka laporan 2026–2028 bersifat contoh ilustrasi (bukan realisasi resmi BPDP) untuk menunjukkan format evaluasi tahunan.',
  assocChip: 'Asosiasi, bukan sebab-akibat',
  assocInfo: 'Menunjukkan keterkaitan indikator tanpa klaim sebab-akibat langsung.',
  projTitle: 'Penerimaan yang direncanakan dibanding yang masuk',
  projSub: 'Arus kas kumulatif (Triliun Rupiah · contoh ilustrasi)',
  carryTitle: 'Kekurangan bayar yang dibawa antar kuartal',
  carrySub: 'Batas waktu maksimal 6 bulan (Triliun Rupiah · contoh ilustrasi)',
  carryLimitLabel: 'Batas 6 bln',
  loopTitle: 'Umpan balik kebijakan',
  decisionsTitle: 'Daftar keputusan (contoh ilustrasi)',
  conclusion:
    'Tiga lampu ini memberi satu gambaran tahunan contoh ilustrasi yang bisa diperiksa dan masuk ke uji kecukupan tahun depan.',
};

export const SIKLUS_COPY = {
  kicker: 'Tata kelola ABDI',
  title: 'Siklus pengambilan keputusan',
  badge: 'Siklus tertutup tahunan',
  diagramTitle: 'Alur kebijakan A → B → D → I',
  nodes: [
    {
      letter: 'A',
      phase: 'Fase 1',
      title: 'Uji kecukupan',
      summary: 'Simulasi celah fiskal sebelum mandat.',
      cta: 'Buka UKD',
      path: '/simulator',
    },
    {
      letter: 'B',
      phase: 'Fase 2',
      title: 'Penyangga kas',
      summary: 'Sisihkan surplus untuk tahun sulit.',
      cta: 'Buka Penyangga',
      path: '/penyangga',
    },
    {
      letter: 'D',
      phase: 'Fase 3',
      title: 'Peremajaan siap',
      summary: 'Lindungi dana untuk lahan siap tanam.',
      cta: 'Buka Peremajaan',
      path: '/peremajaan',
    },
    {
      letter: 'I',
      phase: 'Fase 4',
      title: 'Laporan dampak',
      summary: 'Evaluasi tahunan masuk ke UKD.',
      cta: 'Buka Laporan',
      path: '/laporan',
    },
  ],
  beforeAfterTitle: 'Sebelum dan sesudah',
  beforeAfterRows: [
    { aspect: '1. Mandat biodiesel', before: 'Tanpa uji kecukupan', after: 'Wajib UKD multi-tahun' },
    { aspect: '2. Surplus pungutan', before: 'Tidak disisihkan baku', after: 'Disisihkan rumus β' },
    { aspect: '3. Celah anggaran', before: 'Diputuskan saat krisis', after: 'Opsi jelas di muka' },
    { aspect: '4. Dana peremajaan', before: '6–24 bulan tertunda', after: 'Dikunci di tahap siap' },
    { aspect: '5. Evaluasi tahunan', before: 'Serapan administratif', after: 'Kinerja & umpan balik' },
    { aspect: '6. Batas insentif', before: 'Tanpa batas terbuka', after: 'Rumus terbuka transparan' },
  ],
  rolesTitle: 'Siapa memutuskan',
  rolesHint: 'Ketuk peran untuk melihat batas wewenang',
  roles: [
    { name: 'Komite Pengarah', role: 'Penentu arah', detail: 'Menetapkan pedoman UKD, besaran β, dan alokasi prioritas tahunan.' },
    { name: 'Menteri Keuangan', role: 'Otoritas fiskal', detail: 'Menyetujui penyesuaian tarif pungutan ekspor dan dukungan APBN.' },
    { name: 'BPDP & BKF', role: 'Pengelola & analis', detail: 'Menjalankan model UKD, rekening penyangga, dan rekonsiliasi saldo.' },
    { name: 'Kementerian ESDM', role: 'Otoritas energi', detail: 'Menyelaraskan kuota mandatori biodiesel dengan hasil uji UKD.' },
    { name: 'Evaluator Independen', role: 'Pengawas eksternal', detail: 'Mengaudit pilot peremajaan serta memvalidasi laporan tahunan.' },
  ],
  legalTitle: 'Dasar hukum',
  legalItems: [
    { code: 'Perpres 132/2024', status: 'Siap', note: 'Payung pengelolaan dana perkebunan lintas komoditas.' },
    { code: 'PP 74/2012', status: 'Siap', note: 'Kerangka BLU untuk rekening cadangan multi-tahun.' },
    { code: 'PMK 9/2026', status: 'Siap', note: 'Kenaikan tarif pungutan ekspor CPO menjadi 12,5%.' },
    { code: 'PMK Baru Kas BLU', status: 'Diusulkan', note: 'Usulan aturan kas penyangga BLU & uji kecukupan berkala (belum memiliki dasar hukum).' },
  ],
  conclusion:
    'Hasil laporan masuk ke uji kecukupan tahun berikutnya, jadi siklusnya terus belajar.',
};

export const REKOMENDASI_COPY = {
  title: 'Tiga keputusan untuk Komite Pengarah.',
  cards: [
    {
      num: '01',
      title: 'Tetapkan pedoman UKD',
      summary: 'Uji kecukupan sebelum mandat berubah.',
      info: 'Setiap peningkatan campuran biodiesel wajib melewati simulasi UKD sebelum kuota ditetapkan.',
    },
    {
      num: '02',
      title: 'Putuskan saldo 2026',
      summary: 'Setelah definisinya dikonfirmasi.',
      info: 'Konfirmasi kas bebas terhadap Rp18,45 T tercatat agar batas daya tahan valid.',
    },
    {
      num: '03',
      title: 'Mulai pilot peremajaan',
      summary: '2–3 kabupaten dengan pembanding.',
      info: 'Uji dana terlindungi pada tahap siap tanam dengan kabupaten pembanding selama 12–18 bulan.',
    },
  ],
  timelineTitle: 'Linimasa keputusan',
  timeline: [
    { period: 'Segera', label: 'UKD pertama', active: true, info: 'Dijalankan sebelum keputusan implementasi B50 Juli 2026.' },
    { period: '2027', label: 'Keputusan Komite', active: false, info: 'Penetapan porsi β penyangga dan konfirmasi saldo BLU.' },
    { period: '2028–2029', label: 'Evaluasi pilot', active: false, info: 'Penilaian hasil pilot peremajaan 2–3 kabupaten.' },
    { period: '2030+', label: 'Revisi Perpres', active: false, info: 'Pelembagaan permanen siklus ABDI dalam regulasi.' },
  ],
  outcomesTitle: 'Dampak sasaran',
  outcomes: [
    { title: 'Dana terencana', sdg: 'SDG 16.6', info: 'Lembaga publik yang efektif, akuntabel, dan transparan.' },
    { title: 'Penyangga terisi', sdg: 'SDG 17.1', info: 'Penguatan kapasitas fiskal dan sumber daya domestik.' },
    { title: 'Peremajaan lancar', sdg: 'SDG 2.3', info: 'Peningkatan produktivitas dan pendapatan pekebun rakyat.' },
    { title: 'Biodiesel terjaga', sdg: 'SDG 7.2', info: 'Bauran energi terbarukan terjaga tanpa mengorbankan dana.' },
  ],
  conclusion: 'Tiga keputusan ini bisa dimulai dari Komite Pengarah sebelum alokasi 2027.',
};
