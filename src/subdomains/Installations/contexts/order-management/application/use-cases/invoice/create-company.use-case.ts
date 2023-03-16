import {
  IUseCase,
  ValueObjectErrorHandler,
  ValueObjectException,
} from '../../../../../../../libs/sofka';
import { InvoiceAggregate } from '../../../domain/aggregates';
import { CompanyDomainEntityBase } from '../../../domain/entities';
import { ICompanyDomainEntity } from '../../../domain/entities/interfaces';
import { CreatedInvoiceEventPublisherBase } from '../../../domain/events';
import { ICreateCompanyCommand } from '../../../domain/interfaces/commands/invoice';
import { ICreateCompanyResponse } from '../../../domain/interfaces/responses/invoice';
import { IInvoiceDomainService } from '../../../domain/services';
import {
  CompanyBankAccountValueObject,
  CompanyNameValueObject,
} from '../../../domain/value-objects';

export class CreateCompanyUseCase<
    Command extends ICreateCompanyCommand = ICreateCompanyCommand,
    Response extends ICreateCompanyResponse = ICreateCompanyResponse,
  >
  extends ValueObjectErrorHandler
  implements IUseCase<Command, Response>
{
  private readonly invoiceAggregateRoot: InvoiceAggregate;

  constructor(
    private readonly invoiceService: IInvoiceDomainService,
    private readonly createdInvoiceEventPublisherBase: CreatedInvoiceEventPublisherBase,
  ) {
    super();
    this.invoiceAggregateRoot = new InvoiceAggregate({
      invoiceService,
      createdInvoiceEventPublisherBase,
    });
  }

  async execute(command?: Command): Promise<Response> {
    const data = await this.executeCommand(command);

    return { success: data ? true : false, data } as unknown as Response;
  }

  private async executeCommand(
    command: Command,
  ): Promise<CompanyDomainEntityBase | null> {
    const ValueObject = this.createValueObject(command);
    this.validateValueObject(ValueObject);
    const entity = this.createEntityCompanyDomain(ValueObject);
    return this.executeInvoiceAggregateRoot(entity);
  }

  private createValueObject(command: Command): ICompanyDomainEntity {
    const name = new CompanyNameValueObject(command.name.valueOf());
    const bankAccount = new CompanyBankAccountValueObject(
      command.bankAccount.valueOf(),
    );

    return {
      name,
      bankAccount,
    };
  }

  private validateValueObject(valueObject: ICompanyDomainEntity): void {
    const { name, bankAccount } = valueObject;

    if (name instanceof CompanyNameValueObject && name.hasErrors())
      this.setErrors(name.getErrors());

    if (
      bankAccount instanceof CompanyBankAccountValueObject &&
      bankAccount.hasErrors()
    )
      this.setErrors(bankAccount.getErrors());

    if (this.hasErrors() === true)
      throw new ValueObjectException(
        'Hay algunos errores en el comando ejecutado por createCompanyUserCase',
        this.getErrors(),
      );
  }

  private createEntityCompanyDomain(
    valueObject: ICompanyDomainEntity,
  ): CompanyDomainEntityBase {
    const { name, bankAccount } = valueObject;

    return new CompanyDomainEntityBase({
      name: name.valueOf(),
      bankAccount: bankAccount.valueOf(),
    });
  }

  private async executeInvoiceAggregateRoot(
    entity: CompanyDomainEntityBase,
  ): Promise<CompanyDomainEntityBase | null> {
    return this.invoiceAggregateRoot.createCompany(entity);
  }
}
