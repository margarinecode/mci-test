import { StatusCodes } from 'http-status-codes';
import MessageResponse from '../interfaces/MessageResponse';

export const defaultResponse = (message: string, result: any, status: StatusCodes): MessageResponse => ({
  status,
  message,
  result,
});

export const OkResponse = (message: string, result: any): MessageResponse => ({
  status: StatusCodes.OK,
  message,
  result,
});

export const AcceptedResponse = (message: string, result: any): MessageResponse => ({
  status: StatusCodes.ACCEPTED,
  message,
  result,
});

export const CreatedResponse = (message: string, result: any): MessageResponse => ({
  status: StatusCodes.CREATED,
  message,
  result,
});