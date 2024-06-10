import { NextFunction, Request, Response } from 'express';
import { UnauthorizedErrorResponse } from '../api/authentications/authentication.error';
import { TaskType } from '../interfaces/TaskType';
import AbstractAppAccessService from '../global-services/abstract-app-access.service';

const API_KEY_HEADER = 'x-api-key';

export const APIKeyAuthenticate = (appAccessService: AbstractAppAccessService, resource: string, taskTypes: TaskType[]) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const apiKey = req.get(API_KEY_HEADER);
    if (!apiKey) {
      return next(new UnauthorizedErrorResponse('API Key not found!'));
    }
    const appAccess = await appAccessService.validateKey(apiKey, resource, taskTypes);
    res.user = appAccess.user;
    res.appAccessInfo = appAccess;
    return next();
  } catch (error) {
    console.log(error);
    return next(new UnauthorizedErrorResponse('Authentication failed!'));
  }
};
