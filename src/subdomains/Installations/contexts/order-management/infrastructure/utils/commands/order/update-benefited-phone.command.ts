import { IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { IUpdateBenefitedPhoneCommand } from '../../../../domain/interfaces/commands/order';

export class UpdateBenefitedPhoneCommand
  implements IUpdateBenefitedPhoneCommand
{
  @ApiProperty()
  @IsString()
  benefitedId: string;

  @ApiProperty()
  @IsString()
  phone: string;
}
