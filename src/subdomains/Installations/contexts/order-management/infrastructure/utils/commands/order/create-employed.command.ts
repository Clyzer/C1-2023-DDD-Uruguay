import { IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { ICreateEmployedCommand } from '../../../../domain/interfaces/commands/order';

export class CreateEmployedCommand implements ICreateEmployedCommand {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  phone: string;
}
