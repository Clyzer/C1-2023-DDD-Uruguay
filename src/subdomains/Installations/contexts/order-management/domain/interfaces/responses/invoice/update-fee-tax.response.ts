import { FeeDomainEntityBase } from '../../../entities/invoice';

export interface IUpdateFeeTaxResponse {
  success: boolean;
  data: FeeDomainEntityBase | null;
}
