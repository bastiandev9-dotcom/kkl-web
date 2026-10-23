import { describe, expect, it } from 'vitest';
import { formatHari, initials, roman } from './format';

describe('format', () => {
  it('memformat hari tunggal dan lintas hari', () => {
    expect(formatHari([1])).toBe('Hari 1');
    expect(formatHari([1, 2, 4])).toBe('Hari 1, 2, 4');
  });

  it('mengambil inisial nama', () => {
    expect(initials('Bella Putri Anjani')).toBe('BP');
  });

  it('mengubah nomor hari menjadi angka romawi', () => {
    expect(roman(3)).toBe('III');
    expect(roman(9)).toBe('9');
  });
});
