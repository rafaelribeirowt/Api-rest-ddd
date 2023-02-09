import { AppError } from '../../../../shared/core/AppError';
import {
  Either,
  IUseCase,
  left,
  Result,
  right,
} from '../../../../shared/domain';
import { User } from '../../domain/User';
import { UserEmail } from '../../domain/userEmail';
import { UserName } from '../../domain/userName';
import { UserPassword } from '../../domain/userPassword';
import { IUserRepo } from '../../repos/userRepo';
import { CreateUserErrors } from './CreateUserErrors';
import { UserCreateDto } from './userCreateDto';

type Response = Either<
  | CreateUserErrors.EmailAlreadyExistsError
  | CreateUserErrors.UsernameTakenError
  | AppError.UnexpectedError
  | Result<any>,
  Result<void>
>;

export class UserCreate implements IUseCase<UserCreateDto, Promise<Response>> {
  private userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  async execute(request: UserCreateDto): Promise<Response> {
    //validar dados da request
    const userNameOrError = UserName.create(request.name);
    const userEmailOrError = UserEmail.create(request.email);
    const userPasswordOrError = UserPassword.create(request.password);

    //verificar se existe dados incorretos
    const hasErrorOnValueObjects = Result.combine([
      userNameOrError,
      userPasswordOrError,
      userEmailOrError,
    ]);

    if (hasErrorOnValueObjects.isFailure) {
      return left(
        Result.fail<void>(hasErrorOnValueObjects.getErrorValue()),
      ) as Response;
    }

    const name = userNameOrError.getResult();
    const email = userEmailOrError.getResult();
    const password = userPasswordOrError.getResult();

    //criar instancia do dominio do usuario
    const userOrError = User.create({
      name,
      email,
      password,
    });
    if (userOrError.isFailure) {
      return left(
        Result.fail<User>(userOrError.getErrorValue().toString()),
      ) as Response;
    }
    try {
      const userAlreadyExists = await this.userRepo.exists(request.email);

      if (userAlreadyExists) {
        return left(
          new CreateUserErrors.EmailAlreadyExistsError(email.value),
        ) as Response;
      }

      const user: User = userOrError.getResult();
      await this.userRepo.save(user);
      return right(Result.ok<void>());
    } catch (error) {
      return left(new AppError.UnexpectedError(error)) as Response;
    }

    //verificar se ja existe um usuario com o email informado
    //salvar usuario
    //retorar status de sucesso
  }
}
