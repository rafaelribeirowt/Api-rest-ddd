import { sequelizeWalletRepo } from './implementations/sequelizeWalletRepo';
import models from '../../../shared/infra/database/sequelize/models';

const walletRepo = new sequelizeWalletRepo(models);

export { walletRepo };
