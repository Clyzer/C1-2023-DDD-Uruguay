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
  CreatedCompanyPublisher,
  CreatedFeePublisher,
  CreatedInvoicePublisher,
  DeletedInvoicePublisher,
  GettedCompanyPublisher,
  GettedFeePublisher,
  GettedInvoicePublisher,
  InvoiceStatusChangedPublisher,
} from '../messaging/publisher';
import {
  CompanyService,
  FeeService,
  InvoiceService,
} from '../persistence/services';
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
    private readonly invoiceStatusChangedPublisher: InvoiceStatusChangedPublisher,

    private readonly companyService: CompanyService,
    private readonly createdCompanyPublisher: CreatedCompanyPublisher,
    private readonly gettedCompanyPublisher: GettedCompanyPublisher,
    private readonly feeService: FeeService,
    private readonly createdFeePublisher: CreatedFeePublisher,
    private readonly gettedFeePublisher: GettedFeePublisher
  ) {}

  @Post('/create')
  async createInvoice(@Body() command: CreateInvoiceCommand) {
    const useCase = new CreateInvoiceUseCase(
      this.invoiceService,
      this.createdInvoiceEventPublisher,
      this.feeService,
      this.createdFeePublisher,
      this.gettedFeePublisher,
      this.companyService,
      this.createdCompanyPublisher,
      this.gettedCompanyPublisher
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
