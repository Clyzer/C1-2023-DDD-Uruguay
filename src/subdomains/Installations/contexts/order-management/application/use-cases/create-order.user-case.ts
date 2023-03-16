import {
  IUseCase,
  ValueObjectErrorHandler,
} from '../../../../../../libs/sofka';
import { OrderAggregate } from '../../domain/aggregates';
import {
  EmployedDomainEntityBase,
  KitDomainEntityBase,
  OrderDomainEntityBase,
} from '../../domain/entities';
import {
  BenefitedDomainEntityBase,
} from '../../domain/entities/order/benefited.domain-entity';
import { CreatedOrderEventPublisherBase } from '../../domain/events/publishers';
import { ICreateOrderCommand } from '../../domain/interfaces/commands';
import { ICreateOrderResponse } from '../../domain/interfaces/responses';
import { IOrderDomainService } from '../../domain/services';

export class CreateOrderUseCase<
    Command extends ICreateOrderCommand = ICreateOrderCommand,
    Response extends ICreateOrderResponse = ICreateOrderResponse,
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

  private async executeCommand(
    command: Command,
  ): Promise<OrderDomainEntityBase | null> {
    if (!(command.kit && command.employed && command.benefited)) {
      let benefited = new BenefitedDomainEntityBase();
      let kit = new KitDomainEntityBase();
      let employed = new EmployedDomainEntityBase();
      let data = { benefited: benefited, kit: kit, employed: employed };
      let entity = new OrderDomainEntityBase(data);
      //this.orderAggregateRoot.createBenefited(benefited);
      //this.orderAggregateRoot.createKit(kit);
      //this.orderAggregateRoot.createEmployed(employed);
      return this.orderAggregateRoot.createOrder(entity);
    }
    return null;
    //const ValueObject = this.createValueObject(command);
    //this.validateValueObject(ValueObject);
    //const entity = this.createEntityOrderDomain(ValueObject);
    //return this.executeOrderAggregateRoot(entity);
  }

  private async executeOrderAggregateRoot(
    aggregate: OrderDomainEntityBase,
  ): Promise<KitDomainEntityBase | null> {
    return this.orderAggregateRoot.createOrder(aggregate);
  }
}
