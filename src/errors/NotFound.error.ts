import { NotFound } from 'http-errors';

export class NotFoundError extends NotFound {
  constructor(message: string) {
    super(`Not found. Reason: ${message}`);
  }
}