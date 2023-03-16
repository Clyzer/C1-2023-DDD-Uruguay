import { Injectable } from '@nestjs/common';

import { ICompanyDomainService } from '../../../../../../domain/services/invoice';
import { CompanyMySqlEntity } from '../../entities';
import { CompanyRepository } from '../../repositories';

@Injectable()
export class CompanyMySqlService
  implements ICompanyDomainService<CompanyMySqlEntity>
{
  constructor(private readonly companyRepository: CompanyRepository) {}

  createCompany(company: CompanyMySqlEntity): Promise<CompanyMySqlEntity> {
    return this.companyRepository.create(company);
  }

  getCompany(companyId: string): Promise<CompanyMySqlEntity> {
    return this.companyRepository.findById(companyId);
  }

  deleteCompany(companyId: string): Promise<boolean> {
    return this.companyRepository.delete(companyId);
  }

  updateCompanyName(
    companyId: string,
    newCompanyName: CompanyMySqlEntity,
  ): Promise<CompanyMySqlEntity> {
    return this.companyRepository.update(companyId, newCompanyName);
  }

  updateCompanyBankAccount(
    companyId: string,
    newCompanyBankAccount: CompanyMySqlEntity,
  ): Promise<CompanyMySqlEntity> {
    return this.companyRepository.update(companyId, newCompanyBankAccount);
  }
}
