import { EmployedDomainEntityBase } from '../../../entities/order';

export interface IUpdateEmployedNameResponse {
  success: boolean;
  data: EmployedDomainEntityBase | null;
}
