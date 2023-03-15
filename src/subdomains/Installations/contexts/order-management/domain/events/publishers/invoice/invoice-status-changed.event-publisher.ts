import { EventPublisherBase } from 'src/libs';

export abstract class InvoiceStatusChangedEventPublisherBase<
  Response = boolean
> extends EventPublisherBase<Response> {
  publish<Result = any>(): Promise<Result> {
    return this.emit(
      "order_management.invoice.status_changed",
      JSON.stringify({ data: this.response })
    );
  }
}
