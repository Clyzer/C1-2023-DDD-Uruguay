import { CompanyDomainEntityBase } from '../../entities/invoice';

export interface ICompanyDomainService<
  T extends CompanyDomainEntityBase = CompanyDomainEntityBase,
> {
  createCompany(company: T): Promise<T>;
  getCompany(companyId: string): Promise<T>;
  deleteCompany(companyId: string): Promise<boolean>;
  updateCompanyName(companyId: string, newCompanyName: T): Promise<T>;
  updateCompanyBankAccount(
    companyId: string,
    newCompanyBankAccount: T,
  ): Promise<T>;
}
