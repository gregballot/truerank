import { z } from 'zod';
import {
  type SummonerData,
  type SummonerMatchData,
} from '../types/domain';

export const SummonerProfileRoute = {
  method: 'GET',
  path: '/summoner',
  query: z.object({
    summonerName: z.string(),
    summonerTag: z.string(),
  }),
  response: z.custom<SummonerData>(),
};

export const SummonerMatchesRoute = {
  method: 'GET',
  path: '/matches',
  query: z.object({
    summonerName: z.string(),
    summonerTag: z.string(),
  }),
  response: z.array(z.custom<SummonerMatchData>()),
};
