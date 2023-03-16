import { AggregateRootException } from '../../../../../../libs/sofka';
import { OrderDomainEntityBase } from '../entities';
import {
  BenefitedDomainEntityBase,
  EmployedDomainEntityBase,
  KitDomainEntityBase,
} from '../entities/order';
import {
  CreatedOrderEventPublisherBase,
  DeletedOrderEventPublisherBase,
  GettedOrderEventPublisherBase,
} from '../events';
import {
  OrderBenefitedAddressUpdatedEventPublisherBase,
  OrderBenefitedCompanyIdUpdatedEventPublisherBase,
  OrderBenefitedCreatedEventPublisherBase,
  OrderBenefitedDeletedEventPublisherBase,
  OrderBenefitedGettedEventPublisherBase,
  OrderBenefitedNameUpdatedEventPublisherBase,
  OrderBenefitedPhoneUpdatedEventPublisherBase,
  OrderEmployedCreatedEventPublisherBase,
  OrderEmployedDeletedEventPublisherBase,
  OrderEmployedGettedEventPublisherBase,
  OrderEmployedNameUpdatedEventPublisherBase,
  OrderEmployedPhoneUpdatedEventPublisherBase,
  OrderKitCreatedEventPublisherBase,
  OrderKitDeletedEventPublisherBase,
  OrderKitGettedEventPublisherBase,
  OrderKitModelUpdatedEventPublisherBase,
  OrderStatusChangedEventPublisherBase,
} from '../events/publishers/order';
import {
  IBenefitedDomainService,
  IEmployedDomainService,
  IKitDomainService,
  IOrderDomainService,
} from '../services';

