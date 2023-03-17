import { EventPublisherBase } from '../../../../../../../libs/sofka';
import { InvoiceDomainEntityBase } from '../../entities';

export abstract class CreatedInvoiceEventPublisherBase<
  Response = InvoiceDomainEntityBase,
> extends EventPublisherBase<Response> {
  publish<Result = any>(): Promise<Result> {
    return this.emit(
      'order_management.created_invoice',
      JSON.stringify({ data: this.response }),
    );
  }
}
