import { FastifyPluginAsync, FastifyRequest } from 'fastify';
import { Summoners } from '../domain/Summoners';
import { MatchAdapter } from '../domain/Matches/adapters/matchAdapter';
import { SummonerAdapter } from '../domain/Summoners/adapters/summonerAdapter';

export const TrueMatchesRoute = {
  path: '/matches',
  method: 'GET',
};

type TrueMatchesRequest = FastifyRequest<{
  Querystring: {
    summonerName: string;
    region: string;
  };
}>;

export const trueMatches: FastifyPluginAsync = async (fastify) => {
  fastify.get(
    TrueMatchesRoute.path,
    async (request: TrueMatchesRequest, reply) => {
      const riotApiKey = fastify.config.RIOT_API_KEY;
      if (!riotApiKey) {
        throw new Error('RIOT_API_KEY is not set');
      }

      const { summonerName, region } = request.query;

      if (!summonerName || !region) {
        return reply
          .status(400)
          .send({ error: 'summonerName and region are required' });
      }

      const matches = await Summoners.Features.getSummonerMatches(
        {
          summonerName,
          region,
        },
        {
          matchAdapter: new MatchAdapter(riotApiKey),
          summonerAdapter: new SummonerAdapter(riotApiKey),
        }
      );

      return matches;
    }
  );
};
