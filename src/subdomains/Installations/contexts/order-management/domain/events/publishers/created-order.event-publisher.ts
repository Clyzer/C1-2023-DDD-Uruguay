import { EventPublisherBase } from 'src/libs';

import { OrderDomainEntityBase } from '../../entities';

export abstract class CreatedOrderEventPublisherBase<
  Response = OrderDomainEntityBase,
> extends EventPublisherBase<Response> {
  publish<Result = any>(): Promise<Result> {
    return this.emit(
      'order_management.created_order',
      JSON.stringify({ data: this.response }),
    );
  }
}
