import { AggregateRoot, Result, UniqueEntityID } from '../../../shared/domain';
import { UserId } from '../../user/domain/userId';


export interface WalletProps {
  user: UserId;
  balance?: number;
}

export class Wallet extends AggregateRoot<WalletProps> {
  private constructor(props: WalletProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get user(): UserId {
    return this.props.user;
  }

  get balance(): number {
    return this.props.balance;
  }

  public static create(
    props: WalletProps,
    id?: UniqueEntityID,
  ): Result<Wallet> {
    return Result.ok<Wallet>(
      new Wallet({ ...props, balance: props.balance ? props.balance : 0 }, id),
    );
  }
}
