import {
  IUseCase,
  ValueObjectErrorHandler,
} from '../../../../../../../libs/sofka';
import { OrderAggregate } from '../../../domain/aggregates';
import { OrderEmployedDeletedEventPublisherBase } from '../../../domain/events/publishers/order';
import { IDeleteEmployedCommand } from '../../../domain/interfaces/commands/order';
import { IDeleteEmployedResponse } from '../../../domain/interfaces/responses/order';
import { IEmployedDomainService } from '../../../domain/services/order';

export class DeleteEmployedUserCase<
    Command extends IDeleteEmployedCommand = IDeleteEmployedCommand,
    Response extends IDeleteEmployedResponse = IDeleteEmployedResponse,
  >
  extends ValueObjectErrorHandler
  implements IUseCase<Command, Response>
{
  private readonly orderAggregateRoot: OrderAggregate;

  constructor(
    private readonly employedService: IEmployedDomainService,
    private readonly orderEmployedDeletedEventPublisherBase: OrderEmployedDeletedEventPublisherBase,
  ) {
    super();
    this.orderAggregateRoot = new OrderAggregate({
      employedService,
      orderEmployedDeletedEventPublisherBase,
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
