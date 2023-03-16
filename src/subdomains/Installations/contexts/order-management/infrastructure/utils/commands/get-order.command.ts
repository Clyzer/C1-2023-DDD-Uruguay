import { IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { IGetOrderCommand } from '../../../domain/interfaces/commands';

export class GetOrderCommand implements IGetOrderCommand {
  @ApiProperty()
  @IsString()
  orderId: string;
}
