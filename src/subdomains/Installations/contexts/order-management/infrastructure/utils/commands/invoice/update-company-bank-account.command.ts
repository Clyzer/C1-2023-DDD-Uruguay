import { IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { IUpdateCompanyBankAccountCommand } from '../../../../domain/interfaces/commands/invoice';

export class UpdateCompanyBankAccountCommand
  implements IUpdateCompanyBankAccountCommand
{
  @ApiProperty()
  @IsString()
  companyId: string;

  @ApiProperty()
  @IsString()
  bankAccount: string;
}
