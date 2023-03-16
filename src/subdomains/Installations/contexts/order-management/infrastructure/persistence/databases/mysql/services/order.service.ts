import { Injectable } from '@nestjs/common';

import { IOrderDomainService } from '../../../../../domain/services';
import { OrderMySqlEntity } from '../entities';
import { OrderRepository } from '../repositories';

@Injectable()
export class OrderMySqlService
  implements IOrderDomainService<OrderMySqlEntity>
{
  constructor(private readonly orderRepository: OrderRepository) {}

  createOrder(order: OrderMySqlEntity): Promise<OrderMySqlEntity> {
    return this.orderRepository.create(order);
  }

  getOrder(orderId: string): Promise<OrderMySqlEntity> {
    return this.orderRepository.findById(orderId);
  }

  deleteOrder(orderId: string): Promise<boolean> {
    return this.orderRepository.delete(orderId);
  }

  changeStatus(orderId: string): Promise<boolean> {
    return this.orderRepository.changeStatus(orderId);
  }
}
