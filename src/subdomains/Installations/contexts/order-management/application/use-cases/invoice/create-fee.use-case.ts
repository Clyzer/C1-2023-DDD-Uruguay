import {
  IUseCase,
  ValueObjectErrorHandler,
  ValueObjectException,
} from '../../../../../../../libs/sofka';
import { InvoiceAggregate } from '../../../domain/aggregates';
import { IFeeDomainEntity } from '../../../domain/entities/interfaces';
import { FeeDomainEntityBase } from '../../../domain/entities/invoice';
import { InvoiceFeeCreatedEventPublisherBase } from '../../../domain/events/publishers/invoice';
import { ICreateFeeCommand } from '../../../domain/interfaces/commands/invoice';
import { ICreateFeeResponse } from '../../../domain/interfaces/responses/invoice';
import { IFeeDomainService } from '../../../domain/services/invoice';
import {
  FeeChargeValueObject,
  FeeTaxValueObject,
} from '../../../domain/value-objects/invoice';

export class CreateFeeUseCase<
    Command extends ICreateFeeCommand = ICreateFeeCommand,
    Response extends ICreateFeeResponse = ICreateFeeResponse,
  >
  extends ValueObjectErrorHandler
  implements IUseCase<Command, Response>
{
  private readonly invoiceAggregateRoot: InvoiceAggregate;

  constructor(
    private readonly feeService: IFeeDomainService,
    private readonly invoiceFeeCreatedEventPublisherBase: InvoiceFeeCreatedEventPublisherBase,
  ) {
    super();
    this.invoiceAggregateRoot = new InvoiceAggregate({
      feeService,
      invoiceFeeCreatedEventPublisherBase,
    });
  }

  async execute(command?: Command): Promise<Response> {
    const data = await this.executeCommand(command);

    return { success: data ? true : false, data } as unknown as Response;
  }

  private async executeCommand(
    command: Command,
  ): Promise<FeeDomainEntityBase | null> {
    const valueObjects = this.createValueObjects(command);
    this.validateValueObjects(valueObjects);
    const entity = this.createEntity(valueObjects);
    return this.executeInvoiceAggregateRoot(entity);
  }

  private createValueObjects(command: Command): IFeeDomainEntity {
    const charge = new FeeChargeValueObject(command.charge.valueOf());
    const tax = new FeeTaxValueObject(command.tax.valueOf());

    return {
      charge,
      tax,
    };
  }

  private validateValueObjects(valueObjects: IFeeDomainEntity): void {
    const { charge, tax } = valueObjects;

    if (charge instanceof FeeChargeValueObject && charge.hasErrors())
      this.setErrors(charge.getErrors());

    if (tax instanceof FeeTaxValueObject && tax.hasErrors())
      this.setErrors(tax.getErrors());

    if (this.hasErrors() === true)
      throw new ValueObjectException(
        'Hay algunos errores en el comando ejecutado por createFeeUserCase',
        this.getErrors(),
      );
  }

  private createEntity(valueObject: IFeeDomainEntity): FeeDomainEntityBase {
    const { charge, tax } = valueObject;

    return new FeeDomainEntityBase({
      charge: charge.valueOf(),
      tax: tax.valueOf(),
    });
  }

  private async executeInvoiceAggregateRoot(
    entity: FeeDomainEntityBase,
  ): Promise<FeeDomainEntityBase | null> {
    return this.invoiceAggregateRoot.createFee(entity);
  }
}
