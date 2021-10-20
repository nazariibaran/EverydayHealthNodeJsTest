import { Router } from 'express';

import { Routes } from '@interfaces/routes.interface';
import CSVController from '@/controllers/csv.controller';

class CSVRoute implements Routes {
  public path = '/csv';
  public router = Router();
  public csvController = new CSVController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/insert`, this.csvController.uploadCSV);
  }
}

export default CSVRoute;
