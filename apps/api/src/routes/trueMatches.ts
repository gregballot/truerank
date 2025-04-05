import { FastifyPluginAsync, FastifyRequest } from 'fastify';
import { Summoners } from '../domain/Summoners';
import { MatchAdapter } from '../domain/Matches/matchAdapter';
import { SummonerAdapter } from '../domain/Summoners/summonerAdapter';

export const TrueMatchesRoute = {
  path: '/matches',
  method: 'GET',
};

type TrueMatchesRequest = FastifyRequest<{
  Querystring: {
    summonerName: string;
    summonerTag: string;
  };
}>;

export const trueMatches: FastifyPluginAsync = async (fastify) => {
  fastify.get(
    TrueMatchesRoute.path,
    async (request: TrueMatchesRequest, reply) => {
      const { summonerName, summonerTag } = request.query;

      if (!summonerName || !summonerTag) {
        return reply
          .status(400)
          .send({ error: 'summonerName and summonerTag are required' });
      }

      const riotApiKey = fastify.config.RIOT_API_KEY;
      const matches = await Summoners.Features.getSummonerMatches(
        {
          summonerName,
          summonerTag,
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
