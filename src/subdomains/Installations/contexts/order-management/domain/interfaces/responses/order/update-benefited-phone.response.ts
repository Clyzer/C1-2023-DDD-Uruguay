import { BenefitedDomainEntityBase } from '../../../entities/order';

export interface IUpdateBenefitedPhoneResponse {
  success: boolean;
  data: BenefitedDomainEntityBase | null;
}
