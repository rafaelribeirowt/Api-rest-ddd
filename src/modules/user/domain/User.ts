import { AggregateRoot, Result, UniqueEntityID } from '../../../shared/domain';
import { UserEmail } from './userEmail';
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
    return Result.ok<User>(new User(props, id));
  }
}
