import { IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { IUpdateBenefitedAddressCommand } from '../../../../domain/interfaces/commands/order';

export class UpdateBenefitedAddressCommand
  implements IUpdateBenefitedAddressCommand
{
  @ApiProperty()
  @IsString()
  benefitedId: string;

  @ApiProperty()
  @IsString()
  address: string;
}
