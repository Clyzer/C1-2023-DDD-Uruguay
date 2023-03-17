import { EventPublisherBase } from '../../../../../../../../libs/sofka';
import { FeeDomainEntityBase } from '../../../entities/invoice';

export abstract class InvoiceFeeChargeUpdatedEventPublisherBase<
  Response = FeeDomainEntityBase,
> extends EventPublisherBase<Response> {
  publish<Result = any>(): Promise<Result> {
    return this.emit(
      'order_management.invoice.fee_charge_updated',
      JSON.stringify({ data: this.response }),
    );
  }
}
