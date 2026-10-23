export type JenisKegiatan =
  | 'perjalanan'
  | 'kunjungan'
  | 'wisata'
  | 'makan'
  | 'belanja'
  | 'budaya'
  | 'istirahat'
  | 'transit';

export interface ItemAgenda {
  jam: string;
  kegiatan: string;
  jenis: JenisKegiatan;
  lokasi?: string;
  destinasiId?: string;
}

export interface Hari {
  nomor: 1 | 2 | 3 | 4 | 5;
  hariLabel: string;
  tanggal: string;
  zona: 'WIB' | 'WITA' | 'WITA-WIB';
  judul: string;
  item: ItemAgenda[];
}

export const agenda: Hari[] = [
  {
    nomor: 1,
    hariLabel: 'Selasa',
    tanggal: '18 Ags',
    zona: 'WIB',
    judul: 'Hari I Semarang (WIB)',
    item: [
      {
        jam: '06.00-07.00',
        kegiatan: 'Persiapan pemberangkatan di Kampus 1 UPGRIS',
        jenis: 'transit',
      },
      {
        jam: '07.00-08.00',
        kegiatan: 'Perjalanan menuju Kunjungan di PT. Victoria care Indonesia',
        jenis: 'perjalanan',
        destinasiId: 'victoria-care',
      },
      {
        jam: '08.00-09.00',
        kegiatan: 'Kunjungan di PT. Victoria care Indonesia',
        jenis: 'kunjungan',
        destinasiId: 'victoria-care',
      },
      {
        jam: '09.00-12.00',
        kegiatan: 'Perjalanan menuju R.M. Titin Caruban',
        jenis: 'perjalanan',
      },
      {
        jam: '12.00-13.00',
        kegiatan: 'Menikmati R.M. Titin Caruban',
        jenis: 'makan',
      },
      {
        jam: '13.00-18.00',
        kegiatan:
          'Melanjutkan perjalanan menuju Pulau Dewata Bali (Singgah di R.M. Puritama untuk makan malam)',
        jenis: 'perjalanan',
      },
      {
        jam: '23.00',
        kegiatan: 'Diharapkan telah tiba di Pelabuhan Ketapang',
        jenis: 'perjalanan',
        destinasiId: 'ketapang-gilimanuk',
      },
    ],
  },
  {
    nomor: 2,
    hariLabel: 'Rabu',
    tanggal: '19 Ags',
    zona: 'WITA',
    judul: 'Hari II Denpasar (WITA)',
    item: [
      {
        jam: 'Dini hari',
        kegiatan:
          'Dini hari diharapkan telah menyebrang ke pelabuhan Gilimanuk-Bali dan melanjutkan perjalanan menuju Hotel Made Bali',
        jenis: 'perjalanan',
        destinasiId: 'ketapang-gilimanuk',
      },
      {
        jam: '05.00-08.00',
        kegiatan: 'Transit dan makan pagi di Hotel Made Bali',
        jenis: 'transit',
      },
      {
        jam: '08.00-09.30',
        kegiatan: 'Perjalana menuju Joger Luwus',
        jenis: 'perjalanan',
        destinasiId: 'joger',
      },
      {
        jam: '09.30-11.00',
        kegiatan: 'Eksplorasi pabrik Kata-kata Joger Luwus',
        jenis: 'wisata',
        destinasiId: 'joger',
      },
      {
        jam: '11.00-11.30',
        kegiatan: 'Perjalanan menuju Candi Kuning Ulundanu Bratan',
        jenis: 'perjalanan',
        destinasiId: 'ulun-danu',
      },
      {
        jam: '11.30-12.30',
        kegiatan: 'Eksplorasi Candi Kuning',
        jenis: 'wisata',
        destinasiId: 'ulun-danu',
      },
      {
        jam: '12.30-13.30',
        kegiatan: 'Menikmati makan siang di Ulundanu Beratan',
        jenis: 'makan',
        destinasiId: 'ulun-danu',
      },
      {
        jam: '13.30-16.00',
        kegiatan: 'Perjalanan menuju Dewata Oleh-oleh khas bali',
        jenis: 'perjalanan',
      },
      {
        jam: '16.00-18.00',
        kegiatan: 'Menikmati makan malam dan belanja Oleh-oleh khas Bali di Dewata',
        jenis: 'belanja',
      },
      {
        jam: '18.00-19.00',
        kegiatan: 'Perjalanan menuju Nusa Dua',
        jenis: 'perjalanan',
        destinasiId: 'devdan',
      },
      {
        jam: '19.00-20.00',
        kegiatan: 'Eksplorasi pertunjukan Tari Devdan Show',
        jenis: 'budaya',
        destinasiId: 'devdan',
      },
      {
        jam: '20.00-21.00',
        kegiatan: 'Perjalanan menuju Hotel Quest san Denpasar****',
        jenis: 'perjalanan',
      },
      {
        jam: '20.00-',
        kegiatan: 'Check in Hotel Quest san Denpasar**** dilanjutkan istirahat malam',
        jenis: 'istirahat',
      },
    ],
  },
  {
    nomor: 3,
    hariLabel: 'Kamis',
    tanggal: '20 Ags',
    zona: 'WITA',
    judul: 'Hari III Denpasar (WITA)',
    item: [
      {
        jam: '05.30-08.00',
        kegiatan: 'Breakfast di Hotel Quest san Denpasar****',
        jenis: 'makan',
      },
      {
        jam: '08.00-09.00',
        kegiatan: 'Perjalanan menuju Kunjungan Balai Diklat Industri Denpasar',
        jenis: 'perjalanan',
        destinasiId: 'balai-diklat',
      },
      {
        jam: '09.00-10.30',
        kegiatan: 'Kunjungan di Balai Diklat Industri Denpasar',
        jenis: 'kunjungan',
        destinasiId: 'balai-diklat',
      },
      {
        jam: '10.30-11.00',
        kegiatan: 'Perjalanan menuju Krisna Oleh-oleh khas bali',
        jenis: 'perjalanan',
      },
      {
        jam: '11.00-13.00',
        kegiatan: 'Menikmati makan siang dan belanja Oleh-oleh khas Bali di Krisna Sunset road',
        jenis: 'belanja',
      },
      {
        jam: '13.00-14.00',
        kegiatan: 'Perjalanan Menuju Pantai Kuta',
        jenis: 'perjalanan',
        destinasiId: 'kuta',
      },
      {
        jam: '14.00-15.30',
        kegiatan: 'Eksplorasi Pantai Kuta',
        jenis: 'wisata',
        destinasiId: 'kuta',
      },
      {
        jam: '15.30-16.00',
        kegiatan: 'Perjalanan Menuju Pantai Pandawa',
        jenis: 'perjalanan',
        destinasiId: 'pandawa',
      },
      {
        jam: '16.00-17.30',
        kegiatan: 'Eksplorasi Pantai Pandawa',
        jenis: 'wisata',
        destinasiId: 'pandawa',
      },
      {
        jam: '17.30-18.00',
        kegiatan: 'Persiapan menuju tempat pementasan Tari Kecak di Pandawa',
        jenis: 'transit',
        destinasiId: 'kecak',
      },
      {
        jam: '18.00-19.00',
        kegiatan: 'Eksplorasi budaya Tari Kecak di Pandawa',
        jenis: 'budaya',
        destinasiId: 'kecak',
      },
      {
        jam: '18.00-19.00',
        kegiatan: 'Melanjutkan perjalanan menuju Cafe "Tepi Pantai" di Jimbaran',
        jenis: 'perjalanan',
        destinasiId: 'jimbaran',
      },
      {
        jam: '19.00-21.30',
        kegiatan: 'Menikmati dinner dilanjutkan makrab di Cafe "Tepi Pantai" di Jimbaran',
        jenis: 'makan',
        destinasiId: 'jimbaran',
      },
      {
        jam: '21.30-22.30',
        kegiatan: 'Melanjutkan perjalanan menuju Hotel Quest san Denpasar****',
        jenis: 'perjalanan',
      },
      {
        jam: '22.30-',
        kegiatan: 'Istirahat',
        jenis: 'istirahat',
      },
    ],
  },
  {
    nomor: 4,
    hariLabel: 'Jum;at',
    tanggal: '21 Ags',
    zona: 'WITA-WIB',
    judul: 'Hari IV Denpasar-Semarang (WITA-WIB)',
    item: [
      {
        jam: '05.00-06.00',
        kegiatan: 'Persiapan pribadi',
        jenis: 'transit',
      },
      {
        jam: '06.00-08.00',
        kegiatan: 'Breakfast Hotel Quest san Depansar****dan chek out',
        jenis: 'makan',
      },
      {
        jam: '10.30-11.00',
        kegiatan: 'Perjalanan menuju Karang kurnia Oleh-oleh khas bali',
        jenis: 'perjalanan',
      },
      {
        jam: '11.00-13.00',
        kegiatan: 'Belanja Oleh-oleh khas Bali di Karang kurnia',
        jenis: 'belanja',
      },
      {
        jam: '11.00',
        kegiatan:
          'Dilanjutkan perjalanan menuju Pelabuhan Gilimanuk (Singgah makan siang di RM. Soka Indah)',
        jenis: 'perjalanan',
        destinasiId: 'ketapang-gilimanuk',
      },
      {
        jam: '17.00',
        kegiatan:
          'Sore hari diharapkan telah menyeberang pelabuhan ketapang untuk meneruskan perjalanan ke Semarang',
        jenis: 'perjalanan',
        destinasiId: 'ketapang-gilimanuk',
      },
      {
        jam: '20.00-21.30',
        kegiatan: 'Singgah sejenak di Local Resto untuk makan malam',
        jenis: 'makan',
      },
      {
        jam: '21.30',
        kegiatan: 'Melanjutkan perjalanan pulang ke Semarang',
        jenis: 'perjalanan',
      },
    ],
  },
  {
    nomor: 5,
    hariLabel: 'Sabtu',
    tanggal: '22 Ags',
    zona: 'WIB',
    judul: 'Hari V Semarang (WIB)',
    item: [
      {
        jam: '05.00',
        kegiatan: 'Pagi hari diharapkan telah tiba di Kampus Tercinta UPGRIS',
        jenis: 'transit',
      },
    ],
  },
];
