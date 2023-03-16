import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import {
  ChangeOrderStatusUserCase,
  CreateOrderUseCase,
  DeleteOrderUserCase,
  GetOrderUserCase,
} from '../../application/use-cases';
import {
  CreatedOrderPublisher,
  DeletedOrderPublisher,
  GettedOrderPublisher,
  OrderStatusChangedPublisher,
} from '../messaging/publisher';
import { OrderService } from '../persistence/services';
import {
  CreateOrderCommand,
  DeleteOrderCommand,
  GetOrderCommand,
  OrderChangeStatusCommand,
} from '../utils/commands';

@ApiTags('order')
@Controller('api/order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly createdOrderEventPublisher: CreatedOrderPublisher,
    private readonly gettedOrderEventPublisher: GettedOrderPublisher,
    private readonly deletedOrderEventPublisher: DeletedOrderPublisher,
    private readonly orderStatusChangedPublisher: OrderStatusChangedPublisher
  ) {}

  @Post('/create')
  async createOrder(@Body() command: CreateOrderCommand) {
    const useCase = new CreateOrderUseCase(
      this.orderService,
      this.createdOrderEventPublisher,
    );
    return await useCase.execute(command);
  }

  @Post('/get')
  async getOrder(@Body() command: GetOrderCommand) {
    const useCase = new GetOrderUserCase(
      this.orderService,
      this.gettedOrderEventPublisher,
    );
    return await useCase.execute(command);
  }

  @Post('/delete')
  async deleteOrder(@Body() command: DeleteOrderCommand) {
    const useCase = new DeleteOrderUserCase(
      this.orderService,
      this.deletedOrderEventPublisher,
    );
    return await useCase.execute(command);
  }

  @Post('/change-status')
  async changeStatus(@Body() command: OrderChangeStatusCommand) {
    const useCase = new ChangeOrderStatusUserCase(
      this.orderService,
      this.orderStatusChangedPublisher,
    );
    return await useCase.execute(command);
  }
}
