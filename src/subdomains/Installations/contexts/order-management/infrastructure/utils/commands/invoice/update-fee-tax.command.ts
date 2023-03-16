import { IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { IUpdateFeeTaxCommand } from '../../../../domain/interfaces/commands/invoice';

export class UpdateFeeTaxCommand implements IUpdateFeeTaxCommand {
  @ApiProperty()
  @IsString()
  feeId: string;

  @ApiProperty()
  @IsString()
  tax: string;
}
