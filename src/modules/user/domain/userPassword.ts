import { Result, ValueObject } from '../../../shared/domain';

export interface IUserPasswordProps {
  value: string;
}

export class UserPassword extends ValueObject<IUserPasswordProps> {
  private constructor(props: IUserPasswordProps) {
    super(props);
  }

  get value(): string {
    return this.props.value;
  }

  public static create(password: string): Result<UserPassword> {
    return Result.ok<UserPassword>(new UserPassword({ value: password }));
  }
}
