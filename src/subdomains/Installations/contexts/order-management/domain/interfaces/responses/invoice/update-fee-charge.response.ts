import { FeeDomainEntityBase } from '../../../entities/invoice';

export interface IUpdateFeeChargeResponse {
  success: boolean;
  data: FeeDomainEntityBase | null;
}
