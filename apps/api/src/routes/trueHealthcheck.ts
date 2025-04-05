import { FastifyPluginAsync } from 'fastify';

export const trueHealthcheck: FastifyPluginAsync = async (fastify) => {
  fastify.get('/', async () => {
    return { status: 'ok' };
  });
};
