import { z } from 'zod'; 

import { FastifyPluginAsync, FastifyRequest } from 'fastify';

import { SummonerMatchesRoute } from '@truerank/shared/routes';

import { Summoners } from '../domain/Summoners';
import { MatchAdapter } from '../domain/Matches/matchAdapter';
import { SummonerAdapter } from '../domain/Summoners/summonerAdapter';

type SummonerMatchesRequest = FastifyRequest<{
  Querystring: z.infer<NonNullable<typeof SummonerMatchesRoute.query>>;
}>;

export const summonerMatches: FastifyPluginAsync = async (fastify) => {
  fastify.get(
    SummonerMatchesRoute.path,
    async (request: SummonerMatchesRequest, reply) => {
      const { summonerName, summonerTag, page, invalidateCache } = request.query;

      if (!summonerName || !summonerTag) {
        return reply
          .status(400)
          .send({ error: 'summonerName and summonerTag are required' });
      }

      const riotApiKey = fastify.config.RIOT_API_KEY;
      const response = await Summoners.Features.getSummonerMatches(
        {
          summonerName,
          summonerTag,
          page,
          invalidateCache,
        },
        {
          matchAdapter: new MatchAdapter(riotApiKey),
          summonerAdapter: new SummonerAdapter(riotApiKey),
        }
      );

      return response;
    }
  );
};
