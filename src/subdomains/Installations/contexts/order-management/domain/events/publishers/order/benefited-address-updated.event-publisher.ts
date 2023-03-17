import { EventPublisherBase } from '../../../../../../../../libs/sofka';
import { BenefitedDomainEntityBase } from '../../../entities/order';

export abstract class OrderBenefitedAddressUpdatedEventPublisherBase<
  Response = BenefitedDomainEntityBase,
> extends EventPublisherBase<Response> {
  publish<Result = any>(): Promise<Result> {
    return this.emit(
      'order_management.order.benefited_address_updated',
      JSON.stringify({ data: this.response }),
    );
  }
}
