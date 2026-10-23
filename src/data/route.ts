export type JenisRute = 'awal' | 'kota' | 'pelabuhan' | 'tujuan' | 'akhir';

export interface LangkahRute {
  id: string;
  label: string;
  detail: string;
  jenis: JenisRute;
}

export const rute: LangkahRute[] = [
  {
    id: 'semarang',
    label: 'Semarang',
    detail: 'Kampus 1 UPGRIS',
    jenis: 'awal',
  },
  {
    id: 'caruban',
    label: 'Caruban',
    detail: 'R.M. Titin Caruban',
    jenis: 'kota',
  },
  {
    id: 'ketapang',
    label: 'Ketapang',
    detail: 'Pelabuhan Ketapang',
    jenis: 'pelabuhan',
  },
  {
    id: 'gilimanuk',
    label: 'Gilimanuk',
    detail: 'Pelabuhan Gilimanuk',
    jenis: 'pelabuhan',
  },
  {
    id: 'denpasar',
    label: 'Denpasar',
    detail: 'Hotel dan kunjungan industri',
    jenis: 'kota',
  },
  {
    id: 'nusa-dua',
    label: 'Nusa Dua',
    detail: 'Devdan Show',
    jenis: 'tujuan',
  },
  {
    id: 'pandawa',
    label: 'Pandawa',
    detail: 'Pantai dan Tari Kecak',
    jenis: 'tujuan',
  },
  {
    id: 'jimbaran',
    label: 'Jimbaran',
    detail: 'Dinner dan makrab',
    jenis: 'tujuan',
  },
  {
    id: 'semarang-pulang',
    label: 'Semarang',
    detail: 'Kampus 1 UPGRIS',
    jenis: 'akhir',
  },
];
