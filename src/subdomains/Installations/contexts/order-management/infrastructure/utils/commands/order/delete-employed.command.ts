import { IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { IDeleteEmployedCommand } from '../../../../domain/interfaces/commands/order';

export class DeleteEmployedCommand implements IDeleteEmployedCommand {
  @ApiProperty()
  @IsString()
  employedId: string;
}
