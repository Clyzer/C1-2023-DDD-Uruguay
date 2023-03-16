import {
  IUseCase,
  ValueObjectErrorHandler,
} from '../../../../../../../libs/sofka';
import { OrderAggregate } from '../../../domain/aggregates';
import { CreatedOrderEventPublisherBase } from '../../../domain/events';
import { IDeleteBenefitedCommand } from '../../../domain/interfaces/commands';
import { IDeleteBenefitedResponse } from '../../../domain/interfaces/responses';
import { IOrderDomainService } from '../../../domain/services';

export class DeleteBenefitedUserCase<
    Command extends IDeleteBenefitedCommand = IDeleteBenefitedCommand,
    Response extends IDeleteBenefitedResponse = IDeleteBenefitedResponse,
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
    return await this.executeOrderAggregateRoot(command.benefitedId.valueOf());
  }

  private async executeOrderAggregateRoot(
    benefitedId: string,
  ): Promise<boolean | null> {
    return this.orderAggregateRoot.deleteBenefited(benefitedId);
  }
}
