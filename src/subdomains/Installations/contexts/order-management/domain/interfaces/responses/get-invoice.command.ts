import { InvoiceDomainEntityBase } from '../../entities';

export interface IGetInvoiceResponse {
  success: boolean;
  data: InvoiceDomainEntityBase | null;
}
