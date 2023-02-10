import { Wallet } from '../../domain/wallet';
import { WalletMapper } from '../../mapper/walletMapper';
import { IWalletRepo } from '../walletRepo';

export class sequelizeWalletRepo implements IWalletRepo {
  private models: any;

  constructor(models: any) {
    this.models = models;
  }
  getWalletByUserId(userId: string): Promise<Wallet> {
    throw new Error('Method not implemented.');
  }
  async save(wallet: Wallet): Promise<void> {

    const WalletModel = this.models.Wallet;
    
      const rawSequelizeWallet = await WalletMapper.toPersistence(wallet);

      console.log(rawSequelizeWallet);
      
      await WalletModel.create(rawSequelizeWallet);
     return;
  }
  update(wallet: Wallet): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
