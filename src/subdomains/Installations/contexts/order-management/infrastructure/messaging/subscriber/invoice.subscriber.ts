import { Controller } from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  KafkaContext,
  Payload,
} from '@nestjs/microservices';

import {
  CompanyEntity,
  EventEntity,
  FeeEntity,
  InvoiceEntity,
} from '../../persistence';
import {
  CompanyService,
  FeeService,
  InvoiceService,
} from '../../persistence/services';

@Controller()
export class InvoiceController {
  constructor(
    private readonly invoiceService: InvoiceService,
    private readonly companyService: CompanyService,
    private readonly feeService: FeeService
    ) {}

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
   * @memberof InvoiceController
   */
  @EventPattern('order_management.created_invoice')
  async createdInvoice(@Payload() data: EventEntity, @Ctx() context: KafkaContext) {
    console.log('--------------------------------------');
    console.log('Data: ', data.data);
    console.log('--------------------------------------');
    console.log('Context: ', context);
    console.log('--------------------------------------');

    let object: InvoiceEntity = JSON.parse(JSON.stringify(data.data));
    let company: CompanyEntity = await this.companyService.createCompany(object.company);
    let fee: FeeEntity = await this.feeService.createFee(object.fee);
    object.company = company;
    object.fee = fee;
    await this.invoiceService.createInvoice(object);;
  }

  @EventPattern('order_management.getted_invoice')
  gettedInvoice(@Payload() data: EventEntity, @Ctx() context: KafkaContext) {
    console.log('--------------------------------------');
    console.log('Data: ', data.data);
    console.log('--------------------------------------');
    console.log('Context: ', context);
    console.log('--------------------------------------');

    const object: InvoiceEntity = JSON.parse(JSON.stringify(data.data));
    this.invoiceService.getInvoice(object.invoiceId);
  }

  @EventPattern('order_management.deleted_invoice')
  deletedInvoice(@Payload() data: EventEntity, @Ctx() context: KafkaContext) {
    console.log('--------------------------------------');
    console.log('Data: ', data.data);
    console.log('--------------------------------------');
    console.log('Context: ', context);
    console.log('--------------------------------------');

    const object: InvoiceEntity = JSON.parse(JSON.stringify(data.data));
    this.invoiceService.deleteInvoice(object.invoiceId);
  }
}
