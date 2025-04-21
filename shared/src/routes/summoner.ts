import { z } from 'zod';
import {
  SummonerMatchesRecap,
  type SummonerDetails,
  type SummonerMatchDetails,
} from '../types/domain';

export const SummonerProfileRoute = {
  method: 'GET',
  path: '/summoner',
  query: z.object({
    summonerName: z.string(),
    summonerTag: z.string(),
    invalidateCache: z.boolean().optional(),
  }),
  response: z.custom<SummonerDetails>(),
};

export const QueueFilters = [
  'all',
  'ranked-solo',
  'ranked-flex',
  'normal-draft',
  'normal-blind',
  'swiftplay',
] as const;

export type QueueFilter = typeof QueueFilters[number];

export const SummonerMatchesRoute = {
  method: 'GET',
  path: '/matches',
  query: z.object({
    summonerName: z.string(),
    summonerTag: z.string(),
    filter: z.enum(QueueFilters),
    page: z.number().positive().optional(),
    invalidateCache: z.boolean().optional(),
  }),
  response: z.object({
    page: z.number().positive(),
    count: z.number().positive(),
    matchesData: z.array(z.custom<SummonerMatchDetails>()),
    recap: z.custom<SummonerMatchesRecap>(),
  }),
};
