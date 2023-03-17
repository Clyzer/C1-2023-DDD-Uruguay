import { BadRequestException } from '@nestjs/common';

import {
  IUseCase,
  ValueObjectErrorHandler,
} from '../../../../../../libs/sofka';
import { OrderAggregate } from '../../domain/aggregates';
import {
  BenefitedDomainEntityBase,
  EmployedDomainEntityBase,
  KitDomainEntityBase,
  OrderDomainEntityBase,
} from '../../domain/entities';
import {
  CreatedOrderEventPublisherBase,
  OrderBenefitedCreatedEventPublisherBase,
  OrderBenefitedGettedEventPublisherBase,
  OrderEmployedCreatedEventPublisherBase,
  OrderEmployedGettedEventPublisherBase,
  OrderKitCreatedEventPublisherBase,
  OrderKitGettedEventPublisherBase,
} from '../../domain/events/publishers';
import { ICreateOrderCommand } from '../../domain/interfaces/commands';
import { ICreateOrderResponse } from '../../domain/interfaces/responses';
import {
  IBenefitedDomainService,
  IEmployedDomainService,
  IKitDomainService,
  IOrderDomainService,
} from '../../domain/services';

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
    private readonly kitService: IKitDomainService,
    private readonly orderKitCreatedEventPublisherBase: OrderKitCreatedEventPublisherBase,
    private readonly orderKitGettedEventPublisherBase: OrderKitGettedEventPublisherBase,
    private readonly employedService: IEmployedDomainService,
    private readonly orderEmployedCreatedEventPublisherBase: OrderEmployedCreatedEventPublisherBase,
    private readonly orderEmployedGettedEventPublisherBase: OrderEmployedGettedEventPublisherBase,
    private readonly benefitedService: IBenefitedDomainService,
    private readonly orderBenefitedCreatedEventPublisherBase: OrderBenefitedCreatedEventPublisherBase,
    private readonly orderBenefitedGettedEventPublisherBase: OrderBenefitedGettedEventPublisherBase
  ) {
    super();
    this.orderAggregateRoot = new OrderAggregate({
      orderService,
      createdOrderEventPublisherBase,
      kitService,
      orderKitCreatedEventPublisherBase,
      orderKitGettedEventPublisherBase,
      employedService,
      orderEmployedCreatedEventPublisherBase,
      orderEmployedGettedEventPublisherBase,
      benefitedService,
      orderBenefitedCreatedEventPublisherBase,
      orderBenefitedGettedEventPublisherBase
    });
  }

  async execute(command?: Command): Promise<Response> {
    const data = await this.executeCommand(command);

    return { success: data ? true : false, data } as unknown as Response;
  }

  private async executeCommand(
    command: Command,
  ): Promise<OrderDomainEntityBase | null> {
    if (command.kitId && command.employedId && command.benefitedId){
      let kit = await this.orderAggregateRoot.getKit(command.kitId);
      let employed = await this.orderAggregateRoot.getEmployed(command.employedId);
      let benefited = await this.orderAggregateRoot.getBenefited(command.benefitedId);
      let data = { benefited: benefited, kit: kit, employed: employed };
      let entity = new OrderDomainEntityBase(data);
      return this.executeOrderAggregateRoot(entity);
    }
    else if (command.kit && command.employed && command.benefited) {
      let kitEntity = new KitDomainEntityBase(command.kit);
      let kit = await this.orderAggregateRoot.createKit(kitEntity);

      let employedEntity = new EmployedDomainEntityBase(command.employed);
      let employed = await this.orderAggregateRoot.createEmployed(employedEntity);

      let benefitedEntity = new BenefitedDomainEntityBase(command.benefited);
      let benefited = await this.orderAggregateRoot.createBenefited(benefitedEntity);
      
      let data = { benefited: benefited, kit: kit, employed: employed };
      let entity = new OrderDomainEntityBase(data);
      return this.executeOrderAggregateRoot(entity);
    } else throw new BadRequestException;
    
  }

  private async executeOrderAggregateRoot(
    aggregate: OrderDomainEntityBase,
  ): Promise<OrderDomainEntityBase | null> {
    return this.orderAggregateRoot.createOrder(aggregate);
  }
}
