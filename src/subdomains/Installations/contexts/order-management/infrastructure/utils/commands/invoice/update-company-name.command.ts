import { IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { IUpdateCompanyNameCommand } from '../../../../domain/interfaces/commands/invoice';

export class UpdateCompanyNameCommand implements IUpdateCompanyNameCommand {
  @ApiProperty()
  @IsString()
  companyId: string;

  @ApiProperty()
  @IsString()
  name: string;
}
