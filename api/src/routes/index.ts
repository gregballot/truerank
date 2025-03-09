import { FastifyPluginAsync } from 'fastify';
import healthcheck from './healthcheck';

const routes: FastifyPluginAsync = async (fastify) => {
  await fastify.register(healthcheck, {});
};

export default routes;
