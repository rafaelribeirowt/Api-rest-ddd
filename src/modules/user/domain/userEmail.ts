import { ValueObject, Result } from '../../../shared/domain';
import isEmail from 'validator/lib/isEmail';

export interface EmailValueObjectProps {
  value: string;
}

export class UserEmail extends ValueObject<EmailValueObjectProps> {
  private constructor(props: EmailValueObjectProps) {
    super(props);
  }

  get value(): string {
    return this.props.value;
  }

  public static create(email: string): Result<UserEmail> {
    const isValidEmail = isEmail(email);
    const emailLowCase = email.toLowerCase();
    if (!isValidEmail) {
      return Result.fail<UserEmail>('Invalid Email');
    } else {
      return Result.ok<UserEmail>(
        new UserEmail({
          value: emailLowCase,
        }),
      );
    }
  }
}
