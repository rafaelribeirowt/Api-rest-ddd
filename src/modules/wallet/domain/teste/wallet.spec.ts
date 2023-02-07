import { UserId } from '../../../user/domain/userId';
import { Wallet } from '../wallet';
import { WalletBalance } from '../walletBalance';
import { WalletDescription } from '../walletDescription';

describe('wallet.ts', () => {
  it('should long description, min 3 char and max 30 char ', () => {
    const wallet = Wallet.create({
      IdUser: UserId.create().getResult(),
      description: WalletDescription.create('wallet rafael').getResult(),
      balance: WalletBalance.create(5000).getResult(),
    });
    console.log(wallet.getResult().IdUser);

    expect(wallet.isSuccess).toBe(true);
  });
});
