// @ts-ignore
import fastifyEnv from '@fastify/env';

import { FastifyInstance } from 'fastify';

const schema = {
  type: 'object',
  required: ['PORT'],
  properties: {
    PORT: {
      type: 'string',
      default: '3000'
    }
  }
};

const options = {
  confKey: 'config',
  schema: schema,
  dotenv: true
};

export async function configureEnv(fastify: FastifyInstance) {
  await fastify.register(fastifyEnv, options);
}

declare module 'fastify' {
  interface FastifyInstance {
    config: {
      PORT: string;
    }
  }
} 