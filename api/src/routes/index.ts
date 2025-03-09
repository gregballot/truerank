import { FastifyPluginAsync } from 'fastify';
import { trueHealthcheck} from './trueHealthcheck';

export const routes: FastifyPluginAsync = async (fastify) => {
  await fastify.register(trueHealthcheck, {});
};
