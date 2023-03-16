import { IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { IUpdateEmployedPhoneCommand } from '../../../../domain/interfaces/commands/order';

export class UpdateEmployedPhoneCommand implements IUpdateEmployedPhoneCommand {
  @ApiProperty()
  @IsString()
  employedId: string;

  @ApiProperty()
  @IsString()
  phone: string;
}
