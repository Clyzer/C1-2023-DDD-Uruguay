import { IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { IDeleteBenefitedCommand } from '../../../../domain/interfaces/commands/order';

export class DeleteBenefitedCommand implements IDeleteBenefitedCommand {
  @ApiProperty()
  @IsString()
  benefitedId: string;
}
