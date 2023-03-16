import { IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { ICreateBenefitedCommand } from '../../../../domain/interfaces/commands/order';

export class CreateBenefitedCommand implements ICreateBenefitedCommand {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsString()
  companyId: string;
}
