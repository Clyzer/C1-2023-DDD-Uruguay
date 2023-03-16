import { Injectable } from '@nestjs/common';

import { IInvoiceDomainService } from '../../../../../domain/services';
import { InvoiceMySqlEntity } from '../entities';
import { InvoiceRepository } from '../repositories';

@Injectable()
export class InvoiceMySqlService
  implements IInvoiceDomainService<InvoiceMySqlEntity>
{
  constructor(private readonly invoiceRepository: InvoiceRepository) {}

  createInvoice(invoice: InvoiceMySqlEntity): Promise<InvoiceMySqlEntity> {
    return this.invoiceRepository.create(invoice);
  }

  getInvoice(invoiceId: string): Promise<InvoiceMySqlEntity> {
    return this.invoiceRepository.findById(invoiceId);
  }

  deleteInvoice(invoiceId: string): Promise<boolean> {
    return this.invoiceRepository.delete(invoiceId);
  }

  changeStatus(invoiceId: string): Promise<boolean> {
    return this.invoiceRepository.changeStatus(invoiceId);
  }
}
