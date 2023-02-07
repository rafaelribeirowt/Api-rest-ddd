import { Result, ValueObject } from '../../../shared/domain';

export interface WalletBalanceProps {
  balance: number;
}

export class WalletBalance extends ValueObject<WalletBalanceProps> {
  private constructor(props: WalletBalanceProps) {
    super(props);
  }
  get balance(): number {
    return this.props.balance;
  }

  deposit(amount: number): void {
    this.props.balance += amount;
  }

  withdraw(amount:number): void{
    this.props.balance -= amount;
  }

  public static create(props: number): Result<WalletBalance> {
    return Result.ok<WalletBalance>(new WalletBalance({ balance: props }));
  }
}
