import { IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { IUpdateFeeChargeCommand } from '../../../../domain/interfaces/commands/invoice';

export class UpdateFeeChargeCommand implements IUpdateFeeChargeCommand {
  @ApiProperty()
  @IsString()
  feeId: string;

  @ApiProperty()
  @IsString()
  charge: string;
}
