import {
  IUseCase,
  ValueObjectErrorHandler,
  ValueObjectException,
} from '../../../../../../../libs/sofka';
import { InvoiceAggregate } from '../../../domain/aggregates';
import { ICompanyDomainEntity } from '../../../domain/entities/interfaces';
import { CompanyDomainEntityBase } from '../../../domain/entities/invoice';
import { InvoiceCompanyGettedEventPublisherBase } from '../../../domain/events/publishers/invoice';
import { IGetCompanyCommand } from '../../../domain/interfaces/commands/invoice';
import { IGetCompanyResponse } from '../../../domain/interfaces/responses/invoice';
import { ICompanyDomainService } from '../../../domain/services/invoice';
import {
  CompanyBankAccountValueObject,
  CompanyIdValueObject,
  CompanyNameValueObject,
} from '../../../domain/value-objects/invoice';

export class GetCompanyUserCase<
    Command extends IGetCompanyCommand = IGetCompanyCommand,
    Response extends IGetCompanyResponse = IGetCompanyResponse,
  >
  extends ValueObjectErrorHandler
  implements IUseCase<Command, Response>
{
  private readonly invoiceAggregateRoot: InvoiceAggregate;

  constructor(
    private readonly companyService: ICompanyDomainService,
    private readonly invoiceCompanyGettedEventPublisherBase: InvoiceCompanyGettedEventPublisherBase,
  ) {
    super();
    this.invoiceAggregateRoot = new InvoiceAggregate({
      companyService,
      invoiceCompanyGettedEventPublisherBase,
    });
  }

  async execute(command?: Command): Promise<Response> {
    const data = await this.executeCommand(command);

    return { success: data ? true : false, data } as unknown as Response;
  }

  private async executeCommand(
    command: Command,
  ): Promise<CompanyDomainEntityBase | null> {
    const company = await this.executeInvoiceAggregateRoot(
      command.companyId.valueOf(),
    );
    this.validateEntity(company);
    return company;
  }

  private validateEntity(company: ICompanyDomainEntity): void {
    const { companyId, name, bankAccount } = company;

    if (companyId instanceof CompanyIdValueObject && companyId.hasErrors())
      this.setErrors(companyId.getErrors());

    if (name instanceof CompanyNameValueObject && name.hasErrors())
      this.setErrors(name.getErrors());

    if (
      bankAccount instanceof CompanyBankAccountValueObject &&
      bankAccount.hasErrors()
    )
      this.setErrors(bankAccount.getErrors());

    if (this.hasErrors() === true)
      throw new ValueObjectException(
        'Hay algunos errores en el comando ejecutado por GetCompany',
        this.getErrors(),
      );
  }

  private async executeInvoiceAggregateRoot(
    companyId: string,
  ): Promise<CompanyDomainEntityBase | null> {
    return this.invoiceAggregateRoot.getCompany(companyId);
  }
}
