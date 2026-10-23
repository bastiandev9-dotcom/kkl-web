import { createCandiBentar } from './candiBentar';
import { createMeru } from './meru';
import { createPenjor } from './penjor';

export const proceduralFactories = {
  meru: createMeru,
  candiBentar: createCandiBentar,
  penjor: createPenjor,
};

export type ProceduralId = keyof typeof proceduralFactories;

export function isProceduralId(id: string): id is ProceduralId {
  return id in proceduralFactories;
}
