import { IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { IGetBenefitedCommand } from '../../../../domain/interfaces/commands/order';

export class GetBenefitedCommand implements IGetBenefitedCommand {
  @ApiProperty()
  @IsString()
  benefitedId: string;
}
