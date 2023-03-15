import { EventPublisherBase } from 'src/libs';

export abstract class DeletedInvoiceEventPublisherBase<
  Response = boolean
> extends EventPublisherBase<Response> {
  publish<Result = any>(): Promise<Result> {
    return this.emit(
      "invoice_management.invoice.invoice_deleted",
      JSON.stringify({ data: this.response })
    );
  }
}
