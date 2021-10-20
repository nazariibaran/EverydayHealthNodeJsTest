import { Router } from 'express';

import { Routes } from '@interfaces/routes.interface';
import NewsletterController from '@/controllers/newsletter.controller';

class NewsletterRoute implements Routes {
  public path = '/newsletter';
  public router = Router();
  public newletterController = new NewsletterController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/summary/action/:id(\\d+)`, this.newletterController.getNewsletterActionSummary);
    this.router.get(`${this.path}/summary/:id(\\d+)`, this.newletterController.getNewsletterSummary);
  }
}

export default NewsletterRoute;
