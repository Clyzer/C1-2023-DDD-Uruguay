import { InvoiceDomainEntityBase } from '../entities';

export interface IInvoiceDomainService<
  T extends InvoiceDomainEntityBase = InvoiceDomainEntityBase,
> {
  createInvoice(invoice: T): Promise<T>;
  getInvoice(invoiceId: string): Promise<T>;
  deleteInvoice(invoiceId: string): Promise<boolean>;
  changeStatus(invoiceId: string): Promise<boolean>;
}
