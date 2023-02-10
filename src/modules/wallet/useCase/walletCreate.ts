import { AppError } from '../../../shared/core/AppError';
import { Either, left, Result, right } from '../../../shared/core/result';
import { Wallet } from '../../wallet/domain/wallet';
import { IUseCase, UniqueEntityID } from '../../../shared/domain';
import { WalletCreateDto } from './walletCreateDto';
import { IWalletRepo } from '../repos/walletRepo';
import { WalletBalance } from '../domain/walletBalance';
import { UserId } from '../../user/domain/userId';

type Response = Either<AppError.UnexpectedError | Result<any>, Result<void>>;

export class WalletCreate
  implements IUseCase<WalletCreateDto, Promise<Response>>
{
  private walletRepo: IWalletRepo;

  constructor(walletRepo: IWalletRepo) {
    this.walletRepo = walletRepo;
  }

  async execute(request: WalletCreateDto): Promise<Response> {
    //validar dados da request
    
    const UserIdOrError = UserId.create(new UniqueEntityID(request.user));
    
    console.log(UserIdOrError);
    

    //verificar se existe dados incorretos
    const hasErrorOnValueObjects = Result.combine([
      UserIdOrError,
    ]);

    if (hasErrorOnValueObjects.isFailure) {
      return left(
        Result.fail<void>(hasErrorOnValueObjects.getErrorValue()),
      ) as Response;
    }

    
    const user = UserIdOrError.getResult();

    //criar instancia do dominio do usuario
    const WalletOrError = Wallet.create({
      user
    });
    if (WalletOrError.isFailure) {
      return left(Result.fail<Wallet>('Error')) as Response;
    }
    try {
      const user: Wallet = WalletOrError.getResult();
      await this.walletRepo.save(user);
      return right(Result.ok<void>());
    } catch (error) {
      console.log(error); 
      return left(new AppError.UnexpectedError(error)) as Response;
    }

    //verificar se ja existe um usuario com o email informado
    //salvar usuario
    //retorar status de sucesso
  }
}
