import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import {
  ChangeInvoiceStatusUserCase,
  CreateInvoiceUseCase,
  DeleteInvoiceUserCase,
  GetInvoiceUserCase,
} from '../../application/use-cases';
import {
  CreatedInvoicePublisher,
  DeletedInvoicePublisher,
  GettedInvoicePublisher,
  InvoiceStatusChangedPublisher,
} from '../messaging/publisher';
import { InvoiceService } from '../persistence/services';
import {
  CreateInvoiceCommand,
  DeleteInvoiceCommand,
  GetInvoiceCommand,
  InvoiceChangeStatusCommand,
} from '../utils/commands';

@ApiTags('invoice')
@Controller('api/invoice')
export class InvoiceController {
  constructor(
    private readonly invoiceService: InvoiceService,
    private readonly createdInvoiceEventPublisher: CreatedInvoicePublisher,
    private readonly gettedInvoiceEventPublisher: GettedInvoicePublisher,
    private readonly deletedInvoiceEventPublisher: DeletedInvoicePublisher,
    private readonly invoiceStatusChangedPublisher: InvoiceStatusChangedPublisher
  ) {}

  @Post('/create')
  async createInvoice(@Body() command: CreateInvoiceCommand) {
    const useCase = new CreateInvoiceUseCase(
      this.invoiceService,
      this.createdInvoiceEventPublisher,
    );
    return await useCase.execute(command);
  }

  @Post('/get')
  async getInvoice(@Body() command: GetInvoiceCommand) {
    const useCase = new GetInvoiceUserCase(
      this.invoiceService,
      this.gettedInvoiceEventPublisher,
    );
    return await useCase.execute(command);
  }

  @Post('/delete')
  async deleteInvoice(@Body() command: DeleteInvoiceCommand) {
    const useCase = new DeleteInvoiceUserCase(
      this.invoiceService,
      this.deletedInvoiceEventPublisher,
    );
    return await useCase.execute(command);
  }

  @Post('/change-status')
  async changeStatus(@Body() command: InvoiceChangeStatusCommand) {
    const useCase = new ChangeInvoiceStatusUserCase(
      this.invoiceService,
      this.invoiceStatusChangedPublisher,
    );
    return await useCase.execute(command);
  }
}
