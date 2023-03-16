import { Repository } from 'typeorm';

import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { EmployedMySqlEntity } from '../../entities';
import { IRepository } from '../base';

@Injectable()
export class EmployedRepository implements IRepository<EmployedMySqlEntity> {
  constructor(
    @InjectRepository(EmployedMySqlEntity)
    private readonly repository: Repository<EmployedMySqlEntity>,
  ) {}

  async findAll(): Promise<EmployedMySqlEntity[]> {
    return await this.repository.find();
  }

  async findById(employedId: string): Promise<EmployedMySqlEntity> {
    const employed = await this.repository.findOneBy({
      employedId,
      deletedAt: undefined,
    });
    if (!employed)
      throw new BadRequestException(
        `Employed with id: ${employedId} not found`,
      );

    return employed;
  }

  async create(entity: EmployedMySqlEntity): Promise<EmployedMySqlEntity> {
    return await this.repository.save(entity);
  }

  async update(
    employedId: string,
    entity: EmployedMySqlEntity,
  ): Promise<EmployedMySqlEntity> {
    const employed = await this.repository.findOneBy({
      employedId,
      deletedAt: undefined,
    });
    if (!employed)
      throw new BadRequestException(
        `Employed with id: ${employedId} not found`,
      );

    return await this.repository.save(entity);
  }

  async delete(employedId: string): Promise<boolean> {
    let result = true;
    const employed = await this.repository.findOneBy({
      employedId,
      deletedAt: undefined,
    });
    if (!employed)
      throw new BadRequestException(
        `Employed with id: ${employedId} not found`,
      );

    employed.deletedAt = Date.now();
    await this.repository.save(employed).catch(() => {
      result = false;
    });

    return result;
  }
}
