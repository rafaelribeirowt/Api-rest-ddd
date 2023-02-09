import { UniqueEntityID } from '../../../shared/domain';
import { Mapper } from '../../../shared/infra/Mapper';
import { User } from '../domain/User';
import { UserEmail } from '../domain/userEmail';
import { UserName } from '../domain/userName';
import { UserPassword } from '../domain/userPassword';
import { UserDTO } from '../dto/userDTO';

export class UserMapper implements Mapper<User> {
  public static toDTO(user: User): UserDTO {
    return {
      name: user.name.value,
      email: user.email.value,
      password: user.password.props.value,
      id: user.id.toString(),
    };
  }

  public static toDomain(raw: any): User {
    const userNameOrError = UserName.create(raw.name);
    const userPasswordOrError = UserPassword.create(raw.password);
    const userEmailOrError = UserEmail.create(raw.email);
    

    const userOrError = User.create(
      {
        name: userNameOrError.getResult(),
        email: userEmailOrError.getResult(),
        password: userPasswordOrError.getResult(),
      },
      new UniqueEntityID(raw.id),
    );

    userOrError.isFailure ? console.log('error') : '';

    return userOrError.isSuccess ? userOrError.getResult() : null;
  }

  public static toPersistence(user: User) {

    return {
      name: user.name.props.value,
      email: user.email.props.value,
      password: user.password.props.value,
      id: user.id.toString(),
    };
  }
}
