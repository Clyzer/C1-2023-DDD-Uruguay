import { EventPublisherBase } from 'src/libs';

import { KitDomainEntityBase } from '../../../entities/order';

export abstract class OrderKitGettedEventPublisherBase<
  Response = KitDomainEntityBase,
> extends EventPublisherBase<Response> {
  publish<Result = any>(): Promise<Result> {
    return this.emit(
      'order_management.order.kit_getted',
      JSON.stringify({ data: this.response }),
    );
  }
}
