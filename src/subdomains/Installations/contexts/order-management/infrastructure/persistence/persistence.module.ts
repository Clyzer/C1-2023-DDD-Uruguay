import { Module } from '@nestjs/common';

import { MysqlModule } from './databases';
import {
  EventService,
  InvoiceService,
  OrderService,
} from './services';
import {
  CompanyService,
  FeeService,
} from './services/invoice';
import {
  BenefitedService,
  EmployedService,
  KitService,
} from './services/order';

@Module({
  imports: [MysqlModule],
  providers: [
    InvoiceService,
    OrderService,
    CompanyService,
    FeeService,
    BenefitedService,
    EmployedService,
    KitService,
    EventService
  ],
  exports: [
    InvoiceService,
    OrderService,
    CompanyService,
    FeeService,
    BenefitedService,
    EmployedService,
    KitService,
    EventService
  ],
})
export class PersistenceModule {}
