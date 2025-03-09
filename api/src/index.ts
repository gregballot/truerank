import Fastify from 'fastify';
import { routes } from './routes';

import { configureEnv } from './config/env';

const fastify = Fastify({ logger: true });

const start = async () => {
  try {
    await configureEnv(fastify);
    await fastify.register(routes);

    const port = parseInt(fastify.config.PORT);

    await fastify.listen({ 
      port
    });

    fastify.log.info(`Server listening on ${fastify.server.address()}`);
} catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();