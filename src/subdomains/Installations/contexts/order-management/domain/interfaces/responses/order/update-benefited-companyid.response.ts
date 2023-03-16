import { BenefitedDomainEntityBase } from '../../../entities/order';

export interface IUpdateBenefitedCompanyIdResponse {
  success: boolean;
  data: BenefitedDomainEntityBase | null;
}
