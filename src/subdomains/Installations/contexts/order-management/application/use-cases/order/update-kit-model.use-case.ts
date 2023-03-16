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
import { IUpdateKitModelCommand } from '../../../domain/interfaces/commands/order';
import { IUpdateKitModelResponse } from '../../../domain/interfaces/responses/order';
import { IOrderDomainService } from '../../../domain/services';
import { KitModelValueObject } from '../../../domain/value-objects';

export class UpdateKitModelUseCase<
    Command extends IUpdateKitModelCommand = IUpdateKitModelCommand,
    Response extends IUpdateKitModelResponse = IUpdateKitModelResponse,
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
    let model: KitModelValueObject;
    if (typeof command.model != 'string') {
      model = this.validateObjectValue(command.model);
    } else model = new KitModelValueObject(command.model.toString());
    const order = await this.orderAggregateRoot.getKit(command.kitId);
    if (order) {
      order.model = model;
      return order;
    } else
      throw new AggregateUpdateException(
        'Hay algunos errores en el comando ejecutado por UpdateKitModelUserCase',
      );
  }

  private validateObjectValue(
    valueObject: KitModelValueObject,
  ): KitModelValueObject {
    if (valueObject instanceof KitModelValueObject && valueObject.hasErrors())
      this.setErrors(valueObject.getErrors());

    if (this.hasErrors() === true)
      throw new ValueObjectException(
        'Hay algunos errores en el comando ejecutado por UpdateKitModelUserCase',
        this.getErrors(),
      );

    return valueObject;
  }
}
