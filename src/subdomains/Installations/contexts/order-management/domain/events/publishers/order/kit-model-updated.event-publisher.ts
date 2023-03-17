import { EventPublisherBase } from '../../../../../../../../libs/sofka';
import { KitDomainEntityBase } from '../../../entities/order';

export abstract class OrderKitModelUpdatedEventPublisherBase<
  Response = KitDomainEntityBase,
> extends EventPublisherBase<Response> {
  publish<Result = any>(): Promise<Result> {
    return this.emit(
      'order_management.order.kit_model_updated',
      JSON.stringify({ data: this.response }),
    );
  }
}
