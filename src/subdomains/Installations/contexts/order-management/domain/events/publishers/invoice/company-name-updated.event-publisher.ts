import { EventPublisherBase } from 'src/libs';

import { CompanyDomainEntityBase } from '../../../entities/invoice';

export abstract class InvoiceCompanyNameUpdatedEventPublisherBase<
  Response = CompanyDomainEntityBase,
> extends EventPublisherBase<Response> {
  publish<Result = any>(): Promise<Result> {
    return this.emit(
      'order_management.invoice.company_name_updated',
      JSON.stringify({ data: this.response }),
    );
  }
}
