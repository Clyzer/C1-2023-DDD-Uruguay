import { Module } from '@nestjs/common';

import {
  InvoiceController,
  OrderController,
} from './controllers';
import {
  CompanyController,
  FeeController,
} from './controllers/invoice';
import {
  BenefitedController,
  EmployedController,
  KitController,
} from './controllers/order';
import { MessagingModule } from './messaging';
import { PersistenceModule } from './persistence';

@Module({
  imports: [PersistenceModule, MessagingModule],
  controllers: [InvoiceController, OrderController, KitController, EmployedController, BenefitedController, FeeController, CompanyController],
  providers: [],
  exports: [],
})
export class OrderManagementModule {}
