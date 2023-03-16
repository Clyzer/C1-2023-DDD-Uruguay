import { IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { ICreateCompanyCommand } from '../../../../domain/interfaces/commands/invoice';

export class CreateCompanyCommand implements ICreateCompanyCommand {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  bankAccount: string;
}
