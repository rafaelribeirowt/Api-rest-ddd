import { UniqueEntityID } from '../../../shared/domain';
import { UserId } from '../../user/domain/userId';
import { Wallet } from '../domain/wallet';
import { WalletMapper } from './walletMapper';

describe('wallet.mapper', () => {
  let domain: Wallet;
  let persistence: IProps;

  interface IProps {
    id: string;
    id_user: string;
    balance?: number;
  }

  const user = {
    id: 'valid_id_user',
    name: 'Rafael ribeiro',
    email: 'RAFAEL3l1234DFSFSF2@gmail.com',
    password: '123456',
  };
  //
  beforeAll(() => {
    // Create user from domain
    
    domain = Wallet.create(
      {
        user: UserId.create(new UniqueEntityID(user.id)).getResult()
      },
      new UniqueEntityID('valid_id'),
    ).getResult();

    // Create persistence usercl
    persistence = {
      id_user: 'valid_id_user',
      balance: 0,
      id: 'valid_id',
    };
  });
  //
  it('should be defined', () => {
    expect(new WalletMapper()).toBeDefined();
  });

  it('should convert object from persistence to domain', () => {
    const result = WalletMapper.toDomain(persistence);
    console.log(result);
    

    expect(result).toEqual(domain);
  });

  it('should convert object from domain to persistence', () => {
    const result = WalletMapper.toPersistence(domain);

    expect(result).toEqual(persistence);
  });
});
