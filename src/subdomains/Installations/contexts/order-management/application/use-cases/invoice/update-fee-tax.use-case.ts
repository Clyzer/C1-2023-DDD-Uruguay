import {
  IUseCase,
  ValueObjectErrorHandler,
  ValueObjectException,
} from '../../../../../../../libs/sofka';
import { InvoiceAggregate } from '../../../domain/aggregates';
import { IFeeDomainEntity } from '../../../domain/entities/interfaces/';
import { FeeDomainEntityBase } from '../../../domain/entities/invoice';
import {
  InvoiceFeeChargeUpdatedEventPublisherBase,
} from '../../../domain/events/publishers/invoice';
import {
  IUpdateFeeTaxCommand,
} from '../../../domain/interfaces/commands/invoice';
import {
  IUpdateFeeTaxResponse,
} from '../../../domain/interfaces/responses/invoice';
import { IFeeDomainService } from '../../../domain/services/invoice';
import {
  FeeChargeValueObject,
  FeeIdValueObject,
  FeeTaxValueObject,
} from '../../../domain/value-objects/invoice';

export class UpdateFeeTaxUserCase<
    Command extends IUpdateFeeTaxCommand = IUpdateFeeTaxCommand,
    Response extends IUpdateFeeTaxResponse = IUpdateFeeTaxResponse,
  >
  extends ValueObjectErrorHandler
  implements IUseCase<Command, Response>
{
  private readonly invoiceAggregateRoot: InvoiceAggregate;

  constructor(
    private readonly feeService: IFeeDomainService,
    private readonly invoiceFeeChargeUpdatedEventPublisherBase: InvoiceFeeChargeUpdatedEventPublisherBase,
  ) {
    super();
    this.invoiceAggregateRoot = new InvoiceAggregate({
      feeService,
      invoiceFeeChargeUpdatedEventPublisherBase,
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
    fee.tax = new FeeTaxValueObject(command.tax.valueOf());
    return await this.executeInvoiceAggregateRoot(
      fee.feeId.valueOf(),
      fee
    );
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
    newFee: FeeDomainEntityBase
  ): Promise<FeeDomainEntityBase | null> {
    return this.invoiceAggregateRoot.updateFeeTax(feeId, newFee);
  }
}
