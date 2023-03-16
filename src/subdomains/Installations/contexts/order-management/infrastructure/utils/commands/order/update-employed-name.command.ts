import { IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { IUpdateEmployedNameCommand } from '../../../../domain/interfaces/commands/order';

export class UpdateEmployedNameCommand implements IUpdateEmployedNameCommand {
  @ApiProperty()
  @IsString()
  employedId: string;

  @ApiProperty()
  @IsString()
  name: string;
}
