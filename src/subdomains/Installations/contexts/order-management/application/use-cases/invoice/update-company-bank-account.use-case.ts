import {
  AggregateUpdateException,
  IUseCase,
  ValueObjectErrorHandler,
  ValueObjectException,
} from '../../../../../../../libs/sofka';
import { InvoiceAggregate } from '../../../domain/aggregates';
import { CompanyDomainEntityBase } from '../../../domain/entities';
import { CreatedInvoiceEventPublisherBase } from '../../../domain/events';
import { IUpdateCompanyBankAccountCommand } from '../../../domain/interfaces/commands/invoice';
import { IUpdateCompanyBankAccountResponse } from '../../../domain/interfaces/responses/invoice';
import { IInvoiceDomainService } from '../../../domain/services';
import { CompanyBankAccountValueObject } from '../../../domain/value-objects';

export class UpdateCompanyBankAccountUseCase<
    Command extends IUpdateCompanyBankAccountCommand = IUpdateCompanyBankAccountCommand,
    Response extends IUpdateCompanyBankAccountResponse = IUpdateCompanyBankAccountResponse,
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
    let bankAccount: CompanyBankAccountValueObject;
    if (typeof command.bankAccount != 'string') {
      bankAccount = this.validateObjectValue(command.bankAccount);
    } else
      bankAccount = new CompanyBankAccountValueObject(
        command.bankAccount.toString(),
      );
    const invoice = await this.invoiceAggregateRoot.getCompany(
      command.companyId,
    );
    if (invoice) {
      invoice.bankAccount = bankAccount;
      return invoice;
    } else
      throw new AggregateUpdateException(
        'Hay algunos errores en el comando ejecutado por UpdateCompanyBankAccountUserCase',
      );
  }

  private validateObjectValue(
    valueObject: CompanyBankAccountValueObject,
  ): CompanyBankAccountValueObject {
    if (
      valueObject instanceof CompanyBankAccountValueObject &&
      valueObject.hasErrors()
    )
      this.setErrors(valueObject.getErrors());

    if (this.hasErrors() === true)
      throw new ValueObjectException(
        'Hay algunos errores en el comando ejecutado por UpdateCompanyBankAccountUserCase',
        this.getErrors(),
      );

    return valueObject;
  }
}
