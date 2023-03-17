import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleOptions,
  TypeOrmOptionsFactory,
} from '@nestjs/typeorm';

import {
  BenefitedMySqlEntity,
  CompanyMySqlEntity,
  EmployedMySqlEntity,
  EventMySqlEntity,
  FeeMySqlEntity,
  InvoiceMySqlEntity,
  KitMySqlEntity,
  OrderMySqlEntity,
} from '../entities';

@Injectable()
export class TypeOrmMySqlConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    /*      console.log("MYSQL_DB_HOST=" + this.configService.get<string>('MYSQL_DB_HOST'));
        console.log("MYSQL_DB_PORT=" + this.configService.get<number>('MYSQL_DB_PORT'));
        console.log("MYSQL_DB_USER=" + this.configService.get<string>('MYSQL_DB_USER'));
        console.log("MYSQL_DB_PASSWORD=" + this.configService.get<string>('MYSQL_DB_PASSWORD'));
        console.log("MYSQL_DB_NAME=" + this.configService.get<string>('MYSQL_DB_NAME')); */
    return {
      type: 'mysql',
      host: this.configService.get<string>('MYSQL_DB_HOST'),
      port: this.configService.get<number>('MYSQL_DB_PORT'),
      username: this.configService.get<string>('MYSQL_DB_USER'),
      password: this.configService.get<string>('MYSQL_DB_PASSWORD'),
      database: this.configService.get<string>('MYSQL_DB_NAME'),
      entities: [
        BenefitedMySqlEntity,
        CompanyMySqlEntity,
        EmployedMySqlEntity,
        FeeMySqlEntity,
        KitMySqlEntity,
        InvoiceMySqlEntity,
        OrderMySqlEntity,
        EventMySqlEntity
      ],
      synchronize: true,
      logging: true
    };
  }
}
