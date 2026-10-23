export function formatHari(hari: number[]): string {
  if (hari.length === 1) {
    return `Hari ${hari[0]}`;
  }

  return `Hari ${hari.join(', ')}`;
}

export function initials(nama: string): string {
  return nama
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((bagian) => bagian[0]?.toUpperCase() ?? '')
    .join('');
}

export function roman(nomor: number): string {
  const angka = ['', 'I', 'II', 'III', 'IV', 'V'];
  return angka[nomor] ?? String(nomor);
}
