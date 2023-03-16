import { IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { IDeleteCompanyCommand } from '../../../../domain/interfaces/commands/invoice';

export class DeleteCompanyCommand implements IDeleteCompanyCommand {
  @ApiProperty()
  @IsString()
  companyId: string;
}
