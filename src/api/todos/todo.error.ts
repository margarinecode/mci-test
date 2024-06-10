import { InternalServerError, NotFound } from 'http-errors';

const ENTITY_NAME = 'Template';

export class CreateErrorResponse extends InternalServerError {
  constructor(message: string) {
    super(`Failed to create ${ENTITY_NAME}. Reason: ${message}`);
  }
}

export class NotFoundErrorResponse extends NotFound {
  constructor(message: string) {
    super(`Failed to fetch ${ENTITY_NAME}. Reason: ${message}`);
  }
}
