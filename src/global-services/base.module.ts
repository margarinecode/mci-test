import AbstractController from './abstract.controller';

export default class BaseModule {
  public ROUTE_NAME;

  private controller: AbstractController;

  private service;

  constructor(routeName: string, controller: any, service: any) {
    this.ROUTE_NAME = routeName;
    this.controller = controller;
    this.service = service;
  }
  
  getController() {
    return this.controller;
  }

  getService() {
    return this.service;
  }
}