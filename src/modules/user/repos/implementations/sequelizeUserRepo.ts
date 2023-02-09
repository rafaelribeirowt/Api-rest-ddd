import { User } from '../../domain/User';
import { UserEmail } from '../../domain/userEmail';
import { UserName } from '../../domain/userName';
import { UserMapper } from '../../mapper/userMap';
import { IUserRepo } from '../userRepo';

export class sequelizeUserRepo implements IUserRepo {
  private models: any;

  constructor(models: any) {
    this.models = models;
  }
  async exists(userEmail: string): Promise<boolean> {
    const UserModel = this.models.User;
    const baseUser = await UserModel.findOne({
      where: {
        email: userEmail,
      },
    });
    return !!baseUser === true;
  }

  async getUserByUserId(userId: string): Promise<User> {
    const UserModel = this.models.User;
    const baseUser = await UserModel.findOne({
      where: {
        id: userId,
      },
    });
    if (!!baseUser === false) throw new Error('User not found.');
    return UserMapper.toDomain(baseUser);
  }

  async getUserByUserName(userName: string | UserName): Promise<User> {
    const UserModel = this.models.User;
    const baseUser = await UserModel.findOne({
      where: {
        username:
          userName instanceof UserName
            ? (<UserName>userName).props.value
            : userName,
      },
    });
    if (!!baseUser === false) throw new Error('User not found.');
    return UserMapper.toDomain(baseUser);
  }

  async update(user: User): Promise<void> {
    const UserModel = this.models.User;
    const exists = await this.exists(user.email.value);
    if (!exists) {
      const rawSequelizeUser = await UserMapper.toPersistence(user);
      await UserModel.create(rawSequelizeUser);
    }
    return;
  }
  async save(user: User): Promise<void> {
    const UserModel = this.models.User;
    const exists = await this.exists(user.email.value);
    if (!exists) {
      const rawSequelizeUser = await UserMapper.toPersistence(user);
      await UserModel.create(rawSequelizeUser);
    }
    return;
  }
}
