import { z } from 'zod'; 

import { FastifyPluginAsync, FastifyRequest } from 'fastify';

import { SummonerProfileRoute } from '@truerank/shared/routes';

import { Summoners } from '../domain/Summoners';
import { SummonerAdapter } from '../domain/Summoners/summonerAdapter';

type SummonerProfileRequest = FastifyRequest<{
  Querystring: z.infer<NonNullable<typeof SummonerProfileRoute.query>>;
}>;

export const summonerProfile: FastifyPluginAsync = async (fastify) => {
  fastify.get(
    SummonerProfileRoute.path,
    async (request: SummonerProfileRequest, reply) => {
      const { summonerName, summonerTag } = request.query;

      if (!summonerName || !summonerTag) {
        return reply
          .status(400)
          .send({ error: 'summonerName and summonerTag are required' });
      }

      const riotApiKey = fastify.config.RIOT_API_KEY;
      const profile = await Summoners.Features.getSummonerProfile(
        {
          summonerName,
          summonerTag,
        },
        {
          summonerAdapter: new SummonerAdapter(riotApiKey),
        }
      );

      return profile;
    }
  );
};
