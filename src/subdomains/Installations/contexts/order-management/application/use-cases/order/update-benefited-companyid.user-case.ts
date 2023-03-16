import { GetOrderUserCase } from '../';
import {
  AggregateUpdateException,
  IUseCase,
  ValueObjectErrorHandler,
  ValueObjectException,
} from '../../../../../../../libs/sofka';
import { OrderAggregate } from '../../../domain/aggregates';
import { FeeDomainEntityBase } from '../../../domain/entities';
import { CreatedOrderEventPublisherBase } from '../../../domain/events';
import { IUpdateBenefitedCompanyIdCommand } from '../../../domain/interfaces/commands/order';
import { IUpdateBenefitedCompanyIdResponse } from '../../../domain/interfaces/responses/order';
import { IOrderDomainService } from '../../../domain/services';
import { BenefitedCompanyIdValueObject } from '../../../domain/value-objects';

export class UpdateBenefitedCompanyIdUseCase<
    Command extends IUpdateBenefitedCompanyIdCommand = IUpdateBenefitedCompanyIdCommand,
    Response extends IUpdateBenefitedCompanyIdResponse = IUpdateBenefitedCompanyIdResponse,
  >
  extends ValueObjectErrorHandler
  implements IUseCase<Command, Response>
{
  private readonly orderAggregateRoot: OrderAggregate;

  constructor(
    private readonly orderService: IOrderDomainService,
    private readonly orderGet: GetOrderUserCase,
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
  ): Promise<FeeDomainEntityBase | null> {
    let companyId: BenefitedCompanyIdValueObject;
    if (typeof command.companyId != 'string') {
      companyId = this.validateObjectValue(command.companyId);
    } else
      companyId = new BenefitedCompanyIdValueObject(
        command.companyId.toString(),
      );
    const order = await this.orderAggregateRoot.getBenefited(
      command.benefitedId,
    );
    if (order) {
      order.companyId = companyId;
      return order;
    } else
      throw new AggregateUpdateException(
        'Hay algunos errores en el comando ejecutado por UpdateBenefitedCompanyIdUserCase',
      );
  }

  private validateObjectValue(
    valueObject: BenefitedCompanyIdValueObject,
  ): BenefitedCompanyIdValueObject {
    if (
      valueObject instanceof BenefitedCompanyIdValueObject &&
      valueObject.hasErrors()
    )
      this.setErrors(valueObject.getErrors());

    if (this.hasErrors() === true)
      throw new ValueObjectException(
        'Hay algunos errores en el comando ejecutado por UpdateBenefitedCompanyIdUserCase',
        this.getErrors(),
      );

    return valueObject;
  }
}
