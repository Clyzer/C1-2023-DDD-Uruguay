import { Repository } from 'typeorm';

import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CompanyMySqlEntity } from '../../entities';
import { IRepository } from '../base';

@Injectable()
export class CompanyRepository implements IRepository<CompanyMySqlEntity> {
  constructor(
    @InjectRepository(CompanyMySqlEntity)
    private readonly repository: Repository<CompanyMySqlEntity>,
  ) {}

  async findAll(): Promise<CompanyMySqlEntity[]> {
    return await this.repository.find();
  }

  async findById(companyId: string): Promise<CompanyMySqlEntity> {
    const company = await this.repository.findOneBy({
      companyId,
      deletedAt: undefined,
    });
    if (!company)
      throw new BadRequestException(`Company with id: ${companyId} not found`);

    return company;
  }

  async create(entity: CompanyMySqlEntity): Promise<CompanyMySqlEntity> {
    return await this.repository.save(entity);
  }

  async update(
    companyId: string,
    entity: CompanyMySqlEntity,
  ): Promise<CompanyMySqlEntity> {
    const company = await this.repository.findOneBy({
      companyId,
      deletedAt: undefined,
    });
    if (!company)
      throw new BadRequestException(`Company with id: ${companyId} not found`);

    return await this.repository.save(entity);
  }

  async delete(companyId: string): Promise<boolean> {
    let result = true;
    const company = await this.repository.findOneBy({
      companyId,
      deletedAt: undefined,
    });
    if (!company)
      throw new BadRequestException(`Company with id: ${companyId} not found`);

    company.deletedAt = Date.now();
    await this.repository.save(company).catch(() => {
      result = false;
    });

    return result;
  }
}
