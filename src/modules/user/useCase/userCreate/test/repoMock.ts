import { IUserRepo } from '../../../repos/userRepo';

export const userRepositoryMock: IUserRepo = {
  exists: jest.fn(),
  save: jest.fn(),
  getUserByUserId: jest.fn(),
  getUserByUserName: jest.fn(),
  update: jest.fn(),
};

export default userRepositoryMock;
