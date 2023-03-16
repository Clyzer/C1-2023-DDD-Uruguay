import { IsNumber } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { ICreateFeeCommand } from '../../../../domain/interfaces/commands/invoice';

export class CreateFeeCommand implements ICreateFeeCommand {
  @ApiProperty()
  @IsNumber()
  tax: number;

  @ApiProperty()
  @IsNumber()
  charge: number;
}
