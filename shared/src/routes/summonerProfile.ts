import { z } from 'zod';
import { zStringBoolean } from './helpers.js';

import { type SummonerDetails } from '../types/domain';

export const SummonerProfileRoute = {
  method: 'GET',
  path: '/summoner',
  query: z.object({
    summonerName: z.string(),
    summonerTag: z.string(),
    invalidateCache: zStringBoolean().optional(),
  }),
  response: z.custom<SummonerDetails>(),
};
