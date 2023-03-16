import { EventPublisherBase } from 'src/libs';

import { KitDomainEntityBase } from '../../../entities/order';

export abstract class OrderKitCreatedEventPublisherBase<
  Response = KitDomainEntityBase,
> extends EventPublisherBase<Response> {
  publish<Result = any>(): Promise<Result> {
    return this.emit(
      'order_management.order.kit_created',
      JSON.stringify({ data: this.response }),
    );
  }
}
