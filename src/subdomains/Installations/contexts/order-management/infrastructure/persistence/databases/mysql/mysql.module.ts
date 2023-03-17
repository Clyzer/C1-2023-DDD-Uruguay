import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TypeOrmMySqlConfigService } from './configs';
import {
  BenefitedMySqlEntity,
  CompanyMySqlEntity,
  EmployedMySqlEntity,
  EventMySqlEntity,
  FeeMySqlEntity,
  InvoiceMySqlEntity,
  KitMySqlEntity,
  OrderMySqlEntity,
} from './entities';
import {
  BenefitedRepository,
  CompanyRepository,
  EmployedRepository,
  EventRepository,
  FeeRepository,
  InvoiceRepository,
  KitRepository,
  OrderRepository,
} from './repositories';
import {
  BenefitedMySqlService,
  CompanyMySqlService,
  EmployedMySqlService,
  EventMySqlService,
  FeeMySqlService,
  InvoiceMySqlService,
  KitMySqlService,
  OrderMySqlService,
} from './services';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmMySqlConfigService,
    }),

    TypeOrmModule.forFeature([
      BenefitedMySqlEntity,
      CompanyMySqlEntity,
      EmployedMySqlEntity,
      FeeMySqlEntity,
      KitMySqlEntity,
      InvoiceMySqlEntity,
      OrderMySqlEntity,
      EventMySqlEntity
    ]),
  ],
  providers: [
    BenefitedMySqlService,
    CompanyMySqlService,
    EmployedMySqlService,
    FeeMySqlService,
    InvoiceMySqlService,
    KitMySqlService,
    OrderMySqlService,
    EventMySqlService,

    BenefitedRepository,
    CompanyRepository,
    EmployedRepository,
    FeeRepository,
    InvoiceRepository,
    KitRepository,
    OrderRepository,
    EventRepository
  ],
  exports: [
    BenefitedMySqlService,
    CompanyMySqlService,
    EmployedMySqlService,
    FeeMySqlService,
    InvoiceMySqlService,
    KitMySqlService,
    OrderMySqlService,
    EventMySqlService,

    BenefitedRepository,
    CompanyRepository,
    EmployedRepository,
    FeeRepository,
    InvoiceRepository,
    KitRepository,
    OrderRepository,
    EventRepository
  ],
})
export class MysqlModule {}
