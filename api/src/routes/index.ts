import { FastifyPluginAsync } from 'fastify';

import { trueHealthcheck } from './trueHealthcheck';
import { trueMatches } from './trueMatches';

export const routes: FastifyPluginAsync = async (fastify) => {
  await fastify.register(trueHealthcheck, {});
  await fastify.register(trueMatches, {});
};
