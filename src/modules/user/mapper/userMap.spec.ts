import { UniqueEntityID } from '../../../shared/domain';
import { User } from '../domain/User';
import { UserEmail } from '../domain/userEmail';
import { UserName } from '../domain/userName';
import { UserPassword } from '../domain/userPassword';
import { UserDTO } from '../dto/userDTO';
import { UserMapper } from './UserMapper';
describe('user.mapper', () => {
  let domain: User;
  let persistence: UserDTO;
  //
  beforeAll(() => {
    // Create user from domain
    domain = User.create(
      {
        name: UserName.create('Rafael Ribeiro').getResult(),
        email: UserEmail.create('valid_mail@domain.com').getResult(),
        password: UserPassword.create('valid_password').getResult(),
      },
      new UniqueEntityID('valid_id'),
    ).getResult();

    console.log(domain);
    
    // Create persistence user
    persistence = {
      name: 'rafael ribeiro',
      email: 'valid_mail@domain.com',
      password: 'valid_password',
      id: 'valid_id',
    };
  });
  //
  it('should be defined', () => {
    expect(new UserMapper()).toBeDefined();
  });

  it('should convert object from persistence to domain', () => {
    const result = UserMapper.toDomain(persistence);
    expect(result.props).toEqual(domain.props);
  });

  it('should convert object from domain to persistence', () => {
    const result = UserMapper.toPersistence(domain);
    expect(result.email).toEqual(persistence.email);
  });
});
