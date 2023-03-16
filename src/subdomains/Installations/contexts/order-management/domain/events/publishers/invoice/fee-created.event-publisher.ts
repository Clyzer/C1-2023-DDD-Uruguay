import { EventPublisherBase } from 'src/libs';

import { FeeDomainEntityBase } from '../../../entities/invoice';

export abstract class InvoiceFeeCreatedEventPublisherBase<
  Response = FeeDomainEntityBase,
> extends EventPublisherBase<Response> {
  publish<Result = any>(): Promise<Result> {
    return this.emit(
      'order_management.invoice.fee_created',
      JSON.stringify({ data: this.response }),
    );
  }
}
