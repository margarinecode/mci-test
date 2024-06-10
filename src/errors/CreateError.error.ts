import { InternalServerError } from 'http-errors';

export class CreateError extends InternalServerError {
  constructor(message: string) {
    super(`Failed to create. Reason: ${message}`);
  }
}