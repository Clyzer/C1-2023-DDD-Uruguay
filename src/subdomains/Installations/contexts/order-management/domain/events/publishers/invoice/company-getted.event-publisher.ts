import { EventPublisherBase } from '../../../../../../../../libs/sofka';
import { CompanyDomainEntityBase } from '../../../entities/invoice';

export abstract class InvoiceCompanyGettedEventPublisherBase<
  Response = CompanyDomainEntityBase,
> extends EventPublisherBase<Response> {
  publish<Result = any>(): Promise<Result> {
    return this.emit(
      'order_management.invoice.company_getted',
      JSON.stringify({ data: this.response }),
    );
  }
}
