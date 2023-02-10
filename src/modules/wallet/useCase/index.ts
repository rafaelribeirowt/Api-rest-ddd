import { walletRepo } from '../repos';
import { WalletCreate } from './walletCreate';

const walletCreate = new WalletCreate(walletRepo);

export { walletCreate };
