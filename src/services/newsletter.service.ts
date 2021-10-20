import { User } from '@/interfaces/user.interface';
import { HttpException } from '@exceptions/HttpException';
// import userModel from '@models/users.model';

class NewsletterService {
  // public users = userModel;
  // public async findAllUser(): Promise<User[]> {
  //   const users: User[] = this.users;
  //   return users;
  // }
  // public async findUserById(userId: number): Promise<User> {
  //   const findUser: User = this.users.find(user => user.id === userId);
  //   if (!findUser) throw new HttpException(409, "You're not user");
  //   return findUser;
  // }
  // public async deleteUser(userId: number): Promise<User[]> {
  //   const findUser: User = this.users.find(user => user.id === userId);
  //   if (!findUser) throw new HttpException(409, "You're not user");
  //   const deleteUserData: User[] = this.users.filter(user => user.id !== findUser.id);
  //   return deleteUserData;
  // }
}

export default NewsletterService;
