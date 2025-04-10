import { FastifyPluginAsync } from 'fastify';

import { trueHealthcheck } from './trueHealthcheck';
import { summonerMatches } from './summonerMatches';
import { summonerProfile } from './summonerProfile';

export const routes: FastifyPluginAsync = async (fastify) => {
  await fastify.register(trueHealthcheck, {});
  await fastify.register(summonerMatches, {});
  await fastify.register(summonerProfile, {});
};
