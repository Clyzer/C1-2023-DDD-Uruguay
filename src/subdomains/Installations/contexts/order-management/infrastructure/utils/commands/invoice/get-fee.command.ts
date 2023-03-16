import { IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { IGetFeeCommand } from '../../../../domain/interfaces/commands/invoice';

export class GetFeeCommand implements IGetFeeCommand {
  @ApiProperty()
  @IsString()
  feeId: string;
}
