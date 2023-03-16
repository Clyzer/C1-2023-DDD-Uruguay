import { GetInvoiceUserCase } from '../';
import {
  AggregateUpdateException,
  IUseCase,
  ValueObjectErrorHandler,
  ValueObjectException,
} from '../../../../../../../libs/sofka';
import { InvoiceAggregate } from '../../../domain/aggregates';
import { FeeDomainEntityBase } from '../../../domain/entities';
import { CreatedInvoiceEventPublisherBase } from '../../../domain/events';
import { IUpdateFeeTaxCommand } from '../../../domain/interfaces/commands/invoice';
import { IUpdateFeeTaxResponse } from '../../../domain/interfaces/responses/invoice';
import { IInvoiceDomainService } from '../../../domain/services';
import { FeeTaxValueObject } from '../../../domain/value-objects';

export class UpdateFeeTaxUseCase<
    Command extends IUpdateFeeTaxCommand = IUpdateFeeTaxCommand,
    Response extends IUpdateFeeTaxResponse = IUpdateFeeTaxResponse,
  >
  extends ValueObjectErrorHandler
  implements IUseCase<Command, Response>
{
  private readonly invoiceAggregateRoot: InvoiceAggregate;

  constructor(
    private readonly invoiceService: IInvoiceDomainService,
    private readonly invoiceGet: GetInvoiceUserCase,
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
  ): Promise<FeeDomainEntityBase | null> {
    let tax: FeeTaxValueObject;
    if (typeof command.tax != 'string') {
      tax = this.validateObjectValue(command.tax);
    } else tax = new FeeTaxValueObject(+command.tax);
    const invoice = await this.invoiceAggregateRoot.getFee(command.feeId);
    if (invoice) {
      invoice.tax = tax;
      return invoice;
    } else
      throw new AggregateUpdateException(
        'Hay algunos errores en el comando ejecutado por UpdateFeeTaxUserCase',
      );
  }

  private validateObjectValue(
    valueObject: FeeTaxValueObject,
  ): FeeTaxValueObject {
    if (valueObject instanceof FeeTaxValueObject && valueObject.hasErrors())
      this.setErrors(valueObject.getErrors());

    if (this.hasErrors() === true)
      throw new ValueObjectException(
        'Hay algunos errores en el comando ejecutado por UpdateFeeTaxUserCase',
        this.getErrors(),
      );

    return valueObject;
  }
}
