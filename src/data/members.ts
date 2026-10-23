export interface Anggota {
  nama: string;
  nim: string;
  peran: string;
}

export const anggota: Anggota[] = [
  { nama: 'Ahmad Fauzi', nim: '22100001', peran: 'Ketua' },
  { nama: 'Bella Putri Anjani', nim: '22100002', peran: 'Wakil Ketua' },
  { nama: 'Citra Lestari', nim: '22100003', peran: 'Sekretaris' },
  { nama: 'Dimas Pratama', nim: '22100004', peran: 'Bendahara' },
  { nama: 'Eka Nur Safitri', nim: '22100005', peran: 'Dokumentasi' },
  { nama: 'Fajar Ramadhan', nim: '22100006', peran: 'Logistik' },
  { nama: 'Gita Maharani', nim: '22100007', peran: 'Acara' },
  { nama: 'Hendra Saputra', nim: '22100008', peran: 'Humas' },
  { nama: 'Intan Permata', nim: '22100009', peran: 'Konsumsi' },
  { nama: 'Joko Prasetyo', nim: '22100010', peran: 'Publikasi' },
];
