// src/utils/logger.js
import pino from 'pino';

// you can enhance this with pino-pretty in dev mode
const logger = pino({
  transport: process.env.NODE_ENV === 'development'
    ? { target: 'pino-pretty', options: { colorize: true } }
    : undefined,
  level: process.env.LOG_LEVEL || 'info',
  base: undefined, // removes pid, hostname for cleaner logs
});

export default logger;
