import fastifyEnv from '@fastify/env';

import { FastifyInstance } from 'fastify';

const schema = {
  type: 'object',
  required: ['PORT'],
  properties: {
    PORT: {
      type: 'string',
      default: '3000',
    },
    RIOT_API_KEY: {
      type: 'string',
    },
  },
};

const options = {
  confKey: 'config',
  schema: schema,
  dotenv: true,
};

export async function configureEnv(fastify: FastifyInstance): Promise<void> {
  await fastify.register(fastifyEnv, options);
}

declare module 'fastify' {
  interface FastifyInstance {
    config: {
      PORT: string;
      RIOT_API_KEY: string;
    };
  }
}
