import { GetOrderUserCase } from '../';
import {
  AggregateUpdateException,
  IUseCase,
  ValueObjectErrorHandler,
  ValueObjectException,
} from '../../../../../../../libs/sofka';
import { OrderAggregate } from '../../../domain/aggregates';
import { FeeDomainEntityBase } from '../../../domain/entities';
import { CreatedOrderEventPublisherBase } from '../../../domain/events';
import { IUpdateBenefitedNameCommand } from '../../../domain/interfaces/commands/order';
import { IUpdateBenefitedNameResponse } from '../../../domain/interfaces/responses/order';
import { IOrderDomainService } from '../../../domain/services';
import { BenefitedNameValueObject } from '../../../domain/value-objects';

export class UpdateBenefitedNameUseCase<
    Command extends IUpdateBenefitedNameCommand = IUpdateBenefitedNameCommand,
    Response extends IUpdateBenefitedNameResponse = IUpdateBenefitedNameResponse,
  >
  extends ValueObjectErrorHandler
  implements IUseCase<Command, Response>
{
  private readonly orderAggregateRoot: OrderAggregate;

  constructor(
    private readonly orderService: IOrderDomainService,
    private readonly orderGet: GetOrderUserCase,
    private readonly createdOrderEventPublisherBase: CreatedOrderEventPublisherBase,
  ) {
    super();
    this.orderAggregateRoot = new OrderAggregate({
      orderService,
      createdOrderEventPublisherBase,
    });
  }

  async execute(command?: Command): Promise<Response> {
    const data = await this.executeCommand(command);

    return { success: data ? true : false, data } as unknown as Response;
  }

  private async executeCommand(
    command: Command,
  ): Promise<FeeDomainEntityBase | null> {
    let name: BenefitedNameValueObject;
    if (typeof command.name != 'string') {
      name = this.validateObjectValue(command.name);
    } else name = new BenefitedNameValueObject(command.name.toString());
    const order = await this.orderAggregateRoot.getBenefited(
      command.benefitedId,
    );
    if (order) {
      order.name = name;
      return order;
    } else
      throw new AggregateUpdateException(
        'Hay algunos errores en el comando ejecutado por UpdateBenefitedNameUserCase',
      );
  }

  private validateObjectValue(
    valueObject: BenefitedNameValueObject,
  ): BenefitedNameValueObject {
    if (
      valueObject instanceof BenefitedNameValueObject &&
      valueObject.hasErrors()
    )
      this.setErrors(valueObject.getErrors());

    if (this.hasErrors() === true)
      throw new ValueObjectException(
        'Hay algunos errores en el comando ejecutado por UpdateBenefitedNameUserCase',
        this.getErrors(),
      );

    return valueObject;
  }
}
