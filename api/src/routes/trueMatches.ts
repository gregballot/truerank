import { FastifyPluginAsync } from 'fastify';
import { Matches } from '../domain/Matches';

export const TrueMatchesRoute = {
  path: '/matches',
  method: 'GET',
};

export const trueMatches: FastifyPluginAsync = async (fastify) => {
  fastify.get(TrueMatchesRoute.path, async () => {
    return Matches.Features.getMatches();
  });
};
