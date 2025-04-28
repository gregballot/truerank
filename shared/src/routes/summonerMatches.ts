import { z } from 'zod';
import { zStringBoolean } from './helpers.js';

import type { SummonerMatchesRecap, SummonerMatchDetails } from '../types/domain';

export const QueueFilters = [
  'all',
  'ranked-solo',
  'ranked-flex',
  'aram',
  'normal-draft',
  'swiftplay',
  'normal-blind',
] as const;

export type QueueFilter = typeof QueueFilters[number];

export const SummonerMatchesRoute = {
  method: 'GET',
  path: '/matches',
  query: z.object({
    summonerName: z.string(),
    summonerTag: z.string(),
    filter: z.enum(QueueFilters),
    page: z.coerce.number().positive().optional(),
    invalidateCache: zStringBoolean().optional(),
  }),
  response: z.object({
    page: z.number().positive(),
    count: z.number().positive(),
    matchesData: z.array(z.custom<SummonerMatchDetails>()),
    recap: z.custom<SummonerMatchesRecap>(),
  }),
};
