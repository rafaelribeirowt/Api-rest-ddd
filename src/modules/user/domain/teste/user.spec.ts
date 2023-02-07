import { User } from '../User';
import { UserEmail } from '../userEmail';
import { UserName } from '../userName';
import { UserPassword } from '../userPassword';

describe('user.ts', () => {
  it('should return a valid User', () => {
    const user = User.create({
      email: UserEmail.create('valid_email@mail.com').getResult(),
      name: UserName.create('Rafael').getResult(),
      password: UserPassword.create('1234561').getResult(),
    });
    const userResult = user.getResult();
    expect(userResult.id).toBeDefined();
    expect(userResult.email.value).toBeDefined();
    expect(userResult.password.value).toBeDefined();
  });
});
