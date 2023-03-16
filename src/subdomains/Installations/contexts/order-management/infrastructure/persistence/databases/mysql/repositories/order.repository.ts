import { Repository } from 'typeorm';

import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { OrderMySqlEntity } from '../entities';
import { IRepository } from './base';

@Injectable()
export class OrderRepository implements IRepository<OrderMySqlEntity> {
  constructor(
    @InjectRepository(OrderMySqlEntity)
    private readonly repository: Repository<OrderMySqlEntity>,
  ) {}

  async findAll(): Promise<OrderMySqlEntity[]> {
    return await this.repository.find();
  }

  async findById(orderId: string): Promise<OrderMySqlEntity> {
    const order = await this.repository.findOneBy({
      orderId,
      deletedAt: undefined,
    });
    if (!order)
      throw new BadRequestException(`Order with id: ${orderId} not found`);

    return order;
  }

  async create(entity: OrderMySqlEntity): Promise<OrderMySqlEntity> {
    return await this.repository.save(entity);
  }

  async update(
    orderId: string,
    entity: OrderMySqlEntity,
  ): Promise<OrderMySqlEntity> {
    const order = await this.repository.findOneBy({
      orderId,
      deletedAt: undefined,
    });
    if (!order)
      throw new BadRequestException(`Order with id: ${orderId} not found`);

    return await this.repository.save(entity);
  }

  async delete(orderId: string): Promise<boolean> {
    let result = true;
    const order = await this.repository.findOneBy({
      orderId,
      deletedAt: undefined,
    });
    if (!order)
      throw new BadRequestException(`Order with id: ${orderId} not found`);

    order.deletedAt = Date.now();
    await this.repository.save(order).catch(() => {
      result = false;
    });

    return result;
  }

  async changeStatus(orderId: string): Promise<boolean> {
    let result = true;
    const order = await this.repository.findOneBy({
      orderId,
      deletedAt: undefined,
    });
    if (!order)
      throw new BadRequestException(`Order with id: ${orderId} not found`);

    order.status = !order.status;
    await this.repository.save(order).catch(() => {
      result = false;
    });

    return result;
  }
}
