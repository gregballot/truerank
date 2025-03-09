import { FastifyPluginAsync } from 'fastify';

export const TrueHealthCheckRoute = {
  path: '/',
  method: 'GET',
}

export const trueHealthcheck: FastifyPluginAsync = async (fastify) => {
  fastify.get(TrueHealthCheckRoute.path, async () => {
    return { status: 'ok' };
  });
};