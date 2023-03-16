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
import { IUpdateFeeChargeCommand } from '../../../domain/interfaces/commands/invoice';
import { IUpdateFeeChargeResponse } from '../../../domain/interfaces/responses/invoice';
import { IInvoiceDomainService } from '../../../domain/services';
import { FeeChargeValueObject } from '../../../domain/value-objects';

export class UpdateFeeChargeUseCase<
    Command extends IUpdateFeeChargeCommand = IUpdateFeeChargeCommand,
    Response extends IUpdateFeeChargeResponse = IUpdateFeeChargeResponse,
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
    let charge: FeeChargeValueObject;
    if (typeof command.charge != 'string') {
      charge = this.validateObjectValue(command.charge);
    } else charge = new FeeChargeValueObject(+command.charge);
    const invoice = await this.invoiceAggregateRoot.getFee(command.feeId);
    if (invoice) {
      invoice.charge = charge;
      return invoice;
    } else
      throw new AggregateUpdateException(
        'Hay algunos errores en el comando ejecutado por UpdateFeeChargeUserCase',
      );
  }

  private validateObjectValue(
    valueObject: FeeChargeValueObject,
  ): FeeChargeValueObject {
    if (valueObject instanceof FeeChargeValueObject && valueObject.hasErrors())
      this.setErrors(valueObject.getErrors());

    if (this.hasErrors() === true)
      throw new ValueObjectException(
        'Hay algunos errores en el comando ejecutado por UpdateFeeChargeUserCase',
        this.getErrors(),
      );

    return valueObject;
  }
}
