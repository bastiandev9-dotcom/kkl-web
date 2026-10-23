import { describe, expect, it } from 'vitest';
import { resolvePhoto } from './images';

describe('resolvePhoto', () => {
  it('mengembalikan undefined jika foto belum tersedia', () => {
    expect(resolvePhoto()).toBeUndefined();
    expect(resolvePhoto('foto-yang-belum-ada.jpg')).toBeUndefined();
  });
});
