import { EventPublisherBase } from '../../../../../../../../libs/sofka';
import { EmployedDomainEntityBase } from '../../../entities/order';

export abstract class OrderEmployedGettedEventPublisherBase<
  Response = EmployedDomainEntityBase,
> extends EventPublisherBase<Response> {
  publish<Result = any>(): Promise<Result> {
    return this.emit(
      'order_management.order.employed_getted',
      JSON.stringify({ data: this.response }),
    );
  }
}
