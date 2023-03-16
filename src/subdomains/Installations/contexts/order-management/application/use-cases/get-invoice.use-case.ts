import {
  IUseCase,
  ValueObjectErrorHandler,
  ValueObjectException,
} from '../../../../../../libs/sofka';
import { InvoiceAggregate } from '../../domain/aggregates';
import {
  CompanyDomainEntityBase,
  FeeDomainEntityBase,
  InvoiceDomainEntityBase,
} from '../../domain/entities/';
import { IInvoiceDomainEntity } from '../../domain/entities/interfaces';
import { GettedInvoiceEventPublisherBase } from '../../domain/events/publishers';
import { IGetInvoiceCommand } from '../../domain/interfaces/commands';
import { IGetInvoiceResponse } from '../../domain/interfaces/responses';
import { IInvoiceDomainService } from '../../domain/services';
import {
  InvoiceIdValueObject,
  InvoiceStatusValueObject,
} from '../../domain/value-objects';
import {
  CompanyBankAccountValueObject,
  CompanyIdValueObject,
  CompanyNameValueObject,
  FeeChargeValueObject,
  FeeIdValueObject,
  FeeTaxValueObject,
} from '../../domain/value-objects/invoice';

export class GetInvoiceUserCase<
    Command extends IGetInvoiceCommand = IGetInvoiceCommand,
    Response extends IGetInvoiceResponse = IGetInvoiceResponse,
  >
  extends ValueObjectErrorHandler
  implements IUseCase<Command, Response>
{
  private readonly invoiceAggregateRoot: InvoiceAggregate;

  constructor(
    private readonly invoiceService: IInvoiceDomainService,
    private readonly gettedInvoiceEventPublisherBase: GettedInvoiceEventPublisherBase,
  ) {
    super();
    this.invoiceAggregateRoot = new InvoiceAggregate({
      invoiceService,
      gettedInvoiceEventPublisherBase,
    });
  }

  async execute(command?: Command): Promise<Response> {
    const data = await this.executeCommand(command);

    return { success: data ? true : false, data } as unknown as Response;
  }

  private async executeCommand(
    command: Command,
  ): Promise<InvoiceDomainEntityBase | null> {
    const invoice = await this.executeInvoiceAggregateRoot(
      command.invoiceId.valueOf(),
    );
    this.validateAggregate(invoice);
    return invoice;
  }

  private validateAggregate(aggregate: IInvoiceDomainEntity): void {
    const { invoiceId, status, company, fee } = aggregate;

    if (invoiceId instanceof InvoiceIdValueObject && invoiceId.hasErrors())
      this.setErrors(invoiceId.getErrors());

    if (status instanceof InvoiceStatusValueObject && status.hasErrors())
      this.setErrors(status.getErrors());

    this.validateCompany(company);
    this.validateFee(fee);

    if (this.hasErrors() === true)
      throw new ValueObjectException(
        'Hay algunos errores en el comando ejecutado por GetInvoice',
        this.getErrors(),
      );
  }

  private validateCompany(company: CompanyDomainEntityBase): void {
    const { companyId, bankAccount, name } = company;

    if (companyId instanceof CompanyIdValueObject && companyId.hasErrors())
      this.setErrors(companyId.getErrors());

    if (
      bankAccount instanceof CompanyBankAccountValueObject &&
      bankAccount.hasErrors()
    )
      this.setErrors(bankAccount.getErrors());

    if (name instanceof CompanyNameValueObject && name.hasErrors())
      this.setErrors(name.getErrors());
  }

  private validateFee(fee: FeeDomainEntityBase): void {
    const { feeId, charge, tax } = fee;

    if (feeId instanceof FeeIdValueObject && feeId.hasErrors())
      this.setErrors(feeId.getErrors());

    if (charge instanceof FeeChargeValueObject && charge.hasErrors())
      this.setErrors(charge.getErrors());

    if (tax instanceof FeeTaxValueObject && tax.hasErrors())
      this.setErrors(tax.getErrors());
  }

  private async executeInvoiceAggregateRoot(
    invoiceId: string,
  ): Promise<InvoiceDomainEntityBase | null> {
    return this.invoiceAggregateRoot.getInvoice(invoiceId);
  }
}
