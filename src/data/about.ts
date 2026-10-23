export interface JalurKegiatan {
  judul: string;
  deskripsi: string;
  kategori: 'industri' | 'budaya';
}

export const tentang = {
  eyebrow: 'Tentang KKL',
  judul: 'Belajar dari industri, mengenal budaya Bali',
  paragraf: [
    'Kuliah Kerja Lapangan (KKL) Prodi Informatika Universitas PGRI Semarang tahun 2026 membawa mahasiswa ke Bali untuk melihat langsung praktik industri dan kekayaan budaya setempat.',
    'Perjalanan lima hari ini menggabungkan kunjungan industri, eksplorasi destinasi wisata, dan kegiatan budaya. Seluruh rangkaian kegiatan didokumentasikan dalam website ini agar dapat dibaca kembali oleh mahasiswa, dosen, dan publik.',
  ],
  jalur: [
    {
      judul: 'Kunjungan industri',
      deskripsi:
        'Mengamati proses produksi, sistem informasi, standar mutu, dan praktik kerja di PT. Victoria Care Indonesia serta Balai Diklat Industri Denpasar.',
      kategori: 'industri',
    },
    {
      judul: 'Wisata dan budaya',
      deskripsi:
        'Mengenal destinasi dan pertunjukan budaya Bali, mulai dari Ulun Danu Beratan, Joger, Devdan Show, Pantai Kuta, Pantai Pandawa, hingga Tari Kecak.',
      kategori: 'budaya',
    },
  ] satisfies JalurKegiatan[],
};
