
import { UserPassword } from '../userPassword';

describe('userPassword.ts', () => {
  it('should return a valid UserId', () => {
    const password = UserPassword.create('password');
    expect(password.isSuccess).toBe(true);

  });

});
