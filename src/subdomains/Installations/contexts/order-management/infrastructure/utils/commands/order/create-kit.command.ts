import { IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { ICreateKitCommand } from '../../../../domain/interfaces/commands/order';

export class CreateKitCommand implements ICreateKitCommand {
  @ApiProperty()
  @IsString()
  model: string;
}
