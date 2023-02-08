import { User } from '../../domain/User';
import { UserEmail } from '../../domain/userEmail';
import { UserName } from '../../domain/userName';
import { IUserRepo } from '../userRepo';

export class sequelizeUserRepo implements IUserRepo {
  private models: any;

  constructor(models: any) {
    this.models =models
  }
    exists(userEmail: UserEmail): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    getUserByUserId(userId: string): Promise<User> {
        throw new Error('Method not implemented.');
    }
    getUserByUserName(userName: string | UserName): Promise<User> {
        throw new Error('Method not implemented.');
    }
    update(user: User): Promise<void> {
        throw new Error('Method not implemented.');
    }
    save(user: User): Promise<void> {
        throw new Error('Method not implemented.');
    }

  
}
