export interface NavigationLink {
  href: string;
  label: string;
}

export const navigation: NavigationLink[] = [
  { href: '/', label: 'Beranda' },
  { href: '/kunjungan-industri', label: 'Kunjungan Industri' },
  { href: '/wisata-budaya', label: 'Wisata & Budaya' },
  { href: '/jadwal-perjalanan', label: 'Jadwal Perjalanan' },
  { href: '/galeri-dokumentasi', label: 'Galeri Dokumentasi' },
];
