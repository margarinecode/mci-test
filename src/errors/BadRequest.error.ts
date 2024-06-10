import { BadRequest } from 'http-errors';

export class BadRequestError extends BadRequest {
  constructor(message: string) {
    super(`${message}`);
  }
}