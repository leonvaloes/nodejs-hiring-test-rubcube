import { Request, Response, NextFunction } from 'express';
import logger from 'Infrastructure/Config/Logger';

export function logRequests(req: Request, res: Response, next: NextFunction) {
  logger.info(`Request: ${req.method} ${req.url}`);
  next();
}
