import { IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { IGetInvoiceCommand } from '../../../domain/interfaces/commands';

export class GetInvoiceCommand implements IGetInvoiceCommand {
  @ApiProperty()
  @IsString()
  invoiceId: string;
}
