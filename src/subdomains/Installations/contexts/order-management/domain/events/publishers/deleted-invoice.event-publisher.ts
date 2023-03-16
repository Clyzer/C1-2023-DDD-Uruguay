import { EventPublisherBase } from 'src/libs';

export abstract class DeletedInvoiceEventPublisherBase<
  Response = boolean,
> extends EventPublisherBase<Response> {
  publish<Result = any>(): Promise<Result> {
    return this.emit(
      'order_management.deleted_invoice',
      JSON.stringify({ data: this.response }),
    );
  }
}
