import { Router } from 'express';

import UserController from '@/controllers/user.controller';
import { Routes } from '@interfaces/routes.interface';
import csvProccessMiddleware from '@/middlewares/csv.middleware';

class UsersRoute implements Routes {
  public path = '/user';
  public router = Router();
  public userController = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/summary/:id(\\d+)`, csvProccessMiddleware, this.userController.getUserSummary);
  }
}

export default UsersRoute;
