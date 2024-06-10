import { Router, Express } from 'express';

import TodoModule from './todos/todo.module';
import { StatusCodes } from 'http-status-codes';

const generator = (app: Express) => {
  const router = Router();
  router.get('/', (req, res) => {
    res.json({
      message: `API - V1 ${app.locals.version}`,
      status: StatusCodes.OK,
    });
  });

  const todoModule = new TodoModule('/todos', app);

  router.use(todoModule.ROUTE_NAME, todoModule.getController().createRouter());
  return router;
};

export default generator;
