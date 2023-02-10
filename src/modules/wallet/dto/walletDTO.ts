import { User } from '../../user/domain/User';
import { UserId } from '../../user/domain/userId';
import { UserDTO } from '../../user/dto/userDTO';

export interface WalletDTO {
  id: string;
  user: UserId;
  balance?: number;
}
