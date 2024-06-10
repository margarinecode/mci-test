import { NextFunction, Request, Response } from 'express';

import { HttpError } from 'http-errors';
import { HttpStatusCode } from 'axios';
import { Logger } from './utils/logger';

export function notFound(req: Request, res: Response, next: NextFunction) {
  res.status(HttpStatusCode.NotFound);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
}

export function errorHandler(logger: Logger) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return function (err: HttpError, req: Request, res: Response, next: NextFunction) {
    logger.error(err, err.stack);
    const status = err.status || HttpStatusCode.InternalServerError;
    res.status(status);
    res.json({
      message: err.message,
      stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
      status,
    });
  };
}
