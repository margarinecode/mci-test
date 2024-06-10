import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { UnauthorizedErrorResponse } from '../api/authentications/authentication.error';
import Config from '../config';

const AUTH_HEADER = 'Authorization';
const BEARER_TYPE = 'Bearer';

export const authenticate = (config: Config) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.get(AUTH_HEADER);
    if (!authHeader) {
      return next(new UnauthorizedErrorResponse('Authorization header not found!'));
    }
    const authHeaderContent = authHeader.split(' ');
    const authType = authHeaderContent[0];
    if (authType !== BEARER_TYPE) {
      return next(new UnauthorizedErrorResponse('Invalid authorization type!'));
    }
    const authToken = authHeaderContent[1];
    const decodedToken: jwt.JwtPayload = jwt.verify(authToken, config.auth.publicKey) as jwt.JwtPayload;
    if (decodedToken.user) {
      res.user = decodedToken.user;
      return next();
    }
    return next(new UnauthorizedErrorResponse('Invalid token!'));
  } catch (error) {
    console.log(error);
    return next(new UnauthorizedErrorResponse('Authentication failed!'));
  }
};
