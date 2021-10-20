import { Router } from 'express';

import { Routes } from '@interfaces/routes.interface';
import NewsletterController from '@/controllers/newsletter.controller';
import csvProccessMiddleware from '@/middlewares/csv.middleware';

class NewsletterRoute implements Routes {
  public path = '/newsletter';
  public router = Router();
  public newletterController = new NewsletterController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/summary/action/:id(\\d+)`, csvProccessMiddleware, this.newletterController.getNewsletterActionSummary);
    this.router.get(`${this.path}/summary/:id(\\d+)`, csvProccessMiddleware, this.newletterController.getNewsletterSummary);
  }
}

export default NewsletterRoute;
