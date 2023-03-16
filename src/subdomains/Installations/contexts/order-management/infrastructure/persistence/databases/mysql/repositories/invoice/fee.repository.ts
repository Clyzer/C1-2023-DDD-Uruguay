import { Repository } from 'typeorm';

import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { FeeMySqlEntity } from '../../entities';
import { IRepository } from '../base';

@Injectable()
export class FeeRepository implements IRepository<FeeMySqlEntity> {
  constructor(
    @InjectRepository(FeeMySqlEntity)
    private readonly repository: Repository<FeeMySqlEntity>,
  ) {}

  async findAll(): Promise<FeeMySqlEntity[]> {
    return await this.repository.find();
  }

  async findById(feeId: string): Promise<FeeMySqlEntity> {
    const fee = await this.repository.findOneBy({
      feeId,
      deletedAt: undefined,
    });
    if (!fee) throw new BadRequestException(`Fee with id: ${feeId} not found`);

    return fee;
  }

  async create(entity: FeeMySqlEntity): Promise<FeeMySqlEntity> {
    return await this.repository.save(entity);
  }

  async update(feeId: string, entity: FeeMySqlEntity): Promise<FeeMySqlEntity> {
    const fee = await this.repository.findOneBy({
      feeId,
      deletedAt: undefined,
    });
    if (!fee) throw new BadRequestException(`Fee with id: ${feeId} not found`);

    return await this.repository.save(entity);
  }

  async delete(feeId: string): Promise<boolean> {
    let result = true;
    const fee = await this.repository.findOneBy({
      feeId,
      deletedAt: undefined,
    });
    if (!fee) throw new BadRequestException(`Fee with id: ${feeId} not found`);

    fee.deletedAt = Date.now();
    await this.repository.save(fee).catch(() => {
      result = false;
    });

    return result;
  }
}
