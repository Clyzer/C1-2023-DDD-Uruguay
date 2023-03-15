import { Repository } from 'typeorm';

import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { KitMySqlEntity } from '../../entities';
import { IRepository } from '../base';

@Injectable()
export class KitRepository
    implements IRepository<KitMySqlEntity>{

    constructor(
        @InjectRepository(KitMySqlEntity)
        private readonly repository: Repository<KitMySqlEntity>
    ) { }

    async findAll(): Promise<KitMySqlEntity[]> {
        return await this.repository.find();
    }

    async findById(kitId: string): Promise<KitMySqlEntity> {
        const kit = await this.repository.findOneBy({ kitId, deletedAt: undefined })
        if (!kit) throw new BadRequestException(`Kit with id: ${kitId} not found`)

        return kit;
    }

    async create(entity: KitMySqlEntity): Promise<KitMySqlEntity> {
        return await this.repository.save(entity);
    }

    async update(kitId: string, entity: KitMySqlEntity): Promise<KitMySqlEntity> {
        const kit = await this.repository.findOneBy({ kitId , deletedAt: undefined });
        if (!kit) throw new BadRequestException(`Kit with id: ${kitId} not found`)

        return await this.repository.save(entity)
    }

    async delete(kitId: string): Promise<boolean> {
        let result = true;
        const kit = await this.repository.findOneBy({ kitId, deletedAt: undefined });
        if (!kit) throw new BadRequestException(`Kit with id: ${kitId} not found`)

        kit.deletedAt = Date.now();
        await this.repository.save(kit).catch(() => { result = false });

        return result;
    }
}