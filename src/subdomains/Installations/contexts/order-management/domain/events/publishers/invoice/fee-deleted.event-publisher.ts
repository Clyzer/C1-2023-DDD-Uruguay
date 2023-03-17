import { EventPublisherBase } from '../../../../../../../../libs/sofka';

export abstract class InvoiceFeeDeletedEventPublisherBase<
  Response = boolean,
> extends EventPublisherBase<Response> {
  publish<Result = any>(): Promise<Result> {
    return this.emit(
      'order_management.invoice.fee_deleted',
      JSON.stringify({ data: this.response }),
    );
  }
}
