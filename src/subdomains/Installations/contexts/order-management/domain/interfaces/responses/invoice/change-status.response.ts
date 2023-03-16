import { InvoiceStatusValueObject } from '../../../value-objects/invoice';

export interface IInvoiceChangeStatusResponse {
  success: boolean;
  data: InvoiceStatusValueObject | null;
}
