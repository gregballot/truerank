import fastifyEnv from '@fastify/env';

import { FastifyInstance } from 'fastify';

const schema = {
  type: 'object',
  required: [
    'PORT',
    'RIOT_API_KEY',
  ],
  properties: {
    PORT: {
      type: 'string',
      default: '3000',
    },
    RIOT_API_KEY: {
      type: 'string',
      pattern: '^RGAPI-[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$',
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
