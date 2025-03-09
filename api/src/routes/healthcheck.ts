import { FastifyPluginAsync } from 'fastify';

export const HealthCheckRoute = {
  path: '/',
  method: 'GET',
}

const healthcheck: FastifyPluginAsync = async (fastify) => {
  fastify.get(HealthCheckRoute.path, async () => {
    return { status: 'ok' };
  });
};

export default healthcheck;