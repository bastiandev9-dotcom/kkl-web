export interface ModelEntry {
  key: string;
  file?: string;
  fallback: 'procedural' | 'icon';
  proceduralId?: string;
  scale?: number;
  rotationY?: number;
  yOffset?: number;
  poster?: string;
  credit?: string;
}

export const models: ModelEntry[] = [
  {
    key: 'ulun-danu',
    file: '/glb/ulun-danu.glb',
    fallback: 'procedural',
    proceduralId: 'meru',
    poster: '/posters/ulun-danu.svg',
    credit: 'ulun-danu',
  },
  {
    key: 'candi-bentar',
    file: '/glb/candi-bentar.glb',
    fallback: 'procedural',
    proceduralId: 'candiBentar',
    poster: '/posters/candi-bentar.svg',
    credit: 'candi-bentar',
  },
  {
    key: 'patung-pandawa',
    file: '/glb/pandawa-statue.glb',
    fallback: 'icon',
    credit: 'patung-pandawa',
  },
  {
    key: 'bus',
    fallback: 'icon',
  },
  {
    key: 'penjor',
    fallback: 'procedural',
    proceduralId: 'penjor',
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
