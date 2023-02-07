import { ValueObject, Result } from '../../../shared/domain';

export interface UserNameProps {
  name: string;
}

export class UserName extends ValueObject<UserNameProps> {
  private constructor(props: UserNameProps) {
    super(props);
  }

  get name(): string {
    return this.props.name;
  }

  public static create(name: string): Result<UserName> {
    const validLength = name.length >= 15 && name.length <= 50;
    const nameLowcase = name.toLowerCase();
    if (!validLength) {
      Result.fail<UserName>('min 10 char and max 50 char');
    }
    return Result.ok<UserName>(
      new UserName({
        name: nameLowcase,
      }),
    );
  }
}
