import {
  IUseCase,
  ValueObjectErrorHandler,
  ValueObjectException,
} from '../../../../../../../libs/sofka';
import { OrderAggregate } from '../../../domain/aggregates';
import { IKitDomainEntity } from '../../../domain/entities/interfaces/';
import { KitDomainEntityBase } from '../../../domain/entities/order';
import { CreatedOrderEventPublisherBase } from '../../../domain/events';
import {
  IUpdateKitModelCommand,
} from '../../../domain/interfaces/commands/order';
import {
  IUpdateKitModelResponse,
} from '../../../domain/interfaces/responses/order';
import { IOrderDomainService } from '../../../domain/services';
import {
  KitIdValueObject,
  KitModelValueObject,
} from '../../../domain/value-objects/order';

export class UpdateKitModelUserCase<
    Command extends IUpdateKitModelCommand = IUpdateKitModelCommand,
    Response extends IUpdateKitModelResponse = IUpdateKitModelResponse,
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
  ): Promise<KitDomainEntityBase | null> {
    const kit = await this.orderAggregateRoot.getKit(command.kitId.valueOf());
    this.validateEntity(kit);
    kit.model = new KitModelValueObject(command.model.valueOf());
    return await this.executeOrderAggregateRoot(
      kit.kitId.valueOf(),
      kit
    );
  }

  private validateEntity(kit: IKitDomainEntity): void {
    const { kitId, model } = kit;
    if (kitId instanceof KitIdValueObject && kitId.hasErrors())
      this.setErrors(kitId.getErrors());

    if (model instanceof KitModelValueObject && model.hasErrors())
      this.setErrors(model.getErrors());

    if (this.hasErrors() === true)
      throw new ValueObjectException(
        'Hay algunos errores en el comando ejecutado por UpdateKitModel',
        this.getErrors(),
      );
  }

  private async executeOrderAggregateRoot(
    kitId: string,
    newKit: KitDomainEntityBase
  ): Promise<KitDomainEntityBase | null> {
    return this.orderAggregateRoot.updateKitModel(kitId, newKit);
  }
}
