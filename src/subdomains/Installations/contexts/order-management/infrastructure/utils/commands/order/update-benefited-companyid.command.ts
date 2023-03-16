import { IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { IUpdateBenefitedCompanyIdCommand } from '../../../../domain/interfaces/commands/order';

export class UpdateBenefitedCompanyIdCommand
  implements IUpdateBenefitedCompanyIdCommand
{
  @ApiProperty()
  @IsString()
  benefitedId: string;

  @ApiProperty()
  @IsString()
  companyId: string;
}
