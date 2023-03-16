import { AggregateRootException } from '../../../../../../libs/sofka';
import { InvoiceDomainEntityBase } from '../entities';
import {
  CompanyDomainEntityBase,
  FeeDomainEntityBase,
} from '../entities/invoice';
import {
  CreatedInvoiceEventPublisherBase,
  DeletedInvoiceEventPublisherBase,
  GettedInvoiceEventPublisherBase,
} from '../events/publishers';
import {
  InvoiceCompanyBankAccountUpdatedEventPublisherBase,
  InvoiceCompanyCreatedEventPublisherBase,
  InvoiceCompanyDeletedEventPublisherBase,
  InvoiceCompanyGettedEventPublisherBase,
  InvoiceCompanyNameUpdatedEventPublisherBase,
  InvoiceFeeChargeUpdatedEventPublisherBase,
  InvoiceFeeCreatedEventPublisherBase,
  InvoiceFeeDeletedEventPublisherBase,
  InvoiceFeeGettedEventPublisherBase,
  InvoiceFeeTaxUpdatedEventPublisherBase,
  InvoiceStatusChangedEventPublisherBase,
} from '../events/publishers/invoice';
import {
  ICompanyDomainService,
  IFeeDomainService,
  IInvoiceDomainService,
} from '../services';

