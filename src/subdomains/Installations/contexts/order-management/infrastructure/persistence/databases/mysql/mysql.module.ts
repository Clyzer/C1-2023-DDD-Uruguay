import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TypeOrmMySqlConfigService } from './configs';
import {
  BenefitedMySqlEntity,
  CompanyMySqlEntity,
  EmployedMySqlEntity,
  FeeMySqlEntity,
  InvoiceMySqlEntity,
  KitMySqlEntity,
  OrderMySqlEntity,
} from './entities';
import {
  BenefitedRepository,
  CompanyRepository,
  EmployedRepository,
  FeeRepository,
  InvoiceRepository,
  KitRepository,
  OrderRepository,
} from './repositories';
import {
  BenefitedMySqlService,
  CompanyMySqlService,
  EmployedMySqlService,
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

    BenefitedRepository,
    CompanyRepository,
    EmployedRepository,
    FeeRepository,
    InvoiceRepository,
    KitRepository,
    OrderRepository,
  ],
  exports: [
    BenefitedMySqlService,
    CompanyMySqlService,
    EmployedMySqlService,
    FeeMySqlService,
    InvoiceMySqlService,
    KitMySqlService,
    OrderMySqlService,

    BenefitedRepository,
    CompanyRepository,
    EmployedRepository,
    FeeRepository,
    InvoiceRepository,
    KitRepository,
    OrderRepository,
  ],
})
export class MysqlModule {}
