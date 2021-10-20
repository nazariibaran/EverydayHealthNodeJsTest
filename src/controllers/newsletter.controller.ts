import { NextFunction, Request, Response } from 'express';

class NewsletterController {
  // public userService = new userService();

  public getNewsletterSummary = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const newsletterId = Number(req.params.id);

      //TODO: return count per day for the given user_id

      res.status(200).json({ data: newsletterId, message: 'newsletterId' });
    } catch (error) {
      next(error);
    }
  };

  public getNewsletterActionSummary = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const newsletterId = Number(req.params.id);

      //TODO: return daily open and click action counts for given newsletter_id

      res.status(200).json({ data: newsletterId, message: 'newsletter action Id' });
    } catch (error) {
      next(error);
    }
  };
}

export default NewsletterController;
