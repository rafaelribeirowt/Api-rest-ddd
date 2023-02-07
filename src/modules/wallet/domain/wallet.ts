import { AggregateRoot, Result, UniqueEntityID } from '../../../shared/domain';
import { UserId } from '../../user/domain/userId';
import { WalletBalance } from './walletBalance';
import { WalletDescription } from './walletDescription';

export interface WalletProps {
  IdUser: UserId;
  description: WalletDescription;
  balance: WalletBalance;
}

export class Wallet extends AggregateRoot<WalletProps> {
  private constructor(props: WalletProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get IdUser(): UserId {
    return this.props.IdUser;
  }
  get description(): WalletDescription {
    return this.props.description;
  }
  get balance(): WalletBalance {
    return this.props.balance;
  }

  public static create(props: WalletProps,id?: UniqueEntityID,): Result<Wallet> {
    return Result.ok<Wallet>(new Wallet(props, id));
  }
}
