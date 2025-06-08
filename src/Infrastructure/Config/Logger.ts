import winston from 'winston';

const { combine, timestamp, printf, colorize } = winston.format;

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

const getLogLevel = (): string => {
  const env = process.env.NODE_ENV || 'test';

  if (env == 'production')
    return 'error';
  if (env == 'test')
    return 'info';
  if (env == 'debug')
    return 'debug';
  return 'none'
}

const logger = winston.createLogger({
  level: getLogLevel(),
  format: combine(
    colorize(),
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    myFormat
  ),
  transports: [new winston.transports.Console()],
});

export default logger;
