import { Entity, Result, UniqueEntityID } from '../../../shared/domain';

export class WalletId extends Entity<any> {
  private constructor(id?: UniqueEntityID) {
    super(null, id);
  }
  get walletId(): UniqueEntityID {
    return this._id;
  }
  public static create(id?: UniqueEntityID): Result<WalletId> {
    return Result.ok<WalletId>(new WalletId(id));
  }
}
