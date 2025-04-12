import { z } from 'zod';
import {
  type SummonerDetails,
  type SummonerMatchData,
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

export const SummonerMatchesRoute = {
  method: 'GET',
  path: '/matches',
  query: z.object({
    summonerName: z.string(),
    summonerTag: z.string(),
    invalidateCache: z.boolean().optional(),
  }),
  response: z.array(z.custom<SummonerMatchData>()),
};
