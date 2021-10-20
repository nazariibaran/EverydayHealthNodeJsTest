import CSVController from '@/controllers/csv.controller';
import { NextFunction, Request, Response } from 'express';

/**
 * This middleware is a workaround, and could be probably implemented better
 * The problem is that if I try to trigger the csvController somewere on the top level (for example in the app.ts),
 * typeorm throws an error regarding the Entity and is not able to create the table.
 */
const csvProccessMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const csvController = new CSVController();

  try {
    await csvController.uploadCSV('src/data/user_nl_tracking_data.csv');

    next();
  } catch (error) {
    console.log(error);
  }
};

export default csvProccessMiddleware;