export class OrderAggregate
  implements
    IOrderDomainService,
    IEmployedDomainService,
    IBenefitedDomainService,
    IKitDomainService
{
  private readonly orderService?: IOrderDomainService;
  private readonly employedService?: IEmployedDomainService;
  private readonly benefitedService?: IBenefitedDomainService;
  private readonly kitService?: IKitDomainService;
  private readonly createdOrderEventPublisherBase?: CreatedOrderEventPublisherBase;
  private readonly gettedOrderEventPublisherBase?: GettedOrderEventPublisherBase;
  private readonly deletedOrderEventPublisherBase?: DeletedOrderEventPublisherBase;
  private readonly orderStatusChangedEventPublisherBase?: OrderStatusChangedEventPublisherBase;
  private readonly orderEmployedCreatedEventPublisherBase?: OrderEmployedCreatedEventPublisherBase;
  private readonly orderEmployedDeletedEventPublisherBase?: OrderEmployedDeletedEventPublisherBase;
  private readonly orderEmployedGettedEventPublisherBase?: OrderEmployedGettedEventPublisherBase;
  private readonly orderEmployedNameUpdatedEventPublisherBase?: OrderEmployedNameUpdatedEventPublisherBase;
  private readonly orderEmployedPhoneUpdatedEventPublisherBase?: OrderEmployedPhoneUpdatedEventPublisherBase;
  private readonly orderBenefitedCreatedEventPublisherBase?: OrderBenefitedCreatedEventPublisherBase;
  private readonly orderBenefitedAddressUpdatedEventPublisherBase?: OrderBenefitedAddressUpdatedEventPublisherBase;
  private readonly orderBenefitedCompanyIdUpdatedEventPublisherBase?: OrderBenefitedCompanyIdUpdatedEventPublisherBase;
  private readonly orderBenefitedDeletedEventPublisherBase?: OrderBenefitedDeletedEventPublisherBase;
  private readonly orderBenefitedGettedEventPublisherBase?: OrderBenefitedGettedEventPublisherBase;
  private readonly orderBenefitedNameUpdatedEventPublisherBase?: OrderBenefitedNameUpdatedEventPublisherBase;
  private readonly orderBenefitedPhoneUpdatedEventPublisherBase?: OrderBenefitedPhoneUpdatedEventPublisherBase;
  private readonly orderKitCreatedEventPublisherBase?: OrderKitCreatedEventPublisherBase;
  private readonly orderKitDeletedEventPublisherBase?: OrderKitDeletedEventPublisherBase;
  private readonly orderKitGettedEventPublisherBase?: OrderKitGettedEventPublisherBase;
  private readonly orderKitModelUpdatedEventPublisherBase?: OrderKitModelUpdatedEventPublisherBase;

  constructor({
    orderService,
    createdOrderEventPublisherBase,
    gettedOrderEventPublisherBase,
    orderStatusChangedEventPublisherBase,
    deletedOrderEventPublisherBase,
    employedService,
    orderEmployedCreatedEventPublisherBase,
    orderEmployedDeletedEventPublisherBase,
    orderEmployedGettedEventPublisherBase,
    orderEmployedNameUpdatedEventPublisherBase,
    orderEmployedPhoneUpdatedEventPublisherBase,
    benefitedService,
    orderBenefitedCreatedEventPublisherBase,
    orderBenefitedAddressUpdatedEventPublisherBase,
    orderBenefitedCompanyIdUpdatedEventPublisherBase,
    orderBenefitedDeletedEventPublisherBase,
    orderBenefitedGettedEventPublisherBase,
    orderBenefitedNameUpdatedEventPublisherBase,
    orderBenefitedPhoneUpdatedEventPublisherBase,
    kitService,
    orderKitCreatedEventPublisherBase,
    orderKitDeletedEventPublisherBase,
    orderKitGettedEventPublisherBase,
    orderKitModelUpdatedEventPublisherBase,
  }: {
    orderService?: IOrderDomainService;
    createdOrderEventPublisherBase?: CreatedOrderEventPublisherBase;
    gettedOrderEventPublisherBase?: GettedOrderEventPublisherBase;
    deletedOrderEventPublisherBase?: DeletedOrderEventPublisherBase;
    orderStatusChangedEventPublisherBase?: OrderStatusChangedEventPublisherBase;

    employedService?: IEmployedDomainService;
    orderEmployedCreatedEventPublisherBase?: OrderEmployedCreatedEventPublisherBase;
    orderEmployedDeletedEventPublisherBase?: OrderEmployedDeletedEventPublisherBase;
    orderEmployedGettedEventPublisherBase?: OrderEmployedGettedEventPublisherBase;
    orderEmployedNameUpdatedEventPublisherBase?: OrderEmployedNameUpdatedEventPublisherBase;
    orderEmployedPhoneUpdatedEventPublisherBase?: OrderEmployedPhoneUpdatedEventPublisherBase;

    benefitedService?: IBenefitedDomainService;
    orderBenefitedCreatedEventPublisherBase?: OrderBenefitedCreatedEventPublisherBase;
    orderBenefitedAddressUpdatedEventPublisherBase?: OrderBenefitedAddressUpdatedEventPublisherBase;
    orderBenefitedCompanyIdUpdatedEventPublisherBase?: OrderBenefitedCompanyIdUpdatedEventPublisherBase;
    orderBenefitedDeletedEventPublisherBase?: OrderBenefitedDeletedEventPublisherBase;
    orderBenefitedGettedEventPublisherBase?: OrderBenefitedGettedEventPublisherBase;
    orderBenefitedNameUpdatedEventPublisherBase?: OrderBenefitedNameUpdatedEventPublisherBase;
    orderBenefitedPhoneUpdatedEventPublisherBase?: OrderBenefitedPhoneUpdatedEventPublisherBase;

    kitService?: IKitDomainService;
    orderKitCreatedEventPublisherBase?: OrderKitCreatedEventPublisherBase;
    orderKitDeletedEventPublisherBase?: OrderKitDeletedEventPublisherBase;
    orderKitGettedEventPublisherBase?: OrderKitGettedEventPublisherBase;
    orderKitModelUpdatedEventPublisherBase?: OrderKitModelUpdatedEventPublisherBase;
  }) {
    this.orderService = orderService;
    this.createdOrderEventPublisherBase = createdOrderEventPublisherBase;
    this.gettedOrderEventPublisherBase = gettedOrderEventPublisherBase;
    this.deletedOrderEventPublisherBase = deletedOrderEventPublisherBase;
    this.orderStatusChangedEventPublisherBase =
      orderStatusChangedEventPublisherBase;

    this.employedService = employedService;
    this.orderEmployedCreatedEventPublisherBase =
      orderEmployedCreatedEventPublisherBase;
    this.orderEmployedDeletedEventPublisherBase =
      orderEmployedDeletedEventPublisherBase;
    this.orderEmployedGettedEventPublisherBase =
      orderEmployedGettedEventPublisherBase;
    this.orderEmployedNameUpdatedEventPublisherBase =
      orderEmployedNameUpdatedEventPublisherBase;
    this.orderEmployedPhoneUpdatedEventPublisherBase =
      orderEmployedPhoneUpdatedEventPublisherBase;

    this.benefitedService = benefitedService;
    this.orderBenefitedCreatedEventPublisherBase =
      orderBenefitedCreatedEventPublisherBase;
    this.orderBenefitedAddressUpdatedEventPublisherBase =
      orderBenefitedAddressUpdatedEventPublisherBase;
    this.orderBenefitedCompanyIdUpdatedEventPublisherBase =
      orderBenefitedCompanyIdUpdatedEventPublisherBase;
    this.orderBenefitedDeletedEventPublisherBase =
      orderBenefitedDeletedEventPublisherBase;
    this.orderBenefitedGettedEventPublisherBase =
      orderBenefitedGettedEventPublisherBase;
    this.orderBenefitedNameUpdatedEventPublisherBase =
      orderBenefitedNameUpdatedEventPublisherBase;
    this.orderBenefitedPhoneUpdatedEventPublisherBase =
      orderBenefitedPhoneUpdatedEventPublisherBase;

    this.kitService = kitService;
    this.orderKitCreatedEventPublisherBase = orderKitCreatedEventPublisherBase;
    this.orderKitDeletedEventPublisherBase = orderKitDeletedEventPublisherBase;
    this.orderKitGettedEventPublisherBase = orderKitGettedEventPublisherBase;
    this.orderKitModelUpdatedEventPublisherBase =
      orderKitModelUpdatedEventPublisherBase;
  }

  async createOrder(
    order: OrderDomainEntityBase,
  ): Promise<OrderDomainEntityBase> {
    if (!this.orderService)
      throw new AggregateRootException('OrderService is not defined');
    if (!this.createdOrderEventPublisherBase)
      throw new AggregateRootException(
        'CreatedOrderEventPublisherBase is not defined',
      );
    const result = await this.orderService.createOrder(order);
    this.createdOrderEventPublisherBase.response = result;
    this.createdOrderEventPublisherBase.publish();
    return result;
  }

  async getOrder(orderId: string): Promise<OrderDomainEntityBase> {
    if (!this.orderService)
      throw new AggregateRootException('OrderService is not defined');
    if (!this.gettedOrderEventPublisherBase)
      throw new AggregateRootException(
        'GettedOrderEventPublisherBase is not defined',
      );
    const result = await this.orderService.getOrder(orderId);
    this.gettedOrderEventPublisherBase.response = result;
    this.gettedOrderEventPublisherBase.publish();
    return result;
  }

  async deleteOrder(orderId: string): Promise<boolean> {
    if (!this.orderService)
      throw new AggregateRootException('OrderService is not defined');
    if (!this.deletedOrderEventPublisherBase)
      throw new AggregateRootException(
        'DeletedOrderEventPublisherBase is not defined',
      );
    const result = await this.orderService.deleteOrder(orderId);
    this.deletedOrderEventPublisherBase.response = result;
    this.deletedOrderEventPublisherBase.publish();
    return result;
  }

  async changeStatus(orderId: string): Promise<boolean> {
    if (!this.orderService)
      throw new AggregateRootException('OrderService is not defined');
    if (!this.orderStatusChangedEventPublisherBase)
      throw new AggregateRootException(
        'OrderStatusChangedEventPublisherBase is not defined',
      );
    const result = await this.orderService.changeStatus(orderId);
    this.orderStatusChangedEventPublisherBase.response = result;
    this.orderStatusChangedEventPublisherBase.publish();
    return result;
  }

  async createBenefited(
    benefited: BenefitedDomainEntityBase,
  ): Promise<BenefitedDomainEntityBase> {
    if (!this.benefitedService)
      throw new AggregateRootException('BenefitedService is not defined');
    if (!this.orderBenefitedCreatedEventPublisherBase)
      throw new AggregateRootException(
        'OrderBenefitedCreatedEventPublisherBase is not defined',
      );
    const result = await this.benefitedService.createBenefited(benefited);
    this.orderBenefitedCreatedEventPublisherBase.response = result;
    this.orderBenefitedCreatedEventPublisherBase.publish();
    return result;
  }

  async getBenefited(benefitedId: string): Promise<BenefitedDomainEntityBase> {
    if (!this.benefitedService)
      throw new AggregateRootException('BenefitedService is not defined');
    if (!this.orderBenefitedGettedEventPublisherBase)
      throw new AggregateRootException(
        'OrderBenefitedGettedEventPublisherBase is not defined',
      );
    const result = await this.benefitedService.getBenefited(benefitedId);
    this.orderBenefitedGettedEventPublisherBase.response = result;
    this.orderBenefitedGettedEventPublisherBase.publish();
    return result;
  }

  async deleteBenefited(benefitedId: string): Promise<boolean> {
    if (!this.benefitedService)
      throw new AggregateRootException('BenefitedService is not defined');
    if (!this.orderBenefitedDeletedEventPublisherBase)
      throw new AggregateRootException(
        'OrderBenefitedDeletedEventPublisherBase is not defined',
      );
    const result = await this.benefitedService.deleteBenefited(benefitedId);
    this.orderBenefitedDeletedEventPublisherBase.response = result;
    this.orderBenefitedDeletedEventPublisherBase.publish();
    return result;
  }

  async updateBenefitedAddress(
    benefitedId: string,
    newBenefitedAddress: BenefitedDomainEntityBase,
  ): Promise<BenefitedDomainEntityBase> {
    if (!this.benefitedService)
      throw new AggregateRootException('BenefitedService is not defined');
    if (!this.orderBenefitedAddressUpdatedEventPublisherBase)
      throw new AggregateRootException(
        'OrderBenefitedAddressUpdatedEventPublisherBase is not defined',
      );
    const result = await this.benefitedService.updateBenefitedAddress(
      benefitedId,
      newBenefitedAddress,
    );
    this.orderBenefitedAddressUpdatedEventPublisherBase.response = result;
    this.orderBenefitedAddressUpdatedEventPublisherBase.publish();
    return result;
  }
  async updateBenefitedCompanyId(
    benefitedId: string,
    newBenefitedCompanyId: BenefitedDomainEntityBase,
  ): Promise<BenefitedDomainEntityBase> {
    if (!this.benefitedService)
      throw new AggregateRootException('BenefitedService is not defined');
    if (!this.orderBenefitedCompanyIdUpdatedEventPublisherBase)
      throw new AggregateRootException(
        'OrderBenefitedCompanyIdUpdatedEventPublisherBase is not defined',
      );
    const result = await this.benefitedService.updateBenefitedAddress(
      benefitedId,
      newBenefitedCompanyId,
    );
    this.orderBenefitedCompanyIdUpdatedEventPublisherBase.response = result;
    this.orderBenefitedCompanyIdUpdatedEventPublisherBase.publish();
    return result;
  }
  async updateBenefitedName(
    benefitedId: string,
    newBenefitedName: BenefitedDomainEntityBase,
  ): Promise<BenefitedDomainEntityBase> {
    if (!this.benefitedService)
      throw new AggregateRootException('BenefitedService is not defined');
    if (!this.orderBenefitedNameUpdatedEventPublisherBase)
      throw new AggregateRootException(
        'OrderBenefitedNameUpdatedEventPublisherBase is not defined',
      );
    const result = await this.benefitedService.updateBenefitedName(
      benefitedId,
      newBenefitedName,
    );
    this.orderBenefitedNameUpdatedEventPublisherBase.response = result;
    this.orderBenefitedNameUpdatedEventPublisherBase.publish();
    return result;
  }
  async updateBenefitedPhone(
    benefitedId: string,
    newBenefitedPhone: BenefitedDomainEntityBase,
  ): Promise<BenefitedDomainEntityBase> {
    if (!this.benefitedService)
      throw new AggregateRootException('BenefitedService is not defined');
    if (!this.orderBenefitedPhoneUpdatedEventPublisherBase)
      throw new AggregateRootException(
        'OrderBenefitedPhoneUpdatedEventPublisherBase is not defined',
      );
    const result = await this.benefitedService.updateBenefitedPhone(
      benefitedId,
      newBenefitedPhone,
    );
    this.orderBenefitedPhoneUpdatedEventPublisherBase.response = result;
    this.orderBenefitedPhoneUpdatedEventPublisherBase.publish();
    return result;
  }

  async createKit(kit: KitDomainEntityBase): Promise<KitDomainEntityBase> {
    if (!this.kitService)
      throw new AggregateRootException('KitService is not defined');
    if (!this.orderKitCreatedEventPublisherBase)
      throw new AggregateRootException(
        'OrderKitCreatedEventPublisherBase is not defined',
      );
    const result = await this.kitService.createKit(kit);
    this.orderKitCreatedEventPublisherBase.response = result;
    this.orderKitCreatedEventPublisherBase.publish();
    return result;
  }

  async getKit(kitId: string): Promise<KitDomainEntityBase> {
    if (!this.kitService)
      throw new AggregateRootException('KitService is not defined');
    if (!this.orderKitGettedEventPublisherBase)
      throw new AggregateRootException(
        'OrderKitGettedEventPublisherBase is not defined',
      );
    const result = await this.kitService.getKit(kitId);
    this.orderKitGettedEventPublisherBase.response = result;
    this.orderKitGettedEventPublisherBase.publish();
    return result;
  }

  async deleteKit(kitId: string): Promise<boolean> {
    if (!this.kitService)
      throw new AggregateRootException('KitService is not defined');
    if (!this.orderKitDeletedEventPublisherBase)
      throw new AggregateRootException(
        'OrderKitDeletedEventPublisherBase is not defined',
      );
    const result = await this.kitService.deleteKit(kitId);
    this.orderKitDeletedEventPublisherBase.response = result;
    this.orderKitDeletedEventPublisherBase.publish();
    return result;
  }

  async updateKitModel(
    kitId: string,
    newKitModel: KitDomainEntityBase,
  ): Promise<KitDomainEntityBase> {
    if (!this.kitService)
      throw new AggregateRootException('KitService is not defined');
    if (!this.orderKitModelUpdatedEventPublisherBase)
      throw new AggregateRootException(
        'OrderKitModelUpdatedEventPublisherBase is not defined',
      );
    const result = await this.kitService.updateKitModel(kitId, newKitModel);
    this.orderKitModelUpdatedEventPublisherBase.response = result;
    this.orderKitModelUpdatedEventPublisherBase.publish();
    return result;
  }

  async createEmployed(
    employed: EmployedDomainEntityBase,
  ): Promise<EmployedDomainEntityBase> {
    if (!this.employedService)
      throw new AggregateRootException('EmployedService is not defined');
    if (!this.orderEmployedCreatedEventPublisherBase)
      throw new AggregateRootException(
        'OrderEmployedCreatedEventPublisherBase is not defined',
      );
    const result = await this.employedService.createEmployed(employed);
    this.orderEmployedCreatedEventPublisherBase.response = result;
    this.orderEmployedCreatedEventPublisherBase.publish();
    return result;
  }

  async getEmployed(employedId: string): Promise<EmployedDomainEntityBase> {
    if (!this.employedService)
      throw new AggregateRootException('EmployedService is not defined');
    if (!this.orderEmployedGettedEventPublisherBase)
      throw new AggregateRootException(
        'OrderEmployedGettedEventPublisherBase is not defined',
      );
    const result = await this.employedService.getEmployed(employedId);
    this.orderEmployedGettedEventPublisherBase.response = result;
    this.orderEmployedGettedEventPublisherBase.publish();
    return result;
  }

  async deleteEmployed(employedId: string): Promise<boolean> {
    if (!this.employedService)
      throw new AggregateRootException('EmployedService is not defined');
    if (!this.orderEmployedDeletedEventPublisherBase)
      throw new AggregateRootException(
        'OrderEmployedDeletedEventPublisherBase is not defined',
      );
    const result = await this.employedService.deleteEmployed(employedId);
    this.orderEmployedDeletedEventPublisherBase.response = result;
    this.orderEmployedDeletedEventPublisherBase.publish();
    return result;
  }

  async updateEmployedName(
    employedId: string,
    newEmployedName: EmployedDomainEntityBase,
  ): Promise<EmployedDomainEntityBase> {
    if (!this.employedService)
      throw new AggregateRootException('EmployedService is not defined');
    if (!this.orderEmployedNameUpdatedEventPublisherBase)
      throw new AggregateRootException(
        'OrderEmployedNameUpdatedEventPublisherBase is not defined',
      );
    const result = await this.employedService.updateEmployedName(
      employedId,
      newEmployedName,
    );
    this.orderEmployedNameUpdatedEventPublisherBase.response = result;
    this.orderEmployedNameUpdatedEventPublisherBase.publish();
    return result;
  }
  async updateEmployedPhone(
    employedId: string,
    newEmployedPhone: EmployedDomainEntityBase,
  ): Promise<EmployedDomainEntityBase> {
    if (!this.employedService)
      throw new AggregateRootException('EmployedService is not defined');
    if (!this.orderEmployedPhoneUpdatedEventPublisherBase)
      throw new AggregateRootException(
        'OrderEmployedPhoneUpdatedEventPublisherBase is not defined',
      );
    const result = await this.employedService.updateEmployedPhone(
      employedId,
      newEmployedPhone,
    );
    this.orderEmployedPhoneUpdatedEventPublisherBase.response = result;
    this.orderEmployedPhoneUpdatedEventPublisherBase.publish();
    return result;
  }
}
