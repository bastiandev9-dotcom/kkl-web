import type { JenisKegiatan } from '../data/agenda';

interface ActivityMeta {
  label: string;
  className: string;
}

export const activityMeta: Record<JenisKegiatan, ActivityMeta> = {
  perjalanan: {
    label: 'Perjalanan',
    className: 'border-line bg-surface text-fg-muted',
  },
  kunjungan: {
    label: 'Kunjungan industri',
    className: 'border-brand bg-brand text-on-brand',
  },
  wisata: {
    label: 'Wisata',
    className: 'border-accent bg-accent text-fg',
  },
  makan: {
    label: 'Makan',
    className: 'border-warning/30 bg-warning-subtle text-fg',
  },
  belanja: {
    label: 'Belanja',
    className: 'border-line-strong bg-surface-2 text-fg',
  },
  budaya: {
    label: 'Budaya',
    className: 'border-info/30 bg-info-subtle text-fg',
  },
  istirahat: {
    label: 'Istirahat',
    className: 'border-brand/20 bg-brand-subtle text-brand',
  },
  transit: {
    label: 'Transit',
    className: 'border-line bg-surface text-fg-muted',
  },
};
