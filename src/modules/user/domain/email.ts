import { ValueObject, Result } from '../../../shared/domain';
import isEmail from 'validator/lib/isEmail';

export interface EmailValueObjectProps {
  value: string;
}

export class Email extends ValueObject<EmailValueObjectProps> {
  private constructor(props: EmailValueObjectProps) {
    super(props);
  }

  get value(): string {
    return this.props.value;
  }

  public static create(email: string): Result<Email> {
    const isValidEmail = isEmail(email);
    if (!isValidEmail) {
      Result.fail<Email>('Invalid Email');
    }
    return Result.ok<Email>(
      new Email({
        value: email,
      }),
    );
  }
}
