import { Controller } from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  KafkaContext,
  Payload,
} from '@nestjs/microservices';

import { KitEntity } from '../../../persistence';
import { EventEntity } from '../../../persistence/entities/event.entity';
import { KitService } from '../../../persistence/services';

@Controller()
export class KitController {
  constructor(private readonly kitService: KitService) {}

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
   * @memberof KitController
   */
  @EventPattern('order_management.order.kit_created')
  createdKit(@Payload() data: EventEntity, @Ctx() context: KafkaContext) {
    console.log('--------------------------------------');
    console.log('Data: ', data.data);
    console.log('--------------------------------------');
    console.log('Context: ', context);
    console.log('--------------------------------------');

    const object: KitEntity = JSON.parse(JSON.stringify(data.data));
    this.kitService.createKit(object);
  }

  @EventPattern('order_management.order.kit_getted')
  gettedKit(@Payload() data: EventEntity, @Ctx() context: KafkaContext) {
    console.log('--------------------------------------');
    console.log('Data: ', data.data);
    console.log('--------------------------------------');
    console.log('Context: ', context);
    console.log('--------------------------------------');

    const object: KitEntity = JSON.parse(JSON.stringify(data.data));
    this.kitService.getKit(object.kitId);
  }

  @EventPattern('order_management.order.kit_deleted')
  deletedKit(@Payload() data: EventEntity, @Ctx() context: KafkaContext) {
    console.log('--------------------------------------');
    console.log('Data: ', data.data);
    console.log('--------------------------------------');
    console.log('Context: ', context);
    console.log('--------------------------------------');

    const object: KitEntity = JSON.parse(JSON.stringify(data.data));
    this.kitService.deleteKit(object.kitId);
  }

  @EventPattern('order_management.order.kit_model_updated')
  updateKitModel(@Payload() data: EventEntity, @Ctx() context: KafkaContext) {
    console.log('--------------------------------------');
    console.log('Data: ', data.data);
    console.log('--------------------------------------');
    console.log('Context: ', context);
    console.log('--------------------------------------');

    const object: KitEntity = JSON.parse(JSON.stringify(data.data));
    console.log(object);
    this.kitService.updateKitModel(object.kitId, object);
  }
}
