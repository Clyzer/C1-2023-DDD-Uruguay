import {
  IUseCase,
  ValueObjectErrorHandler,
  ValueObjectException,
} from '../../../../../../../libs/sofka';
import { OrderAggregate } from '../../../domain/aggregates';
import { IEmployedDomainEntity } from '../../../domain/entities/interfaces';
import { EmployedDomainEntityBase } from '../../../domain/entities/order';
import {
  OrderEmployedGettedEventPublisherBase,
  OrderEmployedNameUpdatedEventPublisherBase,
} from '../../../domain/events/publishers/order';
import {
  IUpdateEmployedNameCommand,
} from '../../../domain/interfaces/commands/order';
import {
  IUpdateEmployedNameResponse,
} from '../../../domain/interfaces/responses/order';
import { IEmployedDomainService } from '../../../domain/services/order';
import {
  EmployedIdValueObject,
  EmployedNameValueObject,
  EmployedPhoneValueObject,
} from '../../../domain/value-objects/order';

export class UpdateEmployedNameUserCase<
    Command extends IUpdateEmployedNameCommand = IUpdateEmployedNameCommand,
    Response extends IUpdateEmployedNameResponse = IUpdateEmployedNameResponse,
  >
  extends ValueObjectErrorHandler
  implements IUseCase<Command, Response>
{
  private readonly orderAggregateRoot: OrderAggregate;

  constructor(
    private readonly employedService: IEmployedDomainService,
    private readonly orderEmployedNameUpdatedEventPublisherBase: OrderEmployedNameUpdatedEventPublisherBase,
    private readonly orderEmployedGettedEventPublisherBase: OrderEmployedGettedEventPublisherBase,
  ) {
    super();
    this.orderAggregateRoot = new OrderAggregate({
      employedService,
      orderEmployedNameUpdatedEventPublisherBase,
      orderEmployedGettedEventPublisherBase
    });
  }

  async execute(command?: Command): Promise<Response> {
    const data = await this.executeCommand(command);

    return { success: data ? true : false, data } as unknown as Response;
  }

  private async executeCommand(
    command: Command,
  ): Promise<EmployedDomainEntityBase | null> {
    const employed = await this.orderAggregateRoot.getEmployed(
      command.employedId.valueOf(),
    );
    this.validateEntity(employed);
    employed.name = command.name.valueOf();
    return await this.executeOrderAggregateRoot(
      employed.employedId.valueOf(),
      employed,
    );
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
        'Hay algunos errores en el comando ejecutado por UpdateEmployedName',
        this.getErrors(),
      );
  }

  private async executeOrderAggregateRoot(
    employedId: string,
    newEmployed: EmployedDomainEntityBase,
  ): Promise<EmployedDomainEntityBase | null> {
    return this.orderAggregateRoot.updateEmployedName(employedId, newEmployed);
  }
}
