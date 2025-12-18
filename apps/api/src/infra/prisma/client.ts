import { PrismaClient } from '@prisma/client';
import pino from 'pino';

const logger = pino({ name: 'prisma' });

export const prisma = new PrismaClient({
  log: [
    { level: 'query', emit: 'event' },
    { level: 'error', emit: 'event' },
    { level: 'warn', emit: 'event' },
  ],
});

prisma.$on('query', (e) => {
  logger.debug({ query: e.query, params: e.params, duration: e.duration }, 'Prisma query');
});

prisma.$on('error', (e) => {
  logger.error({ error: e.message }, 'Prisma error');
});

prisma.$on('warn', (e) => {
  logger.warn({ warning: e.message }, 'Prisma warning');
});

