import { KitDomainEntityBase } from '../../../entities/order';

export interface IUpdateKitModelResponse {
  success: boolean;
  data: KitDomainEntityBase | null;
}
