import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import {
  CreateInvoiceUseCase,
  GetInvoiceUserCase,
} from '../../application/use-cases';
import {
  CreatedInvoicePublisher,
  GettedInvoicePublisher,
} from '../messaging/publisher';
import { InvoiceService } from '../persistence/services';
import {
  CompanyService,
  FeeService,
} from '../persistence/services/invoice';
import {
  CreateInvoiceCommand,
  GetInvoiceCommand,
} from '../utils/commands';

@ApiTags('invoice')
@Controller('api/invoice')
  export class InvoiceController {
      constructor(
          private readonly invoiceService: InvoiceService,
          private readonly companyService: CompanyService,
          private readonly feeService: FeeService,
          private readonly createdInvoiceEventPublisher: CreatedInvoicePublisher,
          private readonly gettedInvoiceEventPublisher: GettedInvoicePublisher
      ) {}
  
      @Post('/create-invoice')
      async createInvoice(@Body() command: CreateInvoiceCommand) {
          const useCase = new CreateInvoiceUseCase(
              this.invoiceService,
              this.createdInvoiceEventPublisher,
          );
          return await useCase.execute(command);
      }
  
      @Post('/get-invoice')
      async getInvoice(@Body() command: GetInvoiceCommand) {
          const useCase = new GetInvoiceUserCase(
              this.invoiceService,
              this.gettedInvoiceEventPublisher,
          );
          return await useCase.execute(command);
      }
      
    
  }