import { IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { IGetCompanyCommand } from '../../../../domain/interfaces/commands/invoice';

export class GetCompanyCommand implements IGetCompanyCommand {
  @ApiProperty()
  @IsString()
  companyId: string;
}
