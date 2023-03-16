import {
  IUseCase,
  ValueObjectErrorHandler,
} from '../../../../../../../libs/sofka';
import { OrderAggregate } from '../../../domain/aggregates';
import { CreatedOrderEventPublisherBase } from '../../../domain/events';
import { IDeleteKitCommand } from '../../../domain/interfaces/commands';
import { IDeleteKitResponse } from '../../../domain/interfaces/responses';
import { IOrderDomainService } from '../../../domain/services';

export class DeleteKitUserCase<
    Command extends IDeleteKitCommand = IDeleteKitCommand,
    Response extends IDeleteKitResponse = IDeleteKitResponse,
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

  private async executeCommand(command: Command): Promise<boolean | null> {
    return await this.executeOrderAggregateRoot(command.kitId.valueOf());
  }

  private async executeOrderAggregateRoot(
    kitId: string,
  ): Promise<boolean | null> {
    return this.orderAggregateRoot.deleteKit(kitId);
  }
}
