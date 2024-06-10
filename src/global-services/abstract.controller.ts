import { Request, Response, Router } from 'express';

export default abstract class AbstractController {
  constructor() {
    this.create = this.create.bind(this);
    this.get = this.get.bind(this);
    this.getAll = this.getAll.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }
  
  abstract createRouter(): Router;
  abstract create(req: Request, res: Response): void;
  abstract get(req: Request, res: Response): void;
  abstract getAll(req: Request, res: Response): void;
  abstract update(req: Request, res: Response): void;
  abstract delete(req: Request, res: Response): void;
}