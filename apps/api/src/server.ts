import { app } from './app';
import { env } from './config/env';
import { logger } from './shared/logger';

const server = app.listen(env.PORT, () => {
  logger.info({ port: env.PORT }, 'Server started');
});

process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully');
  server.close(() => {
    logger.info('Process terminated');
    process.exit(0);
  });
});

