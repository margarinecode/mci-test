import { NextFunction, Request, Response } from 'express';
import AuthorizationService from '../global-services/authorization.service';
import { ForbiddenErrorResponse, UnauthorizedErrorResponse } from '../errors/UnauthorizedError';
import { TaskType } from '../interfaces/TaskType';

export const authorize = (authorizationService: AuthorizationService, resource: string, taskTypes: TaskType[]) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user: any = res.user;
    if (!user || !user.id) {
      next(new UnauthorizedErrorResponse('Invalid user data!'));
    }
    const authorized = await authorizationService.authorization(user.id as string, resource, taskTypes);
    if (!authorized) {
      next(new ForbiddenErrorResponse('User is not authorized to access this resource!'));
    }
    return next();
  } catch (error: any) {
    return next(new UnauthorizedErrorResponse('Authorization failed!'));
  }
};