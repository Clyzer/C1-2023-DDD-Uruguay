import { EventPublisherBase } from '../../../../../../../libs/sofka';
import { OrderDomainEntityBase } from '../../entities';

export abstract class GettedOrderEventPublisherBase<
  Response = OrderDomainEntityBase,
> extends EventPublisherBase<Response> {
  publish<Result = any>(): Promise<Result> {
    return this.emit(
      'order_management.getted_order',
      JSON.stringify({ data: this.response }),
    );
  }
}
