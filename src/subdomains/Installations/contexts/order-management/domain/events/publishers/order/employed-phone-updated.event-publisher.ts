import { EventPublisherBase } from '../../../../../../../../libs/sofka';
import { EmployedDomainEntityBase } from '../../../entities/order';

export abstract class OrderEmployedPhoneUpdatedEventPublisherBase<
  Response = EmployedDomainEntityBase,
> extends EventPublisherBase<Response> {
  publish<Result = any>(): Promise<Result> {
    return this.emit(
      'order_management.order.employed_phone_updated',
      JSON.stringify({ data: this.response }),
    );
  }
}
