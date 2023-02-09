import { IUserRepo } from '../../../repos/userRepo';
import { UserCreate } from '../userCreate';
import userRepositoryMock from './repoMock';
import { UserCreateDto } from '../userCreateDto';

describe('userCreate.ts', () => {
  let userRepos: IUserRepo = userRepositoryMock;

  beforeEach(() => {
    userRepos = userRepositoryMock;
    jest.spyOn(userRepos, 'exists').mockClear();
  });

  interface propsDto {
    name?: string;
    email?: string;
    password?: string;
  }

  const makeDto = (props: propsDto): UserCreateDto => {
    return {
      name: props.name ?? 'valid_name',
      email: props.email ?? 'valid_email@domain.com',
      password: props.password ?? 'valid_password',
    };
  };

  it('should be defined', () => {
    const useCase = new UserCreate(userRepos);
    expect(useCase).toBeDefined();
  });

  it('should fails if user already exists for provided email', async () => {
    jest.spyOn(userRepos, 'exists').mockResolvedValueOnce(true);
    const useCase = new UserCreate(userRepos);
    const result = await useCase.execute(
      makeDto({ email: 'exists_email@domain.com' }),
    );
    expect(result.value.isFailure).toBe(true);
  });

  it('should save user with success', async () => {
    jest.spyOn(userRepos, 'exists').mockResolvedValueOnce(false);

    const saved = jest.spyOn(userRepos, 'save');
    const useCase = new UserCreate(userRepos);

    const result = await useCase.execute(
      makeDto({ email: 'valid_email@domain.com' }),
    );

    expect(result.value.isSuccess).toBe(true);
    expect(saved).toBeCalled();
  });

  it('should fail use case throws', async () => {
    jest.spyOn(userRepos, 'exists').mockImplementation(async () => {
      throw new Error('internal server error');
    });

    const useCase = new UserCreate(userRepos);

    const result = await useCase.execute(makeDto({}));

    expect(result.value.isFailure).toBe(true);
    expect(result.value.getErrorValue().message).toBe(
      'An unexpected error occurred.',
    );
  });

  it('should fail if provide an invalid email', async () => {
    jest.spyOn(userRepos, 'exists').mockResolvedValueOnce(true);

    const useCase = new UserCreate(userRepos);

    const result = await useCase.execute(makeDto({ email: 'invalid_email' }));

    expect(result.value.isFailure).toBe(true);
  });
});
