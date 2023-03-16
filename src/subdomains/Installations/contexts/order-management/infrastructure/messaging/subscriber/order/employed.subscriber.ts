import { Controller } from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  KafkaContext,
  Payload,
} from '@nestjs/microservices';

import { EmployedEntity } from '../../../persistence';
import { EventEntity } from '../../../persistence/entities/event.entity';
import { EmployedService } from '../../../persistence/services';

@Controller()
export class EmployedController {
  constructor(private readonly employedService: EmployedService) {}

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
   * @memberof EmployedController
   */
  @EventPattern('order_management.order.employed_created')
  createdEmployed(@Payload() data: EventEntity, @Ctx() context: KafkaContext) {
    console.log('--------------------------------------');
    console.log('Data: ', data.data);
    console.log('--------------------------------------');
    console.log('Context: ', context);
    console.log('--------------------------------------');

    const object: EmployedEntity = JSON.parse(JSON.stringify(data.data));
    this.employedService.createEmployed(object);
  }

  @EventPattern('order_management.order.employed_getted')
  gettedEmployed(@Payload() data: EventEntity, @Ctx() context: KafkaContext) {
    console.log('--------------------------------------');
    console.log('Data: ', data.data);
    console.log('--------------------------------------');
    console.log('Context: ', context);
    console.log('--------------------------------------');

    const object: EmployedEntity = JSON.parse(JSON.stringify(data.data));
    this.employedService.getEmployed(object.employedId);
  }

  @EventPattern('order_management.order.employed_deleted')
  deletedEmployed(@Payload() data: EventEntity, @Ctx() context: KafkaContext) {
    console.log('--------------------------------------');
    console.log('Data: ', data.data);
    console.log('--------------------------------------');
    console.log('Context: ', context);
    console.log('--------------------------------------');

    const object: EmployedEntity = JSON.parse(JSON.stringify(data.data));
    this.employedService.deleteEmployed(object.employedId);
  }

  @EventPattern('order_management.order.employed_name_updated')
  updateEmployedName(
    @Payload() data: EventEntity,
    @Ctx() context: KafkaContext,
  ) {
    console.log('--------------------------------------');
    console.log('Data: ', data.data);
    console.log('--------------------------------------');
    console.log('Context: ', context);
    console.log('--------------------------------------');

    const object: EmployedEntity = JSON.parse(JSON.stringify(data.data));
    this.employedService.updateEmployedName(object.employedId, object);
  }

  @EventPattern('order_management.order.employed_phone_updated')
  updateEmployedPhone(
    @Payload() data: EventEntity,
    @Ctx() context: KafkaContext,
  ) {
    console.log('--------------------------------------');
    console.log('Data: ', data.data);
    console.log('--------------------------------------');
    console.log('Context: ', context);
    console.log('--------------------------------------');

    const object: EmployedEntity = JSON.parse(JSON.stringify(data.data));
    this.employedService.updateEmployedPhone(object.employedId, object);
  }
}
