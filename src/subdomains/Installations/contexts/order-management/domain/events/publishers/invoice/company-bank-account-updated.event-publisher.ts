import { EventPublisherBase } from '../../../../../../../../libs/sofka';
import { CompanyDomainEntityBase } from '../../../entities/invoice';

export abstract class InvoiceCompanyBankAccountUpdatedEventPublisherBase<
  Response = CompanyDomainEntityBase,
> extends EventPublisherBase<Response> {
  publish<Result = any>(): Promise<Result> {
    return this.emit(
      'order_management.invoice.company_bank_account_updated',
      JSON.stringify({ data: this.response }),
    );
  }
}
