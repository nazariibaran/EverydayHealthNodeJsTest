import { NextFunction, Request, Response } from 'express';

// import userService from '@/services/user.service';

class UserController {
  // public userService = new userService();

  public getUserSummary = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = Number(req.params.id);

      //TODO: return count per day for the given user_id

      res.status(200).json({ data: userId, message: 'userId' });
    } catch (error) {
      next(error);
    }
  };
}

export default UserController;
