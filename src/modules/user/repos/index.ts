import { sequelizeUserRepo } from "./implementations/sequelizeUserRepo";
import models from "../../../shared/infra/database/sequelize/models";

const userRepo = new sequelizeUserRepo(models);

export { userRepo }