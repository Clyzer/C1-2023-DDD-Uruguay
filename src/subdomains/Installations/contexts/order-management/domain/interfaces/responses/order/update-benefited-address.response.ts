import { BenefitedDomainEntityBase } from '../../../entities/order';

export interface IUpdateBenefitedAddressResponse {
  success: boolean;
  data: BenefitedDomainEntityBase | null;
}
