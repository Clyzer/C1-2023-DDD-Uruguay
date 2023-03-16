import {
  IUseCase,
  ValueObjectErrorHandler,
  ValueObjectException,
} from '../../../../../../../libs/sofka';
import { OrderAggregate } from '../../../domain/aggregates';
import { IKitDomainEntity } from '../../../domain/entities/interfaces';
import { KitDomainEntityBase } from '../../../domain/entities/order';
import { OrderKitCreatedEventPublisherBase } from '../../../domain/events/publishers/order';
import { ICreateKitCommand } from '../../../domain/interfaces/commands/order';
import { ICreateKitResponse } from '../../../domain/interfaces/responses/order';
import { IKitDomainService } from '../../../domain/services/order';
import { KitModelValueObject } from '../../../domain/value-objects/order';

export class CreateKitUseCase<
    Command extends ICreateKitCommand = ICreateKitCommand,
    Response extends ICreateKitResponse = ICreateKitResponse,
  >
  extends ValueObjectErrorHandler
  implements IUseCase<Command, Response>
{
  private readonly orderAggregateRoot: OrderAggregate;

  constructor(
    private readonly kitService: IKitDomainService,
    private readonly orderKitCreatedEventPublisherBase: OrderKitCreatedEventPublisherBase,
  ) {
    super();
    this.orderAggregateRoot = new OrderAggregate({
      kitService,
      orderKitCreatedEventPublisherBase,
    });
  }

  async execute(command?: Command): Promise<Response> {
    const data = await this.executeCommand(command);

    return { success: data ? true : false, data } as unknown as Response;
  }

  private async executeCommand(
    command: Command,
  ): Promise<KitDomainEntityBase | null> {
    const ValueObject = this.createValueObject(command);
    this.validateValueObject(ValueObject);
    const entity = this.createEntityKitDomain(ValueObject);
    return this.executeOrderAggregateRoot(entity);
  }

  private createValueObject(command: Command): IKitDomainEntity {
    const model = new KitModelValueObject(command.model.valueOf());

    return {
      model,
    };
  }

  private validateValueObject(valueObject: IKitDomainEntity): void {
    const { model } = valueObject;

    if (model instanceof KitModelValueObject && model.hasErrors())
      this.setErrors(model.getErrors());

    if (this.hasErrors() === true)
      throw new ValueObjectException(
        'Hay algunos errores en el comando ejecutado por createKitUserCase',
        this.getErrors(),
      );
  }

  private createEntityKitDomain(
    valueObject: IKitDomainEntity,
  ): KitDomainEntityBase {
    const { model } = valueObject;

    return new KitDomainEntityBase({
      model: model.valueOf(),
    });
  }

  private async executeOrderAggregateRoot(
    entity: KitDomainEntityBase,
  ): Promise<KitDomainEntityBase | null> {
    return this.orderAggregateRoot.createKit(entity);
  }
}
