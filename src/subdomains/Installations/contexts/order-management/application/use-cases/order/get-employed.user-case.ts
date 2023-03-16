import {
  IUseCase,
  ValueObjectErrorHandler,
  ValueObjectException,
} from '../../../../../../../libs/sofka';
import { OrderAggregate } from '../../../domain/aggregates';
import { IEmployedDomainEntity } from '../../../domain/entities/interfaces/';
import { EmployedDomainEntityBase } from '../../../domain/entities/order';
import { CreatedOrderEventPublisherBase } from '../../../domain/events';
import { IGetEmployedCommand } from '../../../domain/interfaces/commands';
import { IGetEmployedResponse } from '../../../domain/interfaces/responses';
import { IOrderDomainService } from '../../../domain/services';
import {
  EmployedIdValueObject,
  EmployedNameValueObject,
  EmployedPhoneValueObject,
} from '../../../domain/value-objects/order';

export class GetEmployedUserCase<
    Command extends IGetEmployedCommand = IGetEmployedCommand,
    Response extends IGetEmployedResponse = IGetEmployedResponse,
  >
  extends ValueObjectErrorHandler
  implements IUseCase<Command, Response>
{
  private readonly orderAggregateRoot: OrderAggregate;

  constructor(
    private readonly orderService: IOrderDomainService,
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
  ): Promise<EmployedDomainEntityBase | null> {
    const employed = await this.executeOrderAggregateRoot(
      command.employedId.valueOf(),
    );
    this.validateEntity(employed);
    return employed;
  }

  private validateEntity(employed: IEmployedDomainEntity): void {
    const { employedId, name, phone } = employed;

    if (employedId instanceof EmployedIdValueObject && employedId.hasErrors())
      this.setErrors(employedId.getErrors());

    if (name instanceof EmployedNameValueObject && name.hasErrors())
      this.setErrors(name.getErrors());

    if (phone instanceof EmployedPhoneValueObject && phone.hasErrors())
      this.setErrors(phone.getErrors());

    if (this.hasErrors() === true)
      throw new ValueObjectException(
        'Hay algunos errores en el comando ejecutado por GetEmployed',
        this.getErrors(),
      );
  }

  private async executeOrderAggregateRoot(
    employedId: string,
  ): Promise<EmployedDomainEntityBase | null> {
    return this.orderAggregateRoot.getEmployed(employedId);
  }
}
