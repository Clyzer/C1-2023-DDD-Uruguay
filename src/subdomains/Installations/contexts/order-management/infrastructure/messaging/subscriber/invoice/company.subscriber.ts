import { Controller } from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  KafkaContext,
  Payload,
} from '@nestjs/microservices';

import { CompanyEntity } from '../../../persistence';
import { EventEntity } from '../../../persistence/entities/event.entity';
import { CompanyService } from '../../../persistence/services';

@Controller()
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  /**
   * EventPattern se utiliza para definir un patrón de evento de Kafka
   * al que el controlador responderá.
   *
   * Payload se utiliza para extraer los datos del mensaje del evento.
   *
   * KafkaContext que se utiliza para acceder a los metadatos del contexto de Kafka.
   *
   * En el contexto de los eventos Kafka, el término "payload"
   * se refiere a los datos contenidos en el mensaje del evento.
   * En otras palabras, el payload es la carga útil de información
   * que se envía en el mensaje de Kafka.
   *
   * @param {*} data
   * @param {KafkaContext} context
   * @memberof CompanyController
   */
  @EventPattern('order_management.invoice.company_created')
  createdCompany(@Payload() data: EventEntity, @Ctx() context: KafkaContext) {
    console.log('--------------------------------------');
    console.log('Data: ', data.data);
    console.log('--------------------------------------');
    console.log('Context: ', context);
    console.log('--------------------------------------');

    const object: CompanyEntity = JSON.parse(JSON.stringify(data.data));
    this.companyService.createCompany(object);
  }

  @EventPattern('order_management.invoice.company_getted')
  gettedCompany(@Payload() data: EventEntity, @Ctx() context: KafkaContext) {
    console.log('--------------------------------------');
    console.log('Data: ', data.data);
    console.log('--------------------------------------');
    console.log('Context: ', context);
    console.log('--------------------------------------');

    const object: CompanyEntity = JSON.parse(JSON.stringify(data.data));
    this.companyService.getCompany(object.companyId);
  }

  @EventPattern('order_management.invoice.company_deleted')
  deletedCompany(@Payload() data: EventEntity, @Ctx() context: KafkaContext) {
    console.log('--------------------------------------');
    console.log('Data: ', data.data);
    console.log('--------------------------------------');
    console.log('Context: ', context);
    console.log('--------------------------------------');

    const object: CompanyEntity = JSON.parse(JSON.stringify(data.data));
    this.companyService.deleteCompany(object.companyId);
  }

  @EventPattern('order_management.invoice.company_name_updated')
  updateCompanyName(
    @Payload() data: EventEntity,
    @Ctx() context: KafkaContext,
  ) {
    console.log('--------------------------------------');
    console.log('Data: ', data.data);
    console.log('--------------------------------------');
    console.log('Context: ', context);
    console.log('--------------------------------------');

    const object: CompanyEntity = JSON.parse(JSON.stringify(data.data));
    this.companyService.updateCompanyName(object.companyId, object);
  }

  @EventPattern('order_management.invoice.company_bank_account_updated')
  updateCompanyBankAccount(
    @Payload() data: EventEntity,
    @Ctx() context: KafkaContext,
  ) {
    console.log('--------------------------------------');
    console.log('Data: ', data.data);
    console.log('--------------------------------------');
    console.log('Context: ', context);
    console.log('--------------------------------------');

    const object: CompanyEntity = JSON.parse(JSON.stringify(data.data));
    this.companyService.updateCompanyBankAccount(object.companyId, object);
  }
}
