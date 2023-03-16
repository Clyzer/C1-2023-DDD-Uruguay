import { IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { IUpdateKitModelCommand } from '../../../../domain/interfaces/commands/order';

export class UpdateKitModelCommand implements IUpdateKitModelCommand {
  @ApiProperty()
  @IsString()
  kitId: string;

  @ApiProperty()
  @IsString()
  model: string;
}
