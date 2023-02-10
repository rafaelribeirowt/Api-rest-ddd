import { UniqueEntityID } from '../../../../shared/domain';
import { UserId } from '../../../user/domain/userId';
import { Wallet } from '../wallet';


describe('wallet.ts', () => {
  it('should long description, min 3 char and max 30 char ', () => {
    const user = {
      id: 'valid_id',
      name: 'Rafael ribeiro',
      email: 'RAFAEL3l1234DFSFSF2@gmail.com',
      password: '123456',
    };

    const wallet = Wallet.create({
      user: UserId.create(new UniqueEntityID(user.id)).getResult(),
    });
    console.log(wallet.getResult());
    expect(wallet.isSuccess).toBe(true);
  });
});
