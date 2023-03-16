import { IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { IInvoiceChangeStatusCommand } from '../../../../domain/interfaces/commands/invoice';

export class InvoiceChangeStatusCommand implements IInvoiceChangeStatusCommand {
  @ApiProperty()
  @IsString()
  invoiceId: string;
}
