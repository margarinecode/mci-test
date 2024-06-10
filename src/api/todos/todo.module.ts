import { Express } from 'express';
import BaseModule from '../../global-services/base.module';
import TodoController from './todo.controller';
import TodoService from './todo.service';

export default class TodoModule extends BaseModule {
  constructor(
    routeName: string,
    app: Express,
  ) {
    const service = new TodoService(app);
    super(
      routeName,
      new TodoController(app, service),
      service,
    );
  }
}

