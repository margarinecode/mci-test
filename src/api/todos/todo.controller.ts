import { Router, Express, Response, Request, RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { handleError } from '../../middlewares/handleError';
import TodoService from './todo.service';
import { FilterDTO } from './todo.interface';
import { validation } from '../../middlewares/validation';
import { create, deleteQuery, getQuery, paramIdQuery } from './todo.validation';
import AbstractController from '../../global-services/abstract.controller';

export default class TodoController extends AbstractController {
  constructor(
    private readonly app: Express,
    private readonly service: TodoService,
  ) {
    super();
  }

  createRouter() {
    const router = Router();
    const getAllHandlers: RequestHandler[] = [
      validation(getQuery, 'query'),
      handleError(this.getAll),
    ];
    const getHandlers: RequestHandler[] = [
      validation(paramIdQuery, 'params'),
      handleError(this.get),
    ];
    const updateHandlers: RequestHandler[] = [
      validation(paramIdQuery, 'params'),
      validation(create, 'body'),
      handleError(this.update),
    ];
    const createHandlers: RequestHandler[] = [
      validation(create, 'body'),
      handleError(this.create),
    ];
    const deleteHandlers: RequestHandler[] = [
      validation(deleteQuery, 'query'),
      handleError(this.delete),
    ];

    router.post('/', ...createHandlers);
    router.get('/', ...getAllHandlers);
    router.get('/:id', ...getHandlers);
    router.patch('/:id', ...updateHandlers);
    router.delete('/:id', ...deleteHandlers);

    return router;
  }

  async get(req: Request, res: Response) {
    const result = this.service.get(req.params.id);
    return res.status(StatusCodes.OK).json(result);
  }
  
  async getAll(req: Request, res: Response) {
    const result = this.service.getAll(req.query as unknown as FilterDTO);
    return res.status(StatusCodes.OK).json(result);
  }
  
  async create(req: Request, res: Response) {
    const result = this.service.create(req.body);
    return res.status(StatusCodes.CREATED).json(result);
  }

  update(req: Request, res: Response) {
    const result = this.service.update(req.params.id, req.body);
    return res.status(StatusCodes.ACCEPTED).json(result);
  }

  async delete(req: Request, res: Response) {
    const query = req.query;
    let result;
    
    if (query.hard) {
      result = this.service.hardDelete(req.params.id);
    } else {
      result = this.service.softDelete(req.params.id);
    }
    
    return res.status(StatusCodes.ACCEPTED).json(result);
  }
}

