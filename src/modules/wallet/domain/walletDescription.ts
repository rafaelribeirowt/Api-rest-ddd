import { Result, ValueObject } from '../../../shared/domain';

export interface wallerDescriptionProps {
  description: string;
}

export class WalletDescription extends ValueObject<wallerDescriptionProps> {
  private constructor(props: wallerDescriptionProps) {
    super(props);
  }

  get description(): string {
    return this.props.description;
  }

  public static create(description: string): Result<WalletDescription> {
    const descriptionLowerCase = description.toLowerCase();
    const isValidLength =
      descriptionLowerCase.length >= 1 && descriptionLowerCase.length <= 30;
    if (!isValidLength) {
      return Result.fail<WalletDescription>('Invalid description length');
    }
        return Result.ok<WalletDescription>(
          new WalletDescription({ description: descriptionLowerCase }),
    );
  }
}
