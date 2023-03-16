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
import { IUpdateBenefitedPhoneCommand } from '../../../domain/interfaces/commands/order';
import { IUpdateBenefitedPhoneResponse } from '../../../domain/interfaces/responses/order';
import { IOrderDomainService } from '../../../domain/services';
import { BenefitedPhoneValueObject } from '../../../domain/value-objects';

export class UpdateBenefitedPhoneUseCase<
    Command extends IUpdateBenefitedPhoneCommand = IUpdateBenefitedPhoneCommand,
    Response extends IUpdateBenefitedPhoneResponse = IUpdateBenefitedPhoneResponse,
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
    let phone: BenefitedPhoneValueObject;
    if (typeof command.phone != 'string') {
      phone = this.validateObjectValue(command.phone);
    } else phone = new BenefitedPhoneValueObject(command.phone.toString());
    const order = await this.orderAggregateRoot.getBenefited(
      command.benefitedId,
    );
    if (order) {
      order.phone = phone;
      return order;
    } else
      throw new AggregateUpdateException(
        'Hay algunos errores en el comando ejecutado por UpdateBenefitedPhoneUserCase',
      );
  }

  private validateObjectValue(
    valueObject: BenefitedPhoneValueObject,
  ): BenefitedPhoneValueObject {
    if (
      valueObject instanceof BenefitedPhoneValueObject &&
      valueObject.hasErrors()
    )
      this.setErrors(valueObject.getErrors());

    if (this.hasErrors() === true)
      throw new ValueObjectException(
        'Hay algunos errores en el comando ejecutado por UpdateBenefitedPhoneUserCase',
        this.getErrors(),
      );

    return valueObject;
  }
}
