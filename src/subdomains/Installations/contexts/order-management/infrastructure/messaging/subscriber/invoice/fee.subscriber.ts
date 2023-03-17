import { Controller } from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  KafkaContext,
  Payload,
} from '@nestjs/microservices';

import { EventEntity } from '../../../persistence/entities/event.entity';
import { EventService } from '../../../persistence/services';

@Controller()
export class FeeController {
  constructor(private readonly eventService: EventService) {}

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
   * @memberof FeeController
   */
  @EventPattern('order_management.invoice.fee_created')
  createdFee(@Payload() data: EventEntity, @Ctx() context: KafkaContext) {
    console.log('--------------------------------------');
    console.log('Data: ', data.data);
    console.log('--------------------------------------');
    console.log('Context: ', context);
    console.log('--------------------------------------');
    data.type = 'order_management.invoice.fee_created';
    data.createdAt = Date.now();
    data.data = JSON.stringify(data.data);
    this.eventService.createEvent(data);
  }

  @EventPattern('order_management.invoice.fee_getted')
  gettedFee(@Payload() data: EventEntity, @Ctx() context: KafkaContext) {
    console.log('--------------------------------------');
    console.log('Data: ', data.data);
    console.log('--------------------------------------');
    console.log('Context: ', context);
    console.log('--------------------------------------');
    data.type = 'order_management.invoice.fee_getted';
    data.createdAt = Date.now();
    data.data = JSON.stringify(data.data);
    this.eventService.createEvent(data);
  }

  @EventPattern('order_management.invoice.fee_deleted')
  deletedFee(@Payload() data: EventEntity, @Ctx() context: KafkaContext) {
    console.log('--------------------------------------');
    console.log('Data: ', data.data);
    console.log('--------------------------------------');
    console.log('Context: ', context);
    console.log('--------------------------------------');
    data.type = 'order_management.invoice.fee_deleted';
    data.createdAt = Date.now();
    data.data = JSON.stringify(data.data);
    this.eventService.createEvent(data);
  }

  @EventPattern('order_management.invoice.fee_charge_updated')
  updateFeeCharge(@Payload() data: EventEntity, @Ctx() context: KafkaContext) {
    console.log('--------------------------------------');
    console.log('Data: ', data.data);
    console.log('--------------------------------------');
    console.log('Context: ', context);
    console.log('--------------------------------------');
    data.type = 'order_management.invoice.fee_charge_updated';
    data.createdAt = Date.now();
    data.data = JSON.stringify(data.data);
    this.eventService.createEvent(data);
  }

  @EventPattern('order_management.invoice.fee_tax_updated')
  updateFeeTax(@Payload() data: EventEntity, @Ctx() context: KafkaContext) {
    console.log('--------------------------------------');
    console.log('Data: ', data.data);
    console.log('--------------------------------------');
    console.log('Context: ', context);
    console.log('--------------------------------------');
    data.type = 'order_management.invoice.fee_tax_updated';
    data.createdAt = Date.now();
    data.data = JSON.stringify(data.data);
    this.eventService.createEvent(data);
  }
}
