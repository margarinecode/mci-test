import { InternalServerError } from 'http-errors';

export class UnexpectedError extends InternalServerError {
  constructor(message: string) {
    super(`Unexpected Error. Reason: ${message}`);
  }
}