import { IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { IUpdateBenefitedNameCommand } from '../../../../domain/interfaces/commands/order';

export class UpdateBenefitedNameCommand implements IUpdateBenefitedNameCommand {
  @ApiProperty()
  @IsString()
  benefitedId: string;

  @ApiProperty()
  @IsString()
  name: string;
}
