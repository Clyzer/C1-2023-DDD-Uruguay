import {
  IUseCase,
  ValueObjectErrorHandler,
} from '../../../../../../libs/sofka';
import { OrderAggregate } from '../../domain/aggregates';
import { DeletedOrderEventPublisherBase } from '../../domain/events/publishers';
import { IDeleteOrderCommand } from '../../domain/interfaces/commands';
import { IDeleteOrderResponse } from '../../domain/interfaces/responses';
import { IOrderDomainService } from '../../domain/services';

export class DeleteOrderUserCase<
    Command extends IDeleteOrderCommand = IDeleteOrderCommand,
    Response extends IDeleteOrderResponse = IDeleteOrderResponse,
  >
  extends ValueObjectErrorHandler
  implements IUseCase<Command, Response>
{
  private readonly orderAggregateRoot: OrderAggregate;

  constructor(
    private readonly orderService: IOrderDomainService,
    private readonly deletedOrderEventPublisherBase: DeletedOrderEventPublisherBase,
  ) {
    super();
    this.orderAggregateRoot = new OrderAggregate({
      orderService,
      deletedOrderEventPublisherBase,
    });
  }

  async execute(command?: Command): Promise<Response> {
    const data = await this.executeCommand(command);

    return { success: data ? true : false, data } as unknown as Response;
  }

  private async executeCommand(command: Command): Promise<boolean | null> {
    return await this.executeOrderAggregateRoot(command.orderId.valueOf());
  }

  private async executeOrderAggregateRoot(
    orderId: string,
  ): Promise<boolean | null> {
    return this.orderAggregateRoot.deleteOrder(orderId);
  }
}
