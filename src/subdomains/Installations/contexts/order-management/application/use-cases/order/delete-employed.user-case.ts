import {
  IUseCase,
  ValueObjectErrorHandler,
} from '../../../../../../../libs/sofka';
import { OrderAggregate } from '../../../domain/aggregates';
import { CreatedOrderEventPublisherBase } from '../../../domain/events';
import { IDeleteEmployedCommand } from '../../../domain/interfaces/commands';
import { IDeleteEmployedResponse } from '../../../domain/interfaces/responses';
import { IOrderDomainService } from '../../../domain/services';

export class DeleteEmployedUserCase<
    Command extends IDeleteEmployedCommand = IDeleteEmployedCommand,
    Response extends IDeleteEmployedResponse = IDeleteEmployedResponse,
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
    return await this.executeOrderAggregateRoot(command.employedId.valueOf());
  }

  private async executeOrderAggregateRoot(
    employedId: string,
  ): Promise<boolean | null> {
    return this.orderAggregateRoot.deleteEmployed(employedId);
  }
}
