import { OrderStatusValueObject } from '../../../value-objects/order';

export interface IOrderChangeStatusResponse {
  success: boolean;
  data: OrderStatusValueObject | null;
}
