import { NextFunction, Request, Response } from 'express';

import NewsletterTrackingService from '@/services/newsletterTracking.service';

class UserController {
  public csvService = new NewsletterTrackingService();

  public getUserSummary = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = Number(req.params.id);

      const data = await this.csvService.getUserCountPerDayByUserId(userId);

      res.status(200).json({ data, message: 'Success' });
    } catch (error) {
      next(error);
    }
  };
}

export default UserController;
