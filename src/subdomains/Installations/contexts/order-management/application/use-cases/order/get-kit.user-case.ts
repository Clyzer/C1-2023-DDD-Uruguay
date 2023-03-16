import {
  IUseCase,
  ValueObjectErrorHandler,
  ValueObjectException,
} from '../../../../../../../libs/sofka';
import { OrderAggregate } from '../../../domain/aggregates';
import { IKitDomainEntity } from '../../../domain/entities/interfaces';
import { KitDomainEntityBase } from '../../../domain/entities/order';
import { OrderKitGettedEventPublisherBase } from '../../../domain/events/publishers/order';
import { IGetKitCommand } from '../../../domain/interfaces/commands/order';
import { IGetKitResponse } from '../../../domain/interfaces/responses/order';
import { IKitDomainService } from '../../../domain/services/order';
import {
  KitIdValueObject,
  KitModelValueObject,
} from '../../../domain/value-objects/order';

export class GetKitUserCase<
    Command extends IGetKitCommand = IGetKitCommand,
    Response extends IGetKitResponse = IGetKitResponse,
  >
  extends ValueObjectErrorHandler
  implements IUseCase<Command, Response>
{
  private readonly orderAggregateRoot: OrderAggregate;

  constructor(
    private readonly kitService: IKitDomainService,
    private readonly orderKitGettedEventPublisherBase: OrderKitGettedEventPublisherBase,
  ) {
    super();
    this.orderAggregateRoot = new OrderAggregate({
      kitService,
      orderKitGettedEventPublisherBase,
    });
  }

  async execute(command?: Command): Promise<Response> {
    const data = await this.executeCommand(command);

    return { success: data ? true : false, data } as unknown as Response;
  }

  private async executeCommand(
    command: Command,
  ): Promise<KitDomainEntityBase | null> {
    const kit = await this.executeOrderAggregateRoot(command.kitId.valueOf());
    this.validateEntity(kit);
    return kit;
  }

  private validateEntity(kit: IKitDomainEntity): void {
    const { kitId, model } = kit;
    if (kitId instanceof KitIdValueObject && kitId.hasErrors())
      this.setErrors(kitId.getErrors());

    if (model instanceof KitModelValueObject && model.hasErrors())
      this.setErrors(model.getErrors());

    if (this.hasErrors() === true)
      throw new ValueObjectException(
        'Hay algunos errores en el comando ejecutado por GetKit',
        this.getErrors(),
      );
  }

  private async executeOrderAggregateRoot(
    kitId: string,
  ): Promise<KitDomainEntityBase | null> {
    return this.orderAggregateRoot.getKit(kitId);
  }
}
