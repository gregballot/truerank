import Fastify from 'fastify';
import routes from './routes';

const fastify = Fastify({ logger: true });

// Register all routes
fastify.register(routes);

const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    fastify.log.info(`Server listening on ${fastify.server.address()}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();