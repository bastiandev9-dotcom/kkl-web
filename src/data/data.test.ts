import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { agenda } from './agenda';
import { destinasi } from './destinations';
import { models } from './models';
import { anggota } from './members';
import { catatanIndustri } from './industry-notes';
import { galeri } from './gallery';
import { info } from './info';
import { rute } from './route';
import { tentang } from './about';
import credits from './credits.json';

describe('agenda', () => {
  it('memuat lima hari sesuai urutan', () => {
    expect(agenda.map((hari) => hari.nomor)).toEqual([1, 2, 3, 4, 5]);
  });

  it('mempertahankan teks dan urutan khusus dari PDF', () => {
    expect(agenda[1]?.item[0]?.jam).toBe('Dini hari');
    expect(agenda[1]?.item[2]?.kegiatan).toBe('Perjalana menuju Joger Luwus');
    expect(agenda[3]?.hariLabel).toBe('Jum;at');
    expect(agenda[3]?.item[3]?.jam).toBe('11.00-13.00');
    expect(agenda[3]?.item[4]?.jam).toBe('11.00');
  });

  it('mempertahankan jam yang bentrok tanpa sorting', () => {
    const hariKetiga = agenda[2]?.item.filter((item) => item.jam === '18.00-19.00');
    expect(hariKetiga).toHaveLength(2);
  });

  it('hanya merujuk destinasi yang ada', () => {
    const ids = new Set(destinasi.map((item) => item.id));

    for (const hari of agenda) {
      for (const item of hari.item) {
        if (item.destinasiId) {
          expect(ids.has(item.destinasiId)).toBe(true);
        }
      }
    }
  });
});

describe('destinasi', () => {
  it('mendukung perjalanan lintas hari', () => {
    const penyeberangan = destinasi.find((item) => item.id === 'ketapang-gilimanuk');
    expect(penyeberangan?.hari).toEqual([1, 2, 4]);
    expect(penyeberangan?.kategori).toBe('perjalanan');
  });

  it('memuat sepuluh destinasi utama', () => {
    expect(destinasi).toHaveLength(10);
  });
});

describe('model 3D', () => {
  it('hanya memakai tiga file GLB yang tersedia', () => {
    const files = models.filter((model) => model.file).map((model) => model.key);
    expect(files).toEqual(['ulun-danu', 'candi-bentar', 'patung-pandawa']);
  });

  it('selalu memiliki fallback yang valid', () => {
    for (const model of models) {
      expect(['procedural', 'icon']).toContain(model.fallback);
    }
  });

  it('menyertakan generator untuk setiap fallback procedural', () => {
    for (const model of models.filter((item) => item.fallback === 'procedural')) {
      expect(model.proceduralId).toBeTruthy();
    }
  });

  it('menunjuk file GLB yang tersedia', () => {
    for (const model of models.filter((item) => item.file)) {
      const filePath = fileURLToPath(new URL(`../../public${model.file}`, import.meta.url));
      expect(existsSync(filePath)).toBe(true);
    }
  });
});

describe('konten pendukung', () => {
  it('memuat sepuluh anggota dummy', () => {
    expect(anggota).toHaveLength(10);
  });

  it('memuat catatan untuk dua kunjungan industri', () => {
    expect(catatanIndustri).toHaveLength(2);
    expect(catatanIndustri.every((note) => note.tanyaJawab.length > 0)).toBe(true);
  });

  it('menyiapkan galeri kosong untuk fase dokumentasi', () => {
    expect(galeri).toEqual([]);
  });

  it('memuat rute dan info perjalanan', () => {
    expect(rute).toHaveLength(9);
    expect(rute[0]?.jenis).toBe('awal');
    expect(rute.at(-1)?.jenis).toBe('akhir');
    expect(info.tips.length).toBeGreaterThan(0);
    expect(tentang.jalur).toHaveLength(2);
  });

  it('mencatat tiga kredit aset 3D', () => {
    expect(credits).toHaveLength(3);
  });
});
