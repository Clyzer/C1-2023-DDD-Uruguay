import { EventPublisherBase } from '../../../../../../../../libs/sofka';
import { EmployedDomainEntityBase } from '../../../entities/order';

export abstract class OrderEmployedCreatedEventPublisherBase<
  Response = EmployedDomainEntityBase,
> extends EventPublisherBase<Response> {
  publish<Result = any>(): Promise<Result> {
    return this.emit(
      'order_management.order.employed_created',
      JSON.stringify({ data: this.response }),
    );
  }
}
