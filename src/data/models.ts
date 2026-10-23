export interface ModelEntry {
  key: string;
  file?: string;
  fallback: 'procedural' | 'icon';
  proceduralId?: string;
  scale?: number;
  rotationY?: number;
  yOffset?: number;
  credit?: string;
}

export const models: ModelEntry[] = [
  {
    key: 'ulun-danu',
    file: '/models/ulun-danu.glb',
    fallback: 'procedural',
    proceduralId: 'meru',
    credit: 'ulun-danu',
  },
  {
    key: 'candi-bentar',
    file: '/models/candi-bentar.glb',
    fallback: 'procedural',
    proceduralId: 'candiBentar',
    credit: 'candi-bentar',
  },
  {
    key: 'patung-pandawa',
    file: '/models/patung-pandawa.glb',
    fallback: 'icon',
    credit: 'patung-pandawa',
  },
  {
    key: 'bus',
    fallback: 'icon',
  },
  {
    key: 'penjor',
    fallback: 'icon',
  },
  {
    key: 'kampus',
    fallback: 'icon',
  },
  {
    key: 'gedung-industri',
    fallback: 'icon',
  },
  {
    key: 'kapal-ferry',
    fallback: 'icon',
  },
  {
    key: 'tas-belanja',
    fallback: 'icon',
  },
  {
    key: 'topeng-bali',
    fallback: 'icon',
  },
  {
    key: 'papan-selancar',
    fallback: 'icon',
  },
  {
    key: 'penari-kecak',
    fallback: 'icon',
  },
  {
    key: 'seafood',
    fallback: 'icon',
  },
];
