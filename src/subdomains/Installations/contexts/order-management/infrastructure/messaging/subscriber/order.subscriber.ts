import { Controller } from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  KafkaContext,
  Payload,
} from '@nestjs/microservices';

import { EventEntity } from '../../persistence/entities';
import { EventService } from '../../persistence/services';

@Controller()
export class OrderController {
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
   * @memberof OrderController
   */
  @EventPattern('order_management.created_order')
  createdOrder(@Payload() data: EventEntity, @Ctx() context: KafkaContext) {
    console.log('--------------------------------------');
    console.log('Data: ', data.data);
    console.log('--------------------------------------');
    console.log('Context: ', context);
    console.log('--------------------------------------');
    data.type = 'order_management.created_order';
    data.createdAt = Date.now();
    data.data = JSON.stringify(data.data);
    this.eventService.createEvent(data);
  }

  @EventPattern('order_management.getted_order')
  gettedOrder(@Payload() data: EventEntity, @Ctx() context: KafkaContext) {
    console.log('--------------------------------------');
    console.log('Data: ', data.data);
    console.log('--------------------------------------');
    console.log('Context: ', context);
    console.log('--------------------------------------');
    data.type = 'order_management.getted_order';
    data.createdAt = Date.now();
    data.data = JSON.stringify(data.data);
    this.eventService.createEvent(data);
  }

  @EventPattern('order_management.deleted_order')
  deletedOrder(@Payload() data: EventEntity, @Ctx() context: KafkaContext) {
    console.log('--------------------------------------');
    console.log('Data: ', data.data);
    console.log('--------------------------------------');
    console.log('Context: ', context);
    console.log('--------------------------------------');
    data.type = 'order_management.deleted_order';
    data.createdAt = Date.now();
    data.data = JSON.stringify(data.data);
    this.eventService.createEvent(data);
  }
}
