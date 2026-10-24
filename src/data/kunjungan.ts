export type VisitCategory = 'manufaktur' | 'kreatif' | 'green';

export interface VisitFilter {
  value: 'semua' | VisitCategory;
  label: string;
}

export interface VisitInsight {
  icon: string;
  title: string;
  description: string;
}

export interface Visit {
  id: string;
  category: VisitCategory;
  categoryLabel: string;
  badgePosition: 'left' | 'right';
  eyebrow: string;
  eyebrowIcon: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  date: string;
  meta: string;
  imageTitle?: string;
  imageSubtitle?: string;
  insights: VisitInsight[];
  tags: string[];
  cta?: {
    label: string;
    href: string;
    icon: string;
    tone: 'brand' | 'accent';
  };
  layout: 'feature' | 'map';
  muted?: boolean;
  reverse?: boolean;
}

export interface Competency {
  number: string;
  icon: string;
  title: string;
  description: string;
  course: string;
  tone: 'brand' | 'accent' | 'rose';
}

export interface ReadinessMetric {
  label: string;
  value: number;
  tone: 'brand' | 'accent';
}

export const kunjungan = {
  hero: {
    eyebrow: 'Observasi Teknologi & Industri',
    title: 'Eksplorasi Industri & Manufaktur',
    description:
      'Dokumentasi kunjungan industri & observasi lapangan KKL Bali Prodi Informatika UPGRIS 18-22 Agustus 2026. Menelaah implementasi otomatisasi pabrik, teknologi produksi cerdas, dan ekosistem digital nasional.',
    metrics: [
      { label: 'Entitas Industri', value: '3 Sektor' },
      { label: 'Durasi Kunjungan', value: '5 Hari' },
      { label: 'Peserta Riset', value: '128 Mhs' },
    ],
  },
  filters: [
    { value: 'semua', label: 'Semua Kunjungan' },
    { value: 'manufaktur', label: 'Otomatisasi & Manufaktur' },
    { value: 'kreatif', label: 'Industri Kreatif & Digital' },
    { value: 'green', label: 'Green Data & Smart Island' },
  ] satisfies VisitFilter[],
  visits: [
    {
      id: 'victoria-care',
      category: 'manufaktur',
      categoryLabel: 'Manufaktur & Otomasi',
      badgePosition: 'left',
      eyebrow: 'Pabrik Produksi Utama & Lab QC',
      eyebrowIcon: 'building',
      title: 'PT. Victoria Care Indonesia Tbk',
      description:
        'Observasi mendalam mengenai implementasi teknologi automasi industri modern, pipeline rantai pasok berbasis Enterprise Resource Planning (ERP), dan tata kelola higienitas berstandar internasional (GMP/CPKB). Mahasiswa mempelajari bagaimana sensor IoT dan sistem PLC terprogram mengendalikan formulasi dan pengemasan produk massal secara presisi.',
      image: '/images/kunjungan/victoria-care-factory.jpg',
      imageAlt:
        'Lini produksi otomatis dengan lengan robotik di PT Victoria Care Indonesia',
      date: 'Senin, 18 Agustus 2026 · 09.30 WIB',
      meta: 'Batch 01',
      insights: [
        {
          icon: 'bot',
          title: 'Otomatisasi Lini Produksi & Robotic Packaging',
          description: 'Penyortiran optik berkecepatan tinggi dan lengan robotik terintegrasi.',
        },
        {
          icon: 'network',
          title: 'Integrasi ERP & Manajemen Supply Chain Real-time',
          description: 'Sinkronisasi batch produksi langsung ke cloud warehouse database.',
        },
        {
          icon: 'radio',
          title: 'Quality Assurance Berbasis Sensor IoT',
          description: 'Telemetri sensor suhu, kelembaban, dan viskositas cairan secara otomatis.',
        },
      ],
      tags: ['Otomatisasi', 'Manajemen Industri', 'IoT & Sensor', 'Supply Chain'],
      cta: {
        label: 'Buka Modul Dokumentasi Teknis',
        href: '#unduh-laporan',
        icon: 'arrow-right',
        tone: 'brand',
      },
      layout: 'feature',
    },
    {
      id: 'bdi-denpasar',
      category: 'kreatif',
      categoryLabel: 'Edukasi & Diklat Kreatif',
      badgePosition: 'right',
      eyebrow: 'Kementerian Perindustrian RI · Creative Hub',
      eyebrowIcon: 'book-open',
      title: 'Balai Diklat Industri (BDI) Denpasar',
      description:
        'Kunjungan edukatif ke pusat pengembangan industri kreatif terkemuka di Bali. Berdiskusi langsung dengan praktisi mengenai ekosistem digital, pelatihan animasi 3D, rancang bangun engine game, serta peran inkubator bisnis dalam melatih talenta lokal untuk memenuhi standar industri global di era transformasi digital.',
      image: '/images/kunjungan/bdi-creative-lab.jpg',
      imageAlt:
        'Mahasiswa dan mentor berdiskusi di laboratorium animasi BDI Denpasar',
      date: 'Kamis, 20 Agustus 2026 · 13.00 WITA',
      meta: 'Tohpati Denpasar',
      insights: [
        {
          icon: 'rocket',
          title: 'Inkubasi Bisnis Startup & Creative Hub',
          description: 'Fasilitas pendampingan teknis dan akselerasi studio game independen.',
        },
        {
          icon: 'cube',
          title: 'Pipeline Produksi Animasi 3D & Pemrograman Game',
          description: 'Pemanfaatan rendering farm terpusat dan pipeline game modern.',
        },
        {
          icon: 'badge-check',
          title: 'Sertifikasi Kompetensi SKKNI Multimedia',
          description: 'Standardisasi keahlian pemrograman grafis berskala internasional.',
        },
      ],
      tags: ['Digital & Kreatif', 'Inkubasi Bisnis', 'Animasi & Game', 'Standar Industri'],
      cta: {
        label: 'Lihat Rangkuman Materi Diklat',
        href: '#unduh-laporan',
        icon: 'external-link',
        tone: 'accent',
      },
      layout: 'feature',
      muted: true,
      reverse: true,
    },
    {
      id: 'kura-kura-bali',
      category: 'green',
      categoryLabel: 'KEK Kura Kura Bali',
      badgePosition: 'left',
      eyebrow: '',
      eyebrowIcon: 'map-pin',
      title: 'Kura Kura Bali Tech & Innovation Hub',
      description:
        'Menelusuri pengembangan infrastruktur green data center, smart micro-grid, dan implementasi teknologi ramah lingkungan terdesentralisasi di kawasan Pulau Serangan. Diskusi interaktif bersama pengelola smart island berfokus pada arsitektur data berkelanjutan dan konektivitas pita lebar ultra-rendah emisi karbon.',
      image: '/images/kunjungan/kura-kura-bali.png',
      imageAlt: 'Peta kawasan Kura Kura Bali di Denpasar Selatan',
      date: 'Rabu, 19 Agustus 2026 · 14.30 WITA',
      meta: 'Denpasar Selatan',
      imageTitle: 'Denpasar Selatan, Bali',
      imageSubtitle: 'Kawasan Ekonomi Khusus Teknologi & Keberlanjutan',
      insights: [
        {
          icon: 'leaf',
          title: 'Green Data Center',
          description: 'Pusat komputasi efisiensi tinggi berbasis energi terbarukan terpadu.',
        },
        {
          icon: 'network',
          title: 'Smart City Grid',
          description: 'Topologi fiber-optik redundan dan sensor pemantauan lingkungan terintegrasi.',
        },
      ],
      tags: ['Smart City', 'Green Tech', 'Infrastruktur Jaringan', 'Sustainability'],
      layout: 'map',
    },
  ] satisfies Visit[],
  competencies: [
    {
      number: '01',
      icon: 'bot',
      title: 'Automasi & IoT Pabrik',
      description:
        'Pemahaman arsitektur kontroler logika terprogram (PLC), integrasi mikrokontroler sensor industri, dan protokol komunikasi serial dalam jalur perakitan massal.',
      course: 'Sistem Tertanam & IoT',
      tone: 'brand',
    },
    {
      number: '02',
      icon: 'palette',
      title: 'Ekosistem Creative Digital',
      description:
        'Penguasaan alur kerja industri animasi dan game modern, rendering pipeline 3D, manajemen aset multimedia, serta lisensi kekayaan intelektual (IP) digital.',
      course: 'Grafika Komputer & Game Dev',
      tone: 'accent',
    },
    {
      number: '03',
      icon: 'chart',
      title: 'Enterprise ERP & Cloud Systems',
      description:
        'Analisis tata kelola rantai pasok cerdas, audit integritas basis data terdistribusi, serta penyelarasan proses bisnis manufaktur dengan analitik prediktif.',
      course: 'Manajemen Sistem Informasi',
      tone: 'rose',
    },
  ] satisfies Competency[],
  readiness: [
    { label: 'Otomatisasi & Robotik (PLC)', value: 94, tone: 'brand' },
    { label: 'Konektivitas Cloud & ERP', value: 88, tone: 'brand' },
    { label: 'Green Energy & Smart Grid', value: 79, tone: 'accent' },
  ] satisfies ReadinessMetric[],
  report: {
    eyebrow: 'Arsip Teknis & Modul Observasi',
    title: 'Unduh Laporan Komparasi Industri KKL Bali 2026',
    description:
      'Dapatkan ringkasan studi kasus komprehensif, bagan arsitektur PLC sensorik dari PT. Victoria Care Indonesia, dan kurikulum pelatihan dari BDI Denpasar dalam format dokumen PDF resmi.',
    downloadLabel: 'Unduh Laporan Lengkap (PDF 18 MB)',
    secondaryLabel: 'Lihat Agenda 5 Hari',
    secondaryHref: '/jadwal-perjalanan',
  },
} as const;
