import { CompanyDomainEntityBase } from '../../../entities/invoice';

export interface IUpdateCompanyBankAccountResponse {
  success: boolean;
  data: CompanyDomainEntityBase | null;
}
