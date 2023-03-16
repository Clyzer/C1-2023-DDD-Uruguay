import { BenefitedDomainEntityBase } from '../../../entities/order';

export interface IUpdateBenefitedNameResponse {
  success: boolean;
  data: BenefitedDomainEntityBase | null;
}
