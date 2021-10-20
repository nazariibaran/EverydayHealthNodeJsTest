import { NextFunction, Request, Response } from 'express';

import NewsletterTrackingService from '@/services/newsletterTracking.service';

class NewsletterController {
  public csvService = new NewsletterTrackingService();

  public getNewsletterSummary = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const newsletterId = Number(req.params.id);

      const data = await this.csvService.getNewsletterCountPerDayByNewsletterId(newsletterId);

      res.status(200).json({ data, message: 'Success' });
    } catch (error) {
      next(error);
    }
  };

  public getNewsletterActionSummary = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const newsletterId = Number(req.params.id);

      const data = await this.csvService.getNewsletterActivityCountsByNewsletterId(newsletterId);

      res.status(200).json({ data, message: 'Success' });
    } catch (error) {
      next(error);
    }
  };
}

export default NewsletterController;
