import { UserId } from '../../../user/domain/userId';
import { Wallet } from '../wallet';
import { WalletBalance } from '../walletBalance';

describe('wallet.ts', () => {
  it('should long description, min 3 char and max 30 char ', () => {
    const wallet = Wallet.create({
      IdUser: UserId.create().getResult(),
      balance: WalletBalance.create(5000).getResult(),
    });
    expect(wallet.isSuccess).toBe(true);
  });
});
