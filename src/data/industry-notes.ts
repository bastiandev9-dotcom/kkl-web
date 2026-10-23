export interface TanyaJawab {
  tanya: string;
  jawab: string;
}

export interface CatatanIndustri {
  destinasiId: string;
  profil: string;
  yangDiamati: string[];
  teknologi: string[];
  tanyaJawab: TanyaJawab[];
  refleksi: string;
}

export const catatanIndustri: CatatanIndustri[] = [
  {
    destinasiId: 'victoria-care',
    profil:
      'PT. Victoria Care Indonesia adalah perusahaan manufaktur produk perawatan tubuh dan kosmetik. Catatan ini masih berupa draf dan akan dilengkapi setelah kunjungan.',
    yangDiamati: [
      'Alur penerimaan bahan baku hingga produk siap dikemas.',
      'Penerapan standar kebersihan dan pengendalian mutu di area produksi.',
      'Proses pengemasan dan pelabelan produk.',
    ],
    teknologi: [
      'Sistem pencatatan produksi dan persediaan.',
      'Pemindaian kode produk untuk pelacakan batch.',
      'Sensor dan otomasi pada sebagian lini produksi.',
    ],
    tanyaJawab: [
      {
        tanya: 'Bagaimana perusahaan menjaga konsistensi kualitas antar-batch?',
        jawab: 'Draf jawaban — lengkapi dari sesi tanya jawab.',
      },
      {
        tanya: 'Sistem informasi apa yang dipakai untuk melacak produksi?',
        jawab: 'Draf jawaban — lengkapi dari sesi tanya jawab.',
      },
    ],
    refleksi:
      'Draf refleksi — lengkapi dengan pembelajaran utama kelompok setelah kunjungan.',
  },
  {
    destinasiId: 'balai-diklat',
    profil:
      'Balai Diklat Industri Denpasar merupakan unit pelaksana pelatihan di bawah Kementerian Perindustrian. Catatan ini masih berupa draf dan akan dilengkapi setelah kunjungan.',
    yangDiamati: [
      'Program pelatihan yang diselenggarakan untuk mendukung kompetensi industri.',
      'Fasilitas praktik dan peralatan yang digunakan peserta pelatihan.',
      'Keterkaitan kompetensi lulusan dengan kebutuhan dunia industri.',
    ],
    teknologi: [
      'Sistem informasi pelatihan dan peserta.',
      'Peralatan praktik berbasis industri.',
      'Media pembelajaran digital.',
    ],
    tanyaJawab: [
      {
        tanya: 'Bagaimana kurikulum pelatihan disesuaikan dengan kebutuhan industri?',
        jawab: 'Draf jawaban — lengkapi dari sesi tanya jawab.',
      },
      {
        tanya: 'Teknologi apa yang paling banyak digunakan di fasilitas praktik?',
        jawab: 'Draf jawaban — lengkapi dari sesi tanya jawab.',
      },
    ],
    refleksi:
      'Draf refleksi — lengkapi dengan pembelajaran utama kelompok setelah kunjungan.',
  },
];
