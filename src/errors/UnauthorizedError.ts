import { Unauthorized, Forbidden } from 'http-errors';

export class UnauthorizedErrorResponse extends Unauthorized {
  constructor(message: string) {
    super(`Unauthorized. Reason: ${message}`);
  }
}

export class ForbiddenErrorResponse extends Forbidden {
  constructor(message: string) {
    super(`Forbidden resource. Reason: ${message}`);
  }
}