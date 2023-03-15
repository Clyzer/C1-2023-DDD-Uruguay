import { Repository } from 'typeorm';

import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { InvoiceMySqlEntity } from '../entities';
import { IRepository } from './base';

@Injectable()
export class InvoiceRepository
    implements IRepository<InvoiceMySqlEntity>{

    constructor(
        @InjectRepository(InvoiceMySqlEntity)
        private readonly repository: Repository<InvoiceMySqlEntity>
    ) { }

    async findAll(): Promise<InvoiceMySqlEntity[]> {
        return await this.repository.find();
    }

    async findById(invoiceId: string): Promise<InvoiceMySqlEntity> {
        const invoice = await this.repository.findOneBy({ invoiceId, deletedAt: undefined })
        if (!invoice) throw new BadRequestException(`Invoice with id: ${invoiceId} not found`)

        return invoice;
    }

    async create(entity: InvoiceMySqlEntity): Promise<InvoiceMySqlEntity> {
        return await this.repository.save(entity);
    }

    async update(invoiceId: string, entity: InvoiceMySqlEntity): Promise<InvoiceMySqlEntity> {
        const invoice = await this.repository.findOneBy({ invoiceId , deletedAt: undefined });
        if (!invoice) throw new BadRequestException(`Invoice with id: ${invoiceId} not found`)

        return await this.repository.save(entity)
    }

    async delete(invoiceId: string): Promise<boolean> {
        let result = true;
        const invoice = await this.repository.findOneBy({ invoiceId, deletedAt: undefined });
        if (!invoice) throw new BadRequestException(`Invoice with id: ${invoiceId} not found`)

        invoice.deletedAt = Date.now();
        await this.repository.save(invoice).catch(() => { result = false });

        return result;
    }

    async changeStatus(invoiceId: string): Promise<boolean> {
        let result = true;
        const invoice = await this.repository.findOneBy({ invoiceId, deletedAt: undefined });
        if (!invoice) throw new BadRequestException(`Invoice with id: ${invoiceId} not found`)

        invoice.status = !invoice.status;
        await this.repository.save(invoice).catch(() => { result = false });

        return result;
    }
}