import { UniqueEntityID } from '../../../../shared/domain';
import { UserId } from '../userId';

describe('userId.ts', () => {
  it('should return a valid UserId', () => {
    const userId = UserId.create();
    expect(userId.isSuccess).toBe(true);
  });

  it('should return a valid UserId with id', () => {
    const userId = UserId.create(new UniqueEntityID('valid_id'));
    expect(userId.isSuccess).toBe(true);
    expect(userId.getResult().id.toValue()).toBe('valid_id');
    console.log(userId.getResult().id);
    
  });
});
