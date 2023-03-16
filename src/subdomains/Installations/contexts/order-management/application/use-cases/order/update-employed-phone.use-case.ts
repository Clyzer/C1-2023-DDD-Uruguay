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
import { IUpdateEmployedPhoneCommand } from '../../../domain/interfaces/commands/order';
import { IUpdateEmployedPhoneResponse } from '../../../domain/interfaces/responses/order';
import { IOrderDomainService } from '../../../domain/services';
import { EmployedPhoneValueObject } from '../../../domain/value-objects';

export class UpdateEmployedPhoneUseCase<
    Command extends IUpdateEmployedPhoneCommand = IUpdateEmployedPhoneCommand,
    Response extends IUpdateEmployedPhoneResponse = IUpdateEmployedPhoneResponse,
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
    let phone: EmployedPhoneValueObject;
    if (typeof command.phone != 'string') {
      phone = this.validateObjectValue(command.phone);
    } else phone = new EmployedPhoneValueObject(command.phone.toString());
    const order = await this.orderAggregateRoot.getEmployed(command.employedId);
    if (order) {
      order.phone = phone;
      return order;
    } else
      throw new AggregateUpdateException(
        'Hay algunos errores en el comando ejecutado por UpdateEmployedPhoneUserCase',
      );
  }

  private validateObjectValue(
    valueObject: EmployedPhoneValueObject,
  ): EmployedPhoneValueObject {
    if (
      valueObject instanceof EmployedPhoneValueObject &&
      valueObject.hasErrors()
    )
      this.setErrors(valueObject.getErrors());

    if (this.hasErrors() === true)
      throw new ValueObjectException(
        'Hay algunos errores en el comando ejecutado por UpdateEmployedPhoneUserCase',
        this.getErrors(),
      );

    return valueObject;
  }
}
