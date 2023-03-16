import {
  IUseCase,
  ValueObjectErrorHandler,
  ValueObjectException,
} from '../../../../../../../libs/sofka';
import { InvoiceAggregate } from '../../../domain/aggregates';
import { IFeeDomainEntity } from '../../../domain/entities/interfaces';
import { FeeDomainEntityBase } from '../../../domain/entities/invoice';
import { InvoiceFeeGettedEventPublisherBase } from '../../../domain/events/publishers/invoice';
import { IGetFeeCommand } from '../../../domain/interfaces/commands/invoice';
import { IGetFeeResponse } from '../../../domain/interfaces/responses/invoice';
import { IFeeDomainService } from '../../../domain/services/invoice';
import {
  FeeChargeValueObject,
  FeeIdValueObject,
  FeeTaxValueObject,
} from '../../../domain/value-objects/invoice';

export class GetFeeUserCase<
    Command extends IGetFeeCommand = IGetFeeCommand,
    Response extends IGetFeeResponse = IGetFeeResponse,
  >
  extends ValueObjectErrorHandler
  implements IUseCase<Command, Response>
{
  private readonly invoiceAggregateRoot: InvoiceAggregate;

  constructor(
    private readonly feeService: IFeeDomainService,
    private readonly invoiceFeeGettedEventPublisherBase: InvoiceFeeGettedEventPublisherBase,
  ) {
    super();
    this.invoiceAggregateRoot = new InvoiceAggregate({
      feeService,
      invoiceFeeGettedEventPublisherBase,
    });
  }

  async execute(command?: Command): Promise<Response> {
    const data = await this.executeCommand(command);

    return { success: data ? true : false, data } as unknown as Response;
  }

  private async executeCommand(
    command: Command,
  ): Promise<FeeDomainEntityBase | null> {
    const fee = await this.executeInvoiceAggregateRoot(command.feeId.valueOf());
    this.validateEntity(fee);
    return fee;
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
  ): Promise<FeeDomainEntityBase | null> {
    return this.invoiceAggregateRoot.getFee(feeId);
  }
}
