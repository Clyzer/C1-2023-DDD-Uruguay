import { IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { IGetEmployedCommand } from '../../../../domain/interfaces/commands/order';

export class GetEmployedCommand implements IGetEmployedCommand {
  @ApiProperty()
  @IsString()
  employedId: string;
}
