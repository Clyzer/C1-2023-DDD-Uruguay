import {
  IUseCase,
  ValueObjectErrorHandler,
  ValueObjectException,
} from '../../../../../../libs/sofka';
import { InvoiceAggregate } from '../../domain/aggregates';
import { InvoiceDomainEntityBase } from '../../domain/entities';
import { IInvoiceDomainEntity } from '../../domain/entities/interfaces';
import { CreatedInvoiceEventPublisherBase } from '../../domain/events/publishers';
import { ICreateInvoiceCommand } from '../../domain/interfaces/commands';
import { ICreateInvoiceResponse } from '../../domain/interfaces/responses';
import { IInvoiceDomainService } from '../../domain/services';
import {
  InvoiceIdValueObject,
  InvoiceStatusValueObject,
} from '../../domain/value-objects';

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
  ): Promise<InvoiceDomainEntityBase | null> {
    const ValueObject = this.createValueObject(command);
    this.validateValueObject(ValueObject);
    const entity = this.createEntityInvoiceDomain(ValueObject);
    return this.executeInvoiceAggregateRoot(entity);
  }

  private createValueObject(command: Command): IInvoiceDomainEntity {
    const invoiceId = new InvoiceIdValueObject(command.invoiceId);
    const status = new InvoiceStatusValueObject(command.status);
    const company = command.company;
    const fee = command.fee;

    return {
      invoiceId,
      status,
      company,
      fee,
    };
  }

  private validateValueObject(valueObject: IInvoiceDomainEntity): void {
    const { invoiceId, status } = valueObject;

    if (invoiceId instanceof InvoiceIdValueObject && invoiceId.hasErrors())
      this.setErrors(invoiceId.getErrors());

    if (status instanceof InvoiceStatusValueObject && status.hasErrors())
      this.setErrors(status.getErrors());

    if (this.hasErrors() === true)
      throw new ValueObjectException(
        'Hay algunos errores en el comando ejecutado por createInvoiceUserCase',
        this.getErrors(),
      );
  }

  private createEntityInvoiceDomain(
    valueObject: IInvoiceDomainEntity,
  ): InvoiceDomainEntityBase {
    const { invoiceId, status, company, fee } = valueObject;

    return new InvoiceDomainEntityBase({
      invoiceId: invoiceId.valueOf(),
      status: status.valueOf(),
      company: company.valueOf(),
      fee: fee.valueOf(),
    });
  }

  private async executeInvoiceAggregateRoot(
    aggregate: InvoiceDomainEntityBase,
  ): Promise<InvoiceDomainEntityBase | null> {
    return this.invoiceAggregateRoot.createInvoice(aggregate);
  }
}
