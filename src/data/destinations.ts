export type KategoriDestinasi =
  | 'industri'
  | 'wisata'
  | 'budaya'
  | 'belanja'
  | 'kuliner'
  | 'perjalanan';

export interface Destinasi {
  id: string;
  nama: string;
  hari: number[];
  kategori: KategoriDestinasi;
  deskripsi: string;
  catatanBelajar?: string;
  foto?: string;
  model3d?: string;
}

export const destinasi: Destinasi[] = [
  {
    id: 'victoria-care',
    nama: 'PT. Victoria Care Indonesia',
    hari: [1],
    kategori: 'industri',
    deskripsi:
      'Kunjungan industri ke perusahaan manufaktur produk perawatan tubuh dan kosmetik di Semarang. Mahasiswa mengamati proses produksi, pengemasan, dan pengendalian mutu.',
    catatanBelajar:
      'Melihat bagaimana standar produksi, kebersihan, dan pencatatan mutu diterapkan di industri manufaktur.',
    model3d: 'gedung-industri',
  },
  {
    id: 'ketapang-gilimanuk',
    nama: 'Penyeberangan Ketapang-Gilimanuk',
    hari: [1, 2, 4],
    kategori: 'perjalanan',
    deskripsi:
      'Penyeberangan Selat Bali dari Pelabuhan Ketapang menuju Pelabuhan Gilimanuk, penghubung perjalanan darat antara Jawa dan Bali.',
    model3d: 'kapal-ferry',
  },
  {
    id: 'joger',
    nama: 'Joger Luwus (Pabrik Kata-kata)',
    hari: [2],
    kategori: 'wisata',
    deskripsi:
      'Pabrik kata-kata dan oleh-oleh khas Bali di Luwus, Tabanan. Tempat ini dikenal dengan produk kaos dan aksesori dengan kalimat khas.',
    catatanBelajar:
      'Mengamati bagaimana identitas merek dibangun lewat bahasa, desain, dan pengalaman berkunjung.',
    model3d: 'tas-belanja',
  },
  {
    id: 'ulun-danu',
    nama: 'Ulun Danu Beratan (Candi Kuning)',
    hari: [2],
    kategori: 'wisata',
    deskripsi:
      'Pura Ulun Danu Beratan yang berdiri di tepi Danau Beratan, Candi Kuning, Bedugul. Salah satu ikon wisata Bali yang sering muncul di media promosi.',
    catatanBelajar:
      'Melihat keterkaitan situs budaya, lanskap alam, dan pengelolaan kawasan wisata.',
    model3d: 'ulun-danu',
  },
  {
    id: 'devdan',
    nama: 'Devdan Show, Nusa Dua',
    hari: [2],
    kategori: 'budaya',
    deskripsi:
      'Pertunjukan seni dan budaya Nusantara di Nusa Dua yang memadukan tari, musik, dan teknologi panggung.',
    catatanBelajar:
      'Mengamati penggunaan pencahayaan, tata panggung, dan multimedia dalam pertunjukan budaya.',
    model3d: 'topeng-bali',
  },
  {
    id: 'balai-diklat',
    nama: 'Balai Diklat Industri Denpasar',
    hari: [3],
    kategori: 'industri',
    deskripsi:
      'Kunjungan industri ke Balai Diklat Industri Denpasar untuk melihat fasilitas pelatihan dan keterkaitan kompetensi dengan kebutuhan industri.',
    catatanBelajar:
      'Melihat bagaimana program pelatihan dirancang untuk menjembatani kompetensi lulusan dan kebutuhan dunia industri.',
    model3d: 'gedung-industri',
  },
  {
    id: 'kuta',
    nama: 'Pantai Kuta',
    hari: [3],
    kategori: 'wisata',
    deskripsi:
      'Pantai Kuta di Badung, destinasi wisata pantai yang ikonik dengan garis pantai panjang dan aktivitas wisata yang padat.',
    catatanBelajar:
      'Mengamati pengelolaan kawasan wisata, kebersihan, dan interaksi wisatawan dengan lingkungan.',
    model3d: 'papan-selancar',
  },
  {
    id: 'pandawa',
    nama: 'Pantai Pandawa',
    hari: [3],
    kategori: 'wisata',
    deskripsi:
      'Pantai Pandawa di Kutuh, Badung, dikenal dengan tebing kapur dan deretan patung Pandawa di sepanjang pantai.',
    catatanBelajar:
      'Melihat bagaimana elemen budaya dan lanskap dipadukan dalam pengembangan destinasi wisata.',
    model3d: 'patung-pandawa',
  },
  {
    id: 'kecak',
    nama: 'Tari Kecak, Pandawa',
    hari: [3],
    kategori: 'budaya',
    deskripsi:
      'Pertunjukan Tari Kecak di Pandawa pada sore hari, menampilkan paduan suara pria dan cerita tradisi Bali.',
    catatanBelajar:
      'Mengamati struktur pertunjukan, peran suara, dan keterlibatan penonton dalam pertunjukan.',
    model3d: 'penari-kecak',
  },
  {
    id: 'jimbaran',
    nama: 'Cafe "Tepi Pantai", Jimbaran',
    hari: [3],
    kategori: 'kuliner',
    deskripsi:
      'Dinner dan malam keakraban di cafe tepi Pantai Jimbaran, menjadi penutup rangkaian kegiatan Hari III.',
    model3d: 'seafood',
  },
];
