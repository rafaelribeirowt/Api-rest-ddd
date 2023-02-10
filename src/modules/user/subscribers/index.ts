import { walletCreate } from "../../wallet/useCase";
import { AfterUserCreated } from "./AfterUserCreated";


new AfterUserCreated(walletCreate)