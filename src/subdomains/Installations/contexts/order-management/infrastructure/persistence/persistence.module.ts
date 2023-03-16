import { Module } from '@nestjs/common';

import { MysqlModule } from './databases';
import { InvoiceService, OrderService } from './services';
import { CompanyService, FeeService } from './services/invoice';
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
  ],
  exports: [
    InvoiceService,
    OrderService,
    CompanyService,
    FeeService,
    BenefitedService,
    EmployedService,
    KitService,
  ],
})
export class PersistenceModule {}
