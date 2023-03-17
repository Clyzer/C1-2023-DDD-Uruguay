import { BadRequestException } from '@nestjs/common';

import {
  IUseCase,
  ValueObjectErrorHandler,
} from '../../../../../../libs/sofka';
import { InvoiceAggregate } from '../../domain/aggregates';
import {
  CompanyDomainEntityBase,
  FeeDomainEntityBase,
  InvoiceDomainEntityBase,
} from '../../domain/entities';
import {
  CreatedInvoiceEventPublisherBase,
  InvoiceCompanyCreatedEventPublisherBase,
  InvoiceCompanyGettedEventPublisherBase,
  InvoiceFeeCreatedEventPublisherBase,
  InvoiceFeeGettedEventPublisherBase,
} from '../../domain/events/publishers';
import { ICreateInvoiceCommand } from '../../domain/interfaces/commands';
import { ICreateInvoiceResponse } from '../../domain/interfaces/responses';
import {
  ICompanyDomainService,
  IFeeDomainService,
  IInvoiceDomainService,
} from '../../domain/services';

export class CreateInvoiceUseCase<
    Command extends ICreateInvoiceCommand = ICreateInvoiceCommand,
    Response extends ICreateInvoiceResponse = ICreateInvoiceResponse,
  >
  extends ValueObjectErrorHandler
  implements IUseCase<Command, Response>
{
  private readonly invoiceAggregateRoot: InvoiceAggregate;

  constructor(
    private readonly invoiceService: IInvoiceDomainService,
    private readonly createdInvoiceEventPublisherBase: CreatedInvoiceEventPublisherBase,
    private readonly feeService: IFeeDomainService,
    private readonly invoiceFeeCreatedEventPublisherBase: InvoiceFeeCreatedEventPublisherBase,
    private readonly invoiceFeeGettedEventPublisherBase: InvoiceFeeGettedEventPublisherBase,
    private readonly companyService: ICompanyDomainService,
    private readonly invoiceCompanyCreatedEventPublisherBase: InvoiceCompanyCreatedEventPublisherBase,
    private readonly invoiceCompanyGettedEventPublisherBase: InvoiceCompanyGettedEventPublisherBase
  ) {
    super();
    this.invoiceAggregateRoot = new InvoiceAggregate({
      invoiceService,
      createdInvoiceEventPublisherBase,
      feeService,
      invoiceFeeCreatedEventPublisherBase,
      invoiceFeeGettedEventPublisherBase,
      companyService,
      invoiceCompanyCreatedEventPublisherBase,
      invoiceCompanyGettedEventPublisherBase
    });
  }

  async execute(command?: Command): Promise<Response> {
    const data = await this.executeCommand(command);

    return { success: data ? true : false, data } as unknown as Response;
  }

  private async executeCommand(
    command: Command,
  ): Promise<InvoiceDomainEntityBase | null> {
    if (command.companyId && command.feeId){
      let company = await this.invoiceAggregateRoot.getCompany(command.companyId);
      let fee = await this.invoiceAggregateRoot.getFee(command.feeId);
      let data = { company: company, fee: fee };
      let entity = new InvoiceDomainEntityBase(data);
      return this.executeInvoiceAggregateRoot(entity);
    }
    else if (command.company && command.fee) {
      let companyEntity = new CompanyDomainEntityBase(command.company);
      let company = await this.invoiceAggregateRoot.createCompany(companyEntity);

      let feeEntity = new FeeDomainEntityBase(command.fee);
      let fee = await this.invoiceAggregateRoot.createFee(feeEntity);
      
      let data = { company: company, fee: fee };
      let entity = new InvoiceDomainEntityBase(data);
      return this.executeInvoiceAggregateRoot(entity);
    } else throw new BadRequestException;
    
  }

  private async executeInvoiceAggregateRoot(
    aggregate: InvoiceDomainEntityBase,
  ): Promise<InvoiceDomainEntityBase | null> {
    return this.invoiceAggregateRoot.createInvoice(aggregate);
  }
}
