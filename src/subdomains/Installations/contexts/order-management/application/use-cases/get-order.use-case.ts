import {
  IUseCase,
  ValueObjectErrorHandler,
  ValueObjectException,
} from '../../../../../../libs/sofka';
import { OrderAggregate } from '../../domain/aggregates';
import {
  BenefitedDomainEntityBase,
  EmployedDomainEntityBase,
  KitDomainEntityBase,
  OrderDomainEntityBase,
} from '../../domain/entities';
import { IOrderDomainEntity } from '../../domain/entities/interfaces';
import { GettedOrderEventPublisherBase } from '../../domain/events/publishers';
import { IGetOrderCommand } from '../../domain/interfaces/commands';
import { IGetOrderResponse } from '../../domain/interfaces/responses';
import { IOrderDomainService } from '../../domain/services';
import {
  OrderIdValueObject,
  OrderStatusValueObject,
} from '../../domain/value-objects';
import {
  BenefitedAddressValueObject,
  BenefitedCompanyIdValueObject,
  BenefitedIdValueObject,
  BenefitedNameValueObject,
  BenefitedPhoneValueObject,
  EmployedIdValueObject,
  EmployedNameValueObject,
  EmployedPhoneValueObject,
  KitIdValueObject,
  KitModelValueObject,
} from '../../domain/value-objects/order';

export class GetOrderUserCase<
    Command extends IGetOrderCommand = IGetOrderCommand,
    Response extends IGetOrderResponse = IGetOrderResponse,
  >
  extends ValueObjectErrorHandler
  implements IUseCase<Command, Response>
{
  private readonly orderAggregateRoot: OrderAggregate;

  constructor(
    private readonly orderService: IOrderDomainService,
    private readonly gettedOrderEventPublisherBase: GettedOrderEventPublisherBase,
  ) {
    super();
    this.orderAggregateRoot = new OrderAggregate({
      orderService,
      gettedOrderEventPublisherBase,
    });
  }

  async execute(command?: Command): Promise<Response> {
    const data = await this.executeCommand(command);

    return { success: data ? true : false, data } as unknown as Response;
  }

  private async executeCommand(
    command: Command,
  ): Promise<OrderDomainEntityBase | null> {
    const order = await this.executeOrderAggregateRoot(
      command.orderId.valueOf(),
    );
    this.validateAggregate(order);
    return order;
  }

  private validateAggregate(aggregate: IOrderDomainEntity): void {
    const { orderId, status, kit, employed, benefited } = aggregate;

    if (orderId instanceof OrderIdValueObject && orderId.hasErrors())
      this.setErrors(orderId.getErrors());

    if (status instanceof OrderStatusValueObject && status.hasErrors())
      this.setErrors(status.getErrors());

    this.validateKit(kit);
    this.validateEmployed(employed);
    this.validateBenefited(benefited);

    if (this.hasErrors() === true)
      throw new ValueObjectException(
        'Hay algunos errores en el comando ejecutado por GetOrder',
        this.getErrors(),
      );
  }

  private validateKit(kit: KitDomainEntityBase): void {
    const { kitId, model } = kit;

    if (kitId instanceof KitIdValueObject && kitId.hasErrors())
      this.setErrors(kitId.getErrors());

    if (model instanceof KitModelValueObject && model.hasErrors())
      this.setErrors(model.getErrors());
  }

  private validateEmployed(employed: EmployedDomainEntityBase): void {
    const { employedId, name, phone } = employed;

    if (employedId instanceof EmployedIdValueObject && employedId.hasErrors())
      this.setErrors(employedId.getErrors());

    if (name instanceof EmployedNameValueObject && name.hasErrors())
      this.setErrors(name.getErrors());

    if (phone instanceof EmployedPhoneValueObject && phone.hasErrors())
      this.setErrors(phone.getErrors());
  }

  private validateBenefited(benefited: BenefitedDomainEntityBase): void {
    const { benefitedId, name, phone, address, companyId } = benefited;

    if (
      benefitedId instanceof BenefitedIdValueObject &&
      benefitedId.hasErrors()
    )
      this.setErrors(benefitedId.getErrors());

    if (name instanceof BenefitedNameValueObject && name.hasErrors())
      this.setErrors(name.getErrors());

    if (phone instanceof BenefitedPhoneValueObject && phone.hasErrors())
      this.setErrors(phone.getErrors());

    if (address instanceof BenefitedAddressValueObject && address.hasErrors())
      this.setErrors(address.getErrors());

    if (
      companyId instanceof BenefitedCompanyIdValueObject &&
      companyId.hasErrors()
    )
      this.setErrors(companyId.getErrors());
  }

  private async executeOrderAggregateRoot(
    orderId: string,
  ): Promise<OrderDomainEntityBase | null> {
    return this.orderAggregateRoot.getOrder(orderId);
  }
}
