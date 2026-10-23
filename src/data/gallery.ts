import type { JenisKegiatan } from './agenda';

export interface FotoGaleri {
  src: string;
  alt: string;
  hari: number;
  jenis: JenisKegiatan;
  keterangan?: string;
}

export const galeri: FotoGaleri[] = [];
