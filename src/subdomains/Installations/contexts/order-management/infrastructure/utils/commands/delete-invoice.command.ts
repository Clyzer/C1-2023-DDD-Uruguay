import { IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { IDeleteInvoiceCommand } from '../../../domain/interfaces/commands';

export class DeleteInvoiceCommand implements IDeleteInvoiceCommand {
  @ApiProperty()
  @IsString()
  invoiceId: string;
}
