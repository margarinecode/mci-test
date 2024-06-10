import { DriverException } from '@mikro-orm/core';
import { RequestHandler } from 'express';
import DatabaseError from '../errors/DatabaseError';

export function handleError(handler: RequestHandler): RequestHandler {
  return async function (req, res, next) {
    try {
      await handler(req, res, next);
    } catch (error: any) {
      if (error instanceof DriverException) {
        const errorDatabase = error as any; 

        if (error.code) {
          return next(new DatabaseError(error.code, errorDatabase));
        }
        return next(error);
      }
      next(error);
    }
  };
}