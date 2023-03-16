import { IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { IOrderChangeStatusCommand } from '../../../../domain/interfaces/commands/order';

export class OrderChangeStatusCommand implements IOrderChangeStatusCommand {
  @ApiProperty()
  @IsString()
  orderId: string;
}
