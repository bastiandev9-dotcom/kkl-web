import { describe, expect, it } from 'vitest';
import { asset } from './assets';

describe('asset', () => {
  it('menghasilkan path publik absolut', () => {
    expect(asset('/models/ulun-danu.glb')).toBe('/models/ulun-danu.glb');
  });

  it('membiarkan URL eksternal apa adanya', () => {
    expect(asset('https://example.com/model.glb')).toBe('https://example.com/model.glb');
  });
});
