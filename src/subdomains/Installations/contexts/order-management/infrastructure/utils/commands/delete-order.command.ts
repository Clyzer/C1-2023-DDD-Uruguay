import { IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { IDeleteOrderCommand } from '../../../domain/interfaces/commands';

export class DeleteOrderCommand implements IDeleteOrderCommand {
  @ApiProperty()
  @IsString()
  orderId: string;
}
