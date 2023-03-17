import { Repository } from 'typeorm';

import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { EventMySqlEntity } from '../entities';
import { IRepository } from './base';

@Injectable()
export class EventRepository implements IRepository<EventMySqlEntity> {
  constructor(
    @InjectRepository(EventMySqlEntity)
    private readonly repository: Repository<EventMySqlEntity>,
  ) {}

  async findAll(): Promise<EventMySqlEntity[]> {
    return await this.repository.find();
  }

  async findById(id: string): Promise<EventMySqlEntity> {
    const event = await this.repository.findOneBy({
      id
    });
    if (!event)
      throw new BadRequestException(`Event with id: ${id} not found`);

    return event;
  }

  async create(entity: EventMySqlEntity): Promise<EventMySqlEntity> {
    return await this.repository.save(entity);
  }

  async update(
    id: string,
    entity: EventMySqlEntity,
  ): Promise<EventMySqlEntity> {
    const event = await this.repository.findOneBy({
      id
    });
    if (!event)
      throw new BadRequestException(`Event with id: ${id} not found`);

    return await this.repository.save(entity);
  }

  async delete(id: string): Promise<boolean> {
    let result = true;
    const event = await this.repository.findOneBy({
      id
    });
    if (!event)
      throw new BadRequestException(`Event with id: ${id} not found`);
    await this.repository.delete(event).catch(() => {
      result = false;
    });

    return result;
  }
}
