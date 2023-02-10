import { UserEmail } from '../userEmail';
describe('email-value-object.ts', () => {
  it('should return a valid email', () => {
    const email = UserEmail.create('valid_mail@domain.com');

    expect(email.isFailure).toBe(false);
    expect(email.getResult().value).toBe('valid_mail@domain.com');
  });
});
