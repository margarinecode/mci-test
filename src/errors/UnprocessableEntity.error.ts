import { UnprocessableEntity } from 'http-errors';

export class UnprocessableEntityErrorResponse extends UnprocessableEntity {
  constructor(message: string) {
    super(`${message}`);
  }
}