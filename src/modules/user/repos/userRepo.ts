import { User } from '../domain/User';
import { UserEmail } from '../domain/userEmail';
import { UserName } from '../domain/userName';

export interface IUserRepo {
  exists(userEmail: UserEmail): Promise<boolean>;
  getUserByUserId(userId: string): Promise<User>;
  getUserByUserName(userName: UserName | string): Promise<User>;
  update(user: User): Promise<void>;
  save(user: User): Promise<void>;
}
