import { FastifyPluginAsync } from 'fastify';
import { Matches } from '../domain/Matches';

export const TrueHistoryRoute = {
  path: '/history',
  method: 'GET',
};

export const trueHistory: FastifyPluginAsync = async (fastify) => {
  fastify.get(TrueHistoryRoute.path, async () => {
    return Matches.Features.getMatches();
  });
};
