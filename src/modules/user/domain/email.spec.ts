import { Email } from './email';
describe('email-value-object.ts', () => {
  it('should return a valid email', () => {
    const email = Email.create('valid_mail@domain.com');

    expect(email.isFailure).toBe(false);
    expect(email.getResult().value).toBe('valid_mail@domain.com');
  });
});
