import { NextFunction, Request, Response } from 'express';
import createError from 'http-errors';
import Joi from 'joi';

const { BadRequest } = createError;
export const validation = (schema: Joi.ObjectSchema, property: string, checkFile = false) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(schema.keys, req.url);
    
    if (checkFile && !req.file) {
      return next(new BadRequest('file is required!'));
    }
    let payload = req.body;
    if (property === 'params') {
      payload = req.params;
    }
    if (property === 'query') {
      payload = req.query;
    }
    await schema.validateAsync(payload);
    return next();
  } catch (error: any) {
    return next(new BadRequest(error.message));
  }
};