import { UseCaseError } from '../../../../shared/core/UseCaseError';
import { Result } from '../../../../shared/core/Result';

export namespace CreateUserErrors {
  export class EmailAlreadyExistsError extends Result<UseCaseError> {
    constructor(email: string) {
      super(false, {
        message: `O ${email} associado a essa conta já existe.`,
      } as UseCaseError);
    }
  }

  export class UsernameTakenError extends Result<UseCaseError> {
    constructor(username: string) {
      super(false, {
        message: `O nome de usuario ${username} já existe.`,
      } as UseCaseError);
    }
  }
}
