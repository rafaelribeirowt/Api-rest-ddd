import { AggregateRoot, Result, UniqueEntityID } from '../../../shared/domain';
import { UserCreated } from './events/userCreated';
import { UserEmail } from './userEmail';
import { UserId } from './userId';
import { UserName } from './userName';
import { UserPassword } from './userPassword';

export interface UserProps {
  email: UserEmail;
  name: UserName;
  password: UserPassword;
}

export class User extends AggregateRoot<UserProps> {
  private constructor(props: UserProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get userId(): UserId {
    return UserId.create(this._id).getResult();
  }

  get email(): UserEmail {
    return this.props.email;
  }

  get password(): UserPassword {
    return this.props.password;
  }

  get name(): UserName {
    return this.props.name;
  }

  public static create(props: UserProps, id?: UniqueEntityID): Result<User> {
    const user = new User(props, id);

    user.addDomainEvent(new UserCreated(user));

    return Result.ok<User>(user);
  }
}
