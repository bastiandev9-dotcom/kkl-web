export interface TitikKumpul {
  label: string;
  nilai: string;
  detail: string;
}

export interface Hotel {
  nama: string;
  detail: string;
}

export const info = {
  titikKumpul: {
    label: 'Titik kumpul',
    nilai: 'Kampus 1 UPGRIS, Semarang',
    detail: 'Selasa, 18 Agustus 2026 · 06.00 WIB',
  } satisfies TitikKumpul,
  hotel: [
    {
      nama: 'Hotel Made Bali',
      detail: 'Hari II · transit dan makan pagi',
    },
    {
      nama: 'Hotel Quest San Denpasar****',
      detail: 'Hari II-IV · check in dan istirahat',
    },
  ] satisfies Hotel[],
  tips: [
    'Bawa jaket atau pakaian hangat untuk perjalanan malam.',
    'Siapkan air minum, obat pribadi, dan perlengkapan mandi.',
    'Bawa uang tunai secukupnya untuk kebutuhan pribadi.',
    'Jaga barang bawaan dan dokumen pribadi selama perjalanan.',
    'Gunakan pakaian yang sopan saat mengunjungi tempat ibadah.',
  ],
  catatan:
    'Jadwal dapat berubah sewaktu-waktu sesuai kondisi di lapangan dan atas kesepakatan bersama.',
};
