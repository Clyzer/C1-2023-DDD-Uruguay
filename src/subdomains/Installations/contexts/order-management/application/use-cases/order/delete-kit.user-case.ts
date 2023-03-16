import {
  IUseCase,
  ValueObjectErrorHandler,
} from '../../../../../../../libs/sofka';
import { OrderAggregate } from '../../../domain/aggregates';
import { OrderKitDeletedEventPublisherBase } from '../../../domain/events/publishers/order';
import { IDeleteKitCommand } from '../../../domain/interfaces/commands/order';
import { IDeleteKitResponse } from '../../../domain/interfaces/responses/order';
import { IKitDomainService } from '../../../domain/services/order';

export class DeleteKitUserCase<
    Command extends IDeleteKitCommand = IDeleteKitCommand,
    Response extends IDeleteKitResponse = IDeleteKitResponse,
  >
  extends ValueObjectErrorHandler
  implements IUseCase<Command, Response>
{
  private readonly orderAggregateRoot: OrderAggregate;

  constructor(
    private readonly kitService: IKitDomainService,
    private readonly orderKitDeletedEventPublisherBase: OrderKitDeletedEventPublisherBase,
  ) {
    super();
    this.orderAggregateRoot = new OrderAggregate({
      kitService,
      orderKitDeletedEventPublisherBase,
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
