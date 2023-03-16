import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { Transport } from '@nestjs/microservices/enums';

import { PersistenceModule } from '../persistence';
import {
  CreatedInvoicePublisher,
  CreatedOrderPublisher,
  DeletedInvoicePublisher,
  DeletedOrderPublisher,
  GettedInvoicePublisher,
  GettedOrderPublisher,
} from './publisher';
import {
  BankAccountUpdatedCompanyPublisher,
  ChargeUpdatedFeePublisher,
  CreatedCompanyPublisher,
  CreatedFeePublisher,
  DeletedCompanyPublisher,
  DeletedFeePublisher,
  GettedCompanyPublisher,
  GettedFeePublisher,
  NameUpdatedCompanyPublisher,
  TaxUpdatedFeePublisher,
} from './publisher/invoice';
import {
  AddressUpdatedBenefitedPublisher,
  CompanyIdUpdatedBenefitedPublisher,
  CreatedBenefitedPublisher,
  CreatedEmployedPublisher,
  CreatedKitPublisher,
  DeletedBenefitedPublisher,
  DeletedEmployedPublisher,
  DeletedKitPublisher,
  GettedBenefitedPublisher,
  GettedEmployedPublisher,
  GettedKitPublisher,
  ModelUpdatedKitPublisher,
  NameUpdatedBenefitedPublisher,
  NameUpdatedEmployedPublisher,
  PhoneUpdatedBenefitedPublisher,
  PhoneUpdatedEmployedPublisher,
} from './publisher/order';
import {
  BenefitedController,
  CompanyController,
  EmployedController,
  FeeController,
  InvoiceController,
  KitController,
  OrderController,
} from './subscriber';

/**
 * name: el nombre del cliente.
 * Este es un identificador único que se utiliza para referenciar este cliente
 * en otras partes de la aplicación.
 *
 * transport: el tipo de transporte utilizado para conectarse a Kafka.
 * En este caso, se utiliza Transport.KAFKA,
 * que indica que se conectará a un servidor Kafka.
 * options: un objeto que define las opciones de configuración
 * específicas para el cliente Kafka. En este caso,
 * solo se especifica un objeto client que define los brokers
 * a los que se conectará el cliente. Los brokers son los servidores
 * de Kafka que gestionan los mensajes y actúan como intermediarios
 * entre los productores y los consumidores. En este ejemplo,
 * se especifica que el cliente se conectará a un solo broker alojado
 * en localhost en el puerto 9092.
 *
 * @export
 * @class MessagingModule
 */
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ORDER_MANAGEMENT_CONTEXT',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['localhost:9092'],
          },
        },
      },
    ]),
    PersistenceModule,
  ],
  controllers: [
    InvoiceController,
    OrderController,
    KitController,
    EmployedController,
    BenefitedController,
    CompanyController,
    FeeController,
  ],
  providers: [
    CreatedInvoicePublisher,
    CreatedOrderPublisher,
    GettedInvoicePublisher,
    GettedOrderPublisher,
    DeletedInvoicePublisher,
    DeletedOrderPublisher,
    CreatedCompanyPublisher,
    GettedCompanyPublisher,
    DeletedCompanyPublisher,
    BankAccountUpdatedCompanyPublisher,
    NameUpdatedCompanyPublisher,
    CreatedFeePublisher,
    GettedFeePublisher,
    DeletedFeePublisher,
    TaxUpdatedFeePublisher,
    ChargeUpdatedFeePublisher,
    CreatedBenefitedPublisher,
    DeletedBenefitedPublisher,
    GettedBenefitedPublisher,
    AddressUpdatedBenefitedPublisher,
    CompanyIdUpdatedBenefitedPublisher,
    NameUpdatedBenefitedPublisher,
    PhoneUpdatedBenefitedPublisher,
    CreatedEmployedPublisher,
    DeletedEmployedPublisher,
    GettedEmployedPublisher,
    NameUpdatedEmployedPublisher,
    PhoneUpdatedEmployedPublisher,
    CreatedKitPublisher,
    GettedKitPublisher,
    DeletedKitPublisher,
    ModelUpdatedKitPublisher,
  ],
  exports: [
    CreatedInvoicePublisher,
    CreatedOrderPublisher,
    GettedInvoicePublisher,
    GettedOrderPublisher,
    DeletedInvoicePublisher,
    DeletedOrderPublisher,
    CreatedCompanyPublisher,
    GettedCompanyPublisher,
    DeletedCompanyPublisher,
    BankAccountUpdatedCompanyPublisher,
    NameUpdatedCompanyPublisher,
    CreatedFeePublisher,
    GettedFeePublisher,
    DeletedFeePublisher,
    TaxUpdatedFeePublisher,
    ChargeUpdatedFeePublisher,
    CreatedBenefitedPublisher,
    DeletedBenefitedPublisher,
    GettedBenefitedPublisher,
    AddressUpdatedBenefitedPublisher,
    CompanyIdUpdatedBenefitedPublisher,
    NameUpdatedBenefitedPublisher,
    PhoneUpdatedBenefitedPublisher,
    CreatedEmployedPublisher,
    DeletedEmployedPublisher,
    GettedEmployedPublisher,
    NameUpdatedEmployedPublisher,
    PhoneUpdatedEmployedPublisher,
    CreatedKitPublisher,
    GettedKitPublisher,
    DeletedKitPublisher,
    ModelUpdatedKitPublisher,
  ],
})
export class MessagingModule {}
