import { IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { IDeleteFeeCommand } from '../../../../domain/interfaces/commands/invoice';

export class DeleteFeeCommand implements IDeleteFeeCommand {
  @ApiProperty()
  @IsString()
  feeId: string;
}
