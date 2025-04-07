import { z } from 'zod';
import { type SummonerMatchData } from '../types/domain';

export const SummonerMatchesRoute = {
  method: 'GET',
  path: '/matches',
  query: z.object({
    summonerName: z.string(),
    summonerTag: z.string(),
  }),
  response: z.array(z.custom<SummonerMatchData>()),
};
