import { User } from '../domain/User';
import { UserName } from '../domain/userName';

export interface IUserRepo {
  exists(userEmail: string): Promise<boolean>;
  getUserByUserId(userId: string): Promise<User>;
  getUserByUserName(userName: UserName | string): Promise<User>;
  update(user: User): Promise<void>;
  save(user: User): Promise<void>;
}
