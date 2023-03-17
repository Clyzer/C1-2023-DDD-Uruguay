import { EventPublisherBase } from '../../../../../../../../libs/sofka';
import { BenefitedDomainEntityBase } from '../../../entities/order';

export abstract class OrderBenefitedGettedEventPublisherBase<
  Response = BenefitedDomainEntityBase,
> extends EventPublisherBase<Response> {
  publish<Result = any>(): Promise<Result> {
    return this.emit(
      'order_management.order.benefited_getted',
      JSON.stringify({ data: this.response }),
    );
  }
}
