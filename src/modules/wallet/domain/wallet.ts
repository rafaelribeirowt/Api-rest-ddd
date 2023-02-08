import { AggregateRoot, Result, UniqueEntityID } from '../../../shared/domain';
import { UserId } from '../../user/domain/userId';
import { WalletBalance } from './walletBalance';


export interface WalletProps {
  IdUser: UserId;
  balance: WalletBalance;
}

export class Wallet extends AggregateRoot<WalletProps> {
  private constructor(props: WalletProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get IdUser(): UserId {
    return this.props.IdUser;
  }

  get balance(): WalletBalance {
    return this.props.balance;
  }



  public static create(props: WalletProps,id?: UniqueEntityID,): Result<Wallet> {
    return Result.ok<Wallet>(new Wallet(props, id));
  }
}
