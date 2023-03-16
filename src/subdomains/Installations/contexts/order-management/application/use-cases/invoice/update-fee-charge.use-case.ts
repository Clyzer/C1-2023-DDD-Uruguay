import {
  IUseCase,
  ValueObjectErrorHandler,
  ValueObjectException,
} from '../../../../../../../libs/sofka';
import { InvoiceAggregate } from '../../../domain/aggregates';
import { IFeeDomainEntity } from '../../../domain/entities/interfaces';
import { FeeDomainEntityBase } from '../../../domain/entities/invoice';
import {
  InvoiceFeeChargeUpdatedEventPublisherBase,
  InvoiceFeeGettedEventPublisherBase,
} from '../../../domain/events/publishers/invoice';
import {
  IUpdateFeeChargeCommand,
} from '../../../domain/interfaces/commands/invoice';
import {
  IUpdateFeeChargeResponse,
} from '../../../domain/interfaces/responses/invoice';
import { IFeeDomainService } from '../../../domain/services/invoice';
import {
  FeeChargeValueObject,
  FeeIdValueObject,
  FeeTaxValueObject,
} from '../../../domain/value-objects/invoice';

export class UpdateFeeChargeUserCase<
    Command extends IUpdateFeeChargeCommand = IUpdateFeeChargeCommand,
    Response extends IUpdateFeeChargeResponse = IUpdateFeeChargeResponse,
  >
  extends ValueObjectErrorHandler
  implements IUseCase<Command, Response>
{
  private readonly invoiceAggregateRoot: InvoiceAggregate;

  constructor(
    private readonly feeService: IFeeDomainService,
    private readonly invoiceFeeChargeUpdatedEventPublisherBase: InvoiceFeeChargeUpdatedEventPublisherBase,
    private readonly invoiceFeeGettedEventPublisherBase: InvoiceFeeGettedEventPublisherBase,
  ) {
    super();
    this.invoiceAggregateRoot = new InvoiceAggregate({
      feeService,
      invoiceFeeChargeUpdatedEventPublisherBase,
      invoiceFeeGettedEventPublisherBase
    });
  }

  async execute(command?: Command): Promise<Response> {
    const data = await this.executeCommand(command);

    return { success: data ? true : false, data } as unknown as Response;
  }

  private async executeCommand(
    command: Command,
  ): Promise<FeeDomainEntityBase | null> {
    const fee = await this.invoiceAggregateRoot.getFee(command.feeId.valueOf());
    this.validateEntity(fee);
    fee.charge = command.charge.valueOf();
    return await this.executeInvoiceAggregateRoot(fee.feeId.valueOf(), fee);
  }

  private validateEntity(fee: IFeeDomainEntity): void {
    const { feeId, charge, tax } = fee;

    if (feeId instanceof FeeIdValueObject && feeId.hasErrors())
      this.setErrors(feeId.getErrors());

    if (charge instanceof FeeChargeValueObject && charge.hasErrors())
      this.setErrors(charge.getErrors());

    if (tax instanceof FeeTaxValueObject && tax.hasErrors())
      this.setErrors(tax.getErrors());

    if (this.hasErrors() === true)
      throw new ValueObjectException(
        'Hay algunos errores en el comando ejecutado por GetFee',
        this.getErrors(),
      );
  }

  private async executeInvoiceAggregateRoot(
    feeId: string,
    newFee: FeeDomainEntityBase,
  ): Promise<FeeDomainEntityBase | null> {
    return this.invoiceAggregateRoot.updateFeeCharge(feeId, newFee);
  }
}