export class InvoiceAggregate
  implements IInvoiceDomainService, ICompanyDomainService, IFeeDomainService
{
  private readonly invoiceService?: IInvoiceDomainService;
  private readonly createdInvoiceEventPublisherBase?: CreatedInvoiceEventPublisherBase;
  private readonly gettedInvoiceEventPublisherBase?: GettedInvoiceEventPublisherBase;
  private readonly deletedInvoiceEventPublisherBase?: DeletedInvoiceEventPublisherBase;
  private readonly invoiceStatusChangedEventPublisherBase?: InvoiceStatusChangedEventPublisherBase;
  private readonly companyService?: ICompanyDomainService;
  private readonly invoiceCompanyBankAccountUpdatedEventPublisherBase?: InvoiceCompanyBankAccountUpdatedEventPublisherBase;
  private readonly invoiceCompanyNameUpdatedEventPublisherBase?: InvoiceCompanyNameUpdatedEventPublisherBase;
  private readonly invoiceCompanyCreatedEventPublisherBase?: InvoiceCompanyCreatedEventPublisherBase;
  private readonly invoiceCompanyDeletedEventPublisherBase?: InvoiceCompanyDeletedEventPublisherBase;
  private readonly invoiceCompanyGettedEventPublisherBase?: InvoiceCompanyGettedEventPublisherBase;
  private readonly feeService?: IFeeDomainService;
  private readonly invoiceFeeTaxUpdatedEventPublisherBase?: InvoiceFeeTaxUpdatedEventPublisherBase;
  private readonly invoiceFeeChargeUpdatedEventPublisherBase?: InvoiceFeeChargeUpdatedEventPublisherBase;
  private readonly invoiceFeeCreatedEventPublisherBase?: InvoiceFeeCreatedEventPublisherBase;
  private readonly invoiceFeeDeletedEventPublisherBase?: InvoiceFeeDeletedEventPublisherBase;
  private readonly invoiceFeeGettedEventPublisherBase?: InvoiceFeeGettedEventPublisherBase;

  constructor({
    invoiceService,
    gettedInvoiceEventPublisherBase,
    createdInvoiceEventPublisherBase,
    deletedInvoiceEventPublisherBase,
    invoiceStatusChangedEventPublisherBase,
    companyService,
    invoiceCompanyBankAccountUpdatedEventPublisherBase,
    invoiceCompanyNameUpdatedEventPublisherBase,
    invoiceCompanyCreatedEventPublisherBase,
    invoiceCompanyDeletedEventPublisherBase,
    invoiceCompanyGettedEventPublisherBase,
    feeService,
    invoiceFeeTaxUpdatedEventPublisherBase,
    invoiceFeeChargeUpdatedEventPublisherBase,
    invoiceFeeCreatedEventPublisherBase,
    invoiceFeeDeletedEventPublisherBase,
    invoiceFeeGettedEventPublisherBase,
  }: {
    invoiceService?: IInvoiceDomainService;
    gettedInvoiceEventPublisherBase?: GettedInvoiceEventPublisherBase;
    createdInvoiceEventPublisherBase?: CreatedInvoiceEventPublisherBase;
    deletedInvoiceEventPublisherBase?: DeletedInvoiceEventPublisherBase;
    invoiceStatusChangedEventPublisherBase?: InvoiceStatusChangedEventPublisherBase;
    companyService?: ICompanyDomainService;
    invoiceCompanyBankAccountUpdatedEventPublisherBase?: InvoiceCompanyBankAccountUpdatedEventPublisherBase;
    invoiceCompanyNameUpdatedEventPublisherBase?: InvoiceCompanyNameUpdatedEventPublisherBase;
    invoiceCompanyCreatedEventPublisherBase?: InvoiceCompanyCreatedEventPublisherBase;
    invoiceCompanyDeletedEventPublisherBase?: InvoiceCompanyDeletedEventPublisherBase;
    invoiceCompanyGettedEventPublisherBase?: InvoiceCompanyGettedEventPublisherBase;
    feeService?: IFeeDomainService;
    invoiceFeeTaxUpdatedEventPublisherBase?: InvoiceFeeTaxUpdatedEventPublisherBase;
    invoiceFeeChargeUpdatedEventPublisherBase?: InvoiceFeeChargeUpdatedEventPublisherBase;
    invoiceFeeCreatedEventPublisherBase?: InvoiceFeeCreatedEventPublisherBase;
    invoiceFeeDeletedEventPublisherBase?: InvoiceFeeDeletedEventPublisherBase;
    invoiceFeeGettedEventPublisherBase?: InvoiceFeeGettedEventPublisherBase;
  }) {
    this.invoiceService = invoiceService;
    this.gettedInvoiceEventPublisherBase = gettedInvoiceEventPublisherBase;
    this.createdInvoiceEventPublisherBase = createdInvoiceEventPublisherBase;
    this.deletedInvoiceEventPublisherBase = deletedInvoiceEventPublisherBase;
    this.invoiceStatusChangedEventPublisherBase =
      invoiceStatusChangedEventPublisherBase;
    this.companyService = companyService;
    this.invoiceCompanyBankAccountUpdatedEventPublisherBase =
      invoiceCompanyBankAccountUpdatedEventPublisherBase;
    this.invoiceCompanyNameUpdatedEventPublisherBase =
      invoiceCompanyNameUpdatedEventPublisherBase;
    this.invoiceCompanyCreatedEventPublisherBase =
      invoiceCompanyCreatedEventPublisherBase;
    this.invoiceCompanyDeletedEventPublisherBase =
      invoiceCompanyDeletedEventPublisherBase;
    this.invoiceCompanyGettedEventPublisherBase =
      invoiceCompanyGettedEventPublisherBase;
    this.feeService = feeService;
    this.invoiceFeeTaxUpdatedEventPublisherBase =
      invoiceFeeTaxUpdatedEventPublisherBase;
    this.invoiceFeeChargeUpdatedEventPublisherBase =
      invoiceFeeChargeUpdatedEventPublisherBase;
    this.invoiceFeeCreatedEventPublisherBase =
      invoiceFeeCreatedEventPublisherBase;
    this.invoiceFeeDeletedEventPublisherBase =
      invoiceFeeDeletedEventPublisherBase;
    this.invoiceFeeGettedEventPublisherBase =
      invoiceFeeGettedEventPublisherBase;
  }

  async createInvoice(
    invoice: InvoiceDomainEntityBase,
  ): Promise<InvoiceDomainEntityBase> {
    if (!this.invoiceService)
      throw new AggregateRootException('InvoiceService is not defined');
    if (!this.createdInvoiceEventPublisherBase)
      throw new AggregateRootException(
        'CreatedInvoiceEventPublisherBase is not defined',
      );
    const result = await this.invoiceService.createInvoice(invoice);
    this.createdInvoiceEventPublisherBase.response = result;
    this.createdInvoiceEventPublisherBase.publish();
    return result;
  }

  async getInvoice(invoiceId: string): Promise<InvoiceDomainEntityBase> {
    if (!this.invoiceService)
      throw new AggregateRootException('InvoiceService is not defined');
    if (!this.gettedInvoiceEventPublisherBase)
      throw new AggregateRootException(
        'GettedInvoiceEventPublisherBase is not defined',
      );
    const result = await this.invoiceService.getInvoice(invoiceId);
    this.gettedInvoiceEventPublisherBase.response = result;
    this.gettedInvoiceEventPublisherBase.publish();
    return result;
  }

  async deleteInvoice(invoiceId: string): Promise<boolean> {
    if (!this.invoiceService)
      throw new AggregateRootException('InvoiceService is not defined');
    if (!this.deletedInvoiceEventPublisherBase)
      throw new AggregateRootException(
        'DeletedInvoiceEventPublisherBase is not defined',
      );
    const result = await this.invoiceService.deleteInvoice(invoiceId);
    this.deletedInvoiceEventPublisherBase.response = result;
    this.deletedInvoiceEventPublisherBase.publish();
    return result;
  }

  async changeStatus(invoiceId: string): Promise<boolean> {
    if (!this.invoiceService)
      throw new AggregateRootException('InvoiceService is not defined');
    if (!this.invoiceStatusChangedEventPublisherBase)
      throw new AggregateRootException(
        'InvoiceStatusChangedEventPublisherBase is not defined',
      );
    const result = await this.invoiceService.changeStatus(invoiceId);
    this.invoiceStatusChangedEventPublisherBase.response = result;
    this.invoiceStatusChangedEventPublisherBase.publish();
    return result;
  }

  async createCompany(
    company: CompanyDomainEntityBase,
  ): Promise<CompanyDomainEntityBase> {
    if (!this.companyService)
      throw new AggregateRootException('CompanyService is not defined');
    if (!this.invoiceCompanyCreatedEventPublisherBase)
      throw new AggregateRootException(
        'InvoiceStatusChangedEventPublisherBase is not defined',
      );
    const result = await this.companyService.createCompany(company);
    this.invoiceCompanyCreatedEventPublisherBase.response = result;
    this.invoiceCompanyCreatedEventPublisherBase.publish();
    return result;
  }

  async getCompany(companyId: string): Promise<CompanyDomainEntityBase> {
    if (!this.companyService)
      throw new AggregateRootException('CompanyService is not defined');
    if (!this.invoiceCompanyGettedEventPublisherBase)
      throw new AggregateRootException(
        'InvoiceCompanyGettedEventPublisherBase is not defined',
      );
    const result = await this.companyService.getCompany(companyId);
    this.invoiceCompanyGettedEventPublisherBase.response = result;
    this.invoiceCompanyGettedEventPublisherBase.publish();
    return result;
  }

  async deleteCompany(companyId: string): Promise<boolean> {
    if (!this.companyService)
      throw new AggregateRootException('CompanyService is not defined');
    if (!this.invoiceCompanyDeletedEventPublisherBase)
      throw new AggregateRootException(
        'InvoiceCompanyDeletedEventPublisherBase is not defined',
      );
    const result = await this.companyService.deleteCompany(companyId);
    this.invoiceCompanyDeletedEventPublisherBase.response = result;
    this.invoiceCompanyDeletedEventPublisherBase.publish();
    return result;
  }

  async updateCompanyName(
    companyId: string,
    newCompanyName: CompanyDomainEntityBase,
  ): Promise<CompanyDomainEntityBase> {
    if (!this.companyService)
      throw new AggregateRootException('CompanyService is not defined');
    if (!this.invoiceCompanyNameUpdatedEventPublisherBase)
      throw new AggregateRootException(
        'InvoiceCompanyNameUpdatedEventPublisherBase is not defined',
      );
    const result = await this.companyService.updateCompanyName(
      companyId,
      newCompanyName,
    );
    this.invoiceCompanyNameUpdatedEventPublisherBase.response = result;
    this.invoiceCompanyNameUpdatedEventPublisherBase.publish();
    return result;
  }

  async updateCompanyBankAccount(
    companyId: string,
    newCompanyBankAccount: CompanyDomainEntityBase,
  ): Promise<CompanyDomainEntityBase> {
    if (!this.companyService)
      throw new AggregateRootException('CompanyService is not defined');
    if (!this.invoiceCompanyBankAccountUpdatedEventPublisherBase)
      throw new AggregateRootException(
        'InvoiceCompanyBankAccountUpdatedEventPublisherBase is not defined',
      );
    const result = await this.companyService.updateCompanyBankAccount(
      companyId,
      newCompanyBankAccount,
    );
    this.invoiceCompanyBankAccountUpdatedEventPublisherBase.response = result;
    this.invoiceCompanyBankAccountUpdatedEventPublisherBase.publish();
    return result;
  }

  async createFee(fee: FeeDomainEntityBase): Promise<FeeDomainEntityBase> {
    if (!this.feeService)
      throw new AggregateRootException('FeeService is not defined');
    if (!this.invoiceFeeCreatedEventPublisherBase)
      throw new AggregateRootException(
        'InvoiceFeeCreatedEventPublisherBase is not defined',
      );
    const result = await this.feeService.createFee(fee);
    this.invoiceFeeCreatedEventPublisherBase.response = result;
    this.invoiceFeeCreatedEventPublisherBase.publish();
    return result;
  }

  async getFee(feeId: string): Promise<FeeDomainEntityBase> {
    if (!this.feeService)
      throw new AggregateRootException('FeeService is not defined');
    if (!this.invoiceFeeGettedEventPublisherBase)
      throw new AggregateRootException(
        'InvoiceFeeGettedEventPublisherBase is not defined',
      );
    const result = await this.feeService.getFee(feeId);
    this.invoiceFeeGettedEventPublisherBase.response = result;
    this.invoiceFeeGettedEventPublisherBase.publish();
    return result;
  }

  async deleteFee(feeId: string): Promise<boolean> {
    if (!this.feeService)
      throw new AggregateRootException('FeeService is not defined');
    if (!this.invoiceFeeDeletedEventPublisherBase)
      throw new AggregateRootException(
        'InvoiceFeeDeletedEventPublisherBase is not defined',
      );
    const result = await this.feeService.deleteFee(feeId);
    this.invoiceFeeDeletedEventPublisherBase.response = result;
    this.invoiceFeeDeletedEventPublisherBase.publish();
    return result;
  }

  async updateFeeCharge(
    feeId: string,
    newFee: FeeDomainEntityBase,
  ): Promise<FeeDomainEntityBase> {
    if (!this.feeService)
      throw new AggregateRootException('FeeService is not defined');
    if (!this.invoiceFeeChargeUpdatedEventPublisherBase)
      throw new AggregateRootException(
        'InvoiceFeeChargeUpdatedEventPublisherBase is not defined',
      );
    const result = await this.feeService.updateFeeCharge(feeId, newFee);
    this.invoiceFeeChargeUpdatedEventPublisherBase.response = result;
    this.invoiceFeeChargeUpdatedEventPublisherBase.publish();
    return result;
  }

  async updateFeeTax(
    feeId: string,
    newFee: FeeDomainEntityBase,
  ): Promise<FeeDomainEntityBase> {
    if (!this.feeService)
      throw new AggregateRootException('FeeService is not defined');
    if (!this.invoiceFeeTaxUpdatedEventPublisherBase)
      throw new AggregateRootException(
        'invoiceFeeTaxUpdatedEventPublisherBase is not defined',
      );
    const result = await this.feeService.updateFeeTax(feeId, newFee);
    this.invoiceFeeTaxUpdatedEventPublisherBase.response = result;
    this.invoiceFeeTaxUpdatedEventPublisherBase.publish();
    return result;
  }
}
