import { EmployedDomainEntityBase } from '../../../entities/order';

export interface IUpdateEmployedPhoneResponse {
  success: boolean;
  data: EmployedDomainEntityBase | null;
}
