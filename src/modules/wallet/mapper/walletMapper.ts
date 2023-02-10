import { UniqueEntityID } from '../../../shared/domain';
import { Mapper } from '../../../shared/infra/Mapper';
import { Wallet } from '../domain/wallet';
import { WalletDTO } from '../dto/walletDTO';
import { WalletBalance } from '../domain/walletBalance';
import { UserId } from '../../user/domain/userId';

export class WalletMapper implements Mapper<Wallet> {
  public static toDomain(raw: any): Wallet {
    const userIdOrError = UserId.create(raw.user);

    const walletOrError = Wallet.create(
      {
        user: userIdOrError.getResult(),
        balance: raw.balance,
      },
      new UniqueEntityID(raw.id),
    );

    walletOrError.isFailure ? console.log('error') : '';
console.log(walletOrError.getResult());

    return walletOrError.isSuccess ? walletOrError.getResult() : null;
  }

  public static toPersistence(wallet: Wallet) {
    return {
      id_user: wallet.user.id.toValue(),
      balance: wallet.balance,
      id: wallet.id.toString(),
    };
  }
}
