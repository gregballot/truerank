import { z } from 'zod'; 

import { FastifyPluginAsync, FastifyRequest } from 'fastify';

import { SummonerProfileRoute } from '@truerank/shared/routes';

import { Summoners } from '../domain/Summoners';
import { SummonerAdapter } from '../domain/Summoners/summonerAdapter';
import { validateQuery } from './helpers';

type SummonerProfileRequest = FastifyRequest<{
  Querystring: z.infer<NonNullable<typeof SummonerProfileRoute.query>>;
}>;

export const summonerProfile: FastifyPluginAsync = async (fastify) => {
  fastify.get(
    SummonerProfileRoute.path,
    async (request: SummonerProfileRequest) => {
      const {
        summonerName,
        summonerTag,
        invalidateCache,
      } = validateQuery(SummonerProfileRoute.query, request.query);

      const riotApiKey = fastify.config.RIOT_API_KEY;
      const profile = await Summoners.Features.getSummonerProfile(
        {
          summonerName,
          summonerTag,
          invalidateCache,
        },
        {
          summonerAdapter: new SummonerAdapter(riotApiKey),
        }
      );

      return profile;
    }
  );
};
