import { OrderStatus } from '../../../enums/data/OrderStatus';

export class RedirectUser {
  public isRedirect: boolean = false;

  public isOrdered(status: OrderStatus): void {
    if (status === OrderStatus.ORDERED) this.isRedirect = true;
  }

  public isCreatedNonFinished(status: OrderStatus, isFinish: boolean): void {
    if (status === OrderStatus.CREATED && !isFinish) {
      this.isRedirect = true;
    }
  }
}
