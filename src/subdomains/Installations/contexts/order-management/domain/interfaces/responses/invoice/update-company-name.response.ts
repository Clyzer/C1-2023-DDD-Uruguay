import { CompanyDomainEntityBase } from '../../../entities/invoice';

export interface IUpdateCompanyNameResponse {
  success: boolean;
  data: CompanyDomainEntityBase | null;
}
