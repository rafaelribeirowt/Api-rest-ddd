import * as express from 'express';
import { UserCreateDto } from '../../../../modules/user/useCase/userCreate/userCreateDto';
import { CreateUserErrors } from '../../../../modules/user/useCase/userCreate/CreateUserErrors';
import { UserCreate } from './userCreate';
import { BaseController } from '../../../../shared/infra/http/models/BaseController';

export class CreateUserController extends BaseController {
  private useCase: UserCreate;

  constructor(useCase: UserCreate) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: express.Request, res: express.Response): Promise<any> {
    let dto: UserCreateDto = req.body as UserCreateDto;
    dto = {
      email: dto.email,
      password: dto.password,
      name: dto.name,
    };
    try {
  
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;
        switch (error.constructor) {
          case CreateUserErrors.UsernameTakenError:
            return this.conflict(res, error.getErrorValue());
          case CreateUserErrors.EmailAlreadyExistsError:
            return this.conflict(res, error.getErrorValue());
          default:
            return this.fail(res, error.getErrorValue());
        }
      } else {
        return this.ok(res);
      }
    } catch (err) {
      return this.fail(res, err);
    }
  }
}
