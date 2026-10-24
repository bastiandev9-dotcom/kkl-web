export interface HomeHighlight {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  tag: string;
  date: string;
  description: string;
  image: string;
  imageAlt: string;
  href: string;
  detailLabel: string;
}

export interface HomeItinerary {
  day: string;
  date: string;
  title: string;
  description: string;
  activity: string;
  icon: string;
}

export interface HomeReflection {
  quote: string;
  name: string;
  role: string;
  initials: string;
  tone: 'accent' | 'brand';
}

export const home = {
  stats: [
    { value: '5', label: 'Hari', detail: 'Perjalanan', icon: 'dot' },
    { value: '3', label: 'Industri', detail: 'Kunjungan', icon: 'cog' },
    { value: '6', label: 'Destinasi', detail: 'Wisata & Budaya', icon: 'leaf' },
  ],
  highlights: [
    {
      id: 'victoria-care',
      title: 'PT. Victoria Care Indonesia',
      subtitle: 'Semarang - Otomatisasi Sistem Produksi & Logistik',
      category: 'Kunjungan Industri',
      tag: 'Manufaktur',
      date: '18 Agustus 2026',
      description:
        'Mempelajari implementasi teknologi automasi industri modern, pipeline rantai pasok berbasis ERP, dan tata kelola higienitas berstandar internasional.',
      image: '/images/beranda/victoria-care.jpg',
      imageAlt: 'Pabrik manufaktur PT Victoria Care Indonesia',
      href: '/kunjungan-industri',
      detailLabel: 'Detail Studi',
    },
    {
      id: 'kecak',
      title: 'Eksplorasi Tari Kecak',
      subtitle: 'Uluwatu Sunset Amphitheater',
      category: 'Wisata & Budaya',
      tag: 'Budaya',
      date: '20 Agustus 2026',
      description:
        'Menyaksikan mahakarya teatrikal kisah Ramayana berlatar tebing karang dan sang surya terbenam, menyerap nilai harmonisasi kesenian warisan nusantara.',
      image: '/images/beranda/kecak.jpg',
      imageAlt: 'Pertunjukan Tari Kecak di Uluwatu Bali',
      href: '/wisata-budaya',
      detailLabel: 'Detail Pertunjukan',
    },
    {
      id: 'penglipuran',
      title: 'Desa Adat Penglipuran',
      subtitle: 'Kabupaten Bangli - Desa Terbersih',
      category: 'Kearifan Lokal',
      tag: 'Konservasi',
      date: '21 Agustus 2026',
      description:
        'Observasi tata ruang arsitektur tradisional Bali (Tri Hita Karana), sistem pengelolaan sampah terpadu, dan kelestarian hutan bambu komunal.',
      image: '/images/beranda/penglipuran.jpg',
      imageAlt: 'Desa Adat Penglipuran di Bangli Bali',
      href: '/wisata-budaya',
      detailLabel: 'Detail Kunjungan',
    },
  ] satisfies HomeHighlight[],
  itinerary: [
    {
      day: 'HARI 01',
      date: '18 Agu',
      title: 'Pemberangkatan & Industri 1',
      description:
        'Pelepasan dari Kampus IV UPGRIS, transit kunjungan industri PT Victoria Care, dan perjalanan darat menuju Pelabuhan Ketapang.',
      activity: 'Perjalanan Bus AC',
      icon: 'bus',
    },
    {
      day: 'HARI 02',
      date: '19 Agu',
      title: 'Tiba di Bali & IT Hub',
      description:
        'Penyeberangan Gilimanuk, sarapan di Bedugul (Danau Beratan), check-in hotel, dan seminar teknologi di Kura Kura Bali Tech Park.',
      activity: 'Workshop & Studi',
      icon: 'laptop',
    },
    {
      day: 'HARI 03',
      date: '20 Agu',
      title: 'Kearifan Budaya & Bahari',
      description:
        'Studi sistem irigasi Subak Jatiluwih, eksplorasi Pantai Melasti, dan pagelaran epik Tari Kecak Uluwatu saat senja.',
      activity: 'Dokumentasi Budaya',
      icon: 'camera',
    },
    {
      day: 'HARI 04',
      date: '21 Agu',
      title: 'Eksplorasi Desa Adat',
      description:
        'Kunjungan komparatif ke Desa Adat Penglipuran, riset pemberdayaan UMKM lokal, dan belanja cinderamata khas Bali Krisna/Joger.',
      activity: 'Riset & Souvenir',
      icon: 'shopping-bag',
    },
    {
      day: 'HARI 05',
      date: '22 Agu',
      title: 'Perjalanan Kembali',
      description:
        'Penyeberangan kembali ke pulau Jawa, evaluasi materi tugas akhir KKL, dan ketibaan kembali dengan selamat di Semarang.',
      activity: 'Selesai Perjalanan',
      icon: 'check-circle',
    },
  ] satisfies HomeItinerary[],
  reflections: [
    {
      quote:
        'Melihat langsung bagaimana pipeline IoT dan otomasi pabrik beroperasi di lantai industri membuka perspektif baru bagi kami sebagai mahasiswa informatika.',
      name: 'Peserta KKL Informatika',
      role: 'Mahasiswa Informatika 2023',
      initials: 'IF',
      tone: 'accent',
    },
    {
      quote:
        'Kombinasi kunjungan teknologi dan kekayaan budaya Bali membuat KKL ini menjadi pengalaman belajar yang seimbang, berkesan, dan inspiratif.',
      name: 'Dosen Pembimbing Lapangan',
      role: 'Pendamping KKL Informatika',
      initials: 'DP',
      tone: 'brand',
    },
  ] satisfies HomeReflection[],
} as const;
