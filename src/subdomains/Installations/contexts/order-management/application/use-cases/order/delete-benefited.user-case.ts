import {
  IUseCase,
  ValueObjectErrorHandler,
} from '../../../../../../../libs/sofka';
import { OrderAggregate } from '../../../domain/aggregates';
import { OrderBenefitedDeletedEventPublisherBase } from '../../../domain/events/publishers/order';
import { IDeleteBenefitedCommand } from '../../../domain/interfaces/commands/order';
import { IDeleteBenefitedResponse } from '../../../domain/interfaces/responses/order';
import { IBenefitedDomainService } from '../../../domain/services/order';

export class DeleteBenefitedUserCase<
    Command extends IDeleteBenefitedCommand = IDeleteBenefitedCommand,
    Response extends IDeleteBenefitedResponse = IDeleteBenefitedResponse,
  >
  extends ValueObjectErrorHandler
  implements IUseCase<Command, Response>
{
  private readonly orderAggregateRoot: OrderAggregate;

  constructor(
    private readonly benefitedService: IBenefitedDomainService,
    private readonly orderBenefitedDeletedEventPublisherBase: OrderBenefitedDeletedEventPublisherBase,
  ) {
    super();
    this.orderAggregateRoot = new OrderAggregate({
      benefitedService,
      orderBenefitedDeletedEventPublisherBase,
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
