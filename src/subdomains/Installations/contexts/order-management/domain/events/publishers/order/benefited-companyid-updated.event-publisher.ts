import { EventPublisherBase } from 'src/libs';

import { BenefitedDomainEntityBase } from '../../../entities/order';

export abstract class OrderBenefitedCompanyIdUpdatedEventPublisherBase<
  Response = BenefitedDomainEntityBase,
> extends EventPublisherBase<Response> {
  publish<Result = any>(): Promise<Result> {
    return this.emit(
      'order_management.order.benefited_companyid_updated',
      JSON.stringify({ data: this.response }),
    );
  }
}
