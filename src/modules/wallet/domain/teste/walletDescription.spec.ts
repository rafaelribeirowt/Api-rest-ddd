import { WalletDescription } from '../walletDescription';

describe('walletDescription.ts', () => {
  it('should create a valid walletDescription', () => {
    const description = WalletDescription.create('valid_description');
    expect(description.isSuccess).toBe(true);
  });
  it('should Normalize lowerCase', () => {
    const description = WalletDescription.create('ValiD_DescRiption');
    expect(description.getResult().description).toBe('valid_description');
  });
  it('should long description, min 3 char and max 30 char ', () => {
    const description = WalletDescription.create(
      'description, min 3 char and max 30 char',
    );
    expect(description.isFailure).toBe(true);
    expect(description.error).toBe('Invalid description length');
  });
});
