import { Wallet } from '../../wallet/domain/wallet';

export interface IWalletRepo {
  getWalletByUserId(userId: string): Promise<Wallet>;
  save(wallet: Wallet): Promise<void>;
  update(user: Wallet): Promise<void>;
}
