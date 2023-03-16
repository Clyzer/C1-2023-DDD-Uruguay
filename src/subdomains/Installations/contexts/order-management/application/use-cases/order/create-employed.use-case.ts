import {
  IUseCase,
  ValueObjectErrorHandler,
  ValueObjectException,
} from '../../../../../../../libs/sofka';
import { OrderAggregate } from '../../../domain/aggregates';
import { IEmployedDomainEntity } from '../../../domain/entities/interfaces';
import { EmployedDomainEntityBase } from '../../../domain/entities/order';
import { OrderEmployedCreatedEventPublisherBase } from '../../../domain/events/publishers/order';
import { ICreateEmployedCommand } from '../../../domain/interfaces/commands/order';
import { ICreateEmployedResponse } from '../../../domain/interfaces/responses/order';
import { IEmployedDomainService } from '../../../domain/services/order';
import {
  EmployedNameValueObject,
  EmployedPhoneValueObject,
} from '../../../domain/value-objects/order';

export class CreateEmployedUseCase<
    Command extends ICreateEmployedCommand = ICreateEmployedCommand,
    Response extends ICreateEmployedResponse = ICreateEmployedResponse,
  >
  extends ValueObjectErrorHandler
  implements IUseCase<Command, Response>
{
  private readonly orderAggregateRoot: OrderAggregate;

  constructor(
    private readonly employedService: IEmployedDomainService,
    private readonly orderEmployedCreatedEventPublisherBase: OrderEmployedCreatedEventPublisherBase,
  ) {
    super();
    this.orderAggregateRoot = new OrderAggregate({
      employedService,
      orderEmployedCreatedEventPublisherBase,
    });
  }

  async execute(command?: Command): Promise<Response> {
    const data = await this.executeCommand(command);

    return { success: data ? true : false, data } as unknown as Response;
  }

  private async executeCommand(
    command: Command,
  ): Promise<EmployedDomainEntityBase | null> {
    const ValueObject = this.createValueObject(command);
    this.validateValueObject(ValueObject);
    const entity = this.createEntityEmployedDomain(ValueObject);
    return this.executeOrderAggregateRoot(entity);
  }

  private createValueObject(command: Command): IEmployedDomainEntity {
    const name = new EmployedNameValueObject(command.name.valueOf());
    const phone = new EmployedPhoneValueObject(command.phone.valueOf());

    return {
      name,
      phone,
    };
  }

  private validateValueObject(valueObject: IEmployedDomainEntity): void {
    const { name, phone } = valueObject;

    if (name instanceof EmployedNameValueObject && name.hasErrors())
      this.setErrors(name.getErrors());

    if (phone instanceof EmployedPhoneValueObject && phone.hasErrors())
      this.setErrors(phone.getErrors());

    if (this.hasErrors() === true)
      throw new ValueObjectException(
        'Hay algunos errores en el comando ejecutado por createEmployedUserCase',
        this.getErrors(),
      );
  }

  private createEntityEmployedDomain(
    valueObject: IEmployedDomainEntity,
  ): EmployedDomainEntityBase {
    const { name, phone } = valueObject;

    return new EmployedDomainEntityBase({
      name: name.valueOf(),
      phone: phone.valueOf(),
    });
  }

  private async executeOrderAggregateRoot(
    entity: EmployedDomainEntityBase,
  ): Promise<EmployedDomainEntityBase | null> {
    return this.orderAggregateRoot.createEmployed(entity);
  }
}
