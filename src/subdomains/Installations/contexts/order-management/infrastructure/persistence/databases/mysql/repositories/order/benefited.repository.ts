import { Repository } from 'typeorm';

import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { BenefitedMySqlEntity } from '../../entities';
import { IRepository } from '../base';

@Injectable()
export class BenefitedRepository
    implements IRepository<BenefitedMySqlEntity>{

    constructor(
        @InjectRepository(BenefitedMySqlEntity)
        private readonly repository: Repository<BenefitedMySqlEntity>
    ) { }

    async findAll(): Promise<BenefitedMySqlEntity[]> {
        return await this.repository.find();
    }

    async findById(benefitedId: string): Promise<BenefitedMySqlEntity> {
        const benefited = await this.repository.findOneBy({ benefitedId, deletedAt: undefined })
        if (!benefited) throw new BadRequestException(`Benefited with id: ${benefitedId} not found`)

        return benefited;
    }

    async create(entity: BenefitedMySqlEntity): Promise<BenefitedMySqlEntity> {
        return await this.repository.save(entity);
    }

    async update(benefitedId: string, entity: BenefitedMySqlEntity): Promise<BenefitedMySqlEntity> {
        const benefited = await this.repository.findOneBy({ benefitedId , deletedAt: undefined });
        if (!benefited) throw new BadRequestException(`Benefited with id: ${benefitedId} not found`)

        return await this.repository.save(entity)
    }

    async delete(benefitedId: string): Promise<boolean> {
        let result = true;
        const benefited = await this.repository.findOneBy({ benefitedId, deletedAt: undefined });
        if (!benefited) throw new BadRequestException(`Benefited with id: ${benefitedId} not found`)

        benefited.deletedAt = Date.now();
        await this.repository.save(benefited).catch(() => { result = false });

        return result;
    }
}