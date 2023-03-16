import { OrderDomainEntityBase } from '../entities';

export interface IOrderDomainService<
  T extends OrderDomainEntityBase = OrderDomainEntityBase,
> {
  createOrder(order: T): Promise<T>;
  getOrder(orderId: string): Promise<T>;
  deleteOrder(orderId: string): Promise<boolean>;
  changeStatus(orderId: string): Promise<boolean>;
}
