import { IHandle } from "../../../shared/domain/events/ihandle";
import { UserCreated } from "../domain/events/userCreated";
import { DomainEvents } from "../../../shared/domain/events/domain-events";
import { WalletCreate } from "../../wallet/useCase/walletCreate";
import { Wallet } from "../../wallet/domain/wallet";

export class AfterUserCreated implements IHandle<UserCreated> {
  private wallet: WalletCreate;

  constructor (crateWallet: WalletCreate) {
    this.setupSubscriptions();
    this.wallet = crateWallet;
  }

  setupSubscriptions(): void {
    DomainEvents.register(this.onUserCreatedEvent.bind(this), UserCreated.name);
  }

  private async onUserCreatedEvent (event: UserCreated): Promise<void> {
    console.log("chegou no after");
    
    const { user } = event;

    this.wallet.execute( {user: user.userId.id.toString()} )
      .then((r) => { console.log(r) })
      .catch((err) => { console.log(err) })
    
  }
}