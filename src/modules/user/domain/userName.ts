import { ValueObject, Result } from '../../../shared/domain';

export interface UserNameProps {
  value: string;
}

export class UserName extends ValueObject<UserNameProps> {
  private constructor(props: UserNameProps) {
    super(props);
  }

  get value(): string {
    return this.props.value;
  }

  public static create(value: string): Result<UserName> {
    
    const validLength = value.length >= 10 && value.length <= 30;
    const nameLowcase = value.toLowerCase();
    if (!validLength) {
    return Result.fail<UserName>('min 10 char and max 50 char');
    }
    else 
    {
    return Result.ok<UserName>(
      new UserName({
        value: nameLowcase,
      })
    )}
  }
}
