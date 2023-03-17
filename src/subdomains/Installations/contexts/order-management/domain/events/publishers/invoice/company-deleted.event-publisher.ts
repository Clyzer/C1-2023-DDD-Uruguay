import { EventPublisherBase } from '../../../../../../../../libs/sofka';

export abstract class InvoiceCompanyDeletedEventPublisherBase<
  Response = boolean,
> extends EventPublisherBase<Response> {
  publish<Result = any>(): Promise<Result> {
    return this.emit(
      'order_management.invoice.company_deleted',
      JSON.stringify({ data: this.response }),
    );
  }
}
