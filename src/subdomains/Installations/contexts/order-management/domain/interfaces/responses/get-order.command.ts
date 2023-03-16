import { OrderDomainEntityBase } from '../../entities';

export interface IGetOrderResponse {
  success: boolean;
  data: OrderDomainEntityBase | null;
}
