import { WalletBalance } from '../WalletBalance';

describe('walletBalance.ts', () => {
  it('should create a valid walletBalance', () => {
    const balance = WalletBalance.create(5000);
    expect(balance.isSuccess).toBe(true);
    expect(balance.getResult().balance).toBe(5000);
  });
});
