import { userRepo } from '../../modules/user/repos';
import { UserCreate } from '../../modules/user/useCase/userCreate/userCreate';
import { CreateUserController } from '../../modules/user/useCase/userCreate/UserCreateController';

const userCreate = new UserCreate(userRepo);
const createUserController = new CreateUserController(userCreate);

export { createUserController, userCreate };
